import React, { createContext, useContext, useState, useRef } from 'react';

interface ChartContextType {
  chartInstance: any;
  setChartInstance: (instance: any) => void;
  currentSymbol: string;
  setCurrentSymbol: (symbol: string) => void;
  isChartReady: boolean;
  setIsChartReady: (ready: boolean) => void;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export function ChartProvider({ children }: { children: React.ReactNode }) {
  const [chartInstance, setChartInstance] = useState<any>(null);
  const [currentSymbol, setCurrentSymbol] = useState<string>('');
  const [isChartReady, setIsChartReady] = useState<boolean>(false);

  return (
    <ChartContext.Provider
      value={{
        chartInstance,
        setChartInstance,
        currentSymbol,
        setCurrentSymbol,
        isChartReady,
        setIsChartReady,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
}

export function useChart() {
  const context = useContext(ChartContext);
  if (context === undefined) {
    throw new Error('useChart must be used within a ChartProvider');
  }
  return context;
}
