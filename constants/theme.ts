export const tokens = {
  color: {
    // Brand (Constant in both modes)
    brand: "#FD4C01",

    // Light Theme
    light: {
      background: "#EFEFEF",
      textPrimary: "#0F0F00", // Heading or primary text
      textSecondary: "#8E8F8F", // Grey-like color for secondary text
      containerPrimary: "#262626", // Background for containers, buttons, etc.
      containerSecondary: "#767271", // Secondary background for containers, slightly greyish
      placeholderGreyBg: "#B0B0B0", // Placeholder text on grey backgrounds
      placeholderBlackBg: "#FFFFFC", // Placeholder color on black backgrounds
      textPlaceholder: "#8D8C8B", // Added for clarity
      success: "#10B981", // Emerald green
      error: "#EF4444",   // Red
    },

    // Dark Theme
    dark: {
      background: "#010101", // Pure black
      secondarySurface: "#42413F", // Grey surface
      tertiarySurface: "#FAFAFA", // Tertiary surface
      textPrimary: "#FFFFFF", // Bright text color
      textSecondary: "#8D8C8B", // CHANGED: Brighter grey for better visibility
      textPlaceholder: "#8D8C8B", // Added for clarity
      placeholderSecondary: "#8D8C8B", // Placeholder when combined with secondary layer
      placeholderTertiary: "#333333", // Placeholder for tertiary white background
      success: "#10B981", // Emerald green
      error: "#EF4444",   // Red
    },

    // Default Neutral Set (useful for standard UI elements)
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",
  },

  assets: {
    logo: {
      // Adjusted asset paths since we are now in constants folder instead of root
      iconOnly: require("../assets/Rabit icon/Icon.png"),
      iconAndText: require("../assets/Rabit icon and text/Icon and text.png"),
      textOnly: require("../assets/Rabit icon and text/text only.png"),
      favicon: require("../assets/Rabit fav icon all size/icon + background 48x48.png"),
      iconWhite: require("../assets/Rabit icon/Icon white.png"),
      iconAndTextDark: require("../assets/Rabit icon and text/Icon and text(black text).png"),
    },
    dex: {
      drift: {
        fullWhite: require("../assets/Dex/Drift/logomark + text white.png"),
        fullBlack: require("../assets/Dex/Drift/logomark + text black.png"),
        markWhite: require("../assets/Dex/Drift/Drift logomark white.png"),
        markBlack: require("../assets/Dex/Drift/Drift logomark black.png"),
      }
    }
  },

  // Base typography (can be customized later if specific fonts are needed)
  font: {
    family: {
      sans: "'Inter', sans-serif",
    },
    size: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "30px",
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  // Base spacing (4px scale)
  spacing: {
    0: "0",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
  },
  
  // Layout offsets for floating elements
  layout: {
    navBarHeight: 80,
    floatingButtonHeight: 100,
    bottomGap: 50,
  },

  // Base Radius
  radius: {
    none: "0",
    sm: "4px",
    base: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },
} as const;

// Legacy Expo Boilerplate Compatibility Layer
// Added so the default Expo tabs don't crash while we migrate
export const Colors = {
  light: {
    text: tokens.color.light.textPrimary,
    background: tokens.color.light.background,
    tint: tokens.color.brand,
    icon: tokens.color.light.textSecondary,
    tabIconDefault: tokens.color.light.textSecondary,
    tabIconSelected: tokens.color.brand,
  },
  dark: {
    text: tokens.color.dark.textPrimary,
    background: tokens.color.dark.background,
    tint: tokens.color.brand,
    icon: tokens.color.dark.textSecondary,
    tabIconDefault: tokens.color.dark.textSecondary,
    tabIconSelected: tokens.color.brand,
  },
};

export const Fonts = {
  rounded: tokens.font.family.sans,
  mono: tokens.font.family.sans,
};
