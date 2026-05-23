import {
  Briefcase,
  CalendarCheck,
  CheckCircle,
  ClipboardList,
  Globe,
  Heart,
  HeartHandshake,
  HelpCircle,
  Info,
  LayoutGrid,
  Lock,
  Minus,
  Package,
  Settings2,
  ShoppingCart,
  Sparkles,
  Store,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getResultPath, type Country, type QuestionId, type ScopeAnswers } from "./scoring";
import { getBudgetOptions } from "./pricing";

export interface Option {
  label: string;
  value: string;
  icon?: LucideIcon;
}

export interface Question {
  id: QuestionId;
  text: string | ((answers: ScopeAnswers) => string);
  getOptions: (answers: ScopeAnswers, country: Country | null) => Option[];
}

export const BUSINESS_TYPE_OPTIONS: Option[] = [
  {
    label: "Local service (restaurant, salon, clinic, studio)",
    value: "local-service",
    icon: Store,
  },
  {
    label: "E-commerce or online shop",
    value: "ecommerce",
    icon: ShoppingCart,
  },
  {
    label: "Professional / freelancer / consultant",
    value: "professional",
    icon: Briefcase,
  },
  {
    label: "Non-profit or community organisation",
    value: "nonprofit",
    icon: Heart,
  },
  {
    label: "Something else",
    value: "other",
    icon: HelpCircle,
  },
];

const updateOptions: Option[] = [
  {
    label: "Me or my team - we want to update it ourselves",
    value: "self",
    icon: Users,
  },
  {
    label: "The agency or developer handles it",
    value: "agency",
    icon: Wrench,
  },
  {
    label: "We have not decided yet",
    value: "unsure",
    icon: HelpCircle,
  },
];

const accountOptions: Option[] = [
  {
    label: "Yes - customers need order history, returns, saved items",
    value: "yes",
    icon: UserCheck,
  },
  {
    label: "No - guest checkout is enough",
    value: "no",
    icon: ShoppingCart,
  },
];

function functionalityOptions(answers: ScopeAnswers): Option[] {
  if (answers.business_type === "local-service") {
    return [
      {
        label: "Show what we do and let people contact us",
        value: "showcase",
        icon: Globe,
      },
      {
        label: "Take bookings or appointments online",
        value: "booking",
        icon: CalendarCheck,
      },
      {
        label: "Both - showcase and bookings",
        value: "both",
        icon: LayoutGrid,
      },
    ];
  }

  if (answers.business_type === "ecommerce") {
    return [
      {
        label: "Standard catalogue and checkout",
        value: "standard",
        icon: Package,
      },
      {
        label: "Complex catalogue with filters, accounts, or integrations",
        value: "complex",
        icon: Settings2,
      },
      {
        label: "Not sure yet",
        value: "unsure",
        icon: HelpCircle,
      },
    ];
  }

  if (answers.business_type === "professional") {
    return [
      {
        label: "Show my work and let people contact me",
        value: "portfolio",
        icon: Briefcase,
      },
      {
        label: "Let clients book time with me",
        value: "booking",
        icon: CalendarCheck,
      },
      {
        label: "Give clients a private login area",
        value: "portal",
        icon: Lock,
      },
    ];
  }

  if (answers.business_type === "nonprofit") {
    return [
      {
        label: "Share information and let people contact us",
        value: "information",
        icon: Info,
      },
      {
        label: "Accept donations online",
        value: "donations",
        icon: HeartHandshake,
      },
      {
        label: "Manage volunteers or applications",
        value: "volunteers",
        icon: ClipboardList,
      },
      {
        label: "All of the above",
        value: "all",
        icon: LayoutGrid,
      },
    ];
  }

  return [
    {
      label: "Show what I do and let people contact me",
      value: "showcase",
      icon: Globe,
    },
    {
      label: "Let people book appointments",
      value: "booking",
      icon: CalendarCheck,
    },
    {
      label: "Sell products online",
      value: "ecommerce",
      icon: ShoppingCart,
    },
    {
      label: "Give users a private login area",
      value: "members",
      icon: Lock,
    },
    {
      label: "Not sure yet",
      value: "unsure",
      icon: HelpCircle,
    },
  ];
}

function designOptions(answers: ScopeAnswers): Option[] {
  const base: Option[] = [
    {
      label: "Professional - clean and credible is enough",
      value: "professional",
      icon: CheckCircle,
    },
    {
      label: "Simple - content matters more than design",
      value: "simple",
      icon: Minus,
    },
  ];

  if (answers.business_type === "nonprofit") return base;

  return [
    {
      label: "High-end - clients or customers judge us by it",
      value: "high-end",
      icon: Sparkles,
    },
    ...base,
  ];
}

export const QUESTIONS: Question[] = [
  {
    id: "business_type",
    text: "What kind of business do you have?",
    getOptions: () => BUSINESS_TYPE_OPTIONS,
  },
  {
    id: "functionality",
    text: (answers) => {
      if (answers.business_type === "ecommerce") return "What kind of store are you building?";
      if (answers.business_type === "professional") return "What should the website do for you?";
      if (answers.business_type === "nonprofit") return "What does the site need to do?";
      return "What does your website need to do?";
    },
    getOptions: functionalityOptions,
  },
  {
    id: "updates",
    text: "Who will update the website?",
    getOptions: () => updateOptions,
  },
  {
    id: "accounts",
    text: "Do customers need accounts on your store?",
    getOptions: () => accountOptions,
  },
  {
    id: "design",
    text: "How should the website feel?",
    getOptions: designOptions,
  },
  {
    id: "budget",
    text: "What budget range feels realistic?",
    getOptions: (answers, country) => {
      if (!country) return [{ label: "No budget set yet", value: "none" }];
      return getBudgetOptions(country, getResultPath(answers), answers);
    },
  },
];

export function getQuestion(id: QuestionId): Question {
  const question = QUESTIONS.find((item) => item.id === id);
  if (!question) throw new Error(`Unknown question: ${id}`);
  return question;
}

export function getQuestionText(question: Question, answers: ScopeAnswers): string {
  return typeof question.text === "function" ? question.text(answers) : question.text;
}

export function getAnswerLabel(
  id: QuestionId,
  answerValue: string,
  answers: ScopeAnswers,
  country: Country | null,
): string {
  return (
    getQuestion(id)
      .getOptions(answers, country)
      .find((option) => option.value === answerValue)?.label ?? answerValue
  );
}
