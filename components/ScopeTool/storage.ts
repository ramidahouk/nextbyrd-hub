import type { Country, ScopeAnswers } from "./scoring";

const ANSWERS_KEY = "hub_scope_answers";
const COUNTRY_KEY = "hub_scope_country";

export function loadAnswers(): ScopeAnswers {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(ANSWERS_KEY);
    return raw ? (JSON.parse(raw) as ScopeAnswers) : {};
  } catch {
    return {};
  }
}

export function loadCountry(): Country | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COUNTRY_KEY);
    if (raw === "france" || raw === "uk" || raw === "usa" || raw === "uae") {
      return raw;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveAnswers(answers: ScopeAnswers): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
  } catch {
    // localStorage unavailable - proceed without persistence
  }
}

export function saveCountry(country: Country | null): void {
  if (typeof window === "undefined") return;
  try {
    if (country) {
      localStorage.setItem(COUNTRY_KEY, country);
    } else {
      localStorage.removeItem(COUNTRY_KEY);
    }
  } catch {
    // ignore
  }
}

export function clearScopeStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(ANSWERS_KEY);
    localStorage.removeItem(COUNTRY_KEY);
  } catch {
    // ignore
  }
}
