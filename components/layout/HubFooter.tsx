import Link from "next/link";
import ByrdLogo from "@/components/ui/ByrdLogo";

const toolLinks = [
  { href: "/website-cost-calculator", label: "Cost Calculator" },
];

export default function HubFooter() {
  return (
    <footer className="w-full border-t border-hub-border bg-white">
      <div className="mx-auto max-w-320 px-container py-8">
        {/* Row 1 - wordmark + links */}
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
              href="https://nextbyrd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-hub-muted transition-colors hover:text-hub-gray"
            >
              nextbyrd.com &rarr;
            </Link>
          </nav>
        </div>

        {/* Row 2 - copyright */}
        <p className="mt-6 text-xs text-hub-muted">
          &copy; {new Date().getFullYear()} hub.nextbyrd.com
        </p>
      </div>
    </footer>
  );
}
