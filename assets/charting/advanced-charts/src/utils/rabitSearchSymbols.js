export const searchSymbols = async (
  userInput,
  exchange,
  symbolType,
  onResultReadyCallback
) => {
  console.log('[Rabit Datafeed] searchSymbols:', userInput);
  
  // Memberikan mock balasan pencarian aset agar tidak memblokir input
  onResultReadyCallback([
    {
      symbol: userInput || 'ETH/USD',
      full_name: userInput || 'ETH/USD',
      description: 'Mata Uang Kripto',
      exchange: 'Rabit Dex',
      type: 'crypto',
    }
  ]);
};
