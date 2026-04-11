import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { InputProps } from './Input.types';

export const Input = ({ variant = "primary", hasError, style, ...props }: InputProps) => {
  const theme = useColorScheme() ?? 'light';

  // Styles dinamis berbasis design token global
  const inputStyle = {
    fontFamily: tokens.font.family.sans,
    fontSize: parseInt(tokens.font.size.base),
    color: tokens.color[theme].textPrimary,
    backgroundColor: 'transparent',
    padding: 0, // Direset agar diatur pembungkus di level Molecule
    flex: 1, // Agar selalu memenuhi sisa ruang yang ada
  };

  return (
    <TextInput
      style={[inputStyle, style]}
      placeholderTextColor={tokens.color[theme].textPlaceholder}
      {...props}
    />
  );
};
