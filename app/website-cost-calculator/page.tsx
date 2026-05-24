import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import ToolPageHeader from "@/components/layout/ToolPageHeader";
import FaqShell, { websiteCostFaqJsonLd } from "@/components/ui/FaqShell";
import ScopeTool from "@/components/ScopeTool";

export const metadata: Metadata = {
  title: "Website Cost Calculator — hub.nextbyrd.com",
  description:
    "Find out what kind of website your business needs and what it should cost. 5 questions, under a minute, no sign-up.",
  alternates: { canonical: "https://hub.nextbyrd.com/website-cost-calculator" },
  openGraph: {
    title: "Website Cost Calculator — hub.nextbyrd.com",
    description:
      "Find out what kind of website your business needs and what it should cost. 5 questions, under a minute, no sign-up.",
    url: "https://hub.nextbyrd.com/website-cost-calculator",
    siteName: "byrd hub",
    type: "website",
    images: [{ url: "https://hub.nextbyrd.com/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Cost Calculator — hub.nextbyrd.com",
    description:
      "Find out what kind of website your business needs and what it should cost. 5 questions, under a minute, no sign-up.",
    images: ["https://hub.nextbyrd.com/og.png"],
  },
};

export default function WebsiteCostCalculatorPage() {
  return (
    <>
      <ToolPageHeader
        name="Website Cost Calculator"
        description="Answer 5 questions. Get a clear price range for your small business website. No sign-up."
        Icon={ClipboardList}
      />

      <ScopeTool />

      <FaqShell />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteCostFaqJsonLd) }}
      />
    </>
  );
}
