"use client";

import Link from "next/link";
import { Briefcase, Heart, HelpCircle, ShoppingCart, Store } from "lucide-react";
import { motion } from "motion/react";
import QuestionCard from "./QuestionCard";

const previewOptions = [
  { label: "Local service business", Icon: Store },
  { label: "E-commerce or online shop", Icon: ShoppingCart },
  { label: "Professional / freelancer / consultant", Icon: Briefcase },
  { label: "Non-profit or community organisation", Icon: Heart },
  { label: "Something else", Icon: HelpCircle },
];

export default function ToolPreview() {
  return (
    <div className="relative hidden min-h-[460px] items-center justify-center md:flex">
      <div
        aria-hidden="true"
        className="absolute inset-x-16 top-1/2 h-px bg-hub-border/80"
      />

      <div className="relative w-full max-w-md">
        <motion.div
          aria-hidden="true"
          className="absolute -inset-4 rounded-card border border-hub-aqua/10"
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
        />
        <Link href="/website-cost-calculator" className="group relative block">
          <QuestionCard
            preview
            stepLabel="Step 1 of 5"
            question="What kind of business do you have?"
            options={previewOptions}
            className="relative transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-card bg-linear-to-t from-white via-white/90 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
            <span className="text-sm font-medium text-hub-aqua">
              Try it &rarr;
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
