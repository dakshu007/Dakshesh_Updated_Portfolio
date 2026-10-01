"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-3JWWGHRKZ2";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Send a GA4 event if gtag is loaded. Safe to call from any client code. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, { ...params, send_to: GA_ID });
}

/** How a link reaches me, from its href. */
function contactMethod(href: string): string | null {
  if (href.startsWith("tel:")) return "call";
  if (href.startsWith("mailto:")) return "email";
  if (/wa\.me|whatsapp/i.test(href)) return "whatsapp";
  return null;
}

/**
 * Sends a GA4 page_view on the initial load and on every client-side route
 * change (the gtag config is set with send_page_view: false in the layout, so
 * this is the single source of pageviews and nothing is double counted).
 *
 * It also listens for clicks site-wide, so server components can stay server
 * components and still be measured:
 * - any element with data-cta="name" sends `cta_click` with that name;
 * - any WhatsApp, tel: or mailto: link sends `contact_click` with the method.
 * Mark `contact_click` and `generate_lead` (sent by the contact form) as key
 * events in GA4 to see real leads in reports.
 */
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      send_to: GA_ID,
    });
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest<HTMLElement>("[data-cta], a[href]");
      if (!el) return;
      const cta = el.closest<HTMLElement>("[data-cta]")?.dataset.cta;
      const link = el.closest<HTMLAnchorElement>("a[href]");
      const href = link?.getAttribute("href") ?? "";
      const method = contactMethod(href);
      if (cta) {
        track("cta_click", {
          cta_id: cta,
          link_url: href,
          page_path: window.location.pathname,
        });
      }
      if (method) {
        track("contact_click", {
          method,
          cta_id: cta ?? "inline",
          page_path: window.location.pathname,
        });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
