import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { Text, Button, Input, Icon } from '@/components/atoms';
import { OrbitAnimation, PulseAnimation, FloatAnimation } from '@/components/molecules';
import { ScreenLayout } from '@/components/templates';
import { tokens } from '@/constants/theme';
import { router } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function OnboardingPage() {
  const theme = useColorScheme() ?? 'light';
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const inputRef = useRef<TextInput>(null);
  
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (username.length === 0) return; 
      router.replace('/(tabs)');
    }
  };

  const activeColor = tokens.color.brand;
  const inactiveColor = theme === 'dark' ? '#333' : '#DDD';
  const surfaceColor = theme === 'dark' ? tokens.color.dark.secondarySurface : '#F5F5F5';

  return (
    <ScreenLayout>
      <View style={styles.container}>
        


        {/* Dynamic Animation Container */}
        {step < 3 && (
          <View style={styles.animationContainer}>
            {step === 1 && <OrbitAnimation />}
            {step === 2 && <PulseAnimation />}
          </View>
        )}

        {/* Dynamic Content Container */}
        <View style={[styles.contentContainer, step === 3 && { flex: 1, justifyContent: 'center', marginBottom: 0 }]}>
          {step === 1 && (
            <>
              <Text size="3xl" weight="bold" align="center" style={styles.title}>
                Trade Smarter with AI Analysis
              </Text>
              <View style={{ height: 12 }} />
              <Text color="secondary" align="center" style={styles.description}>
                Analyze assets with deep AI insights, track real-time trends, and place orders with precision in one seamless flow.
              </Text>
            </>
          )}

          {step === 2 && (
            <>
              <Text size="3xl" weight="bold" align="center" style={styles.title}>
                Connect Your Wallet
              </Text>
              <View style={{ height: 12 }} />
              <Text color="secondary" align="center" style={styles.description}>
                Link your crypto wallet to immediately access your balances, start trading, and interact with Web3 protocols.
              </Text>
            </>
          )}

          {step === 3 && (
            <Pressable 
              style={{ width: '100%', flex: 1, alignItems: 'center' }} 
              onPress={() => inputRef.current?.focus()}
            >
              {/* Header at Top */}
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <View style={{ 
                  width: 56, 
                  height: 56, 
                  borderRadius: 12, 
                  backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F0F0F0', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  marginBottom: 16
                }}>
                  <Icon name="User" size={24} color="primary" weight="bold" />
                </View>
                
                <Text size="2xl" weight="bold" align="center" style={{ marginBottom: 8 }}>
                  Create your username
                </Text>
                
                <Text color="secondary" align="center" style={{ paddingHorizontal: 40, lineHeight: 22 }}>
                  This is your personalized address that people can send crypto to.
                </Text>
              </View>

              {/* Input Centered in between */}
              <View style={{ flex: 1, width: '100%', justifyContent: 'center', paddingBottom: 180 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 36,
                    fontWeight: 'bold',
                    color: tokens.color[theme].textPrimary,
                    marginRight: -2
                  }}>
                    @
                  </Text>
                  <Input 
                    inputRef={inputRef}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="satoshi"
                    autoFocus
                    autoCapitalize="none"
                    style={{
                      fontSize: 36,
                      fontWeight: 'bold',
                      color: tokens.color[theme].textPrimary,
                      textAlign: 'left',
                      flex: 0,
                      minWidth: 100
                    }}
                  />
                </View>

                {/* Connected Address Indicator */}
                <View style={{ alignItems: 'center', marginTop: 32 }}>
                  <Text size="xs" color="secondary" weight="semibold" style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1, fontSize: 10 }}>
                    Connected Wallet
                  </Text>
                  
                  <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: theme === 'dark' ? tokens.color.dark.border : '#E5E7EB',
                    alignSelf: 'center',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 99,
                    gap: 6,
                  }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: tokens.color.success }} />
                    <Text size="xs" weight="bold" style={{ color: tokens.color[theme].textPrimary, letterSpacing: 0.5 }}>
                      0x8a92...3F5A
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          )}
        </View>
      </View>

      {/* Footer Action Area */}
      <View style={styles.footerWrapper}>
        <Button 
          size="md" 
          variant={step === 2 ? "secondary" : "brand"} 
          onClick={handleNext}
          style={styles.buttonStyle}
        >
          {step === 1 ? "Continue" : step === 2 ? "Connect Wallet" : "Complete"}
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
    paddingTop: 0
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: parseInt(tokens.spacing[4]),
    marginBottom: 114, 
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
    paddingBottom: 56, 
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
