export type Country = "france" | "uk" | "usa" | "uae";

export type BusinessType =
  | "local-service"
  | "ecommerce"
  | "professional"
  | "nonprofit"
  | "other";

export type ResultPath =
  | "local-showcase"
  | "local-booking"
  | "local-full"
  | "ecommerce-standard"
  | "ecommerce-complex"
  | "portfolio"
  | "portfolio-booking"
  | "client-portal"
  | "nonprofit"
  | "generic";

export type QuestionId =
  | "business_type"
  | "functionality"
  | "updates"
  | "accounts"
  | "design"
  | "budget";

export interface ScopeAnswers {
  business_type?: BusinessType;
  functionality?: string;
  updates?: "self" | "agency" | "unsure";
  accounts?: "yes" | "no";
  design?: "high-end" | "professional" | "simple";
  budget?: "under-floor" | "in-range" | "over-range" | "none";
}

export type Answers = ScopeAnswers;

export function getResultPath(answers: ScopeAnswers): ResultPath {
  const { business_type: businessType, functionality } = answers;

  if (businessType === "local-service") {
    if (functionality === "showcase") return "local-showcase";
    if (functionality === "booking") return "local-booking";
    if (functionality === "both") return "local-full";
    return "local-showcase";
  }

  if (businessType === "ecommerce") {
    if (functionality === "complex") return "ecommerce-complex";
    return "ecommerce-standard";
  }

  if (businessType === "professional") {
    if (functionality === "portfolio") return "portfolio";
    if (functionality === "booking") return "portfolio-booking";
    if (functionality === "portal") return "client-portal";
    return "portfolio";
  }

  if (businessType === "nonprofit") return "nonprofit";

  return "generic";
}

export function canDeriveResultPath(answers: ScopeAnswers): boolean {
  return Boolean(answers.business_type && answers.functionality);
}

export function isComplete(answers: ScopeAnswers): boolean {
  return Boolean(
    answers.business_type &&
      answers.functionality &&
      (answers.accounts || answers.updates) &&
      answers.design &&
      answers.budget,
  );
}

export function getAnswerCount(answers: ScopeAnswers): number {
  return [
    answers.business_type,
    answers.functionality,
    answers.accounts || answers.updates,
    answers.design,
    answers.budget,
  ].filter(Boolean).length;
}

export function getQuestionIdForStep(
  step: number,
  answers: ScopeAnswers,
): QuestionId | null {
  if (step === 1) return "business_type";
  if (step === 2) return "functionality";
  if (step === 3) return answers.business_type === "ecommerce" ? "accounts" : "updates";
  if (step === 4) return "design";
  if (step === 5) return "budget";
  return null;
}

export function getStepForQuestionId(id: QuestionId): number {
  if (id === "business_type") return 1;
  if (id === "functionality") return 2;
  if (id === "updates" || id === "accounts") return 3;
  if (id === "design") return 4;
  return 5;
}

export function trimAnswersAfterStep(
  answers: ScopeAnswers,
  step: number,
): ScopeAnswers {
  const next = { ...answers };

  if (step <= 1) {
    delete next.functionality;
    delete next.updates;
    delete next.accounts;
    delete next.design;
    delete next.budget;
  }

  if (step <= 2) {
    delete next.updates;
    delete next.accounts;
    delete next.design;
    delete next.budget;
  }

  if (step <= 3) {
    delete next.design;
    delete next.budget;
  }

  if (step <= 4) {
    delete next.budget;
  }

  return next;
}
