import React from 'react';
import * as PhosphorIcons from 'phosphor-react-native';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { IconProps } from './Icon.types';

export const Icon = ({ 
  name, 
  size = 24, 
  color = "primary", 
  weight = "regular" 
}: IconProps) => {
  const theme = useColorScheme() ?? 'light';

  // Resolving color berdasarkan Global Design Tokens kita
  const getIconColor = () => {
    switch (color) {
      case "primary": return tokens.color[theme].textPrimary;
      case "secondary": return tokens.color[theme].textSecondary;
      case "brand": return tokens.color.brand;
      case "success": return tokens.color[theme].success;
      case "error": return tokens.color[theme].error;
      case "placeholderGrey": return tokens.color[theme].placeholderGreyBg;
      case "placeholderBlack": return tokens.color[theme].placeholderBlackBg;
      case "white": return "#FFFFFF";
      default: return tokens.color[theme].textPrimary;
    }
  };

  // Mengambil komponen icon dinamis langsung dari Phosphor
  const IconComponent = PhosphorIcons[name] as React.ElementType;

  // Pasang handling error sederhana jika icon salah ketik
  if (!IconComponent) {
    console.warn(`Icon "${name}" tidak ditemukan di phosphor-react-native.`);
    return null;
  }

  return (
    <IconComponent 
      size={size} 
      weight={weight} 
      color={getIconColor()} 
    />
  );
};
