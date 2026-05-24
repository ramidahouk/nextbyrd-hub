import type { Metadata } from "next";
import { Wand2 } from "lucide-react";
import ToolPageHeader from "@/components/layout/ToolPageHeader";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Website Design Extractor - hub.nextbyrd.com",
  description:
    "Extract a first-pass design system from an existing website. Colors, typography, radius, shadows, and component patterns.",
  alternates: { canonical: "https://hub.nextbyrd.com/website-design-extractor" },
  openGraph: {
    title: "Website Design Extractor - hub.nextbyrd.com",
    description:
      "Extract a first-pass design system from an existing website. Colors, typography, radius, shadows, and component patterns.",
    url: "https://hub.nextbyrd.com/website-design-extractor",
    siteName: "byrd hub",
    type: "website",
    images: [{ url: "https://hub.nextbyrd.com/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Design Extractor - hub.nextbyrd.com",
    description:
      "Extract a first-pass design system from an existing website. Colors, typography, radius, shadows, and component patterns.",
    images: ["https://hub.nextbyrd.com/og.png"],
  },
};

export default function WebsiteDesignExtractorPage() {
  return (
    <>
      <ToolPageHeader
        name="Website Design Extractor"
        description="Extract a first-pass design system from any existing website."
        Icon={Wand2}
      />
      <ComingSoon toolName="Website Design Extractor" />
    </>
  );
}
