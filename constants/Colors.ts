import { background, brand, text } from "@/lib/theme";

export default {
  light: {
    text: text.primary,
    background: background.primary,
    tint: brand.primary,
    tabIconDefault: text.muted,
    tabIconSelected: brand.primary,
  },
  dark: {
    text: text.inverse,
    background: background.inverse,
    tint: brand.primary,
    tabIconDefault: text.muted,
    tabIconSelected: brand.primary,
  },
};
