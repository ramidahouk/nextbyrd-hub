import type { Metadata } from "next";
import { Layers } from "lucide-react";
import ToolPageHeader from "@/components/layout/ToolPageHeader";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Website Builder Comparison Tool — hub.nextbyrd.com",
  description:
    "Wix, Webflow, WordPress, or custom? Answer a few questions and get a stack recommendation for your situation.",
  alternates: { canonical: "https://hub.nextbyrd.com/website-builder-comparison" },
  openGraph: {
    title: "Website Builder Comparison Tool — hub.nextbyrd.com",
    description:
      "Wix, Webflow, WordPress, or custom? Answer a few questions and get a stack recommendation for your situation.",
    url: "https://hub.nextbyrd.com/website-builder-comparison",
    siteName: "byrd hub",
    type: "website",
    images: [{ url: "https://hub.nextbyrd.com/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Builder Comparison Tool — hub.nextbyrd.com",
    description:
      "Wix, Webflow, WordPress, or custom? Answer a few questions and get a stack recommendation for your situation.",
    images: ["https://hub.nextbyrd.com/og.png"],
  },
};

export default function WebsiteBuilderComparisonPage() {
  return (
    <>
      <ToolPageHeader
        name="Build Options"
        description="Wix, Webflow, WordPress, or custom code? Answer a few questions and get a clear recommendation."
        Icon={Layers}
      />
      <ComingSoon toolName="Build Options" />
    </>
  );
}
