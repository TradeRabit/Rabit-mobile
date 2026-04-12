import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  withSequence,
  Easing,
  cancelAnimation
} from 'react-native-reanimated';
import { Icon, CryptoIcon } from '../../atoms';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const FloatingElement = ({ icon, size, delay, styleOverrides }: any) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(translateY);
    setTimeout(() => {
      translateY.value = withRepeat(
        withSequence(
          withTiming(-15, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }, delay);
    return () => cancelAnimation(translateY);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const theme = useColorScheme() ?? 'light';
  
  return (
    <Animated.View style={[
      styles.floater, 
      { backgroundColor: theme === 'dark' ? tokens.color.dark.tertiarySurface : '#FFFFFF' }, 
      styleOverrides,
      animatedStyle
    ]}>
      <CryptoIcon name={icon} size={size} variant="color" />
    </Animated.View>
  );
};

export const FloatAnimation = () => {
  const theme = useColorScheme() ?? 'light';
  const centerBg = theme === 'dark' ? tokens.color.dark.tertiarySurface : '#F0F0F0';
  
  return (
    <View style={styles.container}>
      {/* Decorative floaters pushed to the responsive edges */}
      <FloatingElement icon="BTC" size={28} delay={0} styleOverrides={{ top: 60, left: 30 }} />
      <FloatingElement icon="ETH" size={32} delay={500} styleOverrides={{ top: 90, right: 30 }} />
      <FloatingElement icon="SOL" size={32} delay={1000} styleOverrides={{ bottom: 80, left: 40 }} />
      <FloatingElement icon="USDC" size={28} delay={300} styleOverrides={{ bottom: 100, right: 40 }} />
      
      {/* Center Profile */}
      <View style={[styles.centerProfile, { backgroundColor: centerBg }]}>
         <Icon name="User" size={48} color="brand" weight="duotone" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: tokens.color.brand,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  floater: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  }
});
