import type { Metadata } from "next";
import Link from "next/link";
import CookiePreferencesLink from "@/components/layout/CookiePreferencesLink";

export const metadata: Metadata = {
  title: "Privacy Policy - Byrd Hub",
  description: "How Byrd Hub collects, uses, and protects your data.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-320 px-container py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-semibold text-hub-navy mb-2" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
            Privacy Policy
          </h1>
          <p className="text-sm text-hub-muted mb-10">Last updated: 26 May 2026</p>

          <div className="prose-hub">
            <h2>Who we are</h2>
            <p>
              Byrd Hub (<strong>hub.nextbyrd.com</strong>) is operated by Nextbyrd, a web design and
              development studio. For privacy matters, you can contact us at{" "}
              <a href="mailto:hello@nextbyrd.com">hello@nextbyrd.com</a>.
            </p>

            <h2>What data we collect</h2>
            <p>
              We do not ask for identifying information directly. We do not have account
              registration, forms that collect your name or email, or a user database.
            </p>
            <p>
              If you accept analytics cookies, Google Analytics 4 processes pseudonymous usage
              data, including pages visited, time on page, country, device type, cookie
              identifiers, and interactions with our tools, such as completed steps.
            </p>

            <h2>Cookies</h2>
            <p>We use local storage for the calculator and cookies for preferences and optional analytics:</p>
            <ul>
              <li>
                <strong>Tool progress storage</strong> - this stores
                your tool answers locally so you do not lose progress on refresh
                (<code>hub_scope_country</code>, <code>hub_scope_answers</code>). These are stored
                in <code>localStorage</code>, not cookies, and contain no personal data.
              </li>
              <li>
                <strong>Consent preference cookie</strong> - <code>nb_hub_consent</code> stores
                whether you accepted or rejected analytics cookies for 180 days.
              </li>
              <li>
                <strong>Analytics cookies</strong> - only set if you accept. Google Analytics 4
                uses cookies (<code>_ga</code>, <code>_ga_*</code>) to distinguish visitors and
                track sessions. These are only activated after you give explicit consent.
              </li>
            </ul>
            <p>
              You can change your preference at any time:{" "}
              <CookiePreferencesLink className="text-hub-aqua underline underline-offset-2 hover:text-hub-aqua-dark transition-colors text-base" />.
            </p>

            <h2>Google Analytics 4</h2>
            <p>
              If you accept analytics cookies, we load Google Analytics 4 (GA4) with Measurement ID{" "}
              <code>G-BTX14DFH1B</code>. GA4 is operated by Google LLC. Data collected by GA4 may
              be processed on servers in the United States and other countries. Google&apos;s
              privacy policy is available at{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                policies.google.com/privacy
              </a>
              .
            </p>
            <p>
              We use Consent Mode v2. Analytics cookies are denied by default and only activated
              after you explicitly accept. Ad storage, ad user data, and ad personalization remain
              denied at all times.
            </p>

            <h2>Vercel Analytics</h2>
            <p>
              This site uses Vercel Analytics, a privacy-friendly analytics tool that does not use
              cookies and does not track individual users. It collects aggregated page view data
              only. See{" "}
              <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">
                Vercel&apos;s privacy documentation
              </a>{" "}
              for details.
            </p>

            <h2>Third-party links</h2>
            <p>
              This site contains links to external websites (sources cited in articles, tool
              comparisons, etc.). We are not responsible for the privacy practices of those sites.
            </p>

            <h2>Data retention</h2>
            <p>
              We do not store your tool answers on our servers. Google Analytics data retention is
              controlled through the GA4 property settings and may be changed as our measurement
              requirements change.
            </p>

            <h2>Your rights</h2>
            <p>
              If you are located in the EEA, UK, or Switzerland, you may have rights under GDPR or
              UK GDPR, including the right to request access, correction, or deletion and the right
              to withdraw consent at any time. Contact us for privacy requests. You can also manage
              Google&apos;s use of your data at{" "}
              <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer">
                myaccount.google.com
              </a>
              .
            </p>
            <p>
              To withdraw analytics consent on this site, use the{" "}
              <CookiePreferencesLink className="text-hub-aqua underline underline-offset-2 hover:text-hub-aqua-dark transition-colors" />{" "}
              link at any time.
            </p>

            <h2>Contact</h2>
            <p>
              For any privacy-related questions, contact us at{" "}
              <a href="mailto:hello@nextbyrd.com">hello@nextbyrd.com</a>.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-hub-border">
            <Link href="/" className="text-sm text-hub-aqua hover:text-hub-aqua-dark transition-colors">
              ← Back to Byrd Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
