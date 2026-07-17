"use client";

import { useEffect, useRef } from "react";
import { heroProducts } from "@/lib/data";

/**
 * Typewriter that cycles through the products: types a name, pauses, erases it,
 * then moves to the next, looping. Each name shows in its brand colour.
 * It writes to the DOM via refs (not React state) so it does not re-render the
 * hero heading on every character, which keeps the main thread quiet.
 * Visual only; the stable list for screen readers and crawlers lives in the H1.
 */
export default function HeroTyping() {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      text.textContent = heroProducts[0].name;
      wrap.style.color = heroProducts[0].color;
      return;
    }

    let i = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const product = heroProducts[i];
      wrap.style.color = product.color;
      if (!deleting) {
        char += 1;
        text.textContent = product.name.slice(0, char);
        if (char >= product.name.length) {
          deleting = true;
          timer = setTimeout(tick, 1500);
          return;
        }
        timer = setTimeout(tick, 75);
      } else {
        char -= 1;
        text.textContent = product.name.slice(0, char);
        if (char <= 0) {
          deleting = false;
          i = (i + 1) % heroProducts.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 38);
      }
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span ref={wrapRef} style={{ color: heroProducts[0].color }}>
      <span ref={textRef} />
      <span className="type-cursor">|</span>
    </span>
  );
}
