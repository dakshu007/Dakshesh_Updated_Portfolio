"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * One motion engine for every page, re-run on each route change:
 * - [data-reveal]            fade and rise in on scroll (batched)
 * - [data-split]             headings reveal line by line from a mask
 * - [data-count="1234"]      numbers count up when they enter the viewport
 * - [data-parallax="0.2"]    elements drift at a different scroll speed
 * - [data-magnetic]          buttons lean toward the pointer
 * - .spotlight               cards get a pointer-following glow
 *
 * Everything is skipped under prefers-reduced-motion, and content is never
 * hidden until JS has confirmed motion is allowed (crawler and no-JS safe).
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const cleanups: (() => void)[] = [];

    // Pointer spotlight works even with reduced motion (it is not movement).
    const onPointer = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(".spotlight");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onPointer, { passive: true });
    cleanups.push(() => document.removeEventListener("pointermove", onPointer));

    if (reduce) {
      return () => cleanups.forEach((fn) => fn());
    }

    root.classList.add("motion-ready");

    const ctx = gsap.context(() => {
      /* Reveal */
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      reveals.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.15 }
          );
        }
      });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          }),
      });

      /* Split headings */
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines,words",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.words, {
              yPercent: 110,
              opacity: 0,
              rotate: 2,
              duration: 1,
              ease: "expo.out",
              stagger: 0.035,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          },
        });
        cleanups.push(() => split.revert());
      });

      /* Count up */
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        if (!Number.isFinite(end)) return;
        const decimals = Number(el.dataset.decimals ?? 0);
        const prefix = el.dataset.prefix ?? "";
        const suffix = el.dataset.suffix ?? "";
        const final = el.textContent;
        const state = { v: 0 };
        const fmt = (n: number) =>
          `${prefix}${n.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}${suffix}`;
        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () => {
            gsap.to(state, {
              v: end,
              duration: 2,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = fmt(state.v);
              },
              onComplete: () => {
                el.textContent = final;
              },
            });
          },
        });
      });

      /* Parallax */
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.15;
        gsap.to(el, {
          yPercent: -100 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      /* Draw-in lines, e.g. the experience timeline */
      gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top 75%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      });

      /* Bars that grow, e.g. the impressions chart */
      gsap.utils.toArray<HTMLElement>("[data-bar]").forEach((el, i) => {
        gsap.from(el, {
          scaleY: 0,
          transformOrigin: "bottom center",
          duration: 1.1,
          ease: "expo.out",
          delay: (i % 12) * 0.05,
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        });
      });
    });

    /* Magnetic buttons (fine pointers only) */
    if (window.matchMedia("(pointer: fine)").matches) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    // Fonts and images can shift layout after first paint.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});
    cleanups.push(() => window.removeEventListener("load", refresh));

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
      root.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
