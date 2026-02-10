import { Platform } from "react-native";
import { spacing } from "./theme";

export const supportsHeaderLargeTitle = () => {
  return Platform.OS === "ios" && Platform.Version >= "26.0";
};

export const supportsHeaderTransparent = () => {
  return Platform.OS === "ios" && Platform.Version >= "26.0";
};

export const getPlatformBottomOffset = () => {
  return Platform.OS === "ios" ? spacing.md : spacing.md * 10;
};

export const getGenericScrollViewStyles = () => {
  return {
    container: {
      flex: 1,
    },
    content: {
      padding: spacing.md,
      paddingBottom: getPlatformBottomOffset(),
    },
  } as const;
};
