"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { whenInteracted } from "@/lib/interaction";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const CAPTIONS = ["130 countries reached", "Dakshesh B", "Code that ships"];

/**
 * Loads the Three.js particle scene on the visitor's first interaction
 * (pointer, touch, scroll or key), so the first paint and page metrics stay
 * clean, then crossfades from the static dot globe into the live scene.
 */
export default function HeroVisual() {
  const [ready, setReady] = useState(false);
  const [shape, setShape] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true;
    whenInteracted().then(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute left-1/2 top-1/2 aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#DCE4FF_0%,rgba(237,228,255,0.6)_45%,transparent_70%)]" />
      {/* Static dot globe: instant placeholder and no-WebGL fallback, pure CSS. */}
      <div
        className={`absolute left-1/2 top-1/2 aspect-square w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
        style={{
          backgroundImage: "linear-gradient(135deg, #2B4BF2, #7B4DFF 55%, #E0479E)",
          WebkitMaskImage: "radial-gradient(circle, #000 0 1.7px, transparent 2px), radial-gradient(circle at 40% 35%, #000 30%, rgba(0,0,0,0.25) 70%, transparent 71%)",
          WebkitMaskSize: "14px 14px, 100% 100%",
          WebkitMaskComposite: "source-in",
          maskImage: "radial-gradient(circle, #000 0 1.7px, transparent 2px), radial-gradient(circle at 40% 35%, #000 30%, rgba(0,0,0,0.25) 70%, transparent 71%)",
          maskSize: "14px 14px, 100% 100%",
          maskComposite: "intersect",
        }}
      />
      {ready && <HeroCanvas onShape={setShape} />}

      <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2">
        <span className="glass inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted shadow-card">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          <span key={shape} className="animate-[fadeIn_0.6s_ease]">
            {ready ? CAPTIONS[shape] : "Move to wake it up"}
          </span>
        </span>
      </div>
    </div>
  );
}
