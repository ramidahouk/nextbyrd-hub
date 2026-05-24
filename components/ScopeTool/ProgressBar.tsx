"use client";
import { motion } from "motion/react";

interface ProgressBarProps {
  step: number; // 1-5
  pulse?: boolean; // true during the 800ms calculating pause
}

const STEP_PERCENT: Record<number, number> = {
  1: 20,
  2: 40,
  3: 60,
  4: 80,
  5: 100,
};

export default function ProgressBar({ step, pulse }: ProgressBarProps) {
  const pct = STEP_PERCENT[step] ?? 20;

  return (
    <div
      className="h-1 w-full rounded-full overflow-hidden"
      style={{ background: "rgba(0,0,0,0.08)" }}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full bg-hub-aqua"
        animate={{
          width: `${pct}%`,
          opacity: pulse ? [1, 0.5, 1] : 1,
        }}
        transition={{
          width: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
          opacity: pulse
            ? { duration: 0.6, ease: "easeInOut", repeat: 1, repeatType: "reverse" }
            : { duration: 0 },
        }}
      />
    </div>
  );
}
