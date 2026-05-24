"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  ChevronDown,
  ClipboardList,
  Layers,
  Menu,
  Search,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ToolItem = {
  href: string;
  label: string;
  Icon: LucideIcon;
  status: "live" | "soon";
};

const toolItems: ToolItem[] = [
  {
    href: "/website-cost-calculator",
    label: "Cost Calculator",
    Icon: ClipboardList,
    status: "live",
  },
  {
    href: "/website-builder-comparison",
    label: "Build Options",
    Icon: Layers,
    status: "soon",
  },
  {
    href: "/website-speed-calculator",
    label: "Speed Calculator",
    Icon: BarChart2,
    status: "soon",
  },
  {
    href: "/website-grader",
    label: "Website Grader",
    Icon: Search,
    status: "soon",
  },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="relative z-50 block xl:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="cursor-pointer text-hub-navy"
      >
        <Menu className="size-6" />
      </button>

      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <nav
        className={cn(
          "fixed top-0 right-0 z-999 flex h-full w-full max-w-85 flex-col bg-white px-3 pt-7 pb-6 shadow-lg transition-transform duration-500",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center text-hub-navy transition-colors hover:text-hub-aqua"
        >
          <X className="size-5" />
        </button>

        <div className="mt-8 flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setToolsOpen((current) => !current)}
            aria-expanded={toolsOpen}
            className="flex w-full items-center justify-between rounded-card px-5 py-3 text-left text-sm font-semibold text-hub-navy transition-colors hover:bg-hub-surface hover:text-hub-aqua"
          >
            <span>Tools</span>
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-200",
                toolsOpen && "rotate-180",
              )}
            />
          </button>

          {toolsOpen ? (
            <ul className="flex flex-col gap-1 pl-3">
              {toolItems.map(({ href, label, Icon, status }) => (
                <li key={href}>
                  {status === "live" ? (
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-card px-5 py-3 text-sm font-medium transition-colors hover:bg-hub-surface hover:text-hub-aqua",
                        pathname === href
                          ? "bg-hub-surface text-hub-aqua"
                          : "text-hub-navy",
                      )}
                    >
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      <span>{label}</span>
                    </Link>
                  ) : (
                    <div className="flex w-full items-center gap-3 rounded-card px-5 py-3 text-sm font-medium text-hub-muted">
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      <span>{label}</span>
                      <span className="ml-auto rounded-badge bg-hub-surface px-2 py-0.5 text-[11px] font-medium text-hub-muted">
                        Soon
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mt-auto border-t border-hub-border pt-5">
          <Link
            href="https://nextbyrd.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-hub-muted transition-colors hover:text-hub-gray"
          >
            nextbyrd.com &rarr;
          </Link>
        </div>
      </nav>
    </div>
  );
}
