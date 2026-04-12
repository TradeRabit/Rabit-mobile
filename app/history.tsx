import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Icon, CryptoIcon } from '@/components/atoms';
import { router } from 'expo-router';
import { SubHeader } from '@/components/organisms';
import { HistorySkeleton } from '@/components/molecules';
import { ScreenLayout } from '@/components/templates';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const txData = [
  { id: '1', type: 'Buy Credit', asset: 'SOL', amount: '+0.66', amountUsd: '$100.00', status: 'Completed', date: 'Today, 14:30', network: 'MoonPay', icon: 'ShoppingCart' },
  { id: '2', type: 'Withdraw', asset: 'USDT', amount: '-50.00', amountUsd: '$50.00', status: 'Processing', date: 'Yesterday, 09:15', network: 'Solana', icon: 'ArrowUpRight' },
  { id: '3', type: 'Deposit', asset: 'USDC', amount: '+120.00', amountUsd: '$120.00', status: 'Completed', date: 'Apr 10, 18:45', network: 'Solana', icon: 'ArrowDownLeft' },
  { id: '4', type: 'Buy Credit', asset: 'ETH', amount: '+0.05', amountUsd: '$150.00', status: 'Failed', date: 'Apr 08, 11:20', network: 'Base', icon: 'ShoppingCart' }
];

export default function HistoryPage() {
  const theme = useColorScheme() ?? 'light';
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const cardBgColor = theme === 'dark' ? '#1A1A1A' : '#F5F5F5';
  const borderColor = theme === 'dark' ? '#333' : '#E0E0E0';
  const iconBgColor = theme === 'dark' ? '#252525' : '#E8E8E8';
  
  // Simplistic dropdown mockup
  const FilterDropdown = () => (
    <TouchableOpacity 
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: cardBgColor,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        gap: 8,
        borderWidth: 1,
        borderColor: borderColor
      }}
    >
      <Text size="sm" weight="bold">{filter}</Text>
      <Icon name="Faders" size={16} color="secondary" weight="bold" />
    </TouchableOpacity>
  );

  return (
    <ScreenLayout>
      <SubHeader 
        title="History" 
        rightActions={<FilterDropdown />}
      />

      <ScrollView 
        contentContainerStyle={{ 
          paddingVertical: parseInt(tokens.spacing[4]),
          paddingBottom: tokens.layout.bottomGap, 
        }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <HistorySkeleton />
        ) : (
          txData.map((tx) => (
            <TouchableOpacity 
              key={tx.id}
              activeOpacity={0.7}
              onPress={() => router.push(`/history-detail/${tx.id}`)}
              style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: cardBgColor,
              padding: 16,
              borderRadius: 12,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: borderColor
            }}
          >
            {/* Left Icon Area */}
            <View style={{
              width: 44,
              height: 44,
              borderRadius: 12, // Match card radius but smaller or keep round
              backgroundColor: iconBgColor,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12
            }}>
              <Icon 
                name={tx.icon as any} 
                size={20} 
                color="secondary" 
                weight="fill" 
              />
            </View>

            {/* Middle Info */}
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                <Text weight="bold" style={{ color: tokens.color[theme].textPrimary }}>{tx.type}</Text>
                {tx.status === 'Completed' ? (
                  <Icon name="CheckCircle" size={14} color="success" weight="fill" />
                ) : tx.status === 'Processing' ? (
                  <Icon name="Clock" size={14} color="warning" weight="fill" />
                ) : (
                  <Icon name="XCircle" size={14} color="error" weight="fill" />
                )}
              </View>
              <Text size="sm" style={{ color: tokens.color[theme].textSecondary }}>
                {tx.date} • {tx.network}
              </Text>
            </View>

            {/* Right Amounts */}
            <View style={{ alignItems: 'flex-end' }}>
              <Text 
                weight="bold" 
                style={{ color: tokens.color[theme].textPrimary }}
              >
                {tx.amount} {tx.asset}
              </Text>
              <Text size="sm" style={{ color: tokens.color[theme].textSecondary, marginTop: 2 }}>
                {tx.status === 'Failed' ? 'Failed' : tx.amountUsd}
              </Text>
            </View>
          </TouchableOpacity>
        )))}
      </ScrollView>
    </ScreenLayout>
  );
}
