import React, { useState, useEffect } from 'react';
import { View, Platform, ScrollView, Keyboard, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { CryptoIcon } from '@/components/atoms/CryptoIcon';
import { ChatInput } from '@/components/molecules/ChatInput';
import { ModelSelector } from '@/components/molecules/ModelSelector';
import { ChatSidebar } from '@/components/organisms/ChatSidebar';
import { SubHeader } from '@/components/organisms/SubHeader';
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

const TypewriterText = ({ text, onComplete }: { text: string, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let currentIdx = 0;
    const timer = setInterval(() => {
      if (currentIdx < text.length) {
        setDisplayedText(text.substring(0, currentIdx + 1));
        currentIdx++;
      } else {
        clearInterval(timer);
        onComplete?.();
      }
    }, 25);
    
    return () => clearInterval(timer);
  }, [text, onComplete]);

  return <Text style={{ fontSize: 16, lineHeight: 24 }}>{displayedText}</Text>;
};

const AssistantActions = () => {
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

const AssistantMessageBubble = ({ message, onOpenChart }: { message: any, onOpenChart: () => void }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  
  return (
    <View style={{ width: '100%', gap: 12 }}>
      <TypewriterText text={message.content} onComplete={() => setIsCompleted(true)} />
      
      {isCompleted && message.hasChart && (
        <TouchableOpacity 
          onPress={onOpenChart}
          activeOpacity={0.7}
          style={{
            backgroundColor: tokens.color.brand + '15',
            borderColor: tokens.color.brand + '50',
            borderWidth: 1,
            padding: 12,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            alignSelf: 'flex-start'
          }}>
          <Icon name="ChartLineUp" size={20} color="brand" weight="fill" />
          <Text weight="bold" style={{ color: tokens.color.brand }}>Lihat Chart Detail</Text>
        </TouchableOpacity>
      )}

      {/* Assistant Actions */}
      {isCompleted && <AssistantActions />}
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
  const [chartState, setChartState] = useState<'closed' | 'open' | 'minimized' | 'fullscreen'>('minimized');
  const [isChartReady, setIsChartReady] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('BTC');
  const [isSymbolSelectorVisible, setIsSymbolSelectorVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const keyboardHeight = useSharedValue(0);
  const screenHeight = Dimensions.get('window').height;
  const MAX_CHART_HEIGHT = screenHeight * 0.45;
  const MIN_CHART_HEIGHT = 44;
  const chartHeight = useSharedValue(MIN_CHART_HEIGHT);
  const caretRotation = useSharedValue(0);

  const handleOpenChart = () => {
    setChartState('open');
    chartHeight.value = withSpring(MAX_CHART_HEIGHT, { damping: 20, stiffness: 90 });
    caretRotation.value = withTiming(180, { duration: 300 });
  };

  const handleMinimizeChart = () => {
    setChartState('minimized');
    chartHeight.value = withSpring(MIN_CHART_HEIGHT, { damping: 20, stiffness: 90 });
    caretRotation.value = withTiming(0, { duration: 300 });
  };

  const handleMaximizeChart = () => {
    setChartState('open');
    chartHeight.value = withSpring(MAX_CHART_HEIGHT, { damping: 20, stiffness: 90 });
    caretRotation.value = withTiming(180, { duration: 300 });
  };

  const handleFullscreenChart = () => {
    setChartState('fullscreen');
  };

  const handleCloseChart = () => {
    chartHeight.value = withTiming(0, { duration: 300 });
    setTimeout(() => {
      setChartState('closed');
      setIsChartReady(false);
    }, 300);
  };

  const animatedChartStyle = useAnimatedStyle(() => {
    return {
      height: chartHeight.value,
      opacity: chartHeight.value > 0 ? 1 : 0,
      marginBottom: chartHeight.value > 0 ? 12 : 0,
    };
  });

  const animatedCaretStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${caretRotation.value}deg` }],
    };
  });

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
      const isChartTrigger = finalContent.toLowerCase().includes('chart');
      const aiResponse = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: isChartTrigger
          ? 'Tentu, ini adalah analisis chart teknikal aset yang kamu minta. Silakan klik tombol di bawah untuk membuka chart secara detail.'
          : 'Hai! Apa kabar? Ada yang bisa aku bantu malam ini? 😊',
        hasChart: isChartTrigger
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

        {/* Animated Chart Section (Splitscreen) */}
        {chartState !== 'closed' && chartState !== 'fullscreen' && (
          <Animated.View style={[animatedChartStyle, {
            marginHorizontal: 4,
            borderRadius: 16,
            overflow: 'hidden',
            backgroundColor: tokens.color[theme].background,
            borderWidth: 1,
            borderColor: tokens.color[theme].border,
          }]}>
            {/* Chart Header */}
            <View style={{ 
              height: MIN_CHART_HEIGHT,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              backgroundColor: tokens.color[theme].surface || (theme === 'dark' ? '#1A1A1A' : '#F5F5F5'),
              borderBottomWidth: chartState === 'open' ? 1 : 0,
              borderBottomColor: tokens.color[theme].border,
            }}>
              <TouchableOpacity 
                onPress={() => setIsSymbolSelectorVisible(true)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                activeOpacity={0.7}
              >
                <CryptoIcon name={selectedSymbol} size={20} variant="color" />
                <Text weight="bold" size="sm">{selectedSymbol}/USDT</Text>
                <Icon name="CaretDown" size={12} color="secondary" weight="bold" />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                {chartState === 'open' && (
                  <TouchableOpacity onPress={handleFullscreenChart} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                    <Icon name="CornersOut" size={18} color="secondary" weight="bold" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  onPress={chartState === 'open' ? handleMinimizeChart : handleMaximizeChart} 
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                >
                  <Animated.View style={animatedCaretStyle}>
                    <Icon name="CaretDown" size={18} color="secondary" weight="bold" />
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Chart Body */}
            <View style={{ 
              flex: 1, 
              backgroundColor: tokens.color[theme].background,
              display: chartState === 'minimized' ? 'none' : 'flex'
            }}>
              <WebView 
                source={{ 
                  uri: `http://192.168.1.18:3000?theme=${theme}&backColor=${encodeURIComponent(tokens.color[theme].background)}&textColor=${encodeURIComponent(tokens.color[theme].textPrimary)}&brandColor=${encodeURIComponent(tokens.color.brand)}&_t=${Date.now()}`,
                  headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
                }} 
                style={{ flex: 1, backgroundColor: tokens.color[theme].background }}
                containerStyle={{ backgroundColor: tokens.color[theme].background }}
                cacheEnabled={false}
                cacheMode="LOAD_NO_CACHE"
                originWhitelist={['*']}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowFileAccess={true}
                allowUniversalAccessFromFileURLs={true}
                scrollEnabled={false}
                onMessage={(event) => {
                  try {
                    const data = JSON.parse(event.nativeEvent.data);
                    if (data.type === 'CHART_READY') {
                      setIsChartReady(true);
                    }
                  } catch (_) {}
                }}
              />
              
              {!isChartReady && (
                <View style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: tokens.color[theme].background,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <View style={{ flexDirection: 'row', gap: 6 }}>
                    <TypingDot delay={0} />
                    <TypingDot delay={150} />
                    <TypingDot delay={300} />
                  </View>
                </View>
              )}
            </View>
          </Animated.View>
        )}

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
                <AssistantMessageBubble 
                  message={message} 
                  onOpenChart={handleOpenChart} 
                />
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

        {/* TOP GRADIENT - below chart when minimized */}
        {chartState === 'minimized' && (
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 60 + MIN_CHART_HEIGHT, // Below header + minimized chart
              left: 0,
              right: 0,
              height: 80,
              zIndex: 5,
            }}
          >
            <LinearGradient
              colors={[
                tokens.color[theme].background,
                tokens.color[theme].background + '00'
              ]} 
              style={{ flex: 1 }}
            />
          </View>
        )}
        
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

      {/* Fullscreen Chart Modal */}
      <Modal
        visible={chartState === 'fullscreen'}
        animationType="fade"
        onRequestClose={handleMaximizeChart}
        statusBarTranslucent
      >
        <View style={{ 
          flex: 1, 
          backgroundColor: tokens.color[theme].background,
          paddingTop: insets.top 
        }}>
          {/* Fullscreen Chart Header */}
          <View style={{ 
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            backgroundColor: tokens.color[theme].surface || (theme === 'dark' ? '#1A1A1A' : '#F5F5F5'),
            borderBottomWidth: 1,
            borderBottomColor: tokens.color[theme].border,
          }}>
            <TouchableOpacity 
              onPress={() => setIsSymbolSelectorVisible(true)}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              activeOpacity={0.7}
            >
              <CryptoIcon name={selectedSymbol} size={24} variant="color" />
              <Text weight="bold" size="lg">{selectedSymbol}/USDT</Text>
              <Icon name="CaretDown" size={14} color="secondary" weight="bold" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleMaximizeChart} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Icon name="CornersIn" size={24} color="secondary" weight="bold" />
            </TouchableOpacity>
          </View>

          {/* Fullscreen Chart Body */}
          <View style={{ 
            flex: 1, 
            backgroundColor: tokens.color[theme].background,
            paddingBottom: insets.bottom 
          }}>
            <WebView 
              source={{ 
                uri: `http://192.168.1.18:3000?theme=${theme}&backColor=${encodeURIComponent(tokens.color[theme].background)}&textColor=${encodeURIComponent(tokens.color[theme].textPrimary)}&brandColor=${encodeURIComponent(tokens.color.brand)}&_t=${Date.now()}`,
                headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
              }} 
              style={{ flex: 1, backgroundColor: tokens.color[theme].background }}
              containerStyle={{ backgroundColor: tokens.color[theme].background }}
              cacheEnabled={false}
              cacheMode="LOAD_NO_CACHE"
              originWhitelist={['*']}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowFileAccess={true}
              allowUniversalAccessFromFileURLs={true}
              scrollEnabled={false}
              onMessage={(event) => {
                try {
                  const data = JSON.parse(event.nativeEvent.data);
                  if (data.type === 'CHART_READY') {
                    setIsChartReady(true);
                  }
                } catch (_) {}
              }}
            />
            
            {!isChartReady && (
              <View style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: tokens.color[theme].background,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                  <TypingDot delay={0} />
                  <TypingDot delay={150} />
                  <TypingDot delay={300} />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Symbol Selector Modal */}
      <Modal
        visible={isSymbolSelectorVisible}
        animationType="slide"
        onRequestClose={() => setIsSymbolSelectorVisible(false)}
        presentationStyle="pageSheet"
      >
        <View style={{ 
          flex: 1, 
          backgroundColor: tokens.color[theme].background,
          paddingTop: insets.top 
        }}>
          <View style={{ 
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: tokens.color[theme].border,
          }}>
            <Text weight="bold" size="xl">Select Market</Text>
            <TouchableOpacity onPress={() => setIsSymbolSelectorVisible(false)}>
              <Icon name="X" size={24} color="secondary" weight="bold" />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
            {['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'ADA', 'DOGE', 'MATIC', 'DOT', 'AVAX'].map((symbol) => (
              <TouchableOpacity
                key={symbol}
                onPress={() => {
                  setSelectedSymbol(symbol);
                  setIsSymbolSelectorVisible(false);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5',
                  borderRadius: 12,
                  marginBottom: 8,
                  borderWidth: selectedSymbol === symbol ? 2 : 1,
                  borderColor: selectedSymbol === symbol ? tokens.color.brand : tokens.color[theme].border,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <CryptoIcon name={symbol} size={24} variant="color" />
                  <Text weight="bold" size="lg">{symbol}/USDT</Text>
                </View>
                {selectedSymbol === symbol && (
                  <Icon name="Check" size={20} color="brand" weight="bold" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>

    </ScreenLayout>
  );
}
