"use client";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  id: string;
  href: string;
  name: string;
  description: string;
  Icon: LucideIcon;
  className?: string;
}

export default function ToolCard({ href, name, description, Icon, className }: ToolCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
      }}
    >
      <Link
        href={href}
        className={cn(
          "group flex flex-col gap-5 rounded-card bg-hub-surface p-7",
          "border border-hub-border shadow-hub-subtle transition-all duration-200 hover:shadow-hub-standard hover:border-transparent",
          className,
        )}
      >
        <div className="flex size-11 items-center justify-center rounded-card bg-white">
          <Icon className="size-5 text-hub-aqua" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-semibold text-hub-navy leading-snug">{name}</h3>
          <p className="text-sm text-hub-gray" style={{ lineHeight: 1.6 }}>{description}</p>
        </div>
        <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-hub-aqua">
          Start
          <span className="relative flex shrink-0 items-center justify-center overflow-hidden">
            <span className="relative flex h-full w-full items-center justify-center">
              <span className="relative transition-transform duration-300 ease-in-out group-hover:translate-x-8">
                <ArrowRight className="size-4" />
              </span>
              <span className="absolute -translate-x-8 transition-transform duration-300 ease-in-out group-hover:translate-x-0">
                <ArrowRight className="size-4" />
              </span>
            </span>
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
