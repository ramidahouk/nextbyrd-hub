import Link from "next/link";
import ByrdLogo from "@/components/ui/ByrdLogo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found — hub.nextbyrd.com",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-container text-center">
      <Link href="/" className="mb-10 hover:opacity-80 transition-opacity" aria-label="byrd hub — home">
        <ByrdLogo className="h-6 text-hub-navy" />
      </Link>
      <p className="text-sm font-medium text-hub-muted mb-2">404</p>
      <h1 className="text-2xl font-semibold text-hub-navy mb-4">Page not found</h1>
      <p className="text-sm text-hub-gray mb-8">
        This page doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-btn bg-hub-aqua px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-hub-aqua-dark"
      >
        Back to hub →
      </Link>
    </div>
  );
}
