import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface ChipProps {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

export const Chip = ({ label, isActive, onPress }: ChipProps) => {
  const theme = useColorScheme() ?? 'light';
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        paddingHorizontal: parseInt(tokens.spacing[4]),
        paddingVertical: parseInt(tokens.spacing[2]),
        borderRadius: parseInt(tokens.radius.full),
        backgroundColor: isActive 
          ? tokens.color.brand 
          : (theme === 'dark' ? '#1A1A1A' : '#E8E8E8'),
        borderWidth: 1,
        borderColor: isActive ? tokens.color.brand : 'transparent',
      }}
    >
      <Text 
        size="sm" 
        weight={isActive ? "bold" : "medium"}
        style={{ color: isActive ? tokens.color.white : tokens.color[theme].textSecondary }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
