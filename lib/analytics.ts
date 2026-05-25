declare global {
  interface Window {
    __nbHubAnalyticsConsent?: boolean;
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  if (window.__nbHubAnalyticsConsent === true && typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}
