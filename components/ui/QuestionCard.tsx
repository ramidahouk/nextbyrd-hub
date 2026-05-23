import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionOption {
  label: string;
  Icon?: LucideIcon;
}

interface QuestionCardProps {
  stepLabel: string;
  question: string;
  options: QuestionOption[];
  preview?: boolean;
  className?: string;
}

export default function QuestionCard({
  stepLabel,
  question,
  options,
  preview = false,
  className,
}: QuestionCardProps) {
  return (
    <article
      className={cn(
        "rounded-card border border-hub-border bg-white shadow-hub-standard",
        className,
      )}
    >
      <div className="h-1 w-full rounded-t-card bg-black/8">
        <div className="h-full w-1/5 rounded-full bg-hub-aqua" />
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-xs font-medium text-hub-muted">{stepLabel}</p>
        <h3 className="mt-3 text-base font-semibold leading-snug text-hub-navy">
          {question}
        </h3>
        <div className="mt-5 grid gap-2">
          {options.map(({ label, Icon }) => (
            <div
              key={label}
              className={cn(
                "flex min-h-13 w-full items-center gap-3 rounded-card border border-hub-border bg-hub-surface px-5 py-4 text-sm font-medium text-hub-navy",
                preview && "shadow-[0_1px_0_rgba(0,0,0,0.02)]",
              )}
            >
              {Icon ? <Icon className="size-[18px] shrink-0 text-hub-aqua" /> : null}
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
