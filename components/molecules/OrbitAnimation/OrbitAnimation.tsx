import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  cancelAnimation,
  withRepeat, 
  withTiming, 
  Easing, 
  interpolate 
} from 'react-native-reanimated';
import { CryptoIcon } from '../../atoms';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const ORBIT_1_ASSETS = ['BTC', 'ETH', 'SOL'];
const ORBIT_2_ASSETS = ['USDT', 'BNB', 'XRP', 'ADA', 'LINK'];

interface SatelliteProps {
  symbol: string;
  radius: number;
  index: number;
  total: number;
  speed: number;
  reverse?: boolean;
}

const Satellite = ({ symbol, radius, index, total, speed, reverse = false }: SatelliteProps) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(rotation);
    rotation.value = withRepeat(
      withTiming(reverse ? -2 * Math.PI : 2 * Math.PI, {
        duration: speed,
        easing: Easing.linear,
      }),
      -1,
      false
    );
    return () => cancelAnimation(rotation);
  }, [speed, reverse]);

  const animatedStyle = useAnimatedStyle(() => {
    const initialAngle = (index * (2 * Math.PI)) / total;
    const currentAngle = initialAngle + rotation.value;
    return {
      transform: [
        { translateX: Math.cos(currentAngle) * radius },
        { translateY: Math.sin(currentAngle) * radius },
      ],
    };
  });

  return (
    <Animated.View style={[styles.satellite, animatedStyle]}>
      <CryptoIcon name={symbol} size={32} />
    </Animated.View>
  );
};

export const OrbitAnimation = () => {
  const theme = useColorScheme() ?? 'light';
  
  const logoSource = theme === 'dark' 
    ? require('@/assets/Rabit icon/Icon white.png') 
    : require('@/assets/Rabit icon/Icon.png');

  return (
    <View style={styles.container}>
      {/* Sun: Rabit Logo */}
      <View style={styles.sunContainer}>
        <Image source={logoSource} style={styles.sun} resizeMode="contain" />
      </View>

      {/* Orbit 1 */}
      <View style={[styles.orbit, { width: 180, height: 180, borderRadius: 90 }]} />
      {ORBIT_1_ASSETS.map((symbol, i) => (
        <Satellite 
          key={`o1-${symbol}`} 
          symbol={symbol} 
          radius={90} 
          index={i} 
          total={ORBIT_1_ASSETS.length} 
          speed={15000} 
        />
      ))}

      {/* Orbit 2 */}
      <View style={[styles.orbit, { width: 300, height: 300, borderRadius: 150 }]} />
      {ORBIT_2_ASSETS.map((symbol, i) => (
        <Satellite 
          key={`o2-${symbol}`} 
          symbol={symbol} 
          radius={150} 
          index={i} 
          total={ORBIT_2_ASSETS.length} 
          speed={30000} 
          reverse
        />
      ))}
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
  sunContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  sun: {
    width: 45,
    height: 45,
  },
  orbit: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  satellite: {
    position: 'absolute',
    zIndex: 5,
  },
});
