/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Push a custom event to all active analytics providers.
 * Safe to call even before consent — the scripts simply won't exist yet.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;

  // GTM dataLayer
  if (Array.isArray((window as any).dataLayer)) {
    (window as any).dataLayer.push({ event: eventName, ...params });
  }

  // GA4 direct gtag
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", eventName, params ?? {});
  }

  // Meta Pixel custom event
  if (typeof (window as any).fbq === "function") {
    (window as any).fbq("trackCustom", eventName, params ?? {});
  }
}

/**
 * Standard GA4 / Meta Pixel lead event fired on form submission.
 */
export function trackLead(params?: Record<string, string>) {
  if (typeof window === "undefined") return;

  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "generate_lead", params ?? {});
  }

  if (typeof (window as any).fbq === "function") {
    (window as any).fbq("track", "Lead", params ?? {});
  }

  trackEvent("form_submit", params);
}
