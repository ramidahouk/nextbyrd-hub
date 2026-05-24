"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { getQuestionText, type Question } from "./questions";
import type { Country, ScopeAnswers } from "./scoring";

interface QuestionScreenProps {
  question: Question;
  stepNumber: number;
  answers: ScopeAnswers;
  country: Country | null;
  onAnswer: (value: string) => void;
  onBack: () => void;
  showBack: boolean;
}

export default function QuestionScreen({
  question,
  stepNumber,
  answers,
  country,
  onAnswer,
  onBack,
  showBack,
}: QuestionScreenProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const options = question.getOptions(answers, country);
  const questionText = getQuestionText(question, answers);

  function handleSelect(value: string) {
    if (selected) return;
    setSelected(value);
    setTimeout(() => onAnswer(value), 300);
  }

  return (
    <div className="flex flex-col gap-6 rounded-card border border-hub-border bg-white px-6 pb-8 pt-6 shadow-hub-standard sm:px-8">
      <p className="text-xs font-medium uppercase tracking-wide text-hub-muted">
        Step {stepNumber} of 5
      </p>

      <h2 className="text-lg font-semibold leading-snug text-hub-navy">
        {questionText}
      </h2>

      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const isSelected = selected === opt.value;
          const Icon = opt.icon;

          return (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              disabled={Boolean(selected)}
              className={cn(
                "flex min-h-13 w-full items-center gap-3 rounded-btn border px-5 py-4 text-left text-sm font-medium transition-all duration-200",
                isSelected
                  ? "border-hub-aqua bg-[rgba(4,127,155,0.08)] text-hub-navy"
                  : "border-hub-border bg-hub-surface text-hub-navy hover:border-hub-aqua/50 hover:bg-[rgba(4,127,155,0.04)]",
                selected && !isSelected && "pointer-events-none opacity-35",
              )}
            >
              {Icon ? (
                <Icon className="size-[18px] shrink-0 text-hub-aqua" aria-hidden="true" />
              ) : null}
              <span className="leading-snug">{opt.label}</span>
            </button>
          );
        })}
      </div>

      {showBack ? (
        <button
          onClick={onBack}
          className="self-start text-sm text-hub-muted transition-colors hover:text-hub-gray"
        >
          &larr; Back
        </button>
      ) : null}
    </div>
  );
}
