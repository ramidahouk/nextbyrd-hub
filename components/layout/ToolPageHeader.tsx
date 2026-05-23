import type { LucideIcon } from "lucide-react";

interface ToolPageHeaderProps {
  name: string;
  description: string;
  Icon: LucideIcon;
}

export default function ToolPageHeader({ name, description, Icon }: ToolPageHeaderProps) {
  return (
    <div className="border-b border-hub-border bg-hub-bg">
      <div className="mx-auto max-w-320 px-container" style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}>
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-card bg-hub-surface">
            <Icon className="size-6 text-hub-aqua" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-hub-navy leading-tight">{name}</h1>
            <p className="mt-1 text-sm text-hub-gray">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
