import React, { useState, useEffect } from 'react';
import { View, Platform, ScrollView, Keyboard, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { ChatInput } from '@/components/molecules/ChatInput';
import { ModelSelector } from '@/components/molecules/ModelSelector';
import { ChatSidebar } from '@/components/organisms/ChatSidebar';
import { ScreenLayout } from '@/components/templates/ScreenLayout';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { tokens } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withDelay,
  withRepeat,
  withSequence,
  Easing
} from 'react-native-reanimated';


const TypingDot = ({ delay }: { delay: number }) => {
  const ty = useSharedValue(0);
  useEffect(() => {
    ty.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(-5, { duration: 400 }),
        withTiming(0, { duration: 400 })
      ),
      -1,
      true
    ));
  }, []);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: ty.value }]
  }));
  return (
    <Animated.View style={[{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#888', marginHorizontal: 2 }, style]} />
  );
};

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let currentIdx = 0;
    const timer = setInterval(() => {
      if (currentIdx < text.length) {
        setDisplayedText(text.substring(0, currentIdx + 1));
        currentIdx++;
      } else {
        clearInterval(timer);
      }
    }, 25);
    
    return () => clearInterval(timer);
  }, [text]);

  return <Text style={{ fontSize: 16, lineHeight: 24 }}>{displayedText}</Text>;
};

const AssistantActions = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Show icons after typewriter effect is roughly finished
    const timer = setTimeout(() => setIsVisible(true), 1500); 
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 4 }}>
      <TouchableOpacity style={{ opacity: 0.4 }}>
        <Icon name="Copy" size={18} color="secondary" />
      </TouchableOpacity>
      <TouchableOpacity style={{ opacity: 0.4 }}>
        <Icon name="ThumbsUp" size={18} color="secondary" />
      </TouchableOpacity>
      <TouchableOpacity style={{ opacity: 0.4 }}>
        <Icon name="ThumbsDown" size={18} color="secondary" />
      </TouchableOpacity>
      <TouchableOpacity style={{ opacity: 0.4 }}>
        <Icon name="ArrowClockwise" size={18} color="secondary" />
      </TouchableOpacity>
    </View>
  );
};

export default function AssistPage() {
  const theme = useColorScheme() ?? 'light';
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isModelSelectorVisible, setIsModelSelectorVisible] = useState(false);
  const [selectedModel, setSelectedModel] = useState({ id: 'sonnet', name: 'Claude 3.5 Sonnet' });
  const [chatSessionName, setChatSessionName] = useState('New Chat');
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isHintsVisible, setIsHintsVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const keyboardHeight = useSharedValue(0);

  const handleSend = (customText?: string) => {
    const finalContent = typeof customText === 'string' ? customText : text;
    if (!finalContent.trim()) return;

    // Special trigger for manual Hint visibility
    if (finalContent.toLowerCase() === 'hitl') {
      setIsHintsVisible(true);
      setText('');
      return;
    }

    const userMessage = { id: Date.now().toString(), role: 'user', content: finalContent };
    
    if (messages.length === 0) {
      setChatSessionName(finalContent);
      setIsHintsVisible(false);
    }

    setMessages(prev => [...prev, userMessage]);
    setText('');
    
    // Show typing indicator
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: 'Hai! Apa kabar? Ada yang bisa aku bantu malam ini? 😊' 
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        keyboardHeight.value = withTiming(e.endCoordinates.height, {
          duration: 300,
          easing: Easing.out(Easing.exp),
        });
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        keyboardHeight.value = withTiming(0, {
          duration: 250,
          easing: Easing.out(Easing.exp),
        });
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const animatedInputStyle = useAnimatedStyle(() => {
    // Kurangi offset saat keyboard terbuka agar input tidak melayang terlalu tinggi (awalnya 32)
    const offset = keyboardHeight.value > 0 ? 4 : 0;
    
    // Kurangi padding dasar agar tidak terlalu tinggi saat keyboard ditutup
    const dynamicPadding = keyboardHeight.value > 0 
      ? (Platform.OS === 'ios' ? 8 : 8) 
      : (Platform.OS === 'ios' ? insets.bottom + 4 : 12);

    return {
      transform: [{ 
        translateY: withTiming(-keyboardHeight.value - offset, {
          duration: 300,
          easing: Easing.out(Easing.exp),
        }) 
      }],
      paddingBottom: withTiming(dynamicPadding, { duration: 200 }),
    };
  });
  
  return (
    <ScreenLayout>
      <View style={{ flex: 1 }}>
        {/* Sidebar Trigger - Gantinya Header */}
        <View style={{ 
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity 
              onPress={() => setIsSidebarVisible(true)}
              activeOpacity={0.7}
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                backgroundColor: theme === 'dark' ? tokens.color.dark.surface : tokens.color.light.surface,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon name="SidebarSimple" size={24} color="secondary" weight="bold" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1 }}
              activeOpacity={0.6}
            >
              <Text weight="bold" size="lg" numberOfLines={1} style={{ maxWidth: 200 }}>{chatSessionName}</Text>
              <Icon name="CaretDown" size={14} color="secondary" weight="bold" style={{ opacity: 0.5, marginTop: 2 }} />
            </TouchableOpacity>
          </View>

          {/* Spacer / Right Action */}
        </View>

        <ScrollView 
          contentContainerStyle={{ 
            flexGrow: 1, 
            padding: 20, 
            paddingBottom: 150 
          }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View 
              key={message.id} 
              style={{ 
                marginBottom: 24,
                alignItems: message.role === 'user' ? 'flex-end' : 'flex-start',
                width: '100%'
              }}
            >
              {message.role === 'user' ? (
                /* User Bubble */
                <View style={{
                  backgroundColor: theme === 'dark' ? '#262626' : '#E5E5E5',
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 20,
                  maxWidth: '80%',
                }}>
                  <Text>{message.content}</Text>
                </View>
              ) : (
                /* Assistant Message */
                <View style={{ width: '100%', gap: 12 }}>
                  <TypewriterText text={message.content} />
                  
                  {/* Assistant Actions */}
                  <AssistantActions />
                </View>
              )}
            </View>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 24, paddingLeft: 4 }}>
              <TypingDot delay={0} />
              <TypingDot delay={150} />
              <TypingDot delay={300} />
            </View>
          )}
        </ScrollView>
        
        {/* GRADIENT MASK - Sama seperti di Home untuk area melayang input */}
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
            colors={[
              tokens.color[theme].background + '00', 
              tokens.color[theme].background + 'CC', 
              tokens.color[theme].background
            ]} 
            locations={[0, 0.5, 1]}
            style={{ flex: 1 }}
            pointerEvents="none"
          />
        </View>

        <Animated.View
          pointerEvents="box-none"
          style={[
            {
              position: 'absolute',
              bottom: 0,
              left: 0, 
              right: 0,
              paddingHorizontal: parseInt(tokens.spacing[2]),
              zIndex: 20,
            },
            animatedInputStyle
          ]}
        >
          <ChatInput 
            value={text}
            onChangeText={setText}
            onSend={handleSend}
            isRecording={isRecording}
            selectedModelName={selectedModel.name}
            onAttachPress={() => console.log('Attach pressed')}
            onModelSelect={() => setIsModelSelectorVisible(true)}
            onAudioPress={() => setIsRecording(!isRecording)}
            showHints={isHintsVisible && messages.length === 0}
            onCloseHints={() => setIsHintsVisible(false)}
            onSkipHints={() => setIsHintsVisible(false)}
          />
        </Animated.View>

        {/* BOTTOMMOST GRADIENT - Same as Home for extra smoothness at the very edge */}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: insets.bottom + 20,
            zIndex: 15,
          }}
        >
          <LinearGradient
            colors={[
              tokens.color[theme].background + '00',
              tokens.color[theme].background
            ]}
            style={{ flex: 1 }}
          />
        </View>
      </View>

      <ChatSidebar 
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
      />

      <ModelSelector 
        isVisible={isModelSelectorVisible}
        onClose={() => setIsModelSelectorVisible(false)}
        selectedModelId={selectedModel.id}
        onSelect={(model) => {
          setSelectedModel(model);
          setIsModelSelectorVisible(false);
        }}
      />
    </ScreenLayout>
  );
}
