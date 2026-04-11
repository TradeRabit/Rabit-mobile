import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '@/components/atoms';
import { ScreenLayout } from '@/components/templates';
import { SubHeader } from '@/components/organisms';

export default function AssetPage() {
  return (
    <ScreenLayout>
      <Stack.Screen options={{ headerShown: false }} />
      <SubHeader title="All Assets" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text color="secondary">Asset list will be here...</Text>
      </View>
    </ScreenLayout>
  );
}
