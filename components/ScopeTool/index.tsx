"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { track } from "@/lib/analytics";
import CompletedAnswer from "./CompletedAnswer";
import CountryScreen from "./CountryScreen";
import LiveEstimatePanel from "./LiveEstimatePanel";
import ProgressBar from "./ProgressBar";
import QuestionScreen from "./QuestionScreen";
import ResultPanel from "./ResultPanel";
import { getQuestion } from "./questions";
import {
  canDeriveResultPath,
  getQuestionIdForStep,
  getResultPath,
  getStepForQuestionId,
  isComplete,
  trimAnswersAfterStep,
  type BusinessType,
  type Country,
  type QuestionId,
  type ScopeAnswers,
} from "./scoring";
import {
  clearScopeStorage,
  loadAnswers,
  loadCountry,
  saveAnswers,
  saveCountry,
} from "./storage";

const stepOrder: number[] = [1, 2, 3, 4, 5];

function valueForQuestion(answers: ScopeAnswers, id: QuestionId): string | undefined {
  return answers[id];
}

function firstUnansweredStep(answers: ScopeAnswers): number {
  for (const step of stepOrder) {
    const id = getQuestionIdForStep(step, answers);
    if (!id || !valueForQuestion(answers, id)) return step;
  }
  return 6;
}

function withAnswer(
  answers: ScopeAnswers,
  id: QuestionId,
  value: string,
): ScopeAnswers {
  const next = { ...answers };

  if (id === "business_type") next.business_type = value as BusinessType;
  if (id === "functionality") next.functionality = value;
  if (id === "updates") next.updates = value as ScopeAnswers["updates"];
  if (id === "accounts") next.accounts = value as ScopeAnswers["accounts"];
  if (id === "design") next.design = value as ScopeAnswers["design"];
  if (id === "budget") next.budget = value as ScopeAnswers["budget"];

  return next;
}

export default function ScopeTool() {
  const [mounted, setMounted] = useState(false);
  const [country, setCountry] = useState<Country | null>(null);
  const [answers, setAnswers] = useState<ScopeAnswers>({});
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [calculating, setCalculating] = useState(false);
  const completeTrackedRef = useRef(false);
  const calculatingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const restoredCountry = loadCountry();
      const restoredAnswers = loadAnswers();

      setCountry(restoredCountry);
      setAnswers(restoredAnswers);
      setActiveStep(restoredCountry ? firstUnansweredStep(restoredAnswers) : 0);
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    saveCountry(country);
  }, [country, mounted]);

  useEffect(() => {
    if (!mounted) return;
    saveAnswers(answers);
  }, [answers, mounted]);

  useEffect(() => {
    if (!calculating) return;

    calculatingTimer.current = setTimeout(() => {
      setCalculating(false);
      setActiveStep(6);
      setDirection(1);

      if (country && isComplete(answers) && !completeTrackedRef.current) {
        const resultPath = getResultPath(answers);
        track("tool_complete", {
          tool: "scope",
          result_path: resultPath,
          country,
          step_count: 5,
        });
        completeTrackedRef.current = true;
      }
    }, 800);

    return () => {
      if (calculatingTimer.current) clearTimeout(calculatingTimer.current);
    };
  }, [answers, calculating, country]);

  const resultPath = useMemo(
    () => (canDeriveResultPath(answers) ? getResultPath(answers) : null),
    [answers],
  );

  if (!mounted) {
    return <div className="min-h-[360px]" />;
  }

  const isQuestion = activeStep >= 1 && activeStep <= 5;
  const isResult = activeStep === 6 && country && resultPath;
  const activeQuestionId = getQuestionIdForStep(activeStep, answers);
  const activeQuestion = activeQuestionId ? getQuestion(activeQuestionId) : null;
  const completedSteps = stepOrder.filter((step) => {
    if (activeStep !== 6 && step >= activeStep) return false;
    const id = getQuestionIdForStep(step, answers);
    return Boolean(id && valueForQuestion(answers, id));
  }).reverse();

  function handleCountrySelect(nextCountry: Country) {
    setCountry(nextCountry);
  }

  function handleStart() {
    if (!country) return;
    completeTrackedRef.current = false;
    track("tool_start", { tool: "scope", country });
    setDirection(1);
    setActiveStep(1);
  }

  function handleAnswer(value: string) {
    if (!activeQuestionId) return;

    const step = getStepForQuestionId(activeQuestionId);
    const nextAnswers = trimAnswersAfterStep(
      withAnswer(answers, activeQuestionId, value),
      step,
    );

    const nextPath = canDeriveResultPath(nextAnswers)
      ? getResultPath(nextAnswers)
      : null;

    track("tool_answer", {
      tool: "scope",
      step,
      question_id: activeQuestionId,
      answer: value,
      result_path: nextPath,
    });

    completeTrackedRef.current = false;
    setAnswers(nextAnswers);
    setDirection(1);

    if (step === 5) {
      setCalculating(true);
      return;
    }

    setActiveStep(step + 1);
  }

  function handleBack() {
    setDirection(-1);
    setActiveStep((current) => Math.max(0, current - 1));
  }

  function handleEdit(step: number) {
    const nextAnswers = trimAnswersAfterStep(answers, step);
    setAnswers(nextAnswers);
    setDirection(-1);
    setActiveStep(step);
    completeTrackedRef.current = false;
    track("tool_edit", { tool: "scope", step });
  }

  function handleReset() {
    clearScopeStorage();
    setCountry(null);
    setAnswers({});
    setActiveStep(0);
    setCalculating(false);
    setDirection(-1);
    completeTrackedRef.current = false;
    track("tool_reset", { tool: "scope" });
  }

  function handleCtaClick() {
    if (!country || !resultPath) return;
    track("cta_click", {
      tool: "scope",
      destination: "nextbyrd",
      result_path: resultPath,
      country,
    });
  }

  return (
    <section className="bg-hub-surface py-12 sm:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-container">
        <div className="grid gap-8 md:grid-cols-[minmax(0,640px)_minmax(320px,440px)] md:gap-20">
          <div className="min-w-0">
            <motion.div layout transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}>
              <AnimatePresence mode="wait" custom={direction}>
                {activeStep === 0 ? (
                  <motion.div
                    key="country"
                    custom={direction}
                    variants={screenVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={screenTransition}
                  >
                    <CountryScreen
                      selectedCountry={country}
                      onSelect={handleCountrySelect}
                      onStart={handleStart}
                    />
                  </motion.div>
                ) : null}

                {isQuestion && activeQuestion && !calculating ? (
                  <motion.div
                    key={`question-${activeStep}-${activeQuestion.id}`}
                    custom={direction}
                    variants={screenVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={screenTransition}
                  >
                    <QuestionScreen
                      question={activeQuestion}
                      stepNumber={activeStep}
                      answers={answers}
                      country={country}
                      onAnswer={handleAnswer}
                      onBack={handleBack}
                      showBack={activeStep > 1}
                    />
                  </motion.div>
                ) : null}

                {calculating ? (
                  <motion.div
                    key="calculating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="min-h-[240px] rounded-card border border-transparent"
                  />
                ) : null}

                {isResult ? (
                  <motion.div
                    key="result-mobile"
                    className="md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ResultPanel
                      answers={answers}
                      country={country}
                      resultPath={resultPath}
                      onReset={handleReset}
                      onCtaClick={handleCtaClick}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>

            {(isQuestion || calculating) && (
              <div className="mt-4">
                <ProgressBar step={Math.min(activeStep, 5)} pulse={calculating} />
              </div>
            )}

            {completedSteps.length > 0 ? (
              <div className="mt-4 flex flex-col gap-2">
                {completedSteps.map((step) => {
                  const id = getQuestionIdForStep(step, answers);
                  if (!id) return null;
                  const value = valueForQuestion(answers, id);
                  if (!value) return null;
                  return (
                    <CompletedAnswer
                      key={`${step}-${id}`}
                      question={getQuestion(id)}
                      answerValue={value}
                      answers={answers}
                      country={country}
                      onEdit={() => handleEdit(step)}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="hidden md:block">
            {isResult ? (
              <ResultPanel
                answers={answers}
                country={country}
                resultPath={resultPath}
                onReset={handleReset}
                onCtaClick={handleCtaClick}
              />
            ) : (
              <LiveEstimatePanel
                answers={answers}
                country={country}
                activeStep={activeStep}
                calculating={calculating}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const screenVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

const screenTransition = {
  duration: 0.35,
  ease: [0.76, 0, 0.24, 1] as const,
};
