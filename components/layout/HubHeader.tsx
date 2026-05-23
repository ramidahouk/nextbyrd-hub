"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Layers, BarChart2, Search, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";
import ByrdLogo from "@/components/ui/ByrdLogo";

const navItems: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: "/website-cost-calculator", label: "Cost Calculator", Icon: ClipboardList },
  { href: "/website-builder-comparison", label: "Build Options", Icon: Layers },
  { href: "/website-speed-calculator", label: "Speed Calculator", Icon: BarChart2 },
  { href: "/website-grader", label: "Website Grader", Icon: Search },
];

export default function HubHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-hub-border">
      <div
        className="mx-auto flex h-14 max-w-320 items-center justify-between px-container"
      >
        {/* Wordmark — byrd (aqua SVG) + hub (navy text) */}
        <Link href="/" className="hover:opacity-80 transition-opacity" aria-label="byrd hub — home">
          <ByrdLogo className="h-6" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-8">
          {navItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover:text-hub-aqua relative py-1",
                pathname === href
                  ? "text-hub-aqua after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-hub-aqua after:rounded-full"
                  : "text-hub-navy",
              )}
            >
              <Icon className="size-3.5 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link
            href="https://nextbyrd.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:block text-sm font-medium text-hub-muted hover:text-hub-gray transition-colors"
          >
            nextbyrd.com →
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
