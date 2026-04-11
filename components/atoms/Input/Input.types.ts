import { tokens } from "@/constants/theme";
import type { TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
  variant?: "primary" | "search"; // Bisa ditambah sesuai kebutuhan
  hasError?: boolean;
}
