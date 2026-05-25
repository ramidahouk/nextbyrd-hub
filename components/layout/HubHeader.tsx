"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";
import ByrdLogo from "@/components/ui/ByrdLogo";

const liveNavItems = [
  {
    href: "/website-cost-calculator",
    label: "Cost Calculator",
    Icon: ClipboardList,
  },
  {
    href: "/blog",
    label: "Blog",
    Icon: BookOpen,
  },
];

const upcomingNavItems = [
  {
    href: "/design-library",
    label: "Design Library",
  },
];

export default function HubHeader() {
  const pathname = usePathname();

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
          {liveNavItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex items-center gap-1.5 py-1 text-sm font-medium transition-colors duration-200 hover:text-hub-aqua",
                pathname === href
                  ? "text-hub-aqua after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-hub-aqua"
                  : "text-hub-navy",
              )}
            >
              <Icon className="size-3.5 shrink-0" aria-hidden="true" />
              {label}
            </Link>
          ))}
          {upcomingNavItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex items-center gap-2 py-1 text-sm font-medium transition-colors duration-200 hover:text-hub-aqua",
                pathname === href
                  ? "text-hub-aqua after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-hub-aqua"
                  : "text-hub-navy",
              )}
            >
              {label}
              <span className="rounded-badge bg-hub-surface px-2 py-0.5 text-[11px] font-medium text-hub-muted">
                Soon
              </span>
            </Link>
          ))}
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
