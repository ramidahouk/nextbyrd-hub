"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  ChevronDown,
  ClipboardList,
  Layers,
  Search,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";
import ByrdLogo from "@/components/ui/ByrdLogo";

const toolItems: {
  href: string;
  label: string;
  Icon: LucideIcon;
  status: "live" | "soon";
}[] = [
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

export default function HubHeader() {
  const pathname = usePathname();
  const isToolPath = toolItems.some((item) => pathname === item.href);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-hub-border bg-white">
      <div className="mx-auto flex h-14 max-w-320 items-center justify-between px-container">
        <Link
          href="/"
          className="transition-opacity hover:opacity-80"
          aria-label="byrd hub home"
        >
          <ByrdLogo className="h-6" />
        </Link>

        <nav className="hidden items-center gap-8 xl:flex">
          <details className="group relative">
            <summary
              className={cn(
                "relative flex cursor-pointer list-none items-center gap-1.5 py-1 text-sm font-medium transition-colors duration-200 marker:hidden hover:text-hub-aqua [&::-webkit-details-marker]:hidden",
                isToolPath
                  ? "text-hub-aqua after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-hub-aqua"
                  : "text-hub-navy",
              )}
            >
              Tools
              <ChevronDown className="size-3.5 shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>

            <div className="absolute left-1/2 top-full mt-3 w-80 -translate-x-1/2 rounded-card border border-hub-border bg-white p-2 shadow-hub-standard">
              <div className="flex flex-col gap-1">
                {toolItems.map(({ href, label, Icon, status }) =>
                  status === "live" ? (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-card px-3 py-3 text-sm font-medium transition-colors hover:bg-hub-surface hover:text-hub-aqua",
                        pathname === href
                          ? "bg-hub-surface text-hub-aqua"
                          : "text-hub-navy",
                      )}
                    >
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      <span>{label}</span>
                    </Link>
                  ) : (
                    <div
                      key={href}
                      className="flex items-center gap-3 rounded-card px-3 py-3 text-sm font-medium text-hub-muted"
                    >
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      <span>{label}</span>
                      <span className="ml-auto rounded-badge bg-hub-surface px-2 py-0.5 text-[11px] font-medium text-hub-muted">
                        Coming soon
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </details>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="https://nextbyrd.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-medium text-hub-muted transition-colors hover:text-hub-gray xl:block"
          >
            nextbyrd.com &rarr;
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
