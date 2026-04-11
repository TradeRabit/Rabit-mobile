import { tokens } from "@/constants/theme";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "brand";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  style?: any;
}
