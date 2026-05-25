"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __nbHubAnalyticsConsent?: boolean;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const GA_ID = "G-BTX14DFH1B";
const CONSENT_COOKIE = "nb_hub_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
const CONSENT_CHANGE_EVENT = "nb:consent-change";
const PREFERENCES_OPEN_EVENT = "nb:open-cookie-preferences";

type ConsentStatus = "accepted" | "rejected" | null;
type ConsentSnapshot = ConsentStatus | "loading";

let consentDefaultSet = false;
let gaConfigured = false;

const readConsent = (): ConsentStatus => {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  if (!cookie) return null;
  const value = cookie.split("=")[1];
  if (value === "accepted" || value === "rejected") return value;
  return null;
};

const writeConsent = (value: Exclude<ConsentStatus, null>) => {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
};

const setGaEnabled = (enabled: boolean) => {
  if (typeof window === "undefined") return;
  window[`ga-disable-${GA_ID}`] = !enabled;
};

function ensureGtagStub() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer?.push(args);
    };
}

function setDefaultConsentDenied() {
  if (typeof window === "undefined" || consentDefaultSet) return;
  ensureGtagStub();
  window.gtag?.("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  consentDefaultSet = true;
}

function grantAnalyticsConsent() {
  if (typeof window === "undefined") return;
  ensureGtagStub();
  window.gtag?.("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
}

function denyAnalyticsConsent() {
  if (typeof window === "undefined") return;
  ensureGtagStub();
  window.gtag?.("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
}

function ensureGaLoaded() {
  if (typeof window === "undefined") return;
  setDefaultConsentDenied();
  if (gaConfigured) return;

  const scriptSrc = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  const alreadyLoaded = Array.from(document.scripts).some((s) => s.src === scriptSrc);

  if (!alreadyLoaded) {
    const script = document.createElement("script");
    script.async = true;
    script.src = scriptSrc;
    document.head.appendChild(script);
  }

  window.gtag?.("js", new Date());
  window.gtag?.("config", GA_ID);
  gaConfigured = true;
}

function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;
  document.cookie
    .split("; ")
    .map((entry) => entry.split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"))
    .forEach((name) => {
      document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
      document.cookie = `${name}=; path=/; domain=.nextbyrd.com; max-age=0; SameSite=Lax`;
    });
}

function enableAnalytics() {
  window.__nbHubAnalyticsConsent = true;
  setGaEnabled(true);
  grantAnalyticsConsent();
  ensureGaLoaded();
}

function disableAnalytics() {
  window.__nbHubAnalyticsConsent = false;
  denyAnalyticsConsent();
  setGaEnabled(false);
  clearAnalyticsCookies();
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
}

export default function CookieConsent() {
  const storedConsent = useSyncExternalStore<ConsentSnapshot>(
    subscribeToConsent,
    readConsent,
    () => "loading",
  );
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    if (storedConsent === "loading") return;
    setDefaultConsentDenied();
    if (storedConsent === "accepted") {
      enableAnalytics();
    } else {
      disableAnalytics();
    }
  }, [storedConsent]);

  useEffect(() => {
    const handler = () => setPreferencesOpen(true);
    window.addEventListener(PREFERENCES_OPEN_EVENT, handler);
    return () => window.removeEventListener(PREFERENCES_OPEN_EVENT, handler);
  }, []);

  const accept = () => {
    writeConsent("accepted");
    enableAnalytics();
    setPreferencesOpen(false);
  };

  const reject = () => {
    disableAnalytics();
    writeConsent("rejected");
    setPreferencesOpen(false);
  };

  const showBanner =
    storedConsent !== "loading" && (storedConsent === null || preferencesOpen);

  return (
    <>
      {showBanner && (
        <div className="fixed inset-x-0 bottom-4 z-60 px-container">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-card border border-hub-border bg-white shadow-hub-standard p-4 sm:p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm text-hub-gray">
                  We use analytics cookies to understand how visitors use this site. You can accept or reject them.
                </p>
                <Link
                  href="/privacy"
                  className="text-xs text-hub-muted underline underline-offset-2 hover:text-hub-aqua transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                <button
                  type="button"
                  onClick={accept}
                  className="w-full sm:w-auto px-5 py-2 rounded-btn bg-hub-aqua text-white text-sm font-medium hover:bg-hub-aqua-dark transition-colors"
                >
                  Accept analytics
                </button>
                <button
                  type="button"
                  onClick={reject}
                  className="w-full sm:w-auto px-5 py-2 rounded-btn border border-hub-border text-sm font-medium text-hub-navy hover:bg-hub-surface transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
