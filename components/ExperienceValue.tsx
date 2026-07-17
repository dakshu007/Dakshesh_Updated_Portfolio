"use client";

import { useEffect, useState } from "react";
import { experienceLabel } from "@/lib/site";

/**
 * Renders the live "years.months" experience figure. The server passes the
 * build-time value as the initial render (so SSR and first paint match), then
 * the client recomputes from the visitor's current date on mount, so the value
 * is always current without a redeploy.
 */
export default function ExperienceValue({ initial }: { initial: string }) {
  const [label, setLabel] = useState(initial);

  useEffect(() => {
    setLabel(experienceLabel());
  }, []);

  return <>{label} yrs</>;
}
