import React from 'react';
import { Image } from 'expo-image';
import { Icon } from '../Icon'; // Use our own Icon atom
import { TOKEN_ICONS } from '@/constants/token-icons';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { CryptoIconProps } from './CryptoIcon.types';

/**
 * CryptoIcon Atom
 * Logic:
 * 1. Jika variant='color'/'white'/'black', cari di TOKEN_ICONS atau CDN.
 * 2. Jika variant='mono', gunakan Icon atom dengan name 'Circle'.
 */
export const CryptoIcon = ({ 
  name, 
  size = 24, 
  variant = "color", 
  color = "primary"
}: CryptoIconProps) => {
  const theme = useColorScheme() ?? 'light';
  const symbol = name.toUpperCase();

  // Render untuk Logo Berwarna/White/Black (Local Registry + Remote Fallback)
  if (variant === "color" || variant === "white" || variant === "black") {
    const localIcon = TOKEN_ICONS[symbol];
    
    // Remote URLs berdasarkan variant
    const folder = variant === "color" ? "color" : (variant === "white" ? "white" : "black");
    const remoteUrl = `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/${folder}/${name.toLowerCase()}.png`;

    return (
      <Image 
        source={localIcon || { uri: remoteUrl }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        contentFit="contain"
        transition={200}
        placeholder={require("@/assets/Rabit icon/Icon.png")}
      />
    );
  }

  // Render untuk Mono (Gunakan Icon Atom)
  return (
    <Icon 
      name="Circle" 
      size={size} 
      color={color as any} 
      weight="regular"
    />
  );
};
