import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Icon } from '@/components/atoms';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface NumPadProps {
  onPress: (value: string) => void;
  onDelete: () => void;
}

const PAD_KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'delete'],
];

export const NumPad = ({ onPress, onDelete }: NumPadProps) => {
  const theme = useColorScheme() ?? 'light';

  const renderKey = (key: string) => {
    const isDelete = key === 'delete';
    return (
      <TouchableOpacity
        key={key}
        onPress={() => isDelete ? onDelete() : onPress(key)}
        activeOpacity={0.7}
        style={{
          width: '30%',
          aspectRatio: 1.5,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: parseInt(tokens.radius.lg),
        }}
      >
        {isDelete ? (
          <Icon name="Backspace" size={28} color={tokens.color[theme].textPrimary} weight="regular" />
        ) : (
          <Text size="3xl" weight="medium" style={{ color: tokens.color[theme].textPrimary }}>
            {key}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ width: '100%', gap: parseInt(tokens.spacing[2]), paddingVertical: parseInt(tokens.spacing[4]) }}>
      {PAD_KEYS.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {row.map(renderKey)}
        </View>
      ))}
    </View>
  );
};
