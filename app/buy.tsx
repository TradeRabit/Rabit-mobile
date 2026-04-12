import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Text, Button, Icon, CryptoIcon } from '@/components/atoms';
import { SubHeader, NumPad } from '@/components/organisms';
import { ScreenLayout } from '@/components/templates';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function BuyPage() {
  const theme = useColorScheme() ?? 'light';
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [value, setValue] = useState('0');
  const [provider, setProvider] = useState<'moonpay' | 'x402'>('moonpay');

  const surfaceColor = theme === 'dark' ? tokens.color.dark.secondarySurface : '#E5E5E5'; 

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
        title={step === 1 ? "Buy Credit" : step === 2 ? "Select Provider" : "Review Purchase"} 
        onBack={step > 1 ? () => setStep((step - 1) as any) : undefined}
      />
      
      {step === 1 && (
        <>
          {/* Token Selection Dropdown */}
          <View style={{ alignItems: 'center', marginTop: parseInt(tokens.spacing[6]) }}>
            <TouchableOpacity style={{ 
              backgroundColor: surfaceColor, 
              borderRadius: parseInt(tokens.radius.full), 
              paddingHorizontal: parseInt(tokens.spacing[4]), 
              paddingVertical: parseInt(tokens.spacing[2]),
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: theme === 'dark' ? 1 : 0,
              borderColor: '#333'
            }}>
              <CryptoIcon name="SOL" variant="color" size={24} />
              <Text weight="bold" style={{ color: tokens.color[theme].textPrimary, marginLeft: parseInt(tokens.spacing[2]), marginRight: parseInt(tokens.spacing[2]) }}>Solana</Text>
              <Icon name="CaretDown" size={16} color="secondary" />
            </TouchableOpacity>
          </View>

          {/* Input Display Area */}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -parseInt(tokens.spacing[6]) }}>
            <Text style={{ color: tokens.color[theme].textSecondary, marginBottom: parseInt(tokens.spacing[2]) }}>
              Amount to buy
            </Text>
            <Text weight="bold" style={{ fontSize: 56, color: tokens.color[theme].textPrimary }}>
              ${value}
            </Text>
          </View>

          <NumPad onPress={handleNumPress} onDelete={handleDelete} />
          
          <Button 
            onClick={() => setStep(2)} 
            disabled={value === '0'}
            variant="brand" 
            size="lg" 
            style={{ marginTop: parseInt(tokens.spacing[4]), marginBottom: parseInt(tokens.spacing[2]) }}
          >
            Continue
          </Button>
        </>
      )}

      {step === 2 && (
        <View style={{ flex: 1, marginTop: parseInt(tokens.spacing[6]) }}>
          
          {/* Provider 1: Moonpay */}
          <TouchableOpacity 
            onPress={() => setProvider('moonpay')}
            style={{ 
              backgroundColor: surfaceColor, 
              borderRadius: parseInt(tokens.radius.lg), 
              padding: parseInt(tokens.spacing[4]),
              borderWidth: 1,
              borderColor: provider === 'moonpay' ? tokens.color.brand : 'transparent',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: parseInt(tokens.spacing[4])
            }}
          >
             <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: surfaceColor, justifyContent: 'center', alignItems: 'center', marginRight: parseInt(tokens.spacing[3]), overflow: 'hidden' }}>
                <Image source={require("@/assets/Payment/Moonpay.jpeg")} style={{ width: 44, height: 44 }} contentFit="contain" />
             </View>
             <View style={{ flex: 1 }}>
               <Text weight="bold" style={{ color: tokens.color[theme].textPrimary }}>MoonPay</Text>
               <Text size="sm" style={{ color: tokens.color[theme].textSecondary }}>Fast & Secure</Text>
             </View>
             {provider === 'moonpay' && <Icon name="CheckCircle" size={24} color="brand" weight="fill" />}
          </TouchableOpacity>

          {/* Provider 2: Base */}
          <TouchableOpacity 
            onPress={() => setProvider('x402')}
            style={{ 
              backgroundColor: surfaceColor, 
              borderRadius: parseInt(tokens.radius.lg), 
              padding: parseInt(tokens.spacing[4]),
              borderWidth: 1,
              borderColor: provider === 'x402' ? tokens.color.brand : 'transparent',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
             <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: surfaceColor, justifyContent: 'center', alignItems: 'center', marginRight: parseInt(tokens.spacing[3]), overflow: 'hidden' }}>
                <Image source={require("@/assets/web3icons/networks/background/base.svg")} style={{ width: 44, height: 44 }} contentFit="contain" />
             </View>
             <View style={{ flex: 1 }}>
               <Text weight="bold" style={{ color: tokens.color[theme].textPrimary }}>Base</Text>
               <Text size="sm" style={{ color: tokens.color[theme].textSecondary }}>Low Network Fees</Text>
             </View>
             {provider === 'x402' && <Icon name="CheckCircle" size={24} color="brand" weight="fill" />}
          </TouchableOpacity>

          <View style={{ flex: 1 }} />
          <Button 
            onClick={() => setStep(3)}
            variant="brand" 
            size="lg" 
            style={{ marginTop: parseInt(tokens.spacing[4]), marginBottom: parseInt(tokens.spacing[2]) }}
          >
            Review Purchase
          </Button>
        </View>
      )}

      {step === 3 && (
        <View style={{ flex: 1, marginTop: parseInt(tokens.spacing[6]) }}>
           <View style={{ alignItems: 'center', marginVertical: parseInt(tokens.spacing[8]) }}>
             <Text style={{ color: tokens.color[theme].textSecondary, marginBottom: parseInt(tokens.spacing[2]) }}>You will get roughly</Text>
             <Text weight="bold" style={{ fontSize: 48, color: tokens.color[theme].textPrimary }}>
               {(parseFloat(value || '0') / 150).toFixed(4)} SOL
             </Text>
           </View>

           <View style={{ backgroundColor: surfaceColor, borderRadius: parseInt(tokens.radius.lg), padding: parseInt(tokens.spacing[4]) }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: parseInt(tokens.spacing[4]) }}>
                <Text style={{ color: tokens.color[theme].textSecondary }}>Asset</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: parseInt(tokens.spacing[2]) }}>
                  <CryptoIcon name="SOL" variant="color" size={20} />
                  <Text weight="semibold" style={{ color: tokens.color[theme].textPrimary }}>Solana (SOL)</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: parseInt(tokens.spacing[4]) }}>
                <Text style={{ color: tokens.color[theme].textSecondary }}>Rate</Text>
                <Text weight="semibold" style={{ color: tokens.color[theme].textPrimary }}>1 SOL ≈ $150.00</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: parseInt(tokens.spacing[4]) }}>
                <Text style={{ color: tokens.color[theme].textSecondary }}>Purchase Amount</Text>
                <Text weight="semibold" style={{ color: tokens.color[theme].textPrimary }}>${parseFloat(value || '0').toFixed(2)}</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: parseInt(tokens.spacing[4]) }}>
                <Text style={{ color: tokens.color[theme].textSecondary }}>Provider</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: parseInt(tokens.spacing[2]) }}>
                  <Image 
                    source={provider === 'moonpay' ? require("@/assets/Payment/Moonpay.jpeg") : require("@/assets/web3icons/networks/background/base.svg")} 
                    style={{ width: 20, height: 20, borderRadius: 10 }} 
                    contentFit="contain" 
                  />
                  <Text weight="semibold" style={{ color: tokens.color[theme].textPrimary }}>
                    {provider === 'moonpay' ? 'MoonPay' : 'Base'}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: parseInt(tokens.spacing[4]) }}>
                <Text style={{ color: tokens.color[theme].textSecondary }}>Network Fee</Text>
                <Text weight="semibold" style={{ color: tokens.color[theme].textPrimary }}>$1.00</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: parseInt(tokens.spacing[4]), borderTopWidth: 1, borderTopColor: theme === 'dark' ? '#333' : '#CCC', paddingTop: parseInt(tokens.spacing[4]) }}>
                <Text weight="bold" style={{ color: tokens.color[theme].textPrimary }}>Total to Pay</Text>
                <Text weight="bold" style={{ color: tokens.color[theme].textPrimary }}>${(parseFloat(value || '0') + 1.00).toFixed(2)}</Text>
              </View>
           </View>

           <View style={{ flex: 1 }} />
           <Button 
             variant="brand" 
             size="lg" 
             style={{ marginTop: parseInt(tokens.spacing[4]), marginBottom: parseInt(tokens.spacing[2]) }}
           >
             Confirm Purchase
           </Button>
        </View>
      )}
    </ScreenLayout>
  );
}
