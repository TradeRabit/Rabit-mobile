import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useChart } from '@/contexts/ChartContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { tokens } from '@/constants/theme';

interface PersistentChartProps {
  symbol: string;
  height?: number;
}

export function PersistentChart({ symbol, height = 220 }: PersistentChartProps) {
  const theme = useColorScheme() ?? 'light';
  const { chartInstance, setChartInstance, currentSymbol, setCurrentSymbol, isChartReady, setIsChartReady } = useChart();
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);

  const bgColor = theme === 'dark' ? '#010101' : '#EFEFEF';
  const textColor = theme === 'dark' ? '#FFFFFF' : '#0F0F00';
  const brandColor = tokens.color.brand;

  // Chart URL with theme parameters
  const chartUrl = `http://localhost:3000?theme=${theme}&backColor=${encodeURIComponent(bgColor)}&textColor=${encodeURIComponent(textColor)}&brandColor=${encodeURIComponent(brandColor)}`;

  useEffect(() => {
    // Update symbol if changed
    if (isChartReady && symbol !== currentSymbol && webViewRef.current) {
      setCurrentSymbol(symbol);
      // Send message to WebView to change symbol
      webViewRef.current.postMessage(JSON.stringify({
        type: 'CHANGE_SYMBOL',
        symbol: symbol
      }));
    }
  }, [symbol, isChartReady, currentSymbol]);

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      if (data.type === 'CHART_READY') {
        setIsChartReady(true);
        setIsLoading(false);
        setCurrentSymbol(symbol);
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  return (
    <View style={[styles.container, { height }]}>
      <WebView
        ref={webViewRef}
        source={{ uri: chartUrl }}
        style={styles.webview}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onLoadEnd={() => setIsLoading(false)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
        }}
      />
      {isLoading && (
        <View style={[styles.loadingOverlay, { backgroundColor: bgColor }]}>
          {/* Add loading indicator here if needed */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
