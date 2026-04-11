import { View, ScrollView } from 'react-native';
import { AppHeader, AssetExplorer } from '@/components/organisms';
import { ScreenLayout } from '@/components/templates';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const theme = useColorScheme() ?? 'light';
  const bgColor = tokens.color[theme].background;

  return (
    <ScreenLayout>
      <AppHeader />
      
      <View style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={{ 
            paddingBottom: 140, 
            paddingTop: parseInt(tokens.spacing[6]) 
          }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <AssetExplorer />
        </ScrollView>
      </View>
    </ScreenLayout>
  );
}
