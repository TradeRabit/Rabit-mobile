import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Text, CryptoIcon, Icon } from '@/components/atoms';

export interface AssetCardProps {
  name: string;
  symbol: string;
  price: string;
  change: string;
  isPositive?: boolean;
  onPress?: () => void;
}


export const AssetCard = ({ 
  name, 
  symbol, 
  price, 
  change, 
  isPositive = true,
  onPress 
}: AssetCardProps) => {
  const theme = useColorScheme() ?? 'light';
  const successColor = tokens.color[theme].success;
  const errorColor = tokens.color[theme].error;
  
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        width: 140, // Slightly wider for the icon
        padding: 12,
        backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme === 'dark' ? '#333' : '#E0E0E0',
      }}
    >
      {/* Top: Icon + Ticker */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <CryptoIcon name={name} size={24} variant="color" />
        <Text weight="bold" size="sm" style={{ letterSpacing: 0.5 }}>{symbol}</Text>
      </View>

      {/* Middle: Price */}
      <Text weight="bold" size="base" style={{ marginBottom: 4 }}>{price}</Text>

      {/* Bottom: Change (Matching AssetRow) */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Icon 
          name={isPositive ? "CaretUp" : "CaretDown"} 
          size={10} 
          color={isPositive ? "success" : "error"} 
          weight="fill" 
        />
        <Text 
          weight="medium" 
          size="xs" 
          style={{ color: isPositive ? successColor : errorColor }}
        >
          {change}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

