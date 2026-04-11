import React from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/atoms';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AssetContextAssistPage() {
  const { id } = useLocalSearchParams();
  const theme = useColorScheme() ?? 'light';
  
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: tokens.color[theme].background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    }}>
      <Text size="xl" weight="bold">Assist for: {id}</Text>
      <Text color="secondary" style={{ marginTop: 10 }}>Context-aware assist coming soon</Text>
    </View>
  );
}
