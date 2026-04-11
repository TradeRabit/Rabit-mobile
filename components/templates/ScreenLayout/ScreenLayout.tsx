import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { ScreenLayoutProps } from './ScreenLayout.types';

export const ScreenLayout = ({ children, centerItems = false }: ScreenLayoutProps) => {
  const theme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: tokens.color[theme].background,
        justifyContent: centerItems ? 'center' : 'flex-start',
        alignItems: centerItems ? 'center' : 'stretch',
        // Menggeser padding atas agar menghindari letak Notch/Kamera & Tombol Back bawaan OS
        paddingTop: insets.top + parseInt(tokens.spacing[2]), 
        paddingLeft: parseInt(tokens.spacing[4]),
        paddingRight: parseInt(tokens.spacing[4]),
        // Hindari notch layar lengkung bawah kalau ada
        paddingBottom: insets.bottom + parseInt(tokens.spacing[4]), 
        overflow: 'visible',
      }}
    >
      {children}
    </View>
  );
};
