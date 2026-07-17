"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function format(n: number) {
  return n.toLocaleString("en-IN");
}

/**
 * Animated number count-up that fires when scrolled into view. The real value
 * is always present for screen readers and crawlers (sr-only); the animated
 * span is aria-hidden. Reduced-motion users see the final value immediately.
 */
export default function CountUp({
  value,
  suffix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        el.textContent = format(value) + suffix;
        return;
      }

      const counter = { n: 0 };
      el.textContent = "0" + suffix;
      gsap.to(counter, {
        n: value,
        duration,
        ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = format(Math.round(counter.n)) + suffix;
        },
      });
    },
    { dependencies: [value, suffix, duration] }
  );

  return (
    <span>
      <span ref={ref} aria-hidden="true">
        {format(value)}
        {suffix}
      </span>
      <span className="sr-only">
        {format(value)}
        {suffix}
      </span>
    </span>
  );
}
