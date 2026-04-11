import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { CryptoIcon, Icon, Text } from '@/components/atoms';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { AssetRowProps } from './AssetRow.types';
import { router } from 'expo-router';

export const AssetRow = ({ 
  name, 
  label, 
  symbol, 
  price, 
  change, 
  isPositive,
  isFavorite = false,
  onToggleFavorite,
  iconSize: propIconSize,
  variant = 'default' 
}: AssetRowProps) => {
  const isCompact = variant === 'compact';
  const iconSize = isCompact ? 32 : (propIconSize || 40);
  const theme = useColorScheme() ?? 'light';
  const successColor = tokens.color[theme].success;
  const errorColor = tokens.color[theme].error;
  const favActiveColor = '#FFD700'; // Gold/Yellow untuk Favorite

  const handlePress = () => {
    router.push({
      pathname: '/asset-detail/[id]',
      params: { id: symbol }
    });
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={handlePress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: isCompact ? 5 : 10,
        backgroundColor: 'transparent',
      }}
    >
      {/* BAGIAN KIRI: Icon + Pin + Name Stack */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: isCompact ? parseInt(tokens.spacing[2]) : parseInt(tokens.spacing[3]) }}>
        {/* Favorite Button (Bintang) - SEKARANG DI KIRI */}
        {!isCompact && (
          <TouchableOpacity 
            onPress={onToggleFavorite}
            activeOpacity={0.7}
            style={{ padding: 4 }}
          >
            <Icon 
              name="Heart" 
              size={18} 
              color={isFavorite ? tokens.color[theme].error : tokens.color[theme].textSecondary} 
              weight={isFavorite ? "fill" : "regular"} 
            />
          </TouchableOpacity>
        )}

        {/* Icon Container */}
        <View style={{
          width: iconSize,
          height: iconSize,
          borderRadius: 999,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
           <CryptoIcon name={name} variant="color" size={iconSize} />
        </View>

        <View>
          <Text weight="bold" size={isCompact ? "sm" : "base"}>{label}</Text>
          <Text color="secondary" size={isCompact ? "xs" : "sm"} style={{ marginTop: isCompact ? 0 : 2 }}>{symbol}</Text>
        </View>
      </View>

      {/* BAGIAN KANAN: Price + Change Stack */}
      <View style={{ alignItems: 'flex-end' }}>
        <Text weight="bold" size={isCompact ? "sm" : "base"}>{price}</Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: isCompact ? 2 : 4 }}>
          <Icon 
            name={isPositive ? "CaretUp" : "CaretDown"} 
            size={isCompact ? 10 : 12} 
            color={isPositive ? "success" : "error"} 
            weight="fill" 
          />
          <Text 
            weight="medium" 
            size={isCompact ? "xs" : "sm"} 
            style={{ color: isPositive ? successColor : errorColor }}
          >
            {change}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
