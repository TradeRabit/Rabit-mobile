import { getChartRuntimeConfig } from './rabitChartRuntime';

export const resolveSymbol = (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
  console.log('[Rabit Datafeed] resolveSymbol:', symbolName);
  
  // Konfigurasi aset yang kompatibel dengan Rabit WS
  setTimeout(() => {
    const { exchange } = getChartRuntimeConfig();
    const exchangeLabel = exchange === 'phantom_spot' ? 'Phantom Spot' : 'Phantom Futures';
    const listedExchangeLabel = exchange === 'phantom_spot' ? 'Hyperliquid Spot' : 'Hyperliquid Futures';

    onSymbolResolvedCallback({
      name: symbolName,
      full_name: symbolName,
      description: symbolName,
      type: 'crypto',
      session: '24x7',
      exchange: exchangeLabel,
      listed_exchange: listedExchangeLabel,
      timezone: 'Etc/UTC',
      format: 'price',
      pricescale: 100000,
      minmov: 1,
      has_intraday: true,
      supported_resolutions: ['1', '5', '15', '60', '240', '1D'],
      volume_precision: 2,
      data_status: 'streaming',
    });
  }, 0);
};
