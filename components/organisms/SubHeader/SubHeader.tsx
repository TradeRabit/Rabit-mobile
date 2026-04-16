import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Icon, Text } from '@/components/atoms';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface SubHeaderProps {
  title?: string | React.ReactNode;
  showBack?: boolean;
  rightActions?: React.ReactNode;
  onBack?: () => void;
}

export const SubHeader = ({ 
  title, 
  showBack = true, 
  rightActions,
  onBack
}: SubHeaderProps) => {
  const theme = useColorScheme() ?? 'light';
  const textColor = tokens.color[theme].textPrimary;
  const bgColor = tokens.color[theme].background;

  return (
    <View style={{
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      paddingHorizontal: parseInt(tokens.spacing[4]),
      backgroundColor: bgColor,
      zIndex: 10,
      overflow: 'visible',
    }}>
      {/* KIRI: Back Button + Title */}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        {showBack && (
          <TouchableOpacity 
            onPress={onBack ? onBack : () => router.back()}
            activeOpacity={0.7}
            style={{ 
              padding: 8, 
              marginLeft: -8, // Mengoffset padding icon agar tetap lurus dengan konten di bawahnya
            }}
          >
            <Icon name="CaretLeft" size={24} color={textColor} weight="bold" />
          </TouchableOpacity>
        )}
        
        {title && (
          typeof title === 'string' ? (
            <Text size="lg" weight="bold" style={{ color: tokens.color[theme].textPrimary }}>
              {title}
            </Text>
          ) : (
            title
          )
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
          height: 0,
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
