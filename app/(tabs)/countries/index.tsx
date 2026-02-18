import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { api, CountryListItem } from "@/lib/api";
import { getCache, setCache } from "@/lib/cache";
import { usePreferences } from "@/lib/preferences";
import { background, border, radius, spacing, text } from "@/lib/theme";

const ONE_DAYS_MS = 1000 * 60 * 60 * 24; // 24h

export default function Countries() {
  const router = useRouter();
  const { language, currency, isReady } = usePreferences();

  const [items, setItems] = useState<CountryListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isReady) return;

    (async () => {
      setLoading(true);

      const cacheKey = `countries:v1:${language}:${currency}`;
      const cached = await getCache<CountryListItem[]>(cacheKey, ONE_DAYS_MS);

      if (cached) {
        setItems(cached);
        setLoading(false);
        return;
      }

      const res = await api.getCountries(language, currency);
      setItems(res.data);
      await setCache(cacheKey, res.data);

      setLoading(false);
    })().catch(() => setLoading(false));
  }, [isReady, language, currency]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    return items.filter((c) => {
      const name = c.name?.toLowerCase() ?? "";
      const region = c.region?.toLowerCase() ?? "";
      const terms = (c.searchTerms ?? []).join(" ").toLowerCase();
      return name.includes(q) || region.includes(q) || terms.includes(q);
    });
  }, [items, query]);

  function onOpenCountry(id: string) {
    router.push({
      pathname: "/(tabs)/countries/[id]",
      params: { id },
    });
  }

  if (!isReady || loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search countries..."
          placeholderTextColor={text.muted}
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.search}
        />
        <Text style={styles.meta}>
          {filtered.length} / {items.length}
        </Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable onPress={() => onOpenCountry(item.id)} style={styles.row}>
            <Image source={{ uri: item.flag }} style={styles.flag} />
            <View style={styles.rowBody}>
              <Text style={styles.rowTitle} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.rowSub} numberOfLines={1}>
                {item.region} • from {item.startingFrom}{" "}
                {currency.toUpperCase()}
              </Text>
              {!!item.warnings && (
                <Text style={styles.rowWarn} numberOfLines={1}>
                  {item.warnings}
                </Text>
              )}
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: background.primary,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: background.primary,
  },
  searchWrap: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  search: {
    borderWidth: 1,
    borderColor: border.default,
    backgroundColor: background.secondary,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: text.primary,
    fontSize: 16,
  },
  meta: {
    marginTop: spacing.xs,
    color: text.muted,
    fontSize: 12,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  flag: {
    width: 44,
    height: 30,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: border.default,
    backgroundColor: background.secondary,
  },
  rowBody: { flex: 1 },
  rowTitle: { color: text.header, fontWeight: "700", fontSize: 16 },
  rowSub: { color: text.primary, marginTop: 2, fontSize: 13 },
  rowWarn: { color: text.muted, marginTop: 2, fontSize: 12 },
  sep: { height: 1, backgroundColor: border.default, opacity: 0.5 },
});
