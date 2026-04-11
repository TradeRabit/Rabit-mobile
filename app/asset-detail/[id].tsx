import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Text, Icon } from '@/components/atoms';
import { SubHeader } from '@/components/organisms';
import { ScreenLayout } from '@/components/templates';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AssetDetailPage() {
  const { id } = useLocalSearchParams();
  const theme = useColorScheme() ?? 'light';
  const textColor = tokens.color[theme].text;
  
  return (
    <ScreenLayout>
      <SubHeader 
        title={id as string}
        rightActions={
          <>
            <TouchableOpacity style={{ padding: 4 }}>
              <Icon name="DotsThree" size={24} color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 4 }}>
              <Icon name="Heart" size={24} color={textColor} />
            </TouchableOpacity>
          </>
        }
      />
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text color="secondary">Content for {id} coming soon</Text>
      </View>
    </ScreenLayout>
  );
}
