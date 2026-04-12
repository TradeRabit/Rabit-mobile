import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Button, Input, Icon } from '@/components/atoms';
import { SubHeader, NumPad } from '@/components/organisms';
import { ScreenLayout } from '@/components/templates';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function WithdrawPage() {
  const theme = useColorScheme() ?? 'light';
  const [method, setMethod] = useState<'wallet' | 'address'>('wallet');
  const [value, setValue] = useState('0');
  const [step, setStep] = useState<1 | 2>(1);

  const surfaceColor = theme === 'dark' ? tokens.color.dark.secondarySurface : '#E5E5E5'; // Placeholder grey for light surface
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
      <SubHeader 
        title="Withdraw Credit" 
        onBack={(method === 'address' && step === 2) ? () => setStep(1) : undefined}
      />
      
      {/* Option Selector */}
      <View style={{ 
        flexDirection: 'row', 
        backgroundColor: surfaceColor, 
        borderRadius: parseInt(tokens.radius.full), 
        padding: 4, 
        marginTop: parseInt(tokens.spacing[6]) 
      }}>
        <TouchableOpacity 
          onPress={() => { setMethod('wallet'); setStep(1); }} 
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
          onPress={() => { setMethod('address'); setStep(1); }} 
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
            To Address
          </Text>
        </TouchableOpacity>
      </View>

      {/* Address Input for 'To Address' STEP 1 */}
      {method === 'address' && step === 1 && (
        <View style={{ flex: 1, marginTop: parseInt(tokens.spacing[6]) }}>
          <Text style={{ color: tokens.color[theme].textSecondary, marginBottom: parseInt(tokens.spacing[2]), marginLeft: parseInt(tokens.spacing[2]) }}>
            Recipient Address
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
            <Input 
              placeholder="Paste exact address here..."
              style={{ fontSize: parseInt(tokens.font.size.lg), color: tokens.color[theme].textPrimary, flex: 1 }}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity onPress={() => {}} style={{ padding: 8, borderRadius: parseInt(tokens.radius.full), backgroundColor: tokens.color.brand + '15' }}>
              <Icon name="ClipboardText" size={24} color="brand" weight="fill" />
            </TouchableOpacity>
          </View>

          {/* Recent Addresses History Area */}
          <View style={{ marginTop: parseInt(tokens.spacing[6]), flex: 1 }}>
            <Text style={{ color: tokens.color[theme].textSecondary, marginBottom: parseInt(tokens.spacing[4]) }} weight="semibold">
              Recent Addresses
            </Text>
            
            <View style={{ gap: parseInt(tokens.spacing[4]) }}>
              {/* Dummy Item 1 */}
              <TouchableOpacity onPress={() => {}} style={{ flexDirection: 'row', alignItems: 'center', gap: parseInt(tokens.spacing[3]) }}>
                <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: surfaceColor, justifyContent: 'center', alignItems: 'center' }}>
                  <Icon name="Wallet" size={18} color="secondary" weight="fill" />
                </View>
                <Text weight="medium" style={{ flex: 1, color: tokens.color[theme].textPrimary, fontSize: parseInt(tokens.font.size.base) }}>
                  0x8a92e105b4A1...92b94D
                </Text>
              </TouchableOpacity>
              
              {/* Dummy Item 2 */}
              <TouchableOpacity onPress={() => {}} style={{ flexDirection: 'row', alignItems: 'center', gap: parseInt(tokens.spacing[3]) }}>
                <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: surfaceColor, justifyContent: 'center', alignItems: 'center' }}>
                  <Icon name="Wallet" size={18} color="secondary" weight="fill" />
                </View>
                <Text weight="medium" style={{ flex: 1, color: tokens.color[theme].textPrimary, fontSize: parseInt(tokens.font.size.base) }}>
                  0x2F4d8EaBc3D2...E1482C1
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Input Display Area STEP 2 OR CONNECTED WALLET */}
      {(method === 'wallet' || step === 2) && (
        <>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: tokens.color[theme].textSecondary, marginBottom: parseInt(tokens.spacing[2]) }}>
              Amount to withdraw
            </Text>
            <Text weight="bold" style={{ fontSize: 56, color: tokens.color[theme].textPrimary }}>
              ${value}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: parseInt(tokens.spacing[2]), marginTop: parseInt(tokens.spacing[2]) }}>
              <Text style={{ color: tokens.color[theme].textSecondary }}>
                Available: $12,450.00
              </Text>
              <TouchableOpacity 
                onPress={() => setValue('12450')}
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
        </>
      )}
      
      {method === 'address' && step === 1 ? (
        <Button onClick={() => setStep(2)} variant="brand" size="lg" style={{ marginTop: parseInt(tokens.spacing[4]), marginBottom: parseInt(tokens.spacing[2]) }}>
          Continue
        </Button>
      ) : (
        <Button variant="brand" size="lg" style={{ marginTop: parseInt(tokens.spacing[4]), marginBottom: parseInt(tokens.spacing[2]) }}>
          Withdraw
        </Button>
      )}
    </ScreenLayout>
  );
}
