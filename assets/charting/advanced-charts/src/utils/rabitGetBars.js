import { buildChartApiUrl, getChartRuntimeConfig, normalizeAssetSymbol } from './rabitChartRuntime';
import { mapResolutionToInterval } from './rabitResolution';

export const getBars = async (
  symbolInfo,
  resolution,
  periodParams,
  onHistoryCallback,
  onErrorCallback
) => {
  console.log('[Rabit Datafeed] getBars:', symbolInfo.name, resolution);
  
  try {
    const symbol = normalizeAssetSymbol(symbolInfo.name);
    const interval = mapResolutionToInterval(resolution);
    const { ohlcSource } = getChartRuntimeConfig();
    const limit = Math.max(50, Math.min(Number(periodParams?.countBack) || 300, 1000));

    const query = new URLSearchParams({
      interval,
      limit: String(limit),
      source: ohlcSource,
    });

    const response = await fetch(buildChartApiUrl(`/api/assets/${encodeURIComponent(symbol)}/ohlc?${query.toString()}`));
    if (!response.ok) {
      if (response.status === 404) {
        console.warn('[Rabit Datafeed] No OHLC data for', symbol, ohlcSource);
        onHistoryCallback([], { noData: true });
        return;
      }
      throw new Error(`OHLC request failed with HTTP ${response.status}`);
    }

    const payload = await response.json();
    const bars = Array.isArray(payload?.data)
      ? payload.data
          .map((item) => ({
            time: Number(item.timestamp),
            open: Number(item.open),
            high: Number(item.high),
            low: Number(item.low),
            close: Number(item.close),
            volume: Number(item.volume ?? 0),
          }))
          .filter((item) => Number.isFinite(item.time))
          .sort((left, right) => left.time - right.time)
      : [];

    const fromMs = Number(periodParams?.from || 0) * 1000;
    const toMs = Number(periodParams?.to || 0) * 1000;
    const filteredBars = bars.filter((item) => {
      if (fromMs && item.time < fromMs) {
        return false;
      }

      if (toMs && item.time > toMs) {
        return false;
      }

      return true;
    });

    onHistoryCallback(filteredBars, { noData: filteredBars.length === 0 });
  } catch (err) {
    console.error('[Rabit Datafeed] getBars Error:', err);
    onErrorCallback(err);
  }
};
