import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence, 
  withTiming 
} from 'react-native-reanimated';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Icon, Text } from '@/components/atoms';
import { router } from 'expo-router';

export const AppHeader = () => {
  const theme = useColorScheme() ?? 'light';
  
  // Shared value untuk animasi rotasi gear
  const rotation = useSharedValue(0);

  // Memilih logo berdasarkan tema aktif
  const logoSource = theme === 'light' 
    ? tokens.assets.logo.iconAndTextDark 
    : tokens.assets.logo.iconAndText;

  // Memilih logo DEX (Logomark + Text) berdasarkan tema
  const driftLogo = theme === 'dark' 
    ? tokens.assets.dex.drift.fullWhite 
    : tokens.assets.dex.drift.fullBlack;

  const handleSettingsPress = () => {
    // Navigasi ke Settings
    router.push('/settings');

    // Animasi "mutter dikit" (putar balik sedikit)
    rotation.value = withSequence(
      withTiming(45, { duration: 150 }), // Putar 45 derajat
      withSpring(0, { damping: 10, stiffness: 100 }) // Balik ke posisi awal dengan sedikit ayunan
    );
  };

  const animatedGearStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const bgColor = tokens.color[theme].background;

  return (
    <View style={{
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between', // Pisahkan logo dan tombol settings
      alignItems: 'center',
      paddingVertical: parseInt(tokens.spacing[1]), // Reduced from spacing[2]/[4]
      backgroundColor: bgColor,
      zIndex: 10,
      overflow: 'visible',
    }}>
      <Image 
        source={logoSource} 
        style={{ 
          width: 100, // Reduced from 120
          height: 40, // Reduced from 70
        }} 
        resizeMode="contain" 
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        {/* Dropdown Eksekusi/DEX (Drift) */}
        <TouchableOpacity 
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: tokens.color[theme].surface || tokens.color[theme].background, // Fallback if surface not defined
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: tokens.color[theme].border || '#333',
            gap: 6
          }}
        >
          <Image 
            source={driftLogo} 
            style={{ width: 52, height: 18 }}
            resizeMode="contain"
          />
          <Icon name="CaretDown" size={14} color={tokens.color[theme].textSecondary} weight="bold" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleSettingsPress}
          activeOpacity={0.7}
        >
          <Animated.View style={animatedGearStyle}>
            <Icon name="Gear" size={28} color="primary" weight="fill" />
          </Animated.View>
        </TouchableOpacity>
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
