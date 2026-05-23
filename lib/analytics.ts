declare function gtag(command: "event", action: string, params: Record<string, unknown>): void;

export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  if (typeof gtag !== "undefined") {
    gtag("event", event, params);
  }
}
