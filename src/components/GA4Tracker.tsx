"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// VBOadv's root layout already loads the GA4 script and fires the initial
// page_view via gtag('config', ...). This module adds the LP-specific
// tracking on top of that base: scroll depth, cta_click events, and a
// utility that propagates UTMs onto the booking URL.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function GA4PageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Scroll depth (25 / 50 / 75 / 100). Fires once per threshold per page load.
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;

    const thresholds = [25, 50, 75, 100];
    const fired = new Set<number>();

    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((scrollTop / docHeight) * 100);

      for (const t of thresholds) {
        if (percent >= t && !fired.has(t)) {
          fired.add(t);
          window.gtag?.("event", "scroll_depth", {
            percent_scrolled: t,
            page_path: pathname,
          });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Attach UTM context to a synthetic LP-attribution event so the LP page
  // view can be sliced by campaign without disturbing the layout-level
  // page_view that GA already fires on initial load.
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;

    const utmSource = searchParams.get("utm_source");
    const utmMedium = searchParams.get("utm_medium");
    const utmCampaign = searchParams.get("utm_campaign");

    if (!utmSource && !utmMedium && !utmCampaign) return;

    window.gtag("event", "lp_attribution", {
      page_path: pathname,
      utm_source: utmSource || "",
      utm_medium: utmMedium || "",
      utm_campaign: utmCampaign || "",
    });
  }, [pathname, searchParams]);

  return null;
}

export function trackCTAClick(label: string, vertical: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "cta_click", {
    event_category: "engagement",
    event_label: label,
    vertical,
  });
}

export function getBookingUrlWithUTM(
  baseUrl: string,
  searchParams: URLSearchParams
): string {
  const utmParams = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ];
  const url = new URL(baseUrl);
  for (const param of utmParams) {
    const val = searchParams.get(param);
    if (val) url.searchParams.set(param, val);
  }
  return url.toString();
}
