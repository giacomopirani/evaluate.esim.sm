import AsyncStorage from "@react-native-async-storage/async-storage";

type CacheEntry<T> = { v: T; t: number };

export async function getCache<T>(
  key: string,
  maxAgeMs: number,
): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() - parsed.t > maxAgeMs) return null;
    return parsed.v;
  } catch {
    return null;
  }
}

export async function setCache<T>(key: string, value: T): Promise<void> {
  const entry: CacheEntry<T> = { v: value, t: Date.now() };
  await AsyncStorage.setItem(key, JSON.stringify(entry));
}
