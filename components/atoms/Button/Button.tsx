import React from 'react';
import { TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { tokens } from '@/constants/theme';
import { Text } from '../Text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { ButtonProps } from './Button.types';

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  isLoading = false,
  onClick,
  style,
}: ButtonProps) => {
  const theme = useColorScheme() ?? 'light';

  const getStyles = () => {
    let backgroundColor = tokens.color.brand;
    let textColor: "primary" | "secondary" | "brand" | "placeholderGrey" | "placeholderBlack" = "primary";

    switch (variant) {
      case "primary":
        backgroundColor = theme === 'dark' ? tokens.color.dark.textPrimary : tokens.color.light.textPrimary;
        textColor = theme === 'dark' ? "placeholderBlack" : "placeholderGrey"; // Inverted for contrast
        break;
      case "brand":
        backgroundColor = tokens.color.brand;
        textColor = "primary"; // White usually
        break;
      case "secondary":
        backgroundColor = theme === 'dark' ? tokens.color.dark.placeholderBlackBg : tokens.color.light.placeholderGreyBg;
        textColor = "primary";
        break;
      case "ghost":
        backgroundColor = "transparent";
        textColor = "brand";
        break;
    }

    return { backgroundColor, textColor };
  };

  const { backgroundColor, textColor } = getStyles();

  const sizeStyles = {
    sm: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 12 },
    md: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 16 },
    lg: { paddingVertical: 16, paddingHorizontal: 32, borderRadius: 20 },
    xl: { paddingVertical: 20, paddingHorizontal: 40, borderRadius: 24 },
  };

  const fontSizes: Record<string, any> = {
    sm: "xs",
    md: "sm",
    lg: "base",
    xl: "lg",
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onClick}
      disabled={disabled || isLoading}
      style={[
        {
          backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: disabled ? 0.5 : 1,
        },
        sizeStyles[size],
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor === "brand" ? tokens.color.brand : "#FFF"} />
      ) : (
        typeof children === 'string' ? (
          <Text 
            weight="bold" 
            size={fontSizes[size]} 
            style={{ color: variant === 'primary' ? (theme === 'dark' ? '#000' : '#FFF') : undefined }}
          >
            {children}
          </Text>
        ) : (
          children
        )
      )}
    </TouchableOpacity>
  );
};
