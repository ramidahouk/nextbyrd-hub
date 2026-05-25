import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";
import HubHeader from "@/components/layout/HubHeader";
import HubFooter from "@/components/layout/HubFooter";
import CookieConsent from "@/components/layout/CookieConsent";

export const metadata: Metadata = {
  title: "Free Website Tools: Cost Calculator, Website Grader, and Planning Tools",
  description:
    "Free tools to plan, audit, and improve your website. Starting from scratch or fixing what is not working, find your answer in minutes. No sign-up.",
  metadataBase: new URL("https://hub.nextbyrd.com"),
  authors: [{ name: "Nextbyrd", url: "https://nextbyrd.com" }],
  creator: "Nextbyrd",
  publisher: "Nextbyrd",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* GA4 Consent Mode default — must fire before gtag.js loads */}
        <Script id="ga4-consent-default" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied'
          });
        `}</Script>
      </head>
      <body className="font-sans min-h-full flex flex-col bg-hub-bg text-hub-navy antialiased">
        <HubHeader />
        <main className="flex-1">{children}</main>
        <HubFooter />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
