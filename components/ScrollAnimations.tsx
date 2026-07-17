"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Mounts once on the home page. Reveals every [data-reveal] element on scroll
 * with a fade and slide-up. Fully skipped when the user prefers reduced motion,
 * so content stays instantly visible. Content is always in the DOM and visible
 * without JS (crawler and no-JS safe); we only hide it once GSAP is ready.
 */
export default function ScrollAnimations() {
  useGSAP(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    document.documentElement.classList.add("gsap-ready");

    const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    reveals.forEach((el) => {
      // Elements already in view on load are shown instantly, so there is no
      // hide-then-show flash. Only off-screen elements start hidden.
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.88) {
        gsap.set(el, { opacity: 1, y: 0 });
      } else {
        gsap.set(el, { opacity: 0, y: 16 });
      }
    });

    const batch = ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%",
      once: true,
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          overwrite: true,
        }),
    });

    ScrollTrigger.refresh();

    return () => {
      batch.forEach((st) => st.kill());
      document.documentElement.classList.remove("gsap-ready");
    };
  });

  return null;
}
