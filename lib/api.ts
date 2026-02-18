const BASE_URL = "https://esim.sm/api/v2/evaluate";

export type ParamsResponse = {
  success: boolean;
  data: {
    languages: Record<string, string>;
    currencies: Record<string, string>;
  };
};

export type CountryListItem = {
  id: string;
  name: string;
  region: string;
  startingFrom: string;
  isRegion: boolean;
  warnings: string;
  description: string;
  searchTerms: string[];
  flag: string;
  banner: string;
};

export type CountriesResponse = {
  success: boolean;
  data: CountryListItem[];
};

export type CountryPlan = {
  id: number;
  name: string;
  mb: number;
  days: number;
  price: number;
  salePrice: number;
  currency: string;
  gb: number;
  description: string;
  carriers: string[];
  isUnlimited: boolean;
  hasTopUps: boolean;
  isRefundable: boolean;
  isTetheringAllowed: boolean;
  networkSpeed: string;
  activationDays: number;
  thumbnailUrl: string;
  publicUrl: string;
};

export type CountryDetailResponse = {
  success: boolean;
  data: {
    country: Omit<CountryListItem, "searchTerms">;
    plans: CountryPlan[];
  };
};

function qs(params: Record<string, string | undefined>) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v) sp.set(k, v);
  });
  const s = sp.toString();
  return s ? `?${s}` : "";
}

async function requestJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status} on ${path}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getParams: () => requestJson<ParamsResponse>("/params"),
  getCountries: (language?: string, currency?: string) =>
    requestJson<CountriesResponse>(`/countries${qs({ language, currency })}`),
  getCountryDetail: (id: string, language?: string, currency?: string) =>
    requestJson<CountryDetailResponse>(
      `/countries${qs({ id, language, currency })}`,
    ),
};
