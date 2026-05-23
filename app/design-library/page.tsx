import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Library — hub.nextbyrd.com",
  description:
    "Implementation-ready DESIGN.md files for sites worth studying. Tokens, rationale, and the why behind every decision.",
  alternates: { canonical: "https://hub.nextbyrd.com/design-library" },
  openGraph: {
    title: "Design Library — hub.nextbyrd.com",
    description:
      "Implementation-ready DESIGN.md files for sites worth studying. Tokens, rationale, and the why behind every decision.",
    url: "https://hub.nextbyrd.com/design-library",
    siteName: "byrd hub",
    type: "website",
    images: [{ url: "https://hub.nextbyrd.com/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Library — hub.nextbyrd.com",
    description:
      "Implementation-ready DESIGN.md files for sites worth studying. Tokens, rationale, and the why behind every decision.",
    images: ["https://hub.nextbyrd.com/og.png"],
  },
};

export default function DesignLibraryPage() {
  return (
    <div className="mx-auto max-w-320 px-container" style={{ paddingTop: "clamp(48px, 6vw, 80px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
      <h1 className="text-2xl font-semibold text-hub-navy mb-2">Design Library</h1>
      <p className="text-sm text-hub-gray mb-12">
        Implementation-ready DESIGN.md files for sites worth studying.
      </p>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="inline-flex items-center rounded-badge bg-hub-surface px-3 py-1 text-xs font-medium text-hub-muted mb-4">
          Coming soon
        </div>
        <p className="text-sm text-hub-gray">Design files are being prepared. Check back soon.</p>
      </div>
    </div>
  );
}
