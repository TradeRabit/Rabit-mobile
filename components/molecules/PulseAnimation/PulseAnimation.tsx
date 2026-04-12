import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing,
  withDelay,
  cancelAnimation,
  interpolate
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const RABIT_ICON = require('@/assets/Rabit icon/Icon.png');
const RABIT_ICON_WHITE = require('@/assets/Rabit icon/Icon white.png');

import { CryptoIcon } from '../../atoms/CryptoIcon/CryptoIcon';

const PulseCircle = ({ delay, size, duration, coins, color, angleOffset = 0 }: { 
  delay: number, 
  size: number, 
  duration: number, 
  coins: string[],
  color: string,
  angleOffset?: number
}) => {
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(progress);
    cancelAnimation(rotation);
    progress.value = 0;
    rotation.value = 0;

    progress.value = withDelay(delay, withRepeat(
      withTiming(1, { duration, easing: Easing.out(Easing.ease) }), -1, false
    ));
    
    rotation.value = withDelay(delay, withRepeat(
      withTiming(1, { duration, easing: Easing.linear }), -1, false
    ));

    return () => {
      cancelAnimation(progress);
      cancelAnimation(rotation);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0.7, 2.5]);
    const opacity = interpolate(progress.value, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const rotate = interpolate(rotation.value, [0, 1], [0, Math.PI / 2]); // 90 degree turn per expansion

    return {
      transform: [
        { scale },
        { rotate: `${rotate}rad` }
      ],
      opacity,
    };
  });

  return (
    <Animated.View style={[
      styles.pulse, 
      { 
        width: size, 
        height: size, 
        borderRadius: size / 2,
        borderWidth: 1.2,
        borderColor: 'rgba(150, 150, 150, 0.2)', // Same as OrbitAnimation
        backgroundColor: 'transparent'
      }, 
      animatedStyle
    ]}>
      {/* Orbital Coins on the ring */}
      {coins.map((coin, index) => {
        const baseAngle = (index * (360 / coins.length));
        const finalAngle = (baseAngle + angleOffset) * (Math.PI / 180);
        const radius = size / 2;
        const x = radius * Math.cos(finalAngle);
        const y = radius * Math.sin(finalAngle);
        
        return (
          <View key={index} style={{
            position: 'absolute',
            left: radius + x - 12,
            top: radius + y - 12,
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: 'rgba(150, 150, 150, 0.2)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)', // Very faint white border for edge definition
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <CryptoIcon name={coin} size={14} variant="color" />
          </View>
        );
      })}
    </Animated.View>
  );
}

export const PulseAnimation = () => {
  const theme = useColorScheme() ?? 'light';
  const iconSource = theme === 'dark' ? RABIT_ICON_WHITE : RABIT_ICON;

  return (
    <View style={styles.container}>
      {/* Orange Ring (BTC/BNB) */}
      <PulseCircle 
        delay={0} 
        size={150} 
        duration={3500} 
        coins={['BTC', 'BNB']} 
        color="#FF6B00" 
        angleOffset={0} 
      />
      {/* Violet Ring (ETH/LINK) */}
      <PulseCircle 
        delay={1200} 
        size={150} 
        duration={3500} 
        coins={['ETH', 'LINK']} 
        color="#7C3AED" 
        angleOffset={120} 
      />
      {/* Cyan Ring (SOL/USDC) */}
      <PulseCircle 
        delay={2400} 
        size={150} 
        duration={3500} 
        coins={['SOL', 'USDC']} 
        color="#06B6D4" 
        angleOffset={240} 
      />
      
      <View style={styles.centerIcon}>
        <Image 
          source={iconSource}
          style={{ width: 44, height: 44 }}
          contentFit="contain"
        />
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
  pulse: {
    position: 'absolute',
    backgroundColor: tokens.color.brand,
    zIndex: 1, // Keep below center
  },
  centerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  }
});
