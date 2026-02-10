import { background, brand } from "@/lib/theme";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import React from "react";

export default function NativeTabsLayout() {
  return (
    <NativeTabs
      labelVisibilityMode="labeled"
      minimizeBehavior="never"
      indicatorColor={brand.primaryLightest}
      backgroundColor={background.primary}
      tintColor={brand.primary}
    >
      <NativeTabs.Trigger name="homepage">
        <Label>Homepage</Label>
        <Icon
          sf={{ default: "house", selected: "house.fill" }}
          androidSrc={
            <VectorIcon family={MaterialCommunityIcons} name="home" />
          }
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="countries">
        <Icon
          sf={{ default: "globe.americas", selected: "globe.americas.fill" }}
          androidSrc={<VectorIcon family={SimpleLineIcons} name="globe" />}
        />
        <Label>Countries</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
