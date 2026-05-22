"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";
import ByrdLogo from "@/components/ui/ByrdLogo";

const navItems = [
  { href: "/website-cost-calculator", label: "Scope" },
  { href: "/website-builder-comparison", label: "Stack" },
  { href: "/website-speed-calculator", label: "Performance" },
  { href: "/website-grader", label: "Audit" },
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
        <nav className="hidden xl:flex items-center gap-6">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm font-medium transition-colors duration-200 hover:text-hub-aqua relative py-1",
                pathname === href
                  ? "text-hub-aqua after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-hub-aqua after:rounded-full"
                  : "text-hub-navy",
              )}
            >
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
