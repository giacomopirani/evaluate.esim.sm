import {
  background,
  fontSize,
  opacity,
  radius,
  spacing,
  text,
  withOpacity,
} from "@/lib/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Open up the code for this screen:</Text>
      <Text style={styles.path}>{path}</Text>
      <Text style={styles.text}>
        Change any of the text, save the file, and your app will automatically
        update.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: fontSize.base,
    lineHeight: fontSize["2xl"],
    color: text.primary,
  },
  path: {
    borderRadius: radius.sm,
    paddingHorizontal: spacing.xs,
    backgroundColor: withOpacity(background.inverse, opacity.hover),
    fontFamily: "SpaceMono",
    fontSize: fontSize.sm,
    color: text.inverse,
    textAlign: "center",
  },
});
