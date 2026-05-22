import Link from "next/link";
import ToolGrid from "@/components/ui/ToolGrid";
import AdSlot from "@/components/ui/AdSlot";
import SocialProof from "@/components/ui/SocialProof";
import ToolPreview from "@/components/ui/ToolPreview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Website Tools for Business Owners — hub.nextbyrd.com",
  description:
    "Answer a few questions. Get a clear answer. Free tools to scope your website, compare builders, measure performance, and audit your site. No sign-up.",
  openGraph: {
    title: "Free Website Tools for Business Owners — hub.nextbyrd.com",
    description:
      "Answer a few questions. Get a clear answer. Free tools to scope your website, compare builders, measure performance, and audit your site.",
    url: "https://hub.nextbyrd.com",
    siteName: "byrd hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Tools for Business Owners — hub.nextbyrd.com",
    description:
      "Answer a few questions. Get a clear answer. Free tools for business owners with a website problem.",
  },
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="w-full bg-hub-surface border-b border-hub-border">
        <div
          className="mx-auto max-w-320 px-container"
          style={{ paddingTop: "clamp(64px, 8vw, 120px)", paddingBottom: "clamp(64px, 8vw, 120px)" }}
        >
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            {/* Left — copy */}
            <div className="flex flex-col gap-7">
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="block w-0.5 h-4 bg-hub-aqua rounded-full" />
                <span className="text-xs font-medium text-hub-aqua tracking-wide uppercase">
                  Free · No sign-up · No email
                </span>
              </div>
              <h1
                className="font-bold text-hub-navy"
                style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", lineHeight: 1.1 }}
              >
                Free tools for business owners with a website problem
              </h1>
              <p className="text-lg text-hub-gray" style={{ lineHeight: 1.6, maxWidth: "34rem" }}>
                Answer a few questions. Get a clear answer.
              </p>
              <div>
                <Link
                  href="/website-cost-calculator"
                  className="inline-flex items-center gap-2 rounded-btn bg-hub-aqua px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-hub-aqua-dark"
                >
                  Find out what your website should cost →
                </Link>
              </div>
              <SocialProof />
            </div>

            {/* Right — ToolPreview (desktop only) */}
            <ToolPreview />
          </div>
        </div>
      </section>

      {/* ── ToolGrid ─────────────────────────────────────────────── */}
      <section className="w-full bg-hub-bg">
        <div
          className="mx-auto max-w-320 px-container"
          style={{ paddingTop: "clamp(56px, 7vw, 96px)", paddingBottom: "clamp(56px, 7vw, 96px)" }}
        >
          <div className="mb-10">
            <h2
              className="font-semibold text-hub-navy"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.2 }}
            >
              Pick a tool
            </h2>
            <p className="mt-2 text-sm text-hub-gray">
              Each tool takes under 2 minutes.
            </p>
          </div>
          <ToolGrid />
        </div>
      </section>

      {/* ── AdSlot ───────────────────────────────────────────────── */}
      <section className="w-full bg-hub-bg">
        <div
          className="mx-auto max-w-320 px-container"
          style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}
        >
          <AdSlot zone="home-leaderboard" />
        </div>
      </section>

      {/* BlogPreview — hidden until real content exists */}
    </>
  );
}
