import { tokens } from "@/constants/theme";
import type { IconWeight } from "phosphor-react-native";
import * as PhosphorIcons from "phosphor-react-native";

export type IconName = keyof typeof PhosphorIcons;

// Mengambil referensi color dari token yang sudah kita set
export type IconColor = "primary" | "secondary" | "brand" | "success" | "error" | "placeholderGrey" | "placeholderBlack";

export interface IconProps {
  name: IconName;
  size?: number | string; // Bisa menerima string px atau number
  color?: IconColor;
  weight?: IconWeight;
}
