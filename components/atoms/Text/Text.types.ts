import { TextStyle, StyleProp, TextProps as NativeTextProps } from 'react-native';
import { tokens } from "@/constants/theme";

export type TextSize = keyof typeof tokens.font.size;
export type TextWeight = keyof typeof tokens.font.weight;
export type TextColor = "primary" | "secondary" | "brand" | "placeholderGrey" | "placeholderBlack";

export interface TextProps extends NativeTextProps {
  children: React.ReactNode;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  align?: "auto" | "left" | "right" | "center" | "justify";
  style?: StyleProp<TextStyle>;
}

