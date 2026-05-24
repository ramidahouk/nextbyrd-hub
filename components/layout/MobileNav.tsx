"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type MenuType = { href: string; id: number; label: string };

const navItems: MenuType[] = [
  { id: 1, href: "/website-cost-calculator", label: "Cost Calculator" },
  { id: 2, href: "/website-builder-comparison", label: "Build Options" },
  { id: 3, href: "/website-speed-calculator", label: "Speed Calculator" },
  { id: 4, href: "/website-grader", label: "Website Grader" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      />

      {/* Drawer */}
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

        <ul className="mt-8 flex flex-col gap-1">
          {navItems.map(({ href, id, label }) => (
            <li key={id}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex w-full items-center rounded-[8px] px-5 py-3 text-sm font-medium transition-colors duration-200 hover:bg-hub-surface hover:text-hub-aqua",
                  pathname === href
                    ? "bg-hub-surface text-hub-aqua"
                    : "text-hub-navy",
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

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
