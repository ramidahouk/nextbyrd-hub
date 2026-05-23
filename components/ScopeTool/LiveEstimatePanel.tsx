"use client";

import { useEffect } from "react";
import {
  motion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { AlertCircle, Lock, TrendingDown, TrendingUp } from "lucide-react";
import {
  COUNTRIES,
  formatRange,
  getAdjustedRange,
  getLiveRange,
  getWideCountryRange,
  type PriceRange,
} from "./pricing";
import {
  canDeriveResultPath,
  getResultPath,
  type Country,
  type ScopeAnswers,
} from "./scoring";

interface LiveEstimatePanelProps {
  answers: ScopeAnswers;
  country: Country | null;
  activeStep: number;
  calculating: boolean;
}

const digitFontSize = 30;
const digitHeight = digitFontSize + 8;

function getExplanation(
  answers: ScopeAnswers,
  activeStep: number,
): { direction: "up" | "down" | "neutral"; text: string } | null {
  if (answers.budget === "under-floor") {
    return {
      direction: "neutral",
      text: "Most builds in this category start above this budget - we can discuss what's realistic.",
    };
  }

  if (activeStep >= 5 && answers.design === "high-end") {
    return {
      direction: "up",
      text: "Premium design takes more time - a small lift in the range.",
    };
  }
  if (activeStep >= 5 && answers.design === "simple") {
    return {
      direction: "down",
      text: "Simpler design keeps the build focused - a small reduction in the range.",
    };
  }

  if (activeStep < 4) return null;

  if (answers.accounts === "yes") {
    return {
      direction: "up",
      text: "Customer accounts add order history and auth - that increases scope.",
    };
  }
  if (answers.updates === "self") {
    return {
      direction: "up",
      text: "Managing content yourself means a CMS is included - that's reflected here.",
    };
  }
  if (answers.updates === "agency") {
    return {
      direction: "down",
      text: "No CMS needed - leaner build. Factor in an ongoing retainer for updates.",
    };
  }
  return null;
}

export default function LiveEstimatePanel({
  answers,
  country,
  activeStep,
  calculating,
}: LiveEstimatePanelProps) {
  if (!country) {
    return (
      <div className="flex min-h-[280px] items-center justify-center text-center text-sm text-hub-muted">
        Your estimate will appear here.
      </div>
    );
  }

  const wideRange = getWideCountryRange(country);
  const range = getLiveRange(answers, country) ?? wideRange;
  const resultPath = canDeriveResultPath(answers) ? getResultPath(answers) : null;
  const countryLabel = COUNTRIES[country].label;
  const note = getExplanation(answers, activeStep);
  const hasSpecificRange = Boolean(resultPath);

  return (
    <aside className="sticky top-24 rounded-card border border-hub-border bg-white p-6 shadow-hub-standard">
      <div className="flex flex-col gap-5">
        <p className="text-xs font-medium uppercase tracking-wide text-hub-muted">
          Live estimate
        </p>

        {activeStep === 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm leading-relaxed text-hub-gray">
              In {countryLabel}, most professional websites cost:
            </p>
            <AnimatedRange
              country={country}
              range={wideRange}
              className="text-2xl font-bold text-hub-aqua"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-hub-muted">
              {calculating
                ? "Almost there..."
                : activeStep >= 4
                  ? "Almost there..."
                  : hasSpecificRange
                    ? "Narrowing your estimate..."
                    : "Answer one more question to narrow the range."}
            </p>

            <AnimatedRange
              country={country}
              range={range}
              className={
                hasSpecificRange
                  ? "text-3xl font-bold text-hub-aqua"
                  : "text-2xl font-semibold text-hub-muted"
              }
            />

            {note ? (
              <div
                className={
                  note.direction === "neutral"
                    ? "flex gap-2 rounded-card bg-red-50 p-3 text-sm leading-relaxed text-red-900"
                    : "flex gap-2 text-sm leading-relaxed text-hub-muted"
                }
              >
                {note.direction === "up" ? (
                  <TrendingUp className="mt-0.5 size-3.5 shrink-0 text-hub-aqua" />
                ) : note.direction === "down" ? (
                  <TrendingDown className="mt-0.5 size-3.5 shrink-0 text-hub-aqua" />
                ) : (
                  <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                )}
                <span>{note.text}</span>
              </div>
            ) : null}
          </div>
        )}

        {resultPath ? (
          <div className="flex gap-2 border-t border-hub-border pt-4 text-xs leading-relaxed text-hub-muted">
            <Lock className="mt-0.5 size-3.5 shrink-0" />
            <span>
              Result path is now based on your business type and core functionality.
            </span>
          </div>
        ) : null}

        {resultPath ? (
          <span className="sr-only">
            Final path range: {formatRange(country, getAdjustedRange(resultPath, country, answers))}
          </span>
        ) : null}
      </div>
    </aside>
  );
}

function AnimatedRange({
  country,
  range,
  className,
}: {
  country: Country;
  range: PriceRange;
  className: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
      <AnimatedPrice country={country} value={range.low} maxValue={range.high} />
      <span aria-hidden="true">-</span>
      <AnimatedPrice country={country} value={range.high} maxValue={range.high} />
    </div>
  );
}

function AnimatedPrice({
  country,
  value,
  maxValue,
}: {
  country: Country;
  value: number;
  maxValue: number;
}) {
  const prefix = COUNTRIES[country].prefix;
  const places = getPlaces(maxValue);

  return (
    <span className="inline-flex items-center tabular-nums" aria-label={formatPriceLabel(country, value)}>
      <span className={prefix === "AED" ? "mr-1" : ""}>{prefix}</span>
      <span className="inline-flex overflow-hidden leading-none" style={{ fontSize: digitFontSize }}>
        {places.map((place) => (
          <DigitGroup key={place} place={place} value={value} />
        ))}
      </span>
    </span>
  );
}

function DigitGroup({ place, value }: { place: number; value: number }) {
  const hideLeading = place > 1 && value < place;
  const showComma = place === 1000 && value >= 10000;

  return (
    <>
      <Digit place={place} value={value} hidden={hideLeading} />
      {showComma ? <span className="px-0.5">,</span> : null}
    </>
  );
}

function Digit({
  place,
  value,
  hidden,
}: {
  place: number;
  value: number;
  hidden: boolean;
}) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 120,
    damping: 22,
    mass: 0.8,
  });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <span
      className={hidden ? "relative w-[1ch] opacity-0" : "relative w-[1ch]"}
      style={{ height: digitHeight }}
      aria-hidden="true"
    >
      {[...Array(10).keys()].map((number) => (
        <Number key={number} mv={animatedValue} number={number} />
      ))}
    </span>
  );
}

function Number({ mv, number }: { mv: MotionValue<number>; number: number }) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let nextY = offset * digitHeight;

    if (offset > 5) nextY -= 10 * digitHeight;

    return nextY;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}

function getPlaces(maxValue: number): number[] {
  const digitCount = Math.max(1, String(maxValue).length);
  return Array.from({ length: digitCount }, (_, index) =>
    10 ** (digitCount - index - 1),
  );
}

function formatPriceLabel(country: Country, value: number): string {
  const formatted = value.toLocaleString("en-US");
  const prefix = COUNTRIES[country].prefix;
  if (prefix === "AED") return `${prefix} ${formatted}`;
  return `${prefix}${formatted}`;
}
