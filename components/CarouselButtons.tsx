"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Client controls for the server-rendered products carousel: arrow buttons,
 * mouse drag, and the progress rail. The track itself is plain HTML with
 * native scroll-snap, so it works before (and without) this script.
 */
export function CarouselButtons({ trackId }: { trackId: string }) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = document.getElementById(trackId);
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setAtStart(el.scrollLeft < 8);
      setAtEnd(el.scrollLeft > max - 8);
      const rail = document.querySelector<HTMLElement>(`[data-rail="${trackId}"]`);
      const p = max > 0 ? el.scrollLeft / max : 0;
      if (rail) rail.style.transform = `scaleX(${0.12 + p * 0.88})`;
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    let down = false;
    let startX = 0;
    let startLeft = 0;
    let moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.style.scrollSnapType = "none";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.style.scrollSnapType = "";
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, [trackId]);

  const go = useCallback(
    (dir: 1 | -1) => {
      const el = document.getElementById(trackId);
      if (!el) return;
      const card = el.querySelector<HTMLElement>("li");
      const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
      el.scrollBy({ left: dir * step, behavior: "smooth" });
    },
    [trackId]
  );

  return (
    <div className="flex items-center gap-2" data-reveal>
      <button
        type="button"
        onClick={() => go(-1)}
        disabled={atStart}
        aria-label="Previous products"
        aria-controls={trackId}
        className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-ink disabled:opacity-35 disabled:hover:border-line"
      >
        <ArrowLeft aria-hidden="true" className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        disabled={atEnd}
        aria-label="Next products"
        aria-controls={trackId}
        className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white transition hover:bg-accent disabled:opacity-35 disabled:hover:bg-ink"
      >
        <ArrowRight aria-hidden="true" className="h-5 w-5" />
      </button>
    </div>
  );
}
