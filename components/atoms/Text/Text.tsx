import React from 'react';
import { Text as NativeText } from 'react-native';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { TextProps } from './Text.types';

export const Text = ({
  children,
  size = "base",
  weight = "regular",
  color = "primary",
  align = "auto",
  style,
  numberOfLines,
  ellipsizeMode,
  ...rest
}: TextProps) => {
  const theme = useColorScheme() ?? 'light';

  // Resolving color based on theme
  const getTextColor = () => {
    switch (color) {
      case "primary": return tokens.color[theme].textPrimary;
      case "secondary": return tokens.color[theme].textSecondary;
      case "brand": return tokens.color.brand;
      case "placeholderGrey": return tokens.color[theme].placeholderGreyBg;
      case "placeholderBlack": return tokens.color[theme].placeholderBlackBg;
      default: return tokens.color[theme].textPrimary;
    }
  };

  return (
    <NativeText
      style={[
        {
          fontFamily: tokens.font.family.sans,
          fontSize: parseInt(tokens.font.size[size]),
          fontWeight: tokens.font.weight[weight] as any,
          color: getTextColor(),
          textAlign: align,
        },
        style
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...rest}
    >
      {children}
    </NativeText>
  );
};
