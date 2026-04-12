import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { SearchBar } from '@/components/molecules';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSequence, 
  withTiming, 
  withSpring,
  withRepeat,
  withDelay,
  interpolate
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { Icon, Text } from '@/components/atoms';
import { AssetRow } from '@/components/molecules';

const TRENDING_ASSETS = [
  { name: 'Btc', label: 'Bitcoin', symbol: 'BTC', price: '$65,230', change: '+2.1%', isPositive: true },
  { name: 'Eth', label: 'Ethereum', symbol: 'ETH', price: '$3,718', change: '+4.6%', isPositive: true },
  { name: 'Sol', label: 'Solana', symbol: 'SOL', price: '$145', change: '-1.4%', isPositive: false },
  { name: 'Usdt', label: 'Tether', symbol: 'USDT', price: '$1.00', change: '0.0%', isPositive: true },
  { name: 'Arb', label: 'Arbitrum', symbol: 'ARB', price: '$1.12', change: '+5.2%', isPositive: true },
  { name: 'Link', label: 'Chainlink', symbol: 'LINK', price: '$18.4', change: '-2.3%', isPositive: false },
];

const SEARCH_HISTORY = ['BTC', 'Solana', 'Ethereum', 'USDT'];

export const HomeHeader = () => {
  const theme = useColorScheme() ?? 'light';
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Shared value untuk animasi goyang (wiggle) logo kelinci
  const logoRotation = useSharedValue(0);
  const expansionProgress = useSharedValue(0);

  useEffect(() => {
    // Jalankan animasi loop setiap 5 detik
    logoRotation.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 150 }), // Goyang kiri
        withTiming(15, { duration: 200 }),  // Goyang kanan
        withTiming(-10, { duration: 150 }), // Goyang kiri dikit
        withSpring(0, { damping: 8, stiffness: 200 }), // Kembali ke tengah
        withDelay(5000, withTiming(0, { duration: 0 })) // Istirahat 5 detik
      ),
      -1, // Loop selamanya (infinite)
      false // Tidak perlu reverse (yoyo)
    );
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0 && !isExpanded) {
      toggleExpansion(true);
    }
  }, [searchQuery]);

  const handleAssistPress = () => {
    // Navigasi ke Global Assist
    router.push('/assist');
    
    // Animasi wiggle tambahan saat di-tap
    logoRotation.value = withSequence(
      withTiming(-20, { duration: 100 }),
      withTiming(20, { duration: 150 }),
      withSpring(0, { damping: 6, stiffness: 200 })
    );
  };

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${logoRotation.value}deg` }],
    };
  });

  const toggleExpansion = (expanded: boolean) => {
    setIsExpanded(expanded);
    expansionProgress.value = withSpring(expanded ? 1 : 0, {
      damping: 20,
      stiffness: 120,
      mass: 0.5,
    });
    if (!expanded) {
      Keyboard.dismiss();
    }
  };

  const animatedExpansionStyle = useAnimatedStyle(() => {
    return {
      opacity: expansionProgress.value,
      transform: [
        { translateY: interpolate(expansionProgress.value, [0, 1], [40, 0]) },
      ],
      // Menghindari interaksi saat tidak terlihat
      pointerEvents: expansionProgress.value > 0.2 ? 'auto' : 'none'
    };
  });

  const filteredSearch = searchQuery 
    ? TRENDING_ASSETS.filter(a => 
        a.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
        a.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : TRENDING_ASSETS;

  return (
    <View pointerEvents="box-none" style={{ flexDirection: 'column-reverse', overflow: 'visible' }}>
      {/* Main Bar (Search + Logo) - FIRST CHILD = BOTTOM */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: parseInt(tokens.spacing[3]), 
        paddingVertical: parseInt(tokens.spacing[2]),
      }}>
        {/* Molecule 1: Search Bar */}
        <View style={{ flex: 1 }}>
          <SearchBar 
            placeholder="Search asset..." 
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => toggleExpansion(true)}
          />
        </View>

        {/* Pill 2: Logo Rabit untuk Global Assist */}
        <TouchableOpacity 
          onPress={handleAssistPress}
          activeOpacity={0.8}
          style={{
            width: 44,
            height: 44, 
            borderRadius: 22, 
            backgroundColor: tokens.color.brand,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: tokens.color.brand,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <Animated.View style={animatedLogoStyle}>
            <Image 
              source={tokens.assets.logo.iconWhite} 
              style={{ width: 18, height: 18 }} 
              resizeMode="contain" 
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Search Panel (Muncul saat difokuskan) - SECOND CHILD = TOP */}
      <Animated.View style={[
        {
          backgroundColor: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
          borderRadius: parseInt(tokens.radius.xl),
          padding: parseInt(tokens.spacing[4]),
          paddingBottom: parseInt(tokens.spacing[6]),
          marginBottom: 12, // Gap antara panel dan search bar
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 10,
        },
        animatedExpansionStyle
      ]}>
          {/* Header Panel */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0 }}>
            <Text weight="bold" size="lg">
              {searchQuery ? 'Search Results' : 'Trending Assets'}
            </Text>
            <TouchableOpacity onPress={() => toggleExpansion(false)} style={{ padding: 4 }}>
              <Icon name="X" size={20} color="secondary" weight="bold" />
            </TouchableOpacity>
          </View>

          {/* Asset List (Limited height for responsivity) */}
          <View style={{ maxHeight: 190 }}>
            <ScrollView 
              showsVerticalScrollIndicator={false} 
              bounces={false}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
            >
              <View style={{ gap: 2 }}>
                {(searchQuery ? filteredSearch : TRENDING_ASSETS.slice(0, 6)).map((asset) => (
                  <AssetRow 
                    key={asset.symbol}
                    {...asset}
                    variant="compact"
                  />
                ))}
                {searchQuery && filteredSearch.length === 0 && (
                  <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                    <Text color="secondary">No asset found for "{searchQuery}"</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>

          {/* Search History (Hanya muncul jika belum mengetik) */}
          {!searchQuery && (
            <View style={{ marginTop: 10 }}>
              <Text color="secondary" size="xs" weight="bold" style={{ marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
                Recent History
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {SEARCH_HISTORY.map((item) => (
                  <TouchableOpacity 
                    key={item}
                    onPress={() => setSearchQuery(item)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      backgroundColor: theme === 'dark' ? '#333' : '#F0F0F0',
                      borderRadius: 12,
                    }}
                  >
                    <Text size="xs" weight="medium">{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
      </Animated.View>
    </View>
  );
};
