import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import ToolPageHeader from "@/components/layout/ToolPageHeader";
import FaqShell, { websiteCostFaqJsonLd } from "@/components/ui/FaqShell";
import ScopeTool from "@/components/ScopeTool";

export const metadata: Metadata = {
  title: "Website Cost Calculator — hub.nextbyrd.com",
  description:
    "Find out what kind of website your business needs and what it should cost. 5 questions, under a minute, no sign-up.",
  authors: [{ name: "Nextbyrd", url: "https://nextbyrd.com" }],
  creator: "Nextbyrd",
  publisher: "Nextbyrd",
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

const websiteCostPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://hub.nextbyrd.com/website-cost-calculator#webpage",
  url: "https://hub.nextbyrd.com/website-cost-calculator",
  name: "Website Cost Calculator",
  description:
    "Find out what kind of website your business needs and what it should cost. 5 questions, under a minute, no sign-up.",
  inLanguage: "en",
  datePublished: "2026-05-24",
  dateModified: "2026-05-24",
  image: {
    "@type": "ImageObject",
    url: "https://hub.nextbyrd.com/og.png",
    width: 1200,
    height: 630,
  },
  author: {
    "@type": "Organization",
    name: "Nextbyrd",
    url: "https://nextbyrd.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Nextbyrd",
    url: "https://nextbyrd.com",
  },
  mainEntity: {
    "@type": "WebApplication",
    name: "Website Cost Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
};

const websiteCostBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "byrd hub",
      item: "https://hub.nextbyrd.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Website Cost Calculator",
      item: "https://hub.nextbyrd.com/website-cost-calculator",
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteCostPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteCostBreadcrumbJsonLd) }}
      />
    </>
  );
}
