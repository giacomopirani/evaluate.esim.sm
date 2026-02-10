/**
 * Theme configuration for the application
 * Contains colors, spacing, and other design tokens
 */

export const brand = {
  primary: "#cf2d83",
  primaryLight: "#e85ba3",
  primaryLighter: "#f5a3c7",
  primaryLightest: "#fce4ef",
  primaryDark: "#a8246a",
  primaryDarker: "#7d1b50",
  primaryDarkest: "#521438",
} as const;

export const semantic = {
  success: "#10b981",
  successLight: "#34d399",
  successLighter: "#a7f3d0",
  successLightest: "#d1fae5",
  successDark: "#059669",

  error: "#ef4444",
  errorLight: "#f87171",
  errorLighter: "#fca5a5",
  errorLightest: "#fee2e2",
  errorDark: "#dc2626",

  warning: "#f59e0b",
  warningLight: "#fbbf24",
  warningLighter: "#fde68a",
  warningLightest: "#fef3c7",
  warningDark: "#d97706",

  info: "#3b82f6",
  infoLight: "#60a5fa",
  infoLighter: "#93c5fd",
  infoLightest: "#dbeafe",
  infoDark: "#2563eb",
} as const;

export const text = {
  primary: "#1f2937",
  secondary: "#4b5563",
  muted: "#6b7280",
  inverse: "#ffffff",
  header: "#111827",
  link: brand.primary,
  linkHover: brand.primaryDark,
  success: semantic.success,
  error: semantic.error,
  warning: semantic.warning,
  info: semantic.info,
} as const;

export const background = {
  primary: "#ffffff",
  secondary: "#f9fafb",
  tertiary: "#f3f4f6",
  muted: "#f2f2f2",
  inverse: "#111827",
  brand: brand.primary,
  brandLight: brand.primaryLightest,
  success: semantic.successLightest,
  error: semantic.errorLightest,
  warning: semantic.warningLightest,
  info: semantic.infoLightest,
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.1)",
} as const;

export const border = {
  default: "#e5e7eb",
  light: "#f3f4f6",
  dark: "#d1d5db",
  brand: brand.primary,
  brandLight: brand.primaryLight,
  brandLighter: brand.primaryLighter,
  success: semantic.success,
  error: semantic.error,
  warning: semantic.warning,
  info: semantic.info,
  focus: brand.primary,
  focusRing: `${brand.primary}40`,
} as const;

export const shadow = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  brand: `0 4px 6px -1px ${brand.primary}20`,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
} as const;

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 24,
  full: 9999,
} as const;

export const opacity = {
  disabled: 0.5,
  hover: 0.8,
  pressed: 0.7,
  overlay: 0.5,
  light: 0.1,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
} as const;

export const theme = {
  brand,
  semantic,
  text,
  background,
  border,
  shadow,
  spacing,
  radius,
  opacity,
  fontSize,
} as const;

export type BrandColor = (typeof brand)[keyof typeof brand];
export type SemanticColor = (typeof semantic)[keyof typeof semantic];
export type TextColor = (typeof text)[keyof typeof text];
export type BackgroundColor = (typeof background)[keyof typeof background];
export type BorderColor = (typeof border)[keyof typeof border];
export type FontSize = (typeof fontSize)[keyof typeof fontSize];

export const withOpacity = (color: string, opacity: number): string => {
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  if (color.startsWith("rgba") || color.startsWith("hsla")) {
    return color.replace(/[\d.]+\)$/g, `${opacity})`);
  }
  return color;
};

export default theme;
