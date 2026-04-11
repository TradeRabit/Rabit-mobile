import React from 'react';
import { View, ScrollView } from 'react-native';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface AssetExplorerTemplateProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

export const AssetExplorerTemplate = ({ header, content }: AssetExplorerTemplateProps) => {
  const theme = useColorScheme() ?? 'light';
  
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: tokens.color[theme].background,
      paddingTop: parseInt(tokens.spacing[12]), // Space for status bar
    }}>
      <View style={{ paddingHorizontal: parseInt(tokens.spacing[4]) }}>
        {header}
      </View>
      
      <ScrollView 
        style={{ flex: 1, marginTop: parseInt(tokens.spacing[6]) }}
        contentContainerStyle={{ paddingHorizontal: parseInt(tokens.spacing[4]), paddingBottom: 100 }}
      >
        {content}
      </ScrollView>
    </View>
  );
};
