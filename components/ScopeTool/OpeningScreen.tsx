"use client";
import { ClipboardList } from "lucide-react";
import { motion } from "motion/react";

interface OpeningScreenProps {
  onStart: () => void;
}

export default function OpeningScreen({ onStart }: OpeningScreenProps) {
  return (
    <div className="flex flex-col gap-7 px-6 py-10">
      <div className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-card bg-white">
          <ClipboardList className="size-6 text-hub-aqua" />
        </div>
        <div>
          <p className="text-xs font-medium text-hub-muted uppercase tracking-wide">Website Cost Calculator</p>
          <p className="text-sm text-hub-gray mt-0.5">5 questions · under a minute · no sign-up</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-hub-navy leading-snug">
          Find out what kind of website you need — and what it should cost.
        </h2>
        <p className="mt-2 text-sm text-hub-gray leading-relaxed">
          Answer a few quick questions and get a clear scope and price range for your project.
        </p>
      </div>

      <motion.button
        onClick={onStart}
        className="w-full rounded-btn bg-hub-aqua px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-hub-aqua-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hub-aqua focus-visible:ring-offset-2"
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
        whileHover={{ scale: 1, transition: { duration: 0 } }}
      >
        Let&apos;s find out →
      </motion.button>
    </div>
  );
}
