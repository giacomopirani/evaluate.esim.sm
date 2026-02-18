import { api, ParamsResponse } from "@/lib/api";
import { getCache, setCache } from "@/lib/cache";
import { usePreferences } from "@/lib/preferences";
import { background, border, radius, spacing, text } from "@/lib/theme";
import { getGenericScrollViewStyles } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const CACHE_MAX_AGE = 1000 * 60 * 60 * 24;

export default function Homepage() {
  const { language, currency, setLanguage, setCurrency, isReady } =
    usePreferences();
  const [data, setData] = useState<ParamsResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady) return;
    (async () => {
      setLoading(true);
      const cacheKey = "params:v1";
      const cached = await getCache<ParamsResponse["data"]>(
        cacheKey,
        CACHE_MAX_AGE,
      );
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }
      const res = await api.getParams();
      setData(res.data);
      await setCache(cacheKey, res.data);
      setLoading(false);
    })().catch(() => setLoading(false));
  }, [isReady]);

  const languages = useMemo(
    () => (data ? Object.entries(data.languages) : []),
    [data],
  );
  const currencies = useMemo(
    () => (data ? Object.entries(data.currencies) : []),
    [data],
  );

  if (!isReady || loading) {
    return (
      <View style={[styles.center]}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Preferences</Text>

      <Text style={styles.sectionTitle}>Language</Text>
      <View style={styles.grid}>
        {languages.map(([code, label]) => (
          <Pressable
            key={code}
            onPress={() => setLanguage(code)}
            style={[styles.pill, language === code && styles.pillActive]}
          >
            <Text
              style={[
                styles.pillText,
                language === code && styles.pillTextActive,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Currency</Text>
      <View style={styles.grid}>
        {currencies.map(([code, label]) => (
          <Pressable
            key={code}
            onPress={() => setCurrency(code)}
            style={[styles.pill, currency === code && styles.pillActive]}
          >
            <Text
              style={[
                styles.pillText,
                currency === code && styles.pillTextActive,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...getGenericScrollViewStyles(),
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: text.header,
    marginBottom: 36,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: border.default,
    backgroundColor: background.secondary,
  },
  pillActive: {
    borderColor: border.brand,
    backgroundColor: background.brandLight,
  },
  pillText: { color: text.primary, fontWeight: "600" },
  pillTextActive: { color: text.link },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: background.primary,
  },
});
