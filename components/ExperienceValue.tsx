"use client";

import { useEffect, useState } from "react";
import { experienceLabel } from "@/lib/site";

/**
 * Live experience figure. The server renders the build-time value (so crawlers
 * see a real number), then the client recomputes from the visitor's date so it
 * rolls forward each month without a redeploy.
 */
export default function ExperienceValue({ initial }: { initial: string }) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setValue(experienceLabel());
  }, []);

  return <>{value}</>;
}
