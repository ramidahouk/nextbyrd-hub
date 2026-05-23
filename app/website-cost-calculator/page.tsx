import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import ToolPageHeader from "@/components/layout/ToolPageHeader";
import AdSlot from "@/components/ui/AdSlot";
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
        description="Answer 5 questions. Get a clear scope and price range for your website project."
        Icon={ClipboardList}
      />

      <ScopeTool />

      <div className="mx-auto max-w-320 px-container pb-16">
        <AdSlot zone="tool-bottom" />
      </div>
    </>
  );
}
