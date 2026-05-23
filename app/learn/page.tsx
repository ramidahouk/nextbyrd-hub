import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn — hub.nextbyrd.com",
  description:
    "Guides, frameworks, and deep dives for developers and business owners navigating web decisions.",
  alternates: { canonical: "https://hub.nextbyrd.com/learn" },
  openGraph: {
    title: "Learn — hub.nextbyrd.com",
    description:
      "Guides, frameworks, and deep dives for developers and business owners navigating web decisions.",
    url: "https://hub.nextbyrd.com/learn",
    siteName: "byrd hub",
    type: "website",
    images: [{ url: "https://hub.nextbyrd.com/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn — hub.nextbyrd.com",
    description:
      "Guides, frameworks, and deep dives for developers and business owners navigating web decisions.",
    images: ["https://hub.nextbyrd.com/og.png"],
  },
};

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-320 px-container" style={{ paddingTop: "clamp(48px, 6vw, 80px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
      <h1 className="text-2xl font-semibold text-hub-navy mb-2">Learn</h1>
      <p className="text-sm text-hub-gray mb-12">
        Guides and deep dives for developers and business owners navigating web decisions.
      </p>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="inline-flex items-center rounded-badge bg-hub-surface px-3 py-1 text-xs font-medium text-hub-muted mb-4">
          Coming soon
        </div>
        <p className="text-sm text-hub-gray">Guides are being written. Check back soon.</p>
      </div>
    </div>
  );
}
