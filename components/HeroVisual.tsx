"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/**
 * Defers the Three.js scene until the browser is idle, so the headline (the
 * LCP element) paints first. A CSS gradient orb sits underneath as the
 * instant placeholder and the no-WebGL fallback.
 */
export default function HeroVisual() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const go = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(go, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(go, 600);
    return () => clearTimeout(id);
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute left-1/2 top-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_200deg,#7B9BFF,#B79BFF,#FFB3D9,#7B9BFF)] opacity-60 blur-2xl" />
      {ready && <HeroCanvas />}
    </div>
  );
}
