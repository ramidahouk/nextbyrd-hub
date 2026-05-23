"use client";
import Link from "next/link";

interface ComingSoonProps {
  toolName: string;
}

export default function ComingSoon({ toolName }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-container text-center">
      <div className="inline-flex items-center rounded-badge bg-hub-surface px-3 py-1 text-xs font-medium text-hub-muted mb-6">
        Coming soon
      </div>
      <h2 className="text-xl font-semibold text-hub-navy mb-3">{toolName} is in the works</h2>
      <p className="text-sm text-hub-gray mb-8" style={{ maxWidth: 400 }}>
        We&apos;re building this tool now. In the meantime, the Website Cost Calculator is ready to use.
      </p>
      <Link
        href="/website-cost-calculator"
        className="inline-flex items-center gap-2 rounded-btn bg-hub-aqua px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-hub-aqua-dark"
      >
        Try the Cost Calculator →
      </Link>
    </div>
  );
}
