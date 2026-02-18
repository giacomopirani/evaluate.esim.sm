import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { api, CountryDetailResponse, CountryPlan } from "@/lib/api";
import { getCache, setCache } from "@/lib/cache";
import { usePreferences } from "@/lib/preferences";
import { background, border, radius, spacing, text } from "@/lib/theme";

const ONE_DAYS_MS = 1000 * 60 * 60 * 24; // 24h

export default function CountryDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { language, currency, isReady } = usePreferences();

  const [data, setData] = useState<CountryDetailResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady || !id) return;

    (async () => {
      setLoading(true);

      const cacheKey = `country:v1:${id}:${language}:${currency}`;
      const cached = await getCache<CountryDetailResponse["data"]>(
        cacheKey,
        ONE_DAYS_MS,
      );

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      const res = await api.getCountryDetail(id, language, currency);
      setData(res.data);
      await setCache(cacheKey, res.data);

      setLoading(false);
    })().catch(() => setLoading(false));
  }, [isReady, id, language, currency]);

  const plans = useMemo(() => data?.plans ?? [], [data]);

  if (!isReady || loading || !data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Image source={{ uri: data.country.flag }} style={styles.flag} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{data.country.name}</Text>
          <Text style={styles.subtitle}>{data.country.region}</Text>
        </View>
      </View>

      <FlatList
        data={plans}
        keyExtractor={(p) => String(p.id)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <PlanCard plan={item} />}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Plans ({plans.length})</Text>
        }
      />
    </View>
  );
}

function PlanCard({ plan }: { plan: CountryPlan }) {
  const price =
    plan.salePrice && plan.salePrice > 0 ? plan.salePrice : plan.price;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{plan.name}</Text>

      <View style={styles.kvRow}>
        <Text style={styles.k}>Data</Text>
        <Text style={styles.v}>
          {plan.isUnlimited ? "Unlimited" : `${plan.gb} GB`}
        </Text>
      </View>

      <View style={styles.kvRow}>
        <Text style={styles.k}>Validity</Text>
        <Text style={styles.v}>{plan.days} days</Text>
      </View>

      <View style={styles.kvRow}>
        <Text style={styles.k}>Price</Text>
        <Text style={styles.v}>
          {price} {plan.currency?.toUpperCase()}
        </Text>
      </View>

      <View style={styles.badges}>
        {plan.isRefundable ? <Badge text="Refundable" /> : null}
        {plan.isTetheringAllowed ? <Badge text="Tethering" /> : null}
        {plan.hasTopUps ? <Badge text="Top-ups" /> : null}
        {plan.networkSpeed ? <Badge text={plan.networkSpeed} /> : null}
      </View>
    </View>
  );
}

function Badge({ text: label }: { text: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: background.primary },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: background.primary,
  },
  header: {
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: border.default,
  },
  flag: {
    width: 56,
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: border.default,
    backgroundColor: background.secondary,
  },
  title: { color: text.header, fontSize: 20, fontWeight: "800" },
  subtitle: { color: text.muted, marginTop: 2 },
  listContent: { padding: spacing.md, paddingBottom: spacing.lg },
  sectionTitle: {
    color: text.primary,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: background.secondary,
    borderWidth: 1,
    borderColor: border.default,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  cardTitle: {
    color: text.header,
    fontWeight: "800",
    fontSize: 16,
    marginBottom: spacing.sm,
  },
  kvRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  k: { color: text.muted },
  v: { color: text.primary, fontWeight: "600" },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: border.default,
    backgroundColor: background.primary,
  },
  badgeText: { color: text.primary, fontSize: 12, fontWeight: "600" },
  sep: { height: spacing.md },
});
