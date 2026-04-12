import React, { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DimensionValue, ViewStyle } from 'react-native';

export type SkeletonVariant = 'rect' | 'circle' | 'rounded';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  variant?: SkeletonVariant;
  radius?: number;
  style?: ViewStyle;
}

export const Skeleton = ({ 
  width = '100%', 
  height = 20, 
  variant = 'rounded',
  radius = 8,
  style 
}: SkeletonProps) => {
  const theme = useColorScheme() ?? 'light';
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.7, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const baseStyle: ViewStyle = {
    width,
    height,
    backgroundColor: theme === 'dark' ? '#2A2A2A' : '#E0E0E0',
    borderRadius: variant === 'circle' ? 999 : (variant === 'rounded' ? radius : 0),
  };

  return (
    <Animated.View style={[baseStyle as any, animatedStyle, style]} />
  );
};
