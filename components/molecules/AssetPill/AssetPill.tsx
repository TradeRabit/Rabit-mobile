import React from 'react';
import { View } from 'react-native';
import { CryptoIcon, Text } from '@/components/atoms';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { AssetPillProps } from './AssetPill.types';

export const AssetPill = ({ name, label, symbol, change, isPositive }: AssetPillProps) => {
  const theme = useColorScheme() ?? 'light';

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
      padding: parseInt(tokens.spacing[3]),
      borderRadius: parseInt(tokens.radius.lg),
      gap: parseInt(tokens.spacing[3]),
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#333' : '#E5E5E5',
    }}>
      <CryptoIcon name={name} variant="color" size={32} />
      
      <View style={{ flex: 1 }}>
        <Text weight="bold" size="base">{label}</Text>
        <Text color="secondary" size="xs">{symbol}</Text>
      </View>

      {change && (
        <View style={{ alignItems: 'flex-end' }}>
          <Text 
            weight="medium" 
            size="sm" 
            style={{ color: isPositive ? tokens.color[theme].success : tokens.color[theme].error }}
          >
            {change}
          </Text>
        </View>
      )}
    </View>
  );
};
