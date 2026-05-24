import type { Metadata } from "next";
import { Search } from "lucide-react";
import ToolPageHeader from "@/components/layout/ToolPageHeader";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Free Website Grader - hub.nextbyrd.com",
  description:
    "Get a free technical audit of your website. Enter your URL and see what is holding your site back.",
  alternates: { canonical: "https://hub.nextbyrd.com/website-grader" },
  openGraph: {
    title: "Free Website Grader - hub.nextbyrd.com",
    description:
      "Get a free technical audit of your website. Enter your URL and see what is holding your site back.",
    url: "https://hub.nextbyrd.com/website-grader",
    siteName: "byrd hub",
    type: "website",
    images: [{ url: "https://hub.nextbyrd.com/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Grader - hub.nextbyrd.com",
    description:
      "Get a free technical audit of your website. Enter your URL and see what is holding your site back.",
    images: ["https://hub.nextbyrd.com/og.png"],
  },
};

export default function WebsiteGraderPage() {
  return (
    <>
      <ToolPageHeader
        name="Website Grader"
        description="Enter your URL and get a free technical report on what's holding your site back."
        Icon={Search}
      />
      <ComingSoon toolName="Website Grader" />
    </>
  );
}
