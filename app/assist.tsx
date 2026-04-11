import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Icon } from '@/components/atoms';
import { SubHeader } from '@/components/organisms';
import { ScreenLayout } from '@/components/templates';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AssistPage() {
  const theme = useColorScheme() ?? 'light';
  
  return (
    <ScreenLayout>
      <SubHeader title="Rabit Assist" />
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text color="secondary">General Assist content coming soon</Text>
      </View>
    </ScreenLayout>
  );
}
