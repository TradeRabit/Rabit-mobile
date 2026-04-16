import React, { useEffect } from 'react';
import { View, TouchableOpacity, Pressable, Dimensions, ScrollView, TextInput } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { ModelSelectorProps, ModelOption } from './ModelSelector.types';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolate,
  Extrapolate,
  Easing
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MODELS: ModelOption[] = [
  { id: 'sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', icon: 'Robot' },
  { id: 'gpt4o', name: 'GPT-4o', provider: 'OpenAI', icon: 'Brain' },
  { id: 'gemini-pro', name: 'Gemini 1.5 Pro', provider: 'Google', icon: 'Globe' },
  { id: 'llama3', name: 'Llama 3 70B', provider: 'Meta', icon: 'Atom' },
  { id: 'flash', name: 'Rabit Flash', provider: 'Rabit', icon: 'Lightning' },
  { id: 'gpt4t', name: 'GPT-4 Turbo', provider: 'OpenAI', icon: 'Cpu' },
  { id: 'haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', icon: 'Wind' },
  { id: 'mistral', name: 'Mistral Large', provider: 'Mistral', icon: 'Wind' },
  { id: 'gemini-flash', name: 'Gemini 1.5 Flash', provider: 'Google', icon: 'Lightning' },
  { id: 'grok', name: 'Grok-1', provider: 'xAI', icon: 'Bicycle' },
  { id: 'rabit-pro', name: 'Rabit Pro', provider: 'Rabit', icon: 'Star' },
  { id: 'perplexity', name: 'Perplexity Online', provider: 'Perplexity', icon: 'MagnifyingGlass' },
];

export const ModelSelector = ({ isVisible, onClose, onSelect, selectedModelId }: ModelSelectorProps) => {
  const theme = useColorScheme() ?? 'light';
  const progress = useSharedValue(0);
  const [search, setSearch] = React.useState('');

  useEffect(() => {
    progress.value = withTiming(isVisible ? 1 : 0, {
      duration: 350,
      easing: Easing.out(Easing.exp),
    });
  }, [isVisible]);

  const filteredModels = MODELS.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.provider.toLowerCase().includes(search.toLowerCase())
  );

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    display: progress.value === 0 && !isVisible ? 'none' : 'flex',
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [SCREEN_HEIGHT, 0]) }
    ],
  }));

  return (
    <>
      <Animated.View 
        pointerEvents={isVisible ? 'auto' : 'none'}
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
          },
          backdropStyle
        ]}
      >
        <Pressable style={{ flex: 1 }} onPress={onClose} />
        
        <Animated.View
          style={[
            {
              backgroundColor: theme === 'dark' ? '#111111' : '#FFFFFF',
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              padding: 24,
              paddingBottom: 40,
              borderTopWidth: 1,
              borderColor: theme === 'dark' ? '#222' : '#F0F0F0',
            },
            sheetStyle
          ]}
        >
          {/* Sticky Header: Search & Filter */}
          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
              <View style={{ 
                flex: 1, 
                flexDirection: 'row', 
                alignItems: 'center', 
                backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5',
                paddingHorizontal: 12,
                height: 48,
                borderRadius: 14,
                gap: 12
              }}>
                <Icon name="MagnifyingGlass" size={18} color="secondary" />
                <TextInput 
                  placeholder="Search models..." 
                  placeholderTextColor={tokens.color[theme].textPlaceholder}
                  value={search}
                  onChangeText={setSearch}
                  style={{ 
                    flex: 1, 
                    fontSize: 14, 
                    color: tokens.color[theme].textPrimary,
                    fontFamily: tokens.font.family.sans 
                  }}
                />
              </View>
              <TouchableOpacity style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Icon name="SlidersHorizontal" size={18} color="secondary" />
              </TouchableOpacity>
            </View>

            <Text weight="bold" size="lg" color="secondary" style={{ marginBottom: 8, marginLeft: 12 }}>Models</Text>
          </View>

          {/* Scrollable Model List */}
          <View style={{ height: 350 }}>
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 5, paddingBottom: 20 }} // Tambah gap 5px sesuai permintaan
            >
              {filteredModels.map((model) => {
                const isActive = selectedModelId === model.id;
                return (
                <TouchableOpacity 
                  key={model.id}
                  onPress={() => onSelect(model)}
                  activeOpacity={0.6}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 6, // Diperkecil lagi dari 10 ke 6 agar lebih rapat
                    paddingHorizontal: 12,
                    borderRadius: 10,
                    gap: 12,
                  }}
                >
                  {/* Provider Logo / Icon */}
                  <View style={{
                    width: 28, // Diperkecil dari 32
                    height: 28,
                    borderRadius: 6,
                    backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F8F8',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Icon 
                      name={model.icon as any} 
                      color={isActive ? "brand" : "secondary"} 
                      size={14} // Diperkecil dari 16
                    />
                  </View>
                  
                  <View style={{ flex: 1 }}>
                    <Text weight={isActive ? "semibold" : "regular"} size="sm">{model.name}</Text>
                    <Text color="secondary" size="xs" style={{ opacity: 0.7 }}>{model.provider}</Text>
                  </View>

                  {/* Square Indicator */}
                  <View style={{
                    width: 18, // Diperkecil dari 20
                    height: 18,
                    borderRadius: 4,
                    borderWidth: 1.5, // Lebih halus dari 2
                    borderColor: isActive ? tokens.color.brand : (theme === 'dark' ? '#333' : '#DDD'),
                    backgroundColor: isActive ? tokens.color.brand : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {isActive && <Icon name="Check" color="white" size={12} weight="bold" />}
                  </View>
                </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Animated.View>
      </Animated.View>
    </>
  );
};
