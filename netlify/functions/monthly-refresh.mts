import type { Config } from "@netlify/functions";

/**
 * Monthly refresh for the live results.
 *
 * The results report always ends on the last day of the previous month, so
 * on the 1st it is due to roll forward. This function visits every page that
 * shows live numbers, which makes Next.js regenerate any stale page (ISR)
 * with the new month from Windsor.ai, instead of waiting for the first real
 * visitor. It runs on the 1st, 2nd and 3rd because Search Console finishes a
 * month's data two or three days late. Needs WINDSOR_API_KEY on the site.
 */
const PAGES = [
  "/",
  "/results",
  "/mykavo",
  "/shrinkto",
  "/image-size-inspector",
  "/spacing-inspector",
  "/work/jp-fitness",
  "/work/harsa-designer-boutique",
];

export default async () => {
  const base = Netlify.env.get("URL") || "https://dakshesh.co.in";
  const results = await Promise.allSettled(
    PAGES.map((path) =>
      fetch(new URL(path, base), {
        headers: { "user-agent": "dakshesh-monthly-refresh" },
        signal: AbortSignal.timeout(20000),
      }).then((res) => `${path} ${res.status}`)
    )
  );
  console.log(
    "[monthly-refresh]",
    results.map((r) => (r.status === "fulfilled" ? r.value : `failed: ${r.reason}`)).join(", ")
  );
};

export const config: Config = {
  // 00:30 UTC (06:00 India time) on the 1st, 2nd and 3rd of every month.
  schedule: "30 0 1-3 * *",
};
