"use client";

import { Pencil } from "lucide-react";
import { getAnswerLabel, getQuestionText, type Question } from "./questions";
import type { Country, ScopeAnswers } from "./scoring";

interface CompletedAnswerProps {
  question: Question;
  answerValue: string;
  answers: ScopeAnswers;
  country: Country | null;
  onEdit: () => void;
}

export default function CompletedAnswer({
  question,
  answerValue,
  answers,
  country,
  onEdit,
}: CompletedAnswerProps) {
  const label = getAnswerLabel(question.id, answerValue, answers, country);
  const questionText = getQuestionText(question, answers);

  return (
    <button
      onClick={onEdit}
      className="group flex w-full items-center justify-between gap-3 rounded-btn border border-hub-border/60 bg-white/45 px-4 py-2.5 text-left transition-colors duration-200 hover:border-hub-aqua/35 hover:bg-white"
    >
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-[11px] text-hub-muted">{questionText}</span>
        <span className="truncate text-sm font-medium text-hub-gray">
          {label}
        </span>
      </div>
      <Pencil
        className="size-3.5 shrink-0 text-hub-muted opacity-60 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      />
    </button>
  );
}
