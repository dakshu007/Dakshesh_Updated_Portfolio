import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AnalyticsReport } from "@/lib/analytics";
import { compact, monthLabel } from "@/lib/analytics";
import { LiveBadge, Sparkline } from "./parts";

/**
 * Live Search Console / GA4 proof for one site, shown on its own case-study
 * or product page. Renders nothing when the site has no tracked data.
 */
export default function SiteResults({
  report,
  siteId,
}: {
  report: AnalyticsReport;
  siteId: string;
}) {
  const site = report.sites.find((s) => s.id === siteId);
  if (!site || site.impressions + (site.sessions ?? 0) === 0) return null;
  const allKeywords = report.rankings.filter((r) => r.siteId === siteId);
  const keywords = allKeywords.slice(0, 4);
  const first = site.monthly.find((p) => p.impressions > 0);

  const stats = [
    { label: "Google impressions", value: compact(site.impressions) },
    { label: "Clicks from Google", value: compact(site.clicks) },
    site.visitors !== undefined
      ? { label: "Visitors", value: compact(site.visitors) }
      : { label: "Click-through rate", value: `${(site.ctr * 100).toFixed(1)}%` },
    site.aiSessions
      ? { label: "Visits from ChatGPT", value: compact(site.aiSessions) }
      : allKeywords.length > 0
        ? { label: "Page 1 keywords", value: String(allKeywords.length) }
        : null,
  ].filter((s): s is { label: string; value: string } => s !== null);

  return (
    <section
      aria-labelledby={`site-results-${siteId}`}
      className="viz-light mt-16 rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Results</p>
          <h2 id={`site-results-${siteId}`} className="mt-3 text-2xl font-bold text-ink">
            What {site.name} has earned so far
          </h2>
          {first && (
            <p className="mt-1 text-sm text-ink-soft">
              Since {monthLabel(first.month, true)}, from Google Search Console
              {site.visitors !== undefined ? " and GA4" : ""}
            </p>
          )}
        </div>
        <LiveBadge report={report} tone="light" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-xs text-ink-soft">{s.label}</dt>
                <dd className="mt-1 font-display text-2xl font-bold text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <p className="text-xs font-semibold text-ink-soft">Monthly Google impressions</p>
            <div className="mt-2">
              <Sparkline points={site.monthly} label={`${site.name} monthly Google impressions`} />
            </div>
          </div>
        </div>

        {keywords.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-ink-soft">Ranking on Google page 1 for</p>
            <ul className="mt-3 space-y-2">
              {keywords.map((k) => (
                <li
                  key={k.query}
                  className="flex items-center justify-between gap-3 rounded-xl bg-canvas px-3 py-2 ring-1 ring-line"
                >
                  <span className="truncate text-sm font-medium text-ink">&ldquo;{k.query}&rdquo;</span>
                  <span className="shrink-0 rounded-lg bg-accent px-2 py-0.5 font-display text-sm font-bold text-white">
                    #{Math.max(1, Math.round(k.position))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Link
        href="/results"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
      >
        See results for every site
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </section>
  );
}
