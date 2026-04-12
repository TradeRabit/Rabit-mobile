import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Text, Icon, Button, CryptoIcon } from '@/components/atoms';
import { SubHeader } from '@/components/organisms';
import { AssetDetailSkeleton } from '@/components/molecules';
import { ScreenLayout } from '@/components/templates';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// Enable LayoutAnimation for Android
// (No-op check removed to avoid New Architecture warnings)

export default function AssetDetailPage() {
  const { id } = useLocalSearchParams();
  const theme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();
  const bgColor = tokens.color[theme].background;
  const textColor = tokens.color[theme].textPrimary;
  
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showHeaderBrand, setShowHeaderBrand] = useState(false);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const dummyAbout = `Bitcoin is the first decentralized cryptocurrency. Nodes in the peer-to-peer bitcoin network verify transactions through cryptography and record them in a public distributed ledger, called a blockchain, without central oversight. Consensus between nodes is achieved using a computationally intensive process based on proof of work, called mining, that requires increasing quantities of electricity and guarantees the security of the bitcoin blockchain. The system was invented by a group of unknown programmers under the pseudonym Satoshi Nakamoto. They published a whitepaper in 2008 and released the software as open-source code in 2009. The maximum supply of Bitcoin is capped at strictly 21 million coins, which makes it highly sought after as a store of value similar to digital gold. By reducing its block reward by half every four years, known as 'The Halving', it builds inherent scarcity over time.`;

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > 80 && !showHeaderBrand) {
      setShowHeaderBrand(true);
    } else if (y <= 80 && showHeaderBrand) {
      setShowHeaderBrand(false);
    }
  };

  const toggleShowMore = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowFullAbout(!showFullAbout);
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <ScreenLayout>
        <SubHeader 
          title={showHeaderBrand ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <CryptoIcon name={id as string} size={24} variant="color" />
              <Text weight="bold" size="lg">{id}</Text>
            </View>
          ) : ""}
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
        
        <ScrollView 
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{ 
            flex: 1,
            marginHorizontal: -parseInt(tokens.spacing[4]),
          }}
          contentContainerStyle={{ 
            paddingHorizontal: parseInt(tokens.spacing[4]),
            paddingTop: 18,
            paddingBottom: tokens.layout.bottomGap + 20 
          }}

          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <AssetDetailSkeleton />
          ) : (
            <>
              {/* Asset Info Header */}
              <View style={{ marginBottom: parseInt(tokens.spacing[6]) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <CryptoIcon name={id as string} size={48} variant="color" />
              <View>
                <Text size="xl" weight="bold">{id === 'BTC' ? 'Bitcoin' : id === 'ETH' ? 'Ethereum' : id}</Text>
                <Text color="secondary" size="sm">{id}</Text>
              </View>
            </View>

            <View>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 }}>
                <Text weight="bold" style={{ fontSize: 40, letterSpacing: -1 }}>$65,230</Text>
                <Text weight="bold" color="secondary" style={{ fontSize: 22, letterSpacing: -1 }}>.12</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Icon name="CaretUp" size={16} color="success" weight="fill" />
                <Text color="success" weight="bold" size="lg">+2.45%</Text>
              </View>
            </View>
          </View>

          {/* Chart Section */}
          <View style={{ marginBottom: 32 }}>
            <View style={{ 
              height: 220, 
              backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme === 'dark' ? '#333' : '#E0E0E0',
              marginBottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text color="secondary">Chart Area Placeholder</Text>
            </View>

            {/* Chart Controls Row */}
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              {/* Timeframes Segmented Control */}
              <View style={{ 
                flex: 1,
                flexDirection: 'row', 
                backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5', 
                borderRadius: 12, // Match Stats radius
                padding: 4, 
                borderWidth: 1,
                borderColor: theme === 'dark' ? '#333' : '#E0E0E0', // Match Stats border
                alignItems: 'center'
              }}>
                {['15m', '1H', '1D'].map((tf) => (
                  <TouchableOpacity 
                    key={tf}
                    activeOpacity={0.7}
                    style={{ 
                      flex: 1,
                      paddingVertical: 8, 
                      alignItems: 'center',
                      backgroundColor: tf === '15m' ? (theme === 'dark' ? '#333' : '#FFFFFF') : 'transparent',
                      borderRadius: 8,
                      borderWidth: tf === '15m' ? 1 : 0,
                      borderColor: tf === '15m' ? 'rgba(0,0,0,0.05)' : 'transparent',
                      shadowColor: tf === '15m' ? '#000' : 'transparent',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      elevation: tf === '15m' ? 2 : 0,
                    }}
                  >
                    <Text weight="bold" style={{ fontSize: 11 }} color={tf === '15m' ? 'brand' : 'secondary'}>{tf}</Text>
                  </TouchableOpacity>
                ))}
                
                <TouchableOpacity 
                  activeOpacity={0.7}
                  style={{ 
                    flex: 1,
                    paddingVertical: 8, 
                    alignItems: 'center',
                  }}
                >
                  <Icon name="CaretDown" size={12} color="secondary" weight="bold" />
                </TouchableOpacity>
              </View>

              {/* Price/Volume Segmented Control */}
              <View style={{ 
                flexDirection: 'row', 
                backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5', 
                borderRadius: 12, // Match Stats radius
                padding: 4, 
                borderWidth: 1,
                borderColor: theme === 'dark' ? '#333' : '#E0E0E0', // Match Stats border
                alignItems: 'center'
              }}>
                {['Price', 'Volume'].map((type) => (
                  <TouchableOpacity 
                    key={type}
                    activeOpacity={0.7}
                    style={{ 
                      paddingHorizontal: 16,
                      paddingVertical: 8, 
                      alignItems: 'center',
                      backgroundColor: type === 'Price' ? (theme === 'dark' ? '#333' : '#FFFFFF') : 'transparent',
                      borderRadius: 8,
                      borderWidth: type === 'Price' ? 1 : 0,
                      borderColor: type === 'Price' ? 'rgba(0,0,0,0.05)' : 'transparent',
                      shadowColor: type === 'Price' ? '#000' : 'transparent',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      elevation: type === 'Price' ? 2 : 0,
                    }}
                  >
                    <Text weight="bold" style={{ fontSize: 11 }} color={type === 'Price' ? 'brand' : 'secondary'}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>




          {/* Stats Section */}
          <View style={{ marginBottom: 24 }}>
            <Text size="xl" weight="bold" style={{ marginBottom: 16 }}>Stats</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={{ 
                marginHorizontal: -parseInt(tokens.spacing[4]),
                overflow: 'visible'
              }}
              contentContainerStyle={{ 
                paddingHorizontal: parseInt(tokens.spacing[4]),
                gap: 12,
                paddingBottom: 16
              }}
            >
              {[
                { label: 'TVL', value: '$145.5M', icon: 'LockKey', color: '#2563EB' },
                { label: 'Market cap', value: '$184.4B', icon: 'ChartBar', color: '#059669' },
                { label: 'FDV', value: '$189.9B', icon: 'Stack', color: '#7C3AED' },
                { label: '1 day volume', value: '$232.4M', icon: 'Waveform', color: '#EA580C' },
                { label: 'High', value: '$1.002', icon: 'TrendUp', color: '#10B981' },
                { label: 'Low', value: '$0.998', icon: 'TrendDown', color: '#EF4444' }
              ].map((stat, idx) => (
                <View key={idx} style={{
                  minWidth: 120,
                  backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5',
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme === 'dark' ? '#333' : '#E0E0E0',
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <Icon name={stat.icon as any} size={14} color="secondary" />
                    <Text color="secondary" style={{ fontSize: 11 }} weight="medium">{stat.label}</Text>
                  </View>
                  <Text weight="bold" size="base" numberOfLines={1}>{stat.value}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          {/* About Section */}
          <View style={{ marginBottom: 10 }}>
            <Text size="xl" weight="bold" style={{ marginBottom: 12 }}>About</Text>
            <View style={{ overflow: 'hidden' }}>
              <Text 
                key={showFullAbout ? 'full' : 'collapsed'}
                color="secondary" 
                style={{ 
                  lineHeight: 22,
                  maxHeight: showFullAbout ? 2000 : 66 
                }}
                numberOfLines={showFullAbout ? 0 : 3}
                ellipsizeMode="tail"
              >
                {dummyAbout}
              </Text>
              <TouchableOpacity 
                onPress={toggleShowMore} 
                style={{ marginTop: 8 }}
                activeOpacity={0.7}
              >
                <Text color="brand" weight="semibold">
                  {showFullAbout ? 'Show less' : 'Show more'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Links Section */}
          <View style={{ marginBottom: 24 }}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={{ 
                marginHorizontal: -parseInt(tokens.spacing[4]),
                overflow: 'visible'
              }}
              contentContainerStyle={{ 
                paddingHorizontal: parseInt(tokens.spacing[4]),
                gap: 8, 
                paddingBottom: 16 
              }}
            >
            {/* Contract */}
            <TouchableOpacity style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F0F0F0',
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme === 'dark' ? '#333' : '#E0E0E0',
              gap: 6
            }}>
              <Icon name="Copy" size={16} color="primary" />
              <Text weight="medium" size="xs">0xdAC1...1ec7</Text>
            </TouchableOpacity>

            {/* Etherscan */}
            <TouchableOpacity style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F0F0F0',
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme === 'dark' ? '#333' : '#E0E0E0',
              gap: 6
            }}>
              <Icon name="ChartLine" size={16} color="primary" />
              <Text weight="medium" size="xs">Etherscan</Text>
            </TouchableOpacity>

            {/* Website */}
            <TouchableOpacity style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F0F0F0',
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme === 'dark' ? '#333' : '#E0E0E0',
              gap: 6
            }}>
              <Icon name="Globe" size={16} color="primary" />
              <Text weight="medium" size="xs">Website</Text>
            </TouchableOpacity>

            {/* Twitter */}
            <TouchableOpacity style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F0F0F0',
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme === 'dark' ? '#333' : '#E0E0E0',
              gap: 6
            }}>
              <Icon name="X" size={16} color="primary" />
              <Text weight="medium" size="xs">Twitter</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
          </>
        )}
      </ScrollView>
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

      {/* Floating Trade Now Button */}
      <View style={{
        position: 'absolute',
        bottom: insets.bottom + 20,
        left: 0,
        right: 0,
        paddingHorizontal: parseInt(tokens.spacing[4]),
      }}>
        <Button 
          variant="brand" 
          size="lg" 
          onClick={() => router.push('/assist')}
          style={{
            shadowColor: tokens.color.brand,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 15,
            elevation: 8,
          }}
        >
          Trade Now
        </Button>
      </View>
    </View>
  );
}


