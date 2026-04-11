import { Slot } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, View, Keyboard, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  Easing
} from 'react-native-reanimated';
import { HomeHeader } from '@/components/organisms';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AppLayout() {
  const theme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();
  const bgColor = tokens.color[theme].background;
  
  // Shared value untuk melacak tinggi keyboard
  const keyboardHeight = useSharedValue(0);

  useEffect(() => {
    // Listener untuk mendeteksi keyboard muncul/hilang
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        // Efek SMOOTH tanpa mantul pakai withTiming
        keyboardHeight.value = withTiming(e.endCoordinates.height, {
          duration: 300,
          easing: Easing.out(Easing.exp),
        });
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        keyboardHeight.value = withTiming(0, {
          duration: 250,
          easing: Easing.out(Easing.exp),
        });
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const animatedNavbarStyle = useAnimatedStyle(() => {
    // Tambahkan offset lebih besar (32px) saat keyboard terbuka agar input tidak tertutup
    const offset = keyboardHeight.value > 0 ? 32 : 0;
    
    // Kurangi padding saat keyboard aktif agar tidak terlalu "melayang" tinggi
    const dynamicPadding = keyboardHeight.value > 0 
      ? (Platform.OS === 'ios' ? 10 : 12) 
      : (Platform.OS === 'ios' ? insets.bottom + 20 : 48);

    return {
      transform: [{ 
        translateY: withSpring(-keyboardHeight.value - offset, {
          damping: 20,
          stiffness: 120,
          mass: 0.5,
        }) 
      }],
      paddingBottom: withTiming(dynamicPadding, { duration: 200 }),
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      {/* Konten Halaman Aktif (Home) */}
      <Slot />

      {/* GRADIENT MASK - Static bottom gradient to mask content scrolling under navbar */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0, 
          right: 0,
          height: 180,
        }}
      >
        <LinearGradient
          colors={[bgColor + '00', bgColor + 'CC', bgColor]} 
          locations={[0, 0.5, 1]}
          style={{ flex: 1 }}
          pointerEvents="none"
        />
      </View>

      {/* Navbar: Floating Kapsul Search & Logo - Interactive */}
      <Animated.View
        pointerEvents="box-none"
        style={[
          {
            position: 'absolute',
            bottom: 0,
            left: 0, 
            right: 0,
            paddingHorizontal: parseInt(tokens.spacing[4]),
            overflow: 'visible',
          },
          animatedNavbarStyle
        ]}
      >
        <View pointerEvents="box-none" style={{ paddingTop: 40 }}>
          <HomeHeader />
        </View>
      </Animated.View>
    </View>
  );
}
