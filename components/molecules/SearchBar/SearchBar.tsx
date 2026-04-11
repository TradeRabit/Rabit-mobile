import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon, Input } from '@/components/atoms';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { SearchBarProps } from './SearchBar.types';

import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSequence, 
  withTiming, 
  withSpring 
} from 'react-native-reanimated';

export const SearchBar = ({ 
  placeholder = "Search...", 
  value, 
  onChangeText, 
  onSearch,
  onFocus,
  onBlur
}: SearchBarProps) => {
  const theme = useColorScheme() ?? 'light';
  const scale = useSharedValue(1);

  // Fungsi untuk menjalankan animasi pop
  const triggerPop = () => {
    scale.value = withSequence(
      withTiming(0.85, { duration: 80 }), // Mengecil sekejap
      withSpring(1, { damping: 12, stiffness: 200 }) // Balik normal
    );
  };

  // Trigger animasi setiap kali value (teks input) berubah
  useEffect(() => {
    if (value && value.length > 0) {
      triggerPop();
    }
  }, [value]);

  const handleSearchPress = () => {
    triggerPop();
    if (onSearch) onSearch();
  };

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={{
      flex: 1, 
      flexDirection: 'row', 
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#262626' : '#FFFFFF',
      height: 52,
      borderRadius: 999, // Pill shape
      paddingHorizontal: parseInt(tokens.spacing[5]),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
    }}>
      <Input 
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        returnKeyType="search"
        onSubmitEditing={handleSearchPress} 
      />
      {value && value.length > 0 && (
        <TouchableOpacity 
          onPress={() => onChangeText?.('')} 
          style={{ marginRight: parseInt(tokens.spacing[2]) }}
        >
          <Icon name="XCircle" size={20} color="secondary" weight="fill" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleSearchPress} activeOpacity={0.7}>
        <Animated.View style={animatedIconStyle}>
          <Icon name="MagnifyingGlass" size={24} color="secondary" weight="fill" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};
