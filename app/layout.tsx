import type { Metadata } from "next";
import "./globals.css";
import HubHeader from "@/components/layout/HubHeader";
import HubFooter from "@/components/layout/HubFooter";

export const metadata: Metadata = {
  title: "Free Website Tools: Cost Calculator, Website Grader, and Planning Tools",
  description:
    "Free tools to plan, audit, and improve your website. Starting from scratch or fixing what is not working, find your answer in minutes. No sign-up.",
  metadataBase: new URL("https://hub.nextbyrd.com"),
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
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
