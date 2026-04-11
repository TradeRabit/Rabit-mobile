import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Chip } from '@/components/atoms';
import { AssetRow } from '@/components/molecules';
import { tokens } from '@/constants/theme';

const FILTERS = ['All', 'Favorite', 'Crypto', 'Stablecoin', 'DeFi'];

const MOCK_ASSETS = [
  { name: 'Eth', label: 'Ethereum', symbol: 'ETH', price: '$3,718.71', change: '4.66%', isPositive: true },
  { name: 'Btc', label: 'Bitcoin', symbol: 'BTC', price: '$65,230.12', change: '2.15%', isPositive: true },
  { name: 'Sol', label: 'Solana', symbol: 'SOL', price: '$145.45', change: '-1.40%', isPositive: false },
  { name: 'Usdt', label: 'Tether', symbol: 'USDT', price: '$1.00', change: '0.01%', isPositive: true },
  { name: 'Bnb', label: 'BNB', symbol: 'BNB', price: '$590.20', change: '1.20%', isPositive: true },
  { name: 'Xrp', label: 'XRP', symbol: 'XRP', price: '$0.52', change: '-0.45%', isPositive: false },
  { name: 'Ada', label: 'Cardano', symbol: 'ADA', price: '$0.45', change: '0.80%', isPositive: true },
  { name: 'Avax', label: 'Avalanche', symbol: 'AVAX', price: '$35.12', change: '3.10%', isPositive: true },
  { name: 'Dot', label: 'Polkadot', symbol: 'DOT', price: '$7.45', change: '-1.10%', isPositive: false },
  { name: 'Matic', label: 'Polygon', symbol: 'MATIC', price: '$0.72', change: '2.40%', isPositive: true },
];

import { useRouter } from 'expo-router';

export const AssetExplorer = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');
  const [favoriteSymbols, setFavoriteSymbols] = useState<string[]>(['ETH']); 

  const toggleFavorite = (symbol: string) => {
    setFavoriteSymbols(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol) 
        : [...prev, symbol]
    );
  };

  const filteredAssets = activeFilter === 'Favorite' 
    ? MOCK_ASSETS.filter(a => favoriteSymbols.includes(a.symbol))
    : MOCK_ASSETS;

  const DISPLAY_LIMIT = 7;
  const displayedAssets = filteredAssets.slice(0, DISPLAY_LIMIT);

  return (
    <View style={{ paddingBottom: 24 }}>
      {/* Judul Section */}
      <Text size="xl" weight="bold" style={{ marginBottom: parseInt(tokens.spacing[3]) }}>Explore asset</Text>

      {/* Baris Filter (Scrollable Horizontal) */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ 
          marginHorizontal: -parseInt(tokens.spacing[4]),
          marginBottom: 10,
        }}
        contentContainerStyle={{ 
          gap: parseInt(tokens.spacing[2]),
          paddingHorizontal: parseInt(tokens.spacing[4]),
          paddingVertical: 4, 
        }}
      >
        {FILTERS.map((filter) => (
          <Chip 
            key={filter} 
            label={filter} 
            isActive={activeFilter === filter}
            onPress={() => setActiveFilter(filter)}
          />
        ))}
      </ScrollView>

      {/* Daftar Aset */}
      <View style={{ gap: 0 }}>
        {displayedAssets.map((asset) => (
          <AssetRow 
            key={asset.symbol}
            {...asset}
            isFavorite={favoriteSymbols.includes(asset.symbol)}
            onToggleFavorite={() => toggleFavorite(asset.symbol)}
          />
        ))}

        {filteredAssets.length > DISPLAY_LIMIT && (
          <View style={{ marginTop: 12, alignItems: 'center' }}>
            <Chip 
              label="View More" 
              isActive={false} 
              onPress={() => router.push('/asset')}
              style={{ paddingHorizontal: 24 }}
            />
          </View>
        )}

        {activeFilter === 'Favorite' && filteredAssets.length === 0 && (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text color="secondary">No favorite assets yet</Text>
          </View>
        )}
      </View>
    </View>
  );
};
