import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from '@/components/atoms';
import { OrbitAnimation } from '@/components/molecules';
import { ScreenLayout } from '@/components/templates';
import { tokens } from '@/constants/theme';
import { router } from 'expo-router';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function OnboardingPage() {
  const theme = useColorScheme() ?? 'light';
  
  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  return (
    <ScreenLayout>
      {/* 1 & 2. Main Content Area */}
      <View style={styles.container}>
        <View style={styles.animationContainer}>
          <OrbitAnimation />
        </View>

        <View style={styles.contentContainer}>
          <Text size="3xl" weight="bold" align="center" style={styles.title}>
            Trade Smarter with AI Analysis
          </Text>
          <View style={{ height: 12 }} />
          <Text color="secondary" align="center" style={styles.description}>
            Analyze assets with deep AI insights, track real-time trends, and place orders with precision in one seamless flow.
          </Text>
        </View>
      </View>

      {/* 3. Footer Action Area (Truly Absolute like SearchBar) */}
      <View style={styles.footerWrapper}>
        <Button 
          size="md" 
          variant="brand" 
          onClick={handleContinue}
          style={styles.buttonStyle}
        >
          Continue
        </Button>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animationContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: parseInt(tokens.spacing[4]),
    paddingTop: 40
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: parseInt(tokens.spacing[4]),
    marginBottom: 114, // Sesuai permintaan user untuk posisi header/desc
  },
  title: {
    lineHeight: 36,
    paddingHorizontal: 10,
  },
  description: {
    paddingHorizontal: 4,
    lineHeight: 22,
    marginTop: 4,
  },
  footerWrapper: {
    position: 'absolute',
    left: parseInt(tokens.spacing[4]),
    right: parseInt(tokens.spacing[4]),
    bottom: 0,
    paddingBottom: 56, // 48 (layout) + 8 (homeheader offset)
    alignItems: 'center',
  },
  buttonStyle: {
    width: '100%',
    height: 52,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
});
