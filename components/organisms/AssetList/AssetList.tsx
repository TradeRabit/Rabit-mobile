import React from 'react';
import { View } from 'react-native';
import { AssetPill } from '@/components/molecules';
import { Text } from '@/components/atoms';
import { tokens } from '@/constants/theme';

const MOCK_ASSETS = [
  { name: 'Btc', label: 'Bitcoin', symbol: 'BTC', change: '+2.45%', isPositive: true },
  { name: 'Eth', label: 'Ethereum', symbol: 'ETH', change: '-1.12%', isPositive: false },
  { name: 'Sol', label: 'Solana', symbol: 'SOL', change: '+12.4%', isPositive: true },
  { name: 'Usdt', label: 'Tether', symbol: 'USDT', change: '0.00%', isPositive: true },
];

export const AssetList = () => {
  return (
    <View style={{ gap: parseInt(tokens.spacing[4]) }}>
      <Text weight="bold" size="xl">Top Assets</Text>
      <View style={{ gap: parseInt(tokens.spacing[2]) }}>
        {MOCK_ASSETS.map((asset) => (
          <AssetPill 
            key={asset.symbol}
            name={asset.name}
            label={asset.label}
            symbol={asset.symbol}
            change={asset.change}
            isPositive={asset.isPositive}
          />
        ))}
      </View>
    </View>
  );
};
