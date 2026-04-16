import React, { useEffect } from 'react';
import { View, Pressable, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { ChatSidebarProps } from './ChatSidebar.types';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  interpolate,
  Easing
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = SCREEN_WIDTH;

const DUMMY_HISTORY = [
  { id: '1', title: 'Cara investasi Bitcoin safe' },
  { id: '2', title: 'Trend AI di tahun 2025' },
  { id: '3', title: 'Belajar React Native Dasar' },
  { id: '4', title: 'Resep Nasi Goreng Spesial' },
  { id: '5', title: 'Sejarah Kerajaan Majapahit' },
  { id: '6', title: 'Analisa Market Crypto' },
  { id: '7', title: 'Tips Menulis Kode Bersih' },
  { id: '8', title: 'Ide Bisnis Tanpa Modal' },
  { id: '9', title: 'Review MacBook M3' },
  { id: '10', title: 'Cara Meditasi untuk Pemula' },
];

export const ChatSidebar = ({ isVisible, onClose }: ChatSidebarProps) => {
  const theme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(isVisible ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
  }, [isVisible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    display: progress.value === 0 && !isVisible ? 'none' : 'flex',
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [-SIDEBAR_WIDTH, 0]) }
    ],
  }));

  return (
    <>
      {/* Backdrop */}
      <Animated.View 
        pointerEvents={isVisible ? 'auto' : 'none'}
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 2000,
          },
          backdropStyle
        ]}
      >
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>

      {/* Sidebar Sheet */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: SIDEBAR_WIDTH,
            backgroundColor: theme === 'dark' ? '#111111' : '#FFFFFF',
            zIndex: 2001,
            paddingTop: insets.top + 20,
            paddingHorizontal: 20,
            borderRightWidth: 1,
            borderColor: theme === 'dark' ? '#222' : '#F0F0F0',
          },
          sheetStyle
        ]}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
          <Image 
            source={theme === 'dark' ? tokens.assets.logo.iconAndText : tokens.assets.logo.iconAndTextDark} 
            style={{ width: 100, height: 28 }} 
            resizeMode="contain" 
          />
          <TouchableOpacity onPress={onClose}>
            <Icon name="SidebarSimple" size={24} color="secondary" weight="bold" />
          </TouchableOpacity>
        </View>

        {/* Menu Section Title */}
        <Text color="secondary" size="xs" weight="bold" style={{ textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
          Menu
        </Text>

        {/* Action Buttons: New Chat & Manage Memory */}
        <View style={{ gap: 12, marginBottom: 30 }}>
          <TouchableOpacity 
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5',
              paddingVertical: 14,
              paddingHorizontal: 16,
              borderRadius: 14,
              gap: 12,
            }}
            activeOpacity={0.7}
          >
            <Icon name="Plus" size={20} color="secondary" weight="bold" />
            <Text weight="semibold" size="base">New Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5',
              paddingVertical: 14,
              paddingHorizontal: 16,
              borderRadius: 14,
              gap: 12,
            }}
            activeOpacity={0.7}
            onPress={() => console.log('Manage Memory pressed')}
          >
            <Icon name="Database" size={20} color="secondary" weight="bold" />
            <Text weight="semibold" size="base">Manage Memory</Text>
          </TouchableOpacity>
        </View>

        {/* Session History Header - Fixed */}
        <View style={{ paddingBottom: 12 }}>
          <Text color="secondary" size="xs" weight="bold" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            Session History
          </Text>
        </View>

        {/* Scrollable History / Content */}
        <View style={{ flex: 1, position: 'relative' }}>
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
          >
            <View style={{ marginBottom: 16 }}>
              {/* Chat History Items */}
              <View style={{ gap: 2 }}>
                {DUMMY_HISTORY.map((item) => (
                  <TouchableOpacity 
                    key={item.id}
                    style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                      borderRadius: 12,
                      gap: 12,
                    }}
                    activeOpacity={0.6}
                  >
                    <Text size="sm" numberOfLines={1} style={{ flex: 1 }}>{item.title}</Text>
                    
                    <TouchableOpacity 
                      onPress={() => console.log('Menu for', item.id)}
                      style={{ padding: 4 }}
                    >
                      <Icon name="DotsThree" size={20} color="secondary" style={{ opacity: 0.5 }} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* TOP GRADIENT MASK */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 80,
            }}
          >
            <LinearGradient
              colors={[
                theme === 'dark' ? '#111111' : '#FFFFFF',
                (theme === 'dark' ? '#111111' : '#FFFFFF') + '00'
              ]} 
              style={{ flex: 1 }}
            />
          </View>

          {/* BOTTOM GRADIENT MASK for History only */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
            }}
          >
            <LinearGradient
              colors={[
                (theme === 'dark' ? '#111111' : '#FFFFFF') + '00', 
                theme === 'dark' ? '#111111' : '#FFFFFF'
              ]} 
              style={{ flex: 1 }}
            />
          </View>
        </View>

        {/* Bottom Menu - Outside gradient area */}
        <View style={{ 
          paddingBottom: insets.bottom + 20,
          paddingTop: 16,
          backgroundColor: theme === 'dark' ? '#111111' : '#FFFFFF',
        }}>
           <TouchableOpacity 
             style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
             activeOpacity={0.7}
             onPress={() => {
               onClose();
               router.replace('/(tabs)');
             }}
           >
             <Icon name="House" size={24} color="secondary" weight="bold" />
             <Text weight="medium">Back Home</Text>
           </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};
