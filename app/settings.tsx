import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/atoms';
import { SubHeader } from '@/components/organisms';
import { ScreenLayout } from '@/components/templates';

export default function SettingsPage() {
  return (
    <ScreenLayout>
      <SubHeader title="Settings" />
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text color="secondary">Settings content coming soon</Text>
      </View>
    </ScreenLayout>
  );
}
