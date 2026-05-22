interface AdSlotProps {
  zone: string;
  className?: string;
}

export default function AdSlot({ zone, className }: AdSlotProps) {
  return (
    <div
      data-ad-zone={zone}
      className={`flex min-h-20 items-center justify-center border border-dashed border-hub-border rounded-card py-6 px-4 ${className ?? ""}`}
    >
      <span className="text-xs font-medium text-hub-muted">Ad</span>
    </div>
  );
}
