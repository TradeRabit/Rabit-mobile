import React, { useEffect } from 'react';
import { View, Keyboard, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Text } from '@/components/atoms';
import { AppHeader, HomeHeader, SubHeader } from '@/components/organisms';
import { ScreenLayout } from '@/components/templates';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  Easing
} from 'react-native-reanimated';

const FILTERS = ['All', 'Favorite', 'Crypto', 'Stablecoin', 'DeFi', 'AI', 'Meme', 'Layer 1', 'Layer 2'];

const MOCK_ASSETS = [
  { name: 'Btc', label: 'Bitcoin', symbol: 'BTC', price: '$65,230.12', change: '2.15%', isPositive: true },
  { name: 'Eth', label: 'Ethereum', symbol: 'ETH', price: '$3,718.71', change: '4.66%', isPositive: true },
  { name: 'Sol', label: 'Solana', symbol: 'SOL', price: '$145.45', change: '-1.40%', isPositive: false },
  { name: 'Usdt', label: 'Tether', symbol: 'USDT', price: '$1.00', change: '0.01%', isPositive: true },
  { name: 'Bnb', label: 'BNB', symbol: 'BNB', price: '$590.20', change: '1.20%', isPositive: true },
  { name: 'Xrp', label: 'XRP', symbol: 'XRP', price: '$0.52', change: '-0.45%', isPositive: false },
  { name: 'Ada', label: 'Cardano', symbol: 'ADA', price: '$0.45', change: '0.80%', isPositive: true },
  { name: 'Avax', label: 'Avalanche', symbol: 'AVAX', price: '$35.12', change: '3.10%', isPositive: true },
  { name: 'Dot', label: 'Polkadot', symbol: 'DOT', price: '$7.45', change: '-1.10%', isPositive: false },
  { name: 'Matic', label: 'Polygon', symbol: 'MATIC', price: '$0.72', change: '2.40%', isPositive: true },
  { name: 'Link', label: 'Chainlink', symbol: 'LINK', price: '$18.41', change: '-2.31%', isPositive: false },
  { name: 'Near', label: 'Near Protocol', symbol: 'NEAR', price: '$7.12', change: '+5.21%', isPositive: true },
  { name: 'Atom', label: 'Cosmos', symbol: 'ATOM', price: '$9.24', change: '-1.15%', isPositive: false },
  { name: 'Uni', label: 'Uniswap', symbol: 'UNI', price: '$7.82', change: '-3.42%', isPositive: false },
  { name: 'Ltc', label: 'Litecoin', symbol: 'LTC', price: '$82.15', change: '+1.45%', isPositive: true },
  { name: 'Arb', label: 'Arbitrum', symbol: 'ARB', price: '$1.12', change: '+4.52%', isPositive: true },
  { name: 'Op', label: 'Optimism', symbol: 'OP', price: '$2.45', change: '+2.12%', isPositive: true },
  { name: 'Apt', label: 'Aptos', symbol: 'APT', price: '$9.12', change: '-0.85%', isPositive: false },
  { name: 'Kas', label: 'Kaspa', symbol: 'KAS', price: '$0.12', change: '+8.42%', isPositive: true },
  { name: 'Shib', label: 'Shiba Inu', symbol: 'SHIB', price: '$0.000024', change: '-2.15%', isPositive: false },
  { name: 'Pepe', label: 'Pepe', symbol: 'PEPE', price: '$0.000008', change: '+12.5%', isPositive: true },
  { name: 'Dogi', label: 'Dogecoin', symbol: 'DOGE', price: '$0.15', change: '+1.24%', isPositive: true },
  { name: 'Imx', label: 'ImmutableX', symbol: 'IMX', price: '$2.12', change: '+3.15%', isPositive: true },
  { name: 'Grr', label: 'The Graph', symbol: 'GRT', price: '$0.28', change: '-1.42%', isPositive: false },
  { name: 'Fil', label: 'Filecoin', symbol: 'FIL', price: '$5.82', change: '+0.15%', isPositive: true },
  { name: 'Ldo', label: 'Lido DAO', symbol: 'LDO', price: '$2.15', change: '-4.12%', isPositive: false },
  { name: 'Rndr', label: 'Render', symbol: 'RNDR', price: '$10.12', change: '+6.15%', isPositive: true },
  { name: 'Icp', label: 'ICP', symbol: 'ICP', price: '$12.45', change: '-2.15%', isPositive: false },
  { name: 'Aave', label: 'Aave', symbol: 'AAVE', price: '$88.12', change: '+1.15%', isPositive: true },
  { name: 'Xlm', label: 'Stellar', symbol: 'XLM', price: '$0.11', change: '0.00%', isPositive: true },
];

import { Chip } from '@/components/atoms';
import { AssetRow, AssetCard, AssetExplorerSkeleton } from '@/components/molecules';
import { ScrollView } from 'react-native-gesture-handler';

export default function AssetPage() {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();
  const bgColor = tokens.color[theme].background;
  
  const [activeFilter, setActiveFilter] = React.useState('All');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Favorites dummy data (BTC, ETH, SOL)
  const favorites = MOCK_ASSETS.filter(a => ['BTC', 'ETH', 'SOL'].includes(a.symbol));
  
  // Shared value untuk melacak tinggi keyboard
  const keyboardHeight = useSharedValue(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        keyboardHeight.value = withTiming(e.endCoordinates.height, {
          duration: 300,
          easing: Easing.out(Easing.exp),
        });
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        keyboardHeight.value = withTiming(0, {
          duration: 250,
          easing: Easing.out(Easing.exp),
        });
      }
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const animatedNavbarStyle = useAnimatedStyle(() => {
    const offset = keyboardHeight.value > 0 ? 32 : 0;
    const dynamicPadding = keyboardHeight.value > 0 
      ? (Platform.OS === 'ios' ? 10 : 12) 
      : (Platform.OS === 'ios' ? insets.bottom + 20 : 48);

    return {
      transform: [{ 
        translateY: withSpring(-keyboardHeight.value - offset, {
          damping: 20,
          stiffness: 120,
          mass: 0.5,
        }) 
      }],
      paddingBottom: withTiming(dynamicPadding, { duration: 200 }),
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScreenLayout>
        {/* Header dengan tombol back */}
        <SubHeader title="All Assets" />
        
        {loading ? (
          <View style={{ paddingTop: 18 }}>
            <AssetExplorerSkeleton />
          </View>
        ) : (
          <>
            <View style={{ paddingTop: 18, paddingBottom: 16 }}>
              {/* Favorite Section - Horizontal Cards */}
              <Text size="xs" weight="bold" color="secondary" style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                Favorites
              </Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={{ 
                  marginHorizontal: -parseInt(tokens.spacing[4]),
                  overflow: 'visible'
                }}
                contentContainerStyle={{ 
                  gap: 12,
                  paddingHorizontal: parseInt(tokens.spacing[4]),
                  paddingBottom: 12,
                }}
              >
                {favorites.map((asset) => (
                  <AssetCard 
                    key={asset.symbol + '_fav'}
                    {...asset}
                    onPress={() => router.push(`/asset-detail/${asset.symbol}`)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Filter Bar - Stick di Atas Daftar */}
            <View style={{ marginBottom: 12 }}>
              <Text size="xs" weight="bold" color="secondary" style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                Market Explorer
              </Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={{ 
                  marginHorizontal: -parseInt(tokens.spacing[4]),
                  overflow: 'visible'
                }}
                contentContainerStyle={{ 
                  gap: parseInt(tokens.spacing[2]),
                  paddingHorizontal: parseInt(tokens.spacing[4]),
                  paddingVertical: 4, 
                }}
              >
                {FILTERS.map((filter) => (
                  <Chip 
                    key={filter} 
                    label={filter} 
                    isActive={activeFilter === filter}
                    onPress={() => setActiveFilter(filter)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Daftar Asset - Scrollable */}
            <ScrollView 
              showsVerticalScrollIndicator={false}
              style={{
                marginHorizontal: -parseInt(tokens.spacing[4]),
              }}
              contentContainerStyle={{ 
                paddingHorizontal: parseInt(tokens.spacing[4]),
                paddingBottom: tokens.layout.bottomGap, 
              }}
            >
              <View style={{ gap: 0 }}>
                {MOCK_ASSETS.map((asset) => (
                  <AssetRow 
                    key={asset.symbol}
                    {...asset}
                    onPress={() => router.push(`/asset-detail/${asset.symbol}`)}
                  />
                ))}
              </View>
            </ScrollView>
          </>
        )}
      </ScreenLayout>

      {/* GRADIENT MASK */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0, 
          right: 0,
          height: 180,
        }}
      >
        <LinearGradient
          colors={[bgColor + '00', bgColor + 'CC', bgColor]} 
          locations={[0, 0.5, 1]}
          style={{ flex: 1 }}
          pointerEvents="none"
        />
      </View>

      {/* Navbar: Floating Kapsul Search & Logo */}
      <Animated.View
        pointerEvents="box-none"
        style={[
          {
            position: 'absolute',
            bottom: 0,
            left: 0, 
            right: 0,
            paddingHorizontal: parseInt(tokens.spacing[4]),
            overflow: 'visible',
          },
          animatedNavbarStyle
        ]}
      >
        <View pointerEvents="box-none" style={{ paddingTop: 40 }}>
          <HomeHeader />
        </View>
      </Animated.View>
    </View>
  );
}

