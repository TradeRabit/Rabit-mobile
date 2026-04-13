import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Input } from '@/components/atoms/Input';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { ChatInputProps } from './ChatInput.types';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming,
  withDelay
} from 'react-native-reanimated';

const RecordingBar = ({ delay }: { delay: number }) => {
  const height = useSharedValue(4);
  const theme = useColorScheme() ?? 'light';

  useEffect(() => {
    height.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(16, { duration: 300 }),
          withTiming(4, { duration: 300 })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <Animated.View 
      style={[
        {
          width: 3,
          backgroundColor: tokens.color.brand,
          borderRadius: 2,
        },
        animatedStyle
      ]} 
    />
  );
};

export const ChatInput = ({ 
  value, 
  onChangeText, 
  onSend, 
  onModelSelect, 
  onAudioPress, 
  onAttachPress,
  isRecording,
  selectedModelName = "Sonnet 4.6",
  showHints = false,
  onCloseHints,
  onSkipHints,
}: ChatInputProps & { showHints?: boolean, onCloseHints?: () => void, onSkipHints?: () => void }) => {
  const theme = useColorScheme() ?? 'light';

  if (showHints) {
    return (
      <View style={{
        backgroundColor: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
        borderWidth: 1,
        borderColor: theme === 'dark' ? '#333' : '#E5E5E5',
        borderRadius: 24,
        padding: 20,
        gap: 16
      }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text weight="bold" size="lg" style={{ flex: 1, lineHeight: 28 }}>
            Kalau kamu bisa pergi ke mana saja sekarang, kamu mau ke mana?
          </Text>
          <TouchableOpacity onPress={onCloseHints} style={{ padding: 4 }}>
            <Icon name="X" size={20} color="secondary" />
          </TouchableOpacity>
        </View>

        {/* Options */}
        <View style={{ gap: 8 }}>
          {[
            { id: 1, text: 'Paris, Prancis' },
            { id: 2, text: 'New York, Amerika' },
            { id: 3, text: 'Tokyo, Jepang' },
          ].map((option) => (
            <TouchableOpacity 
              key={option.id}
              onPress={() => onSend?.(option.text)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                padding: 12,
                borderRadius: 16,
                gap: 12
              }}
            >
              <View style={{ 
                width: 24, 
                height: 24, 
                borderRadius: 12, 
                backgroundColor: theme === 'dark' ? '#000' : '#FFF',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text size="xs" weight="bold">{option.id}</Text>
              </View>
              <Text style={{ flex: 1 }}>{option.text}</Text>
              {option.id === 1 && <Icon name="ArrowBendDownLeft" size={16} color="secondary" style={{ opacity: 0.5 }} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer Input */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 }}>
          <View style={{ 
            flex: 1, 
            flexDirection: 'row', 
            alignItems: 'center', 
            backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.03)',
            borderRadius: 12,
            paddingHorizontal: 12,
            height: 48,
            gap: 10
          }}>
            <Icon name="PencilSimple" size={18} color="secondary" />
            <Input 
              placeholder="Something else"
              value={value}
              onChangeText={onChangeText}
              style={{ flex: 1, height: 40 }}
            />
          </View>
          
          <TouchableOpacity 
            onPress={value?.trim() ? () => onSend?.() : onSkipHints}
            style={{ 
              paddingHorizontal: 16, 
              height: 48, 
              borderRadius: 12, 
              backgroundColor: value?.trim() 
                ? (theme === 'dark' ? '#333333' : '#EEEEEE') 
                : 'transparent',
              borderWidth: value?.trim() ? 0 : 1, 
              borderColor: theme === 'dark' ? '#444' : '#DDD',
              justifyContent: 'center'
            }}
          >
            <Text 
              weight="bold" 
              size="sm" 
              color="secondary"
            >
              {value?.trim() ? 'Send' : 'Skip'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{
      backgroundColor: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#333' : '#E5E5E5',
      borderRadius: parseInt(tokens.radius.xl),
      padding: parseInt(tokens.spacing[4]),
    }}>
      {/* Input Area */}
      <View style={{ minHeight: 40, maxHeight: 220, marginBottom: parseInt(tokens.spacing[3]) }}>
        <Input 
          placeholder="How can I help you today?"
          value={value}
          onChangeText={onChangeText}
          multiline
          style={{ flex: 1, minHeight: 40 }}
          scrollEnabled={true}
        />
      </View>
      
      {/* Bottom Actions */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left Action (Add/Attach) */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={onAttachPress} style={{ padding: 4 }}>
            <Icon name="Plus" color="secondary" size={22} weight="bold" />
          </TouchableOpacity>
        </View>

        {/* Right Actions (Model & Audio) */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          {/* Model Selector Pill */}
          <TouchableOpacity 
            onPress={onModelSelect}
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              gap: 6,
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 8,
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            }}
          >
            <Text color="secondary" size="sm" weight="semibold">{selectedModelName}</Text>
            <Icon name="CaretDown" color="secondary" size={14} weight="bold" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={onAudioPress} 
            style={{ 
              padding: 4,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6
            }}
          >
            {isRecording ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, width: 24, justifyContent: 'center' }}>
                <RecordingBar delay={0} />
                <RecordingBar delay={150} />
                <RecordingBar delay={300} />
              </View>
            ) : (
              <Icon name="Waveform" color="secondary" size={22} weight="bold" />
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={onSend}
            activeOpacity={0.7}
            disabled={!value?.trim()}
            style={{ padding: 4 }}
          >
            <Icon 
              name="PaperPlaneRight" 
              color={value?.trim() ? tokens.color.brand : "secondary"} 
              size={22} 
              weight="fill" 
              style={{ opacity: value?.trim() ? 1 : 0.4 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
