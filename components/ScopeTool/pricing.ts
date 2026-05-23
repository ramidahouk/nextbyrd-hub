import {
  canDeriveResultPath,
  getResultPath,
  type Country,
  type ResultPath,
  type ScopeAnswers,
} from "./scoring";

export interface CountryConfig {
  label: string;
  currency: "EUR" | "GBP" | "USD" | "AED";
  prefix: string;
}

export interface PriceRange {
  low: number;
  high: number;
}

export const COUNTRIES: Record<Country, CountryConfig> = {
  france: { label: "France / Europe", currency: "EUR", prefix: "\u20ac" },
  uk: { label: "United Kingdom", currency: "GBP", prefix: "\u00a3" },
  usa: { label: "United States", currency: "USD", prefix: "$" },
  uae: { label: "UAE / Gulf", currency: "AED", prefix: "AED" },
};

export const MARKET_PRICING: Record<ResultPath, Record<Country, PriceRange>> = {
  "local-showcase": {
    france: { low: 2000, high: 8000 },
    uk: { low: 2000, high: 6000 },
    usa: { low: 3000, high: 12000 },
    uae: { low: 6000, high: 20000 },
  },
  "local-booking": {
    france: { low: 4000, high: 12000 },
    uk: { low: 4000, high: 12000 },
    usa: { low: 6000, high: 20000 },
    uae: { low: 12000, high: 35000 },
  },
  "local-full": {
    france: { low: 5000, high: 15000 },
    uk: { low: 5000, high: 14000 },
    usa: { low: 8000, high: 22000 },
    uae: { low: 15000, high: 40000 },
  },
  "ecommerce-standard": {
    france: { low: 5000, high: 15000 },
    uk: { low: 5000, high: 15000 },
    usa: { low: 8000, high: 30000 },
    uae: { low: 10000, high: 45000 },
  },
  "ecommerce-complex": {
    france: { low: 15000, high: 60000 },
    uk: { low: 15000, high: 50000 },
    usa: { low: 30000, high: 100000 },
    uae: { low: 45000, high: 150000 },
  },
  portfolio: {
    france: { low: 1500, high: 5000 },
    uk: { low: 1500, high: 5000 },
    usa: { low: 3000, high: 10000 },
    uae: { low: 5000, high: 18000 },
  },
  "portfolio-booking": {
    france: { low: 4000, high: 12000 },
    uk: { low: 4000, high: 12000 },
    usa: { low: 6000, high: 20000 },
    uae: { low: 12000, high: 35000 },
  },
  "client-portal": {
    france: { low: 10000, high: 30000 },
    uk: { low: 10000, high: 40000 },
    usa: { low: 20000, high: 50000 },
    uae: { low: 74000, high: 184000 },
  },
  nonprofit: {
    france: { low: 13000, high: 55000 },
    uk: { low: 12000, high: 50000 },
    usa: { low: 15000, high: 60000 },
    uae: { low: 55000, high: 220000 },
  },
  generic: {
    france: { low: 2000, high: 15000 },
    uk: { low: 2000, high: 12000 },
    usa: { low: 3000, high: 20000 },
    uae: { low: 7000, high: 45000 },
  },
};

export function formatPrice(country: Country, amount: number): string {
  const formatted = amount.toLocaleString("en-US");
  const prefix = COUNTRIES[country].prefix;

  if (prefix === "$" || prefix === "\u20ac" || prefix === "\u00a3") {
    return `${prefix}${formatted}`;
  }
  return `${prefix} ${formatted}`;
}

export function formatRange(country: Country, range: PriceRange): string {
  return `${formatPrice(country, range.low)} - ${formatPrice(country, range.high)}`;
}

export function getPriceRange(path: ResultPath, country: Country): PriceRange {
  return MARKET_PRICING[path][country];
}

function roundToNearestHundred(value: number): number {
  return Math.round(value / 100) * 100;
}

export function getAdjustedRange(
  path: ResultPath,
  country: Country,
  answers: ScopeAnswers,
): PriceRange {
  const range = getPriceRange(path, country);
  let low = range.low;
  let high = range.high;

  if (answers.updates === "self") {
    low *= 1.1;
    high *= 1.1;
  }

  if (answers.accounts === "yes") {
    low *= 1.12;
    high *= 1.12;
  }

  if (answers.design === "high-end") {
    low *= 1.15;
    high *= 1.2;
  }

  if (answers.design === "simple") {
    low *= 0.9;
    high *= 0.85;
  }

  return {
    low: roundToNearestHundred(low),
    high: roundToNearestHundred(high),
  };
}

export function getWideCountryRange(country: Country): PriceRange {
  const ranges = Object.values(MARKET_PRICING).map((pricing) => pricing[country]);
  return {
    low: Math.min(...ranges.map((range) => range.low)),
    high: Math.max(...ranges.map((range) => range.high)),
  };
}

export function getLiveRange(
  answers: ScopeAnswers,
  country: Country | null,
): PriceRange | null {
  if (!country) return null;
  if (!canDeriveResultPath(answers)) return getWideCountryRange(country);
  return getAdjustedRange(getResultPath(answers), country, answers);
}

export function getBudgetOptions(
  country: Country,
  path: ResultPath,
  answers: ScopeAnswers,
) {
  const range = getAdjustedRange(path, country, answers);
  return [
    {
      label: `Under ${formatPrice(country, range.low)}`,
      value: "under-floor",
    },
    {
      label: `${formatPrice(country, range.low)} - ${formatPrice(country, range.high)}`,
      value: "in-range",
    },
    {
      label: `Over ${formatPrice(country, range.high)}`,
      value: "over-range",
    },
    {
      label: "No budget set yet",
      value: "none",
    },
  ];
}

export function hasBudgetUndershoot(
  answers: ScopeAnswers,
  path: ResultPath,
  country: Country,
): boolean {
  return answers.budget === "under-floor" && getAdjustedRange(path, country, answers).low > 0;
}
