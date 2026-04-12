import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput, Platform, UIManager, Image } from 'react-native';
import { Text, Icon, Button, Skeleton } from '@/components/atoms';
import { SubHeader } from '@/components/organisms';
import { ScreenLayout } from '@/components/templates';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SettingsPage() {
  const theme = useColorScheme() ?? 'light';
  const [username, setUsername] = useState('AlexRabit');
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const cardBg = theme === 'dark' ? '#1A1A1A' : '#F5F5F5';
  const border = theme === 'dark' ? '#333' : '#E0E0E0';
  const inputBg = theme === 'dark' ? '#252525' : '#E8E8E8';

  return (
    <ScreenLayout>
      <SubHeader title="Settings" />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: parseInt(tokens.spacing[4]),
          paddingVertical: 18,
          gap: 2,
        }}
        style={{
          flex: 1,
          marginHorizontal: -parseInt(tokens.spacing[4]),
        }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <>
            <Skeleton width="100%" height={160} radius={12} />
            <Skeleton width="100%" height={120} radius={12} />
          </>
        ) : (
          <>
            {/* ── PROFILE SECTION ── */}
            <View style={{ gap: 2 }}>
              <View
                style={{
                  backgroundColor: cardBg,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderWidth: 1,
                  borderColor: border,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Icon name="User" size={18} color="brand" weight="bold" />
                  <Text
                    weight="bold"
                    style={{
                      fontSize: 12,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      color: tokens.color[theme].textSecondary,
                    }}
                  >
                    Profile Settings
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: cardBg,
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: border,
                  gap: 16,
                }}
              >
                <View style={{ gap: 8 }}>
                  <Text size="sm" weight="medium" color="secondary">Username</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: inputBg,
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      alignItems: 'center',
                      gap: 12,
                      borderWidth: 1,
                      borderColor: border,
                    }}
                  >
                    <Icon name="At" size={18} color="secondary" />
                    <TextInput
                      value={username}
                      onChangeText={setUsername}
                      style={{
                        flex: 1,
                        color: tokens.color[theme].textPrimary,
                        fontFamily: tokens.font.family.sans,
                        fontSize: 16,
                        padding: 0,
                      }}
                      placeholder="Enter username"
                      placeholderTextColor={tokens.color[theme].textPlaceholder}
                    />
                  </View>
                </View>
                <Button variant="brand" size="md" style={{ width: '100%', borderRadius: 12 }}>
                  Save Changes
                </Button>
              </View>
            </View>

            {/* ── APPEARANCE SECTION ── */}
            <View style={{ gap: 2 }}>
              <View
                style={{
                  backgroundColor: cardBg,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderWidth: 1,
                  borderColor: border,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Icon name="Palette" size={18} color="brand" weight="bold" />
                  <Text
                    weight="bold"
                    style={{
                      fontSize: 12,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      color: tokens.color[theme].textSecondary,
                    }}
                  >
                    Appearance
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: cardBg,
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: border,
                  gap: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: inputBg,
                    borderRadius: 12,
                    padding: 6,
                    borderWidth: 1,
                    borderColor: border,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setSelectedTheme('light')}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 12,
                      borderRadius: 9,
                      backgroundColor: selectedTheme === 'light' ? tokens.color.brand : 'transparent',
                    }}
                  >
                    <Text
                      weight="bold"
                      size="sm"
                      style={{ color: selectedTheme === 'light' ? 'white' : tokens.color[theme].textSecondary }}
                    >
                      Light
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setSelectedTheme('dark')}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 12,
                      borderRadius: 9,
                      backgroundColor: selectedTheme === 'dark' ? tokens.color.brand : 'transparent',
                    }}
                  >
                    <Text
                      weight="bold"
                      size="sm"
                      style={{ color: selectedTheme === 'dark' ? 'white' : tokens.color[theme].textSecondary }}
                    >
                      Dark
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Version */}
            <View style={{ marginTop: 28, alignItems: 'center', gap: 12, paddingBottom: 24 }}>
              <Image 
                source={theme === 'dark' 
                  ? require('../assets/Rabit icon/Icon white.png') 
                  : require('../assets/Rabit icon/Icon.png')
                } 
                style={{ width: 24, height: 24, opacity: 0.5 }}
                resizeMode="contain"
              />
              <Text color="secondary" style={{ fontSize: 10, letterSpacing: 1, opacity: 0.8 }}>Rabit Wallet v1.0.4 (BETA)</Text>
            </View>
          </>
        )}
      </ScrollView>
    </ScreenLayout>
  );
}
