import { ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { getGenericScrollViewStyles } from "@/lib/utils";

export default function Countries() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <EditScreenInfo path="app/(tabs)/countries/index.tsx" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...getGenericScrollViewStyles(),
});
