"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { motion } from "motion/react";
import { formatRange, getAdjustedRange } from "./pricing";
import { getResultCopy } from "./resultCopy";
import type { Country, ResultPath, ScopeAnswers } from "./scoring";

interface ResultPanelProps {
  answers: ScopeAnswers;
  country: Country;
  resultPath: ResultPath;
  onReset: () => void;
  onCtaClick: () => void;
}

export default function ResultPanel({
  answers,
  country,
  resultPath,
  onReset,
  onCtaClick,
}: ResultPanelProps) {
  const copy = getResultCopy(resultPath, answers, country);
  const price = formatRange(country, getAdjustedRange(resultPath, country, answers));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className="overflow-hidden rounded-card border border-hub-border bg-white shadow-hub-standard"
      style={{ borderTop: "3px solid #66023C" }}
    >
      <div className="flex flex-col gap-6 px-6 py-7 sm:px-8">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center rounded-badge bg-hub-aqua px-3 py-1 text-xs font-semibold text-white">
            {copy.badge}
          </span>

          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold leading-tight text-hub-navy">
              {copy.headline}
            </h3>
            <p className="text-3xl font-bold tracking-tight text-hub-aqua">
              {price}
            </p>
            <p className="text-xs leading-relaxed text-hub-muted">
              These ranges reflect what professional agencies charge in your market in 2026.
              Freelancers may quote less. Enterprise agencies may quote more.
            </p>
          </div>
        </div>

        <Divider />

        <ul className="flex flex-col gap-3">
          {copy.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-hub-navy"
            >
              <span
                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-hub-aqua"
                aria-hidden="true"
              />
              {bullet}
            </li>
          ))}
        </ul>

        <CtaBlock
          label={copy.ctaLabel}
          button={copy.ctaButton}
          onCtaClick={onCtaClick}
        />

        <Divider />

        <section className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-hub-navy">
            What you&apos;ll pay after launch
          </h4>
          <div className="grid gap-2">
            {copy.ongoingCosts.map((cost) => (
              <div
                key={cost.item}
                className="grid grid-cols-[1fr_auto] gap-4 text-sm leading-relaxed"
              >
                <span className="text-hub-gray">{cost.item}</span>
                <span className="text-right font-medium text-hub-navy">
                  {cost.range}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs leading-relaxed text-hub-muted">
            Maintenance or retainers cover updates, security patches, and content changes.
            Some agencies quote them separately.
          </p>
        </section>

        <Divider />

        <section className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-hub-navy">
            Should you use a website builder instead?
          </h4>
          <p className="text-sm leading-relaxed text-hub-gray">
            {copy.builderComparison}
          </p>
          <div className="flex gap-2 text-xs leading-relaxed text-hub-muted">
            <Lock className="mt-0.5 size-3.5 shrink-0" />
            <span>
              Wix, Squarespace, and Framer do not let you export your site.
              Leaving means rebuilding from scratch.
            </span>
          </div>
        </section>

        <Divider />

        <section className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-hub-navy">
            Typically quoted separately
          </h4>
          <ul className="flex flex-col gap-2">
            {copy.notIncluded.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-hub-gray"
              >
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-hub-muted"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <CtaBlock
          label={copy.ctaLabel}
          button={copy.ctaButton}
          onCtaClick={onCtaClick}
        />

        <button
          onClick={onReset}
          className="text-center text-xs text-hub-muted transition-colors hover:text-hub-gray"
        >
          Reset answers
        </button>
      </div>
    </motion.div>
  );
}

function Divider() {
  return <div className="h-px bg-hub-border" />;
}

function CtaBlock({
  label,
  button,
  onCtaClick,
}: {
  label: string;
  button: string;
  onCtaClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-hub-muted">{label}</p>
      <Link
        href="https://nextbyrd.com/contact"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onCtaClick}
        className="flex min-h-13 w-full items-center justify-center rounded-btn bg-hub-aqua px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-hub-aqua-dark"
      >
        {button}
        <span aria-hidden="true">&nbsp;&rarr;</span>
      </Link>
    </div>
  );
}
