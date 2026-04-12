import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, Icon } from '@/components/atoms';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { IconName } from '@/components/atoms/Icon/Icon.types';

import { router } from 'expo-router';

export const BalanceSection = () => {
  const theme = useColorScheme() ?? 'light';
  const [isVisible, setIsVisible] = React.useState(true);

  // Define the actions based on user requirements: Buy (Card), Deposit, Withdraw, History
  const actions = [
    { id: 'buy', label: 'Buy', icon: 'CreditCard' as IconName, route: '/buy' },
    { id: 'deposit', label: 'Deposit', icon: 'ArrowCircleDown' as IconName, route: '/deposit' },
    { id: 'withdraw', label: 'Withdraw', icon: 'ArrowCircleUp' as IconName, route: '/withdraw' },
    { id: 'history', label: 'History', icon: 'ClockCounterClockwise' as IconName, route: '/history' },
  ];

  // Soft brand tint background for the buttons
  const buttonBgColor = theme === 'dark' ? 'rgba(253, 76, 1, 0.15)' : 'rgba(253, 76, 1, 0.08)';

  return (
    <View style={{ paddingTop: parseInt(tokens.spacing[2]), paddingBottom: parseInt(tokens.spacing[6]), paddingHorizontal: 4 }}>
      {/* User Info Row */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 8, 
        marginBottom: parseInt(tokens.spacing[4]) 
      }}>
        <Text weight="bold" size="base">alexsmithmob</Text>
        
        <Image 
          source={tokens.assets.logo.iconOnly} 
          style={{ width: 18, height: 18, marginLeft: -2 }} 
          resizeMode="contain" 
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text color="secondary" size="sm">0x7094...2242</Text>
          <TouchableOpacity activeOpacity={0.6}>
            <Icon name="Copy" size={14} color="secondary" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Balance Text + Visibility Toggle */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
          <Text size="3xl" weight="bold" style={{ fontSize: 48, lineHeight: 56 }}>
            {isVisible ? '$0' : '$****'}
          </Text>
          {isVisible && (
            <Text size="3xl" weight="bold" color="secondary" style={{ fontSize: 48, lineHeight: 56 }}>.00</Text>
          )}
        </View>

        <TouchableOpacity 
          onPress={() => setIsVisible(!isVisible)}
          activeOpacity={0.7}
          style={{ 
            padding: 8,
            backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme === 'dark' ? '#333' : '#E0E0E0',
          }}
        >
          <Icon name={isVisible ? "Eye" : "EyeSlash"} size={20} color="secondary" weight="bold" />
        </TouchableOpacity>
      </View>
      
      {/* Change Percentage */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 6, 
        marginTop: parseInt(tokens.spacing[1]), 
        marginBottom: parseInt(tokens.spacing[5]),
      }}>
        <Icon name="CaretUp" size={16} color="success" weight="fill" />
        <Text size="md" weight="medium" style={{ color: tokens.color[theme].success }}>0.00%</Text>
      </View>
 
       {/* Action Buttons */}
       <View style={{ flexDirection: 'row', gap: parseInt(tokens.spacing[4]) }}>
         {actions.map((action) => (
           <TouchableOpacity 
             key={action.id}
             activeOpacity={0.7}
             onPress={() => router.push(action.route as any)}
             style={{
               flex: 1, 
               height: 64, // Fixed height for a nice boxy rectangle
               backgroundColor: buttonBgColor, 
               borderRadius: 12, // Match global radius
               justifyContent: 'center',
               alignItems: 'center',
               borderWidth: 1,
               borderColor: theme === 'dark' ? 'rgba(253, 76, 1, 0.3)' : 'rgba(253, 76, 1, 0.2)', // Branded border for buttons
             }}
           >
             <Icon name={action.icon} size={28} color="brand" weight="fill" />
           </TouchableOpacity>
         ))}
      </View>
    </View>
  );
};
