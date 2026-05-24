import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/ui/AdSlot";
import SocialProof from "@/components/ui/SocialProof";
import ToolGrid from "@/components/ui/ToolGrid";
import ToolPreview from "@/components/ui/ToolPreview";

export const metadata: Metadata = {
  title: "Free Website Tools: Cost Calculator, Website Grader, and Planning Tools",
  description:
    "Free tools to plan, audit, and improve your website. Starting from scratch or fixing what is not working, find your answer in minutes. No sign-up.",
  alternates: { canonical: "https://hub.nextbyrd.com" },
  openGraph: {
    title: "Free Website Tools: Cost Calculator, Website Grader, and Planning Tools",
    description:
      "Free tools to plan, audit, and improve your website. Starting from scratch or fixing what is not working, find your answer in minutes. No sign-up.",
    url: "https://hub.nextbyrd.com",
    siteName: "byrd hub",
    type: "website",
    images: [{ url: "https://hub.nextbyrd.com/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Tools: Cost Calculator, Website Grader, and Planning Tools",
    description:
      "Free tools to plan, audit, and improve your website. Starting from scratch or fixing what is not working, find your answer in minutes. No sign-up.",
    images: ["https://hub.nextbyrd.com/og.png"],
  },
};

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nextbyrd.com/#organization",
      name: "Nextbyrd",
      url: "https://nextbyrd.com",
    },
    {
      "@type": "WebSite",
      "@id": "https://hub.nextbyrd.com/#website",
      url: "https://hub.nextbyrd.com",
      name: "byrd hub",
      description:
        "Free tools to plan, audit, and improve your website. Starting from scratch or fixing what is not working, find your answer in minutes. No sign-up.",
      inLanguage: "en",
      publisher: { "@id": "https://nextbyrd.com/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": "https://hub.nextbyrd.com/#webpage",
      url: "https://hub.nextbyrd.com",
      name: "Free Website Tools: Cost Calculator, Website Grader, and Planning Tools",
      description:
        "Free tools to plan, audit, and improve your website. Starting from scratch or fixing what is not working, find your answer in minutes. No sign-up.",
      inLanguage: "en",
      datePublished: "2026-05-24",
      dateModified: "2026-05-24",
      image: {
        "@type": "ImageObject",
        url: "https://hub.nextbyrd.com/og.png",
        width: 1200,
        height: 630,
      },
      isPartOf: { "@id": "https://hub.nextbyrd.com/#website" },
      author: { "@id": "https://nextbyrd.com/#organization" },
      publisher: { "@id": "https://nextbyrd.com/#organization" },
      mainEntity: { "@id": "https://hub.nextbyrd.com/#tools" },
    },
    {
      "@type": "ItemList",
      "@id": "https://hub.nextbyrd.com/#tools",
      name: "Free website tools",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Cost Calculator",
          url: "https://hub.nextbyrd.com/website-cost-calculator",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Build Options",
          url: "https://hub.nextbyrd.com/website-builder-comparison",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Speed Calculator",
          url: "https://hub.nextbyrd.com/website-speed-calculator",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Website Grader",
          url: "https://hub.nextbyrd.com/website-grader",
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />

      <section className="w-full border-b border-hub-border bg-hub-bg">
        <div
          className="mx-auto max-w-320 px-container"
          style={{
            paddingTop: "clamp(64px, 8vw, 112px)",
            paddingBottom: "clamp(56px, 7vw, 96px)",
          }}
        >
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:items-center">
            <div className="flex flex-col gap-7">
              <h1
                className="font-bold text-hub-navy"
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                  lineHeight: 1.1,
                }}
              >
                Free tools to plan, audit, and improve your website.
              </h1>
              <p
                className="text-lg text-hub-gray"
                style={{ lineHeight: 1.6, maxWidth: "34rem" }}
              >
                Starting from scratch or fixing what&apos;s not working? Find your answer in minutes. No sign-up.
              </p>
              <div>
                <Link
                  href="/website-cost-calculator"
                  className="inline-flex w-full max-w-sm items-center justify-center rounded-btn bg-hub-aqua px-5 py-3.5 text-center text-sm font-semibold leading-5 text-white transition-colors duration-200 hover:bg-hub-aqua-dark sm:w-auto sm:max-w-none sm:px-6"
                >
                  See what your website needs →
                </Link>
              </div>
              <SocialProof />
            </div>

            <ToolPreview />
          </div>
        </div>
      </section>

      <section className="w-full bg-hub-surface">
        <div
          className="mx-auto max-w-320 px-container"
          style={{
            paddingTop: "clamp(48px, 6vw, 80px)",
            paddingBottom: "clamp(56px, 7vw, 96px)",
          }}
        >
          <div className="mb-10 max-w-text">
            <h2
              className="font-semibold text-hub-navy"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.2 }}
            >
              Free website tools
            </h2>
            <p className="mt-2 text-sm text-hub-gray">
              Each tool takes under 2 minutes. No sign-up.
            </p>
          </div>
          <ToolGrid />
        </div>
      </section>

      <section className="w-full bg-hub-bg">
        <div
          className="mx-auto max-w-320 px-container"
          style={{
            paddingTop: "clamp(40px, 5vw, 64px)",
            paddingBottom: "clamp(40px, 5vw, 64px)",
          }}
        >
          <AdSlot zone="home-leaderboard" />
        </div>
      </section>
    </>
  );
}
