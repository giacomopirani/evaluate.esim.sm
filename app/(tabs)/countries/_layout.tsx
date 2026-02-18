import { Stack } from "expo-router";

export default function CountriesLayout() {
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
          title: "Countries",
          headerLargeTitle: false,
          headerTransparent: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Details",
          headerBackButtonDisplayMode: "default",
        }}
      />
    </Stack>
  );
}
