"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { whenInteracted } from "@/lib/interaction";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Buttery smooth wheel scrolling with Lenis, driven by the GSAP ticker so
 * ScrollTrigger stays in sync. Loaded on the first interaction; native scroll
 * until then, on touch devices and under reduced motion. In-page anchor links
 * glide to their target.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let teardown: (() => void) | undefined;
    let cancelled = false;

    whenInteracted()
      .then(() =>
        Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")])
      )
      .then(([{ default: LenisCtor }, { default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new LenisCtor({
          duration: 1.15,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
        window.__lenis = lenis;
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        const onClick = (e: MouseEvent) => {
          if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
          const a = (e.target as HTMLElement | null)?.closest("a");
          if (!a) return;
          const href = a.getAttribute("href") ?? "";
          const hash = href.startsWith("#")
            ? href
            : href.startsWith("/#") && window.location.pathname === "/"
              ? href.slice(1)
              : "";
          if (!hash || hash === "#") return;
          const target = document.querySelector<HTMLElement>(hash);
          if (!target) return;
          e.preventDefault();
          lenis.scrollTo(target, { offset: -84 });
          history.pushState(null, "", hash);
        };
        document.addEventListener("click", onClick);

        teardown = () => {
          document.removeEventListener("click", onClick);
          gsap.ticker.remove(tick);
          lenis.destroy();
          window.__lenis = undefined;
        };
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  // Start each new page at the top, or at its hash.
  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;
    const hash = window.location.hash;
    const target = hash ? document.querySelector<HTMLElement>(hash) : null;
    if (target) lenis.scrollTo(target, { offset: -84, immediate: true });
    else lenis.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
