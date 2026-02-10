import {
  supportsHeaderLargeTitle,
  supportsHeaderTransparent,
} from "@/lib/utils";
import { Stack } from "expo-router";

export default function HomepageLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "default",
        headerBackButtonMenuEnabled: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Homepage",
          headerLargeTitle: supportsHeaderLargeTitle(),
          headerTransparent: supportsHeaderTransparent(),
        }}
      />
    </Stack>
  );
}
