import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Button, Icon, CryptoIcon } from '@/components/atoms';
import { SubHeader, NumPad } from '@/components/organisms';
import { ScreenLayout } from '@/components/templates';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DepositPage() {
  const theme = useColorScheme() ?? 'light';
  const [method, setMethod] = useState<'wallet' | 'address'>('wallet');
  const [value, setValue] = useState('0');

  const surfaceColor = theme === 'dark' ? tokens.color.dark.secondarySurface : '#E5E5E5'; 
  const activeBg = theme === 'dark' ? tokens.color.dark.tertiarySurface : tokens.color.light.background;

  const handleNumPress = (key: string) => {
    if (value === '0' && key !== '.') {
      setValue(key);
    } else {
      if (key === '.' && value.includes('.')) return;
      setValue(prev => prev + key);
    }
  };

  const handleDelete = () => {
    setValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  };

  return (
    <ScreenLayout>
      <SubHeader title="Deposit Credit" />
      
      {/* Option Selector */}
      <View style={{ 
        flexDirection: 'row', 
        backgroundColor: surfaceColor, 
        borderRadius: parseInt(tokens.radius.full), 
        padding: 4, 
        marginTop: parseInt(tokens.spacing[6]) 
      }}>
        <TouchableOpacity 
          onPress={() => setMethod('wallet')} 
          style={{ 
            flex: 1, 
            paddingVertical: 12, 
            alignItems: 'center', 
            backgroundColor: method === 'wallet' ? activeBg : 'transparent', 
            borderRadius: parseInt(tokens.radius.full) 
          }}
        >
          <Text 
            weight={method === 'wallet' ? 'bold' : 'medium'} 
            style={{ color: method === 'wallet' ? tokens.color[theme].textPrimary : tokens.color[theme].textSecondary }}
          >
            Connected Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setMethod('address')} 
          style={{ 
            flex: 1, 
            paddingVertical: 12, 
            alignItems: 'center', 
            backgroundColor: method === 'address' ? activeBg : 'transparent', 
            borderRadius: parseInt(tokens.radius.full) 
          }}
        >
          <Text 
            weight={method === 'address' ? 'bold' : 'medium'} 
            style={{ color: method === 'address' ? tokens.color[theme].textPrimary : tokens.color[theme].textSecondary }}
          >
            From Address
          </Text>
        </TouchableOpacity>
      </View>

      {method === 'wallet' ? (
        <>
          {/* Input Display Area */}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: tokens.color[theme].textSecondary, marginBottom: parseInt(tokens.spacing[2]) }}>
              Amount to deposit
            </Text>
            <Text weight="bold" style={{ fontSize: 56, color: tokens.color[theme].textPrimary }}>
              ${value}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: parseInt(tokens.spacing[2]), marginTop: parseInt(tokens.spacing[2]) }}>
              <Text style={{ color: tokens.color[theme].textSecondary }}>
                Available in Wallet: $5,000.00
              </Text>
              <TouchableOpacity 
                onPress={() => setValue('5000')}
                style={{ 
                  backgroundColor: tokens.color.brand + '20',
                  paddingHorizontal: parseInt(tokens.spacing[2]), 
                  paddingVertical: 4, 
                  borderRadius: parseInt(tokens.radius.sm) 
                }}
              >
                <Text size="xs" weight="bold" style={{ color: tokens.color.brand }}>MAX</Text>
              </TouchableOpacity>
            </View>
          </View>

          <NumPad onPress={handleNumPress} onDelete={handleDelete} />
          
          <Button variant="brand" size="lg" style={{ marginTop: parseInt(tokens.spacing[4]), marginBottom: parseInt(tokens.spacing[2]) }}>
            Deposit
          </Button>
        </>
      ) : (
        <View style={{ flex: 1, marginTop: parseInt(tokens.spacing[6]) }}>
          {/* Network Selection Dropdown */}
          <Text style={{ color: tokens.color[theme].textSecondary, marginBottom: parseInt(tokens.spacing[2]), marginLeft: parseInt(tokens.spacing[2]) }}>
            Select Network
          </Text>
          <TouchableOpacity style={{ 
            backgroundColor: surfaceColor, 
            borderRadius: parseInt(tokens.radius.lg), 
            paddingHorizontal: parseInt(tokens.spacing[4]), 
            paddingVertical: parseInt(tokens.spacing[4]),
            borderWidth: theme === 'dark' ? 1 : 0,
            borderColor: '#333',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: parseInt(tokens.spacing[6])
          }}>
            <CryptoIcon name="SOL" variant="color" size={24} />
            <View style={{ flex: 1, marginLeft: parseInt(tokens.spacing[3]) }}>
              <Text weight="bold" style={{ color: tokens.color[theme].textPrimary, fontSize: parseInt(tokens.font.size.base) }}>Solana</Text>
            </View>
            <Icon name="CaretDown" size={20} color="secondary" />
          </TouchableOpacity>

          <Text style={{ color: tokens.color[theme].textSecondary, marginBottom: parseInt(tokens.spacing[2]), marginLeft: parseInt(tokens.spacing[2]) }}>
            Your Deposit Address
          </Text>
          <View style={{ 
            backgroundColor: surfaceColor, 
            borderRadius: parseInt(tokens.radius.lg), 
            paddingLeft: parseInt(tokens.spacing[4]), 
            paddingRight: parseInt(tokens.spacing[2]),
            paddingVertical: parseInt(tokens.spacing[2]),
            borderWidth: theme === 'dark' ? 1 : 0,
            borderColor: '#333',
            minHeight: 64,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text weight="bold" style={{ fontSize: parseInt(tokens.font.size.base), color: tokens.color[theme].textPrimary, flex: 1 }}>
              0x8a92e105b4A159192...b94D
            </Text>
            <TouchableOpacity onPress={() => {}} style={{ padding: 8, borderRadius: parseInt(tokens.radius.full), backgroundColor: tokens.color.brand + '15' }}>
              <Icon name="Copy" size={24} color="brand" weight="fill" />
            </TouchableOpacity>
          </View>
          <Text size="sm" style={{ color: tokens.color[theme].textSecondary, marginTop: parseInt(tokens.spacing[6]), textAlign: 'center', lineHeight: 22 }}>
            Only send funds via supported networks.{"\n"}Sending other assets to this address may result in permanent loss.
          </Text>
        </View>
      )}
    </ScreenLayout>
  );
}
