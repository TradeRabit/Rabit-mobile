import React from 'react';
import { Image } from 'expo-image';
import * as PhosphorIcons from 'phosphor-react-native';
import { TOKEN_ICONS } from '@/constants/token-icons';
import { tokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { CryptoIconProps } from './CryptoIcon.types';

/**
 * CryptoIcon Atom
 * Logic:
 * 1. Jika variant='color', cari di TOKEN_ICONS (lokal 1700+ background icons).
 * 2. Jika tidak ada di lokal (misal koin baru dari WebSocket), fallback ke CDN Remote.
 * 3. Jika variant='mono', gunakan Phosphor Icons.
 */
export const CryptoIcon = ({ 
  name, 
  size = 24, 
  variant = "color", // Default ke color sesuai request user untuk 'logo itu'
  color = "primary"
}: CryptoIconProps) => {
  const theme = useColorScheme() ?? 'light';
  const symbol = name.toUpperCase();

  const getIconColor = () => {
    switch (color) {
      case "primary": return tokens.color[theme].textPrimary;
      case "secondary": return tokens.color[theme].textSecondary;
      case "brand": return tokens.color.brand;
      default: return color;
    }
  };

  // Render untuk Logo Berwarna (Local Registry + Remote Fallback)
  if (variant === "color") {
    const localIcon = TOKEN_ICONS[symbol];
    const remoteUrl = `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${name.toLowerCase()}.png`;

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

  // Render untuk Mono (Phosphor Icons)
  const IconComponent = (PhosphorIcons as any).Circle || PhosphorIcons.Circle;

  return (
    <IconComponent 
      size={size} 
      color={getIconColor()}
      weight="regular"
    />
  );
};
