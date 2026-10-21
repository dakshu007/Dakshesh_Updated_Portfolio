"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { whenInteracted } from "@/lib/interaction";

type Gsap = typeof import("gsap").default;
type ST = typeof import("gsap/ScrollTrigger").ScrollTrigger;
type Split = typeof import("gsap/SplitText").SplitText;

async function loadGsap(): Promise<[Gsap, ST, Split]> {
  const [g, st, sp] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("gsap/SplitText"),
  ]);
  g.default.registerPlugin(st.ScrollTrigger, sp.SplitText);
  return [g.default, st.ScrollTrigger, sp.SplitText];
}

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
 * GSAP itself is fetched on the first interaction, so it never competes with
 * the first paint; whatever is already on screen at that moment stays put.
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

    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    whenInteracted()
      .then(loadGsap)
      .then(([gsap, ScrollTrigger, SplitText]) => {
        if (cancelled) return;
        ctx = setup(gsap, ScrollTrigger, SplitText, cleanups);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      ctx?.revert();
      root.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}

function setup(gsap: Gsap, ScrollTrigger: ST, SplitText: Split, cleanups: (() => void)[]) {
  const root = document.documentElement;
  // Anything already in view is left exactly as it is: no hide, no replay.
  const inView = (el: Element) => el.getBoundingClientRect().top < window.innerHeight;
  document.querySelectorAll("[data-reveal], [data-split], [data-count], [data-bar]").forEach((el) => {
    if (inView(el)) el.setAttribute("data-shown", "");
  });
  root.classList.add("motion-ready");

  // Scroll-in effects fire from each element's live position on screen
  // (IntersectionObserver), not from offsets measured once at setup, so they
  // can never go stale and leave content hidden when fonts, images or late
  // layout change the page height. Anything already scrolled past is shown too.
  const ctx = gsap.context(() => {});
  const onEnter = (selector: string, fn: (els: HTMLElement[]) => void) => {
    const els = gsap.utils.toArray<HTMLElement>(selector);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement);
        if (!hits.length) return;
        hits.forEach((el) => io.unobserve(el));
        ctx.add(() => fn(hits));
      },
      { rootMargin: "200% 0px 15% 0px" }
    );
    els.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());
  };

  /* Reveal */
  onEnter("[data-reveal]:not([data-shown])", (els) => {
    gsap.to(els, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.06,
      ease: "power3.out",
      overwrite: true,
      onComplete: () => els.forEach((el) => el.setAttribute("data-shown", "")),
    });
  });

  /* Split headings */
  onEnter("[data-split]:not([data-shown])", (els) =>
    els.forEach((el) => {
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
          });
        },
      });
      cleanups.push(() => split.revert());
    })
  );

  /* Count up */
  onEnter("[data-count]:not([data-shown])", (els) =>
    els.forEach((el) => {
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
    })
  );

  /* Bars that grow, e.g. the impressions chart */
  onEnter("[data-bar]:not([data-shown])", (els) =>
    gsap.from(els, {
      scaleY: 0,
      transformOrigin: "bottom center",
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.05,
    })
  );

  ctx.add(() => {
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

  // Fonts, images and late content change the page height after first
  // paint; keep the scrubbed effects (parallax, draw-in) measured correctly.
  let timer = 0;
  const refresh = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
  };
  document.fonts?.ready.then(refresh).catch(() => {});
  const ro = new ResizeObserver(refresh);
  ro.observe(document.body);
  cleanups.push(() => {
    ro.disconnect();
    window.clearTimeout(timer);
  });

  return ctx;
}
