import React from 'react';
import { View, ScrollView, TouchableOpacity, Share } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Text, Icon, Button, CryptoIcon } from '@/components/atoms';
import { SubHeader } from '@/components/organisms';
import { ScreenLayout } from '@/components/templates';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Mock data to match History page
const txData = [
  { id: '1', type: 'Buy Credit', asset: 'SOL', amount: '+0.66', amountUsd: '$100.00', status: 'Completed', date: 'Today, 14:30', network: 'MoonPay', icon: 'ShoppingCart', hash: '5fR8...z9kL', fee: '$2.50' },
  { id: '2', type: 'Withdraw', asset: 'USDT', amount: '-50.00', amountUsd: '$50.00', status: 'Processing', date: 'Yesterday, 09:15', network: 'Solana', icon: 'ArrowUpRight', hash: '2pL9...x1vM', fee: '$0.80' },
  { id: '3', type: 'Deposit', asset: 'USDC', amount: '+120.00', amountUsd: '$120.00', status: 'Completed', date: 'Apr 10, 18:45', network: 'Solana', icon: 'ArrowDownLeft', hash: '8mK2...p5qN', fee: '$0.00' },
  { id: '4', type: 'Buy Credit', asset: 'ETH', amount: '+0.05', amountUsd: '$150.00', status: 'Failed', date: 'Apr 08, 11:20', network: 'Base', icon: 'ShoppingCart', hash: 'N/A', fee: '$0.00' }
];

export default function HistoryDetailPage() {
  const { id } = useLocalSearchParams();
  const theme = useColorScheme() ?? 'light';
  const tx = txData.find(t => t.id === id) || txData[0];

  const cardBgColor = theme === 'dark' ? '#1A1A1A' : '#F5F5F5';
  const borderColor = theme === 'dark' ? '#333' : '#E0E0E0';
  const iconBgColor = theme === 'dark' ? '#252525' : '#E8E8E8';
  const successColor = tokens.color[theme].success;
  const errorColor = tokens.color[theme].error;
  const warningColor = tokens.color[theme].warning;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Transaction Details: ${tx.type} ${tx.amount} ${tx.asset} - ${tx.status}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScreenLayout>
      <SubHeader 
        title="Transaction Detail" 
        rightActions={
          <TouchableOpacity onPress={handleShare}>
            <Icon name="ShareNetwork" size={24} color={tokens.color[theme].textPrimary} />
          </TouchableOpacity>
        }
      />

      <ScrollView 
        contentContainerStyle={{ 
          paddingVertical: 24,
          paddingBottom: tokens.layout.bottomGap + 20, 
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Header */}
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 12, // Match neutral style
            backgroundColor: iconBgColor,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
            borderWidth: 1,
            borderColor: borderColor
          }}>
            <Icon 
              name={tx.status === 'Completed' ? "CheckCircle" : (tx.status === 'Failed' ? "XCircle" : "Clock")} 
              size={40} 
              color={tx.status === 'Completed' ? 'success' : (tx.status === 'Failed' ? 'error' : 'warning')}
              weight="fill" 
            />
          </View>
          <Text size="2xl" weight="bold" style={{ marginBottom: 4 }}>{tx.amount} {tx.asset}</Text>
          <Text color="secondary" weight="medium">{tx.amountUsd}</Text>
        </View>

        {/* Details Card */}
        <View style={{
          backgroundColor: cardBgColor,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: borderColor,
          padding: 20,
          gap: 20
        }}>
          <DetailRow label="Type" value={tx.type} />
          <DetailRow label="Status" value={tx.status} valueColor={tokens.color[theme].textPrimary} />
          <DetailRow label="Date" value={tx.date} />
          <DetailRow label="Network" value={tx.network} />
          <DetailRow label="Fee" value={tx.fee} />
          
          <View style={{ height: 1, backgroundColor: borderColor, marginVertical: 4 }} />
          
          <DetailRow 
            label="Transaction Hash" 
            value={tx.hash} 
            isSecondary 
            rightIcon={<Icon name="Copy" size={14} color="secondary" />} 
          />
        </View>

        {/* Explorer Button */}
        <View style={{ marginTop: 32 }}>
          <Button 
            variant="brand" 
            size="lg" 
            onClick={() => {}}
            style={{ width: '100%' }}
          >
            View on Explorer
          </Button>
          
          <TouchableOpacity 
            style={{ marginTop: 20, alignItems: 'center' }}
            onPress={() => router.back()}
          >
            <Text color="secondary" weight="semibold">Close</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

function DetailRow({ 
  label, 
  value, 
  valueColor, 
  isSecondary = false, 
  rightIcon 
}: { 
  label: string, 
  value: string, 
  valueColor?: string, 
  isSecondary?: boolean,
  rightIcon?: React.ReactNode
}) {
  const theme = useColorScheme() ?? 'light';
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text color="secondary" size="sm" weight="medium">{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Text 
          size="sm" 
          weight="bold" 
          style={{ 
            color: valueColor || (isSecondary ? tokens.color[theme].textSecondary : tokens.color[theme].textPrimary) 
          }}
        >
          {value}
        </Text>
        {rightIcon}
      </View>
    </View>
  );
}
