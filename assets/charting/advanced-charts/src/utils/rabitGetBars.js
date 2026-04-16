export const getBars = async (
  symbolInfo,
  resolution,
  periodParams,
  onHistoryCallback,
  onErrorCallback
) => {
  console.log('[Rabit Datafeed] getBars:', symbolInfo.name, resolution);
  
  try {
    const bars = [];
    let currentTime = periodParams.to * 1000;
    
    // Sebagai dummy data generator, kita buat candlestick dari waktu tujuan mundur ke belakang.
    // Anggap default jarak bar adalah 1 menit (60.000 ms)
    const intervalMs = 60 * 1000; 
    let currentPrice = 65000; // Contoh harga (BTC misalnya di area 65k)

    // Generate 150 bar kebelakang
    for (let i = 0; i < 150; i++) {
        const time = currentTime - (i * intervalMs);
        const offset = (Math.random() - 0.5) * 50; 
        
        const open = currentPrice;
        const close = currentPrice + offset;
        const high = Math.max(open, close) + (Math.random() * 20);
        const low = Math.min(open, close) - (Math.random() * 20);
        const volume = Math.random() * 100;

        bars.push({
            time, open, high, low, close, volume
        });

        // Price untuk bar sebelumnya (karena kita me-loop mundur)
        currentPrice = currentPrice - offset; 
    }
    
    // TradingView butuh urutan waktu maju (lama -> terbaru)
    bars.reverse();

    if (bars.length > 0) {
      onHistoryCallback(bars, { noData: false });
    } else {
      onHistoryCallback([], { noData: true });
    }
  } catch (err) {
    console.error('[Rabit Datafeed] getBars Error:', err);
    onErrorCallback(err);
  }
};
