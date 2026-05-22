import type { Metadata } from "next";
import "./globals.css";
import HubHeader from "@/components/layout/HubHeader";
import HubFooter from "@/components/layout/HubFooter";

export const metadata: Metadata = {
  title: "Free Website Tools for Business Owners — hub.nextbyrd.com",
  description:
    "Free tools to help you scope your website, choose the right stack, and understand what you should pay. No sign-up required.",
  metadataBase: new URL("https://hub.nextbyrd.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="font-sans min-h-full flex flex-col bg-hub-bg text-hub-navy antialiased">
        <HubHeader />
        <main className="flex-1">{children}</main>
        <HubFooter />
        {/* GA4 analytics placeholder — add measurement ID when property is created */}
      </body>
    </html>
  );
}
