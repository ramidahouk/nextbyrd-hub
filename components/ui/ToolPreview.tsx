"use client";
import Link from "next/link";
import { motion } from "motion/react";

export default function ToolPreview() {
  return (
    <div className="hidden md:flex items-center justify-center" style={{ minHeight: 480 }}>
      {/* Outer wrapper — rings expand from here, overflow visible */}
      <div className="relative flex items-center justify-center w-full" style={{ height: 440 }}>

        {/* Ring 1 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 320,
            height: 320,
            top: "50%",
            left: "50%",
            marginTop: -160,
            marginLeft: -160,
            border: "1px solid #058ead",
            zIndex: 0,
          }}
          initial={{ scale: 1, opacity: 0.18 }}
          animate={{ scale: 1.7, opacity: 0 }}
          transition={{ duration: 3.5, ease: "easeOut", repeat: Infinity }}
        />

        {/* Ring 2 — offset by 1.75s */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 320,
            height: 320,
            top: "50%",
            left: "50%",
            marginTop: -160,
            marginLeft: -160,
            border: "1px solid #058ead",
            zIndex: 0,
          }}
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.7, opacity: [0, 0.18, 0] }}
          transition={{ duration: 3.5, ease: "easeOut", repeat: Infinity, delay: 1.75 }}
        />

        {/* Card — clickable, sits above rings */}
        <Link
          href="/website-cost-calculator"
          className="relative rounded-card bg-white border border-hub-border overflow-hidden w-full max-w-sm block"
          style={{
            zIndex: 1,
            boxShadow: "rgba(50,50,93,0.22) 0px 30px 60px -12px, rgba(0,0,0,0.12) 0px 18px 36px -18px",
          }}
        >
          {/* Aqua accent top bar */}
          <div className="h-0.5 w-full bg-hub-aqua" />

          {/* Progress bar */}
          <div className="h-1 w-full bg-black/8">
            <motion.div
              className="h-full bg-hub-aqua/60 rounded-full"
              style={{ width: "20%" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            />
          </div>

          {/* Step label */}
          <div className="px-6 pt-5 pb-2">
            <span className="text-xs font-medium text-hub-muted">Step 1 of 5</span>
          </div>

          {/* Question */}
          <div className="px-6 pb-4">
            <p className="text-base font-semibold text-hub-navy leading-snug">
              What kind of business do you have?
            </p>
          </div>

          {/* Option buttons */}
          <div className="flex flex-col gap-2 px-6 pb-6">
            {["Service business", "E-commerce store", "Local business", "Other"].map((opt) => (
              <div
                key={opt}
                className="rounded-btn border border-hub-border bg-white px-4 py-3 text-sm font-medium text-hub-navy"
              >
                {opt}
              </div>
            ))}
          </div>

          {/* Fade overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-white to-transparent pointer-events-none" />

          {/* Try it label */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
            <span className="text-sm font-medium text-hub-aqua">Try it →</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
