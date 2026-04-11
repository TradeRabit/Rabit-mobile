import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Icon, Text } from '@/components/atoms';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface SubHeaderProps {
  title?: string;
  showBack?: boolean;
  rightActions?: React.ReactNode;
}

export const SubHeader = ({ 
  title, 
  showBack = true, 
  rightActions 
}: SubHeaderProps) => {
  const theme = useColorScheme() ?? 'light';
  const textColor = tokens.color[theme].text;
  const bgColor = tokens.color[theme].background;

  return (
    <View style={{
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: parseInt(tokens.spacing[2]), // Menyamakan dengan AppHeader
      backgroundColor: bgColor,
      zIndex: 10,
      overflow: 'visible',
    }}>
      {/* KIRI: Back Button + Title */}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        {showBack && (
          <TouchableOpacity 
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={{ 
              padding: 8, 
              marginLeft: -8, // Mengoffset padding icon agar tetap lurus dengan konten di bawahnya
              borderRadius: 99,
              backgroundColor: tokens.color[theme].surface,
            }}
          >
            <Icon name="CaretLeft" size={24} color={textColor} weight="bold" />
          </TouchableOpacity>
        )}
        
        {title && (
          <Text size="lg" weight="bold" style={{ color: textColor }}>
            {title}
          </Text>
        )}
      </View>

      {/* KANAN: Actions */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
        {rightActions}
      </View>

      {/* TOP GRADIENT MASK - Attached directly to header so it applies everywhere */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: '100%',
          left: -parseInt(tokens.spacing[4]), // expand to account for screen padding
          right: -parseInt(tokens.spacing[4]),
          height: 40,
        }}
      >
        <LinearGradient
          colors={[bgColor, bgColor + 'CC', bgColor + '00']} 
          locations={[0, 0.6, 1]}
          style={{ flex: 1 }}
          pointerEvents="none"
        />
      </View>
    </View>
  );
};
