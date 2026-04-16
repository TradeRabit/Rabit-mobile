export const resolveSymbol = (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
  console.log('[Rabit Datafeed] resolveSymbol:', symbolName);
  
  // Konfigurasi aset yang kompatibel dengan Rabit WS
  setTimeout(() => {
    onSymbolResolvedCallback({
      name: symbolName,
      full_name: symbolName,
      description: symbolName,
      type: 'crypto',
      session: '24x7',
      exchange: 'Rabit Dex',
      listed_exchange: 'Rabit Dex',
      timezone: 'Etc/UTC',
      format: 'price',
      pricescale: 100000,
      minmov: 1,
      has_intraday: true,
      supported_resolutions: ['1', '5', '15', '30', '60', '240', '1D', '1W'],
      volume_precision: 2,
      data_status: 'streaming',
    });
  }, 0);
};
