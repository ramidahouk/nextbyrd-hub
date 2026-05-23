import type { Metadata } from "next";
import { BarChart2 } from "lucide-react";
import ToolPageHeader from "@/components/layout/ToolPageHeader";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Website Speed Calculator — hub.nextbyrd.com",
  description:
    "See how your site speed affects bounce rate and conversions. Free calculator for business owners.",
  alternates: { canonical: "https://hub.nextbyrd.com/website-speed-calculator" },
  openGraph: {
    title: "Website Speed Calculator — hub.nextbyrd.com",
    description:
      "See how your site speed affects bounce rate and conversions. Free calculator for business owners.",
    url: "https://hub.nextbyrd.com/website-speed-calculator",
    siteName: "byrd hub",
    type: "website",
    images: [{ url: "https://hub.nextbyrd.com/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Speed Calculator — hub.nextbyrd.com",
    description:
      "See how your site speed affects bounce rate and conversions. Free calculator for business owners.",
    images: ["https://hub.nextbyrd.com/og.png"],
  },
};

export default function WebsiteSpeedCalculatorPage() {
  return (
    <>
      <ToolPageHeader
        name="Speed Calculator"
        description="See how your site speed affects bounce rate and conversions."
        Icon={BarChart2}
      />
      <ComingSoon toolName="Speed Calculator" />
    </>
  );
}
