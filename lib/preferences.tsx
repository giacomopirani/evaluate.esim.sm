import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Preferences = {
  language: string;
  currency: string;
  setLanguage: (v: string) => void;
  setCurrency: (v: string) => void;
  isReady: boolean;
};

const PreferencesContext = createContext<Preferences | null>(null);

const STORAGE_KEY = "prefs:v1";

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] = useState("en");
  const [currency, setCurrencyState] = useState("eur");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as {
            language?: string;
            currency?: string;
          };
          if (parsed.language) setLanguageState(parsed.language);
          if (parsed.currency) setCurrencyState(parsed.currency);
        } catch {}
      }
      setIsReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ language, currency }),
    ).catch(() => {});
  }, [language, currency, isReady]);

  const value = useMemo(
    () => ({
      language,
      currency,
      setLanguage: setLanguageState,
      setCurrency: setCurrencyState,
      isReady,
    }),
    [language, currency, isReady],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx)
    throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
