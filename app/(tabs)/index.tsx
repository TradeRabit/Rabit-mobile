import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { AppHeader, AssetExplorer, BalanceSection } from '@/components/organisms';
import { BalanceSkeleton, AssetExplorerSkeleton } from '@/components/molecules';
import { ScreenLayout } from '@/components/templates';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const theme = useColorScheme() ?? 'light';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScreenLayout>
      <AppHeader />
      
      <View style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={{ 
            paddingHorizontal: parseInt(tokens.spacing[4]),
            paddingBottom: tokens.layout.bottomGap, 
            paddingTop: 18
          }}
          showsVerticalScrollIndicator={false}
          style={{ 
            flex: 1,
            marginHorizontal: -parseInt(tokens.spacing[4]),
          }}
        >
          {loading ? (
            <>
              <BalanceSkeleton />
              <AssetExplorerSkeleton />
            </>
          ) : (
            <>
              <BalanceSection />
              <AssetExplorer />
            </>
          )}
        </ScrollView>
      </View>
    </ScreenLayout>
  );
}
