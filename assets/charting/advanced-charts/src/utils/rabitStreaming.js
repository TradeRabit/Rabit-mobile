import {
  buildChartWsUrl,
  getChartRuntimeConfig,
  normalizeAssetSymbol,
} from './rabitChartRuntime';
import { getResolutionBucketMs } from './rabitResolution';

const activeSubscriptions = new Map();

export const subscribeBars = (
  symbolInfo,
  resolution,
  onRealtimeCallback,
  subscriberUID,
  onResetCacheNeededCallback
) => {
  const runtime = getChartRuntimeConfig();
  const symbol = normalizeAssetSymbol(symbolInfo.name);
  const bucketMs = getResolutionBucketMs(resolution);

  console.log('[Rabit Datafeed] Subscribe realtime:', subscriberUID, symbol, resolution);

  const subscription = {
    socket: null,
    pingIntervalId: null,
    currentBar: null,
  };

  const socket = new WebSocket(buildChartWsUrl('/api/ws/prices'));
  subscription.socket = socket;

  socket.onopen = () => {
    subscription.pingIntervalId = window.setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send('ping');
      }
    }, 20000);
  };

  socket.onmessage = (event) => {
    if (event.data === 'pong') {
      return;
    }

    try {
      const payload = JSON.parse(event.data);
      if (normalizeAssetSymbol(payload?.symbol) !== symbol) {
        return;
      }
      if (payload?.source_exchange && payload.source_exchange !== runtime.exchange) {
        return;
      }

      const price = Number(payload.price);
      const timestamp = Date.parse(payload.timestamp || new Date().toISOString());
      if (!Number.isFinite(price) || !Number.isFinite(timestamp)) {
        return;
      }

      const barTime = Math.floor(timestamp / bucketMs) * bucketMs;

      if (!subscription.currentBar || subscription.currentBar.time !== barTime) {
        const previousClose = subscription.currentBar?.close ?? price;
        subscription.currentBar = {
          time: barTime,
          open: previousClose,
          high: Math.max(previousClose, price),
          low: Math.min(previousClose, price),
          close: price,
          volume: 0,
        };
      } else {
        subscription.currentBar = {
          ...subscription.currentBar,
          high: Math.max(subscription.currentBar.high, price),
          low: Math.min(subscription.currentBar.low, price),
          close: price,
          // Hyperliquid price updates do not provide per-candle volume here, so
          // keep the current bucket volume unchanged instead of injecting 24h volume.
          volume: Number(subscription.currentBar.volume ?? 0),
        };
      }

      onRealtimeCallback(subscription.currentBar);
    } catch (error) {
      console.error('[Rabit Datafeed] Realtime parse error:', error);
    }
  };

  socket.onerror = (error) => {
    console.error('[Rabit Datafeed] Realtime socket error:', error);
  };

  socket.onclose = () => {
    if (subscription.pingIntervalId) {
      clearInterval(subscription.pingIntervalId);
    }
  };

  activeSubscriptions.set(subscriberUID, subscription);
};

export const unsubscribeBars = (subscriberUID) => {
  console.log('[Rabit Datafeed] Unsubscribe realtime:', subscriberUID);
  const subscription = activeSubscriptions.get(subscriberUID);
  if (subscription?.pingIntervalId) {
    clearInterval(subscription.pingIntervalId);
  }
  if (subscription?.socket && subscription.socket.readyState <= WebSocket.OPEN) {
    subscription.socket.close();
  }
  if (subscription) {
    activeSubscriptions.delete(subscriberUID);
  }
};
