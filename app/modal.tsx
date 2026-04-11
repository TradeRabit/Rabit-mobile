import React from 'react';
import { Link } from 'expo-router';
import { ScreenLayout } from '@/components/templates';
import { Text } from '@/components/atoms';
import { View } from 'react-native';

export default function ModalScreen() {
  return (
    <ScreenLayout centerItems>
      <Text size="2xl" weight="bold">This is a modal</Text>
      
      <Link href="/" dismissTo style={{ marginTop: 24, paddingVertical: 12 }}>
        <Text color="brand" weight="semibold">Go to home screen</Text>
      </Link>
    </ScreenLayout>
  );
}
