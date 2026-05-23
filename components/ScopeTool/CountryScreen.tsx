"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { COUNTRIES } from "./pricing";
import type { Country } from "./scoring";

const countryOrder: Country[] = ["france", "uk", "usa", "uae"];

interface CountryScreenProps {
  selectedCountry: Country | null;
  onSelect: (country: Country) => void;
  onStart: () => void;
}

export default function CountryScreen({
  selectedCountry,
  onSelect,
  onStart,
}: CountryScreenProps) {
  const [localCountry, setLocalCountry] = useState<Country | null>(selectedCountry);
  const activeCountry = localCountry ?? selectedCountry;

  function handleSelect(country: Country) {
    setLocalCountry(country);
    onSelect(country);
  }

  return (
    <div className="flex flex-col gap-6 rounded-card border border-hub-border bg-white px-6 pb-8 pt-6 shadow-hub-standard sm:px-8">
      <p className="text-xs font-medium uppercase tracking-wide text-hub-muted">
        Where are you based?
      </p>

      <div className="grid gap-2 sm:grid-cols-2">
        {countryOrder.map((country) => {
          const isSelected = activeCountry === country;
          return (
            <button
              key={country}
              onClick={() => handleSelect(country)}
              className={cn(
                "min-h-13 rounded-btn border px-5 py-4 text-left text-sm font-medium transition-all duration-200",
                isSelected
                  ? "border-hub-aqua bg-[rgba(5,142,173,0.08)] text-hub-navy"
                  : "border-hub-border bg-hub-surface text-hub-navy hover:border-hub-aqua/50",
              )}
            >
              {COUNTRIES[country].label}
            </button>
          );
        })}
      </div>

      <button
        onClick={onStart}
        disabled={!activeCountry}
        className={cn(
          "flex min-h-13 w-full items-center justify-center rounded-btn bg-hub-aqua px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-hub-aqua-dark",
          !activeCountry && "pointer-events-none opacity-40",
        )}
      >
        Let&apos;s find out &rarr;
      </button>
    </div>
  );
}
