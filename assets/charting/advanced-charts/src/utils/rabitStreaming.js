const activeSubscriptions = new Map();

export const subscribeBars = (
  symbolInfo,
  resolution,
  onRealtimeCallback,
  subscriberUID,
  onResetCacheNeededCallback
) => {
  console.log('[Rabit Datafeed] Subscribe realtime dummy:', subscriberUID);
  
  let currentPrice = 65000; 
  let lastBarTime = Date.now();
  lastBarTime = Math.floor(lastBarTime / 60000) * 60000; // bulatkan ke 1 menit terdekat
  let currentOpen = currentPrice;
  let currentHigh = currentPrice;
  let currentLow = currentPrice;

  // Simulate tick data per 1 second
  const intervalId = setInterval(() => {
    // harga berfluktuasi random
    const randOffset = (Math.random() - 0.5) * 15; 
    const tickPrice = currentPrice + randOffset;
    const now = Date.now();

    // Reset bar jika beda menit
    if (now >= lastBarTime + 60000) {
      lastBarTime += 60000;
      currentOpen = currentPrice;
      currentHigh = currentPrice;
      currentLow = currentPrice;
    }

    currentHigh = Math.max(currentHigh, tickPrice);
    currentLow = Math.min(currentLow, tickPrice);

    onRealtimeCallback({
      time: lastBarTime,
      open: currentOpen,
      high: currentHigh,
      low: currentLow,
      close: tickPrice,
      volume: Math.random() * 5
    });

    currentPrice = tickPrice;
  }, 1000); 

  activeSubscriptions.set(subscriberUID, intervalId);
};

export const unsubscribeBars = (subscriberUID) => {
  console.log('[Rabit Datafeed] Unsubscribe realtime dummy:', subscriberUID);
  const intervalId = activeSubscriptions.get(subscriberUID);
  if (intervalId) {
    clearInterval(intervalId);
    activeSubscriptions.delete(subscriberUID);
  }
};
