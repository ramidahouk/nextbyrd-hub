import Link from "next/link";
import ByrdLogo from "@/components/ui/ByrdLogo";

const toolLinks = [
  { href: "/website-cost-calculator", label: "Scope" },
  { href: "/website-builder-comparison", label: "Stack" },
  { href: "/website-speed-calculator", label: "Performance" },
  { href: "/website-grader", label: "Audit" },
];

export default function HubFooter() {
  return (
    <footer className="w-full border-t border-hub-border bg-white">
      <div className="mx-auto max-w-320 px-container py-8">
        {/* Row 1 — wordmark + links */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <ByrdLogo className="h-5 w-auto text-hub-navy" />
          </Link>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {toolLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-hub-gray hover:text-hub-aqua transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/blog"
              className="text-sm font-medium text-hub-gray hover:text-hub-aqua transition-colors"
            >
              Blog
            </Link>
            <Link
              href="https://nextbyrd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-hub-aqua hover:text-hub-aqua-dark transition-colors"
            >
              Built by Nextbyrd
            </Link>
          </nav>
        </div>

        {/* Row 2 — copyright */}
        <p className="mt-6 text-xs text-hub-muted">
          © {new Date().getFullYear()} hub.nextbyrd.com
        </p>
      </div>
    </footer>
  );
}
