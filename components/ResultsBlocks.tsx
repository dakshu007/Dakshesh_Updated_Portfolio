import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import {
  monthly,
  resultTotals,
  trafficSources,
  rankings,
  siteResults,
  TOTAL_SESSIONS,
  RESULTS_PERIOD,
  RESULTS_SOURCE,
} from "@/lib/results";
import { GoogleIcon } from "./icons";

export function VerifiedBadge() {
  return (
    <p className="inline-flex flex-wrap items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-ink-muted">
      <GoogleIcon className="h-3.5 w-3.5" />
      <span className="font-semibold text-ink">Verified</span>
      <span aria-hidden="true">·</span>
      {RESULTS_SOURCE}
      <span aria-hidden="true">·</span>
      {RESULTS_PERIOD}
    </p>
  );
}

export function TotalsGrid({ limit }: { limit?: number }) {
  const list = limit ? resultTotals.slice(0, limit) : resultTotals;
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3 xl:grid-cols-6">
      {list.map((t) => (
        <div key={t.label} className="bg-white p-6">
          <dt className="text-sm font-medium text-ink">{t.label}</dt>
          <dd className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink tabular sm:text-4xl">
            <span data-count={t.value}>{t.display}</span>
          </dd>
          <dd className="mt-1 text-xs text-ink-soft">{t.caption}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ImpressionsChart() {
  const max = Math.max(...monthly.map((m) => m.impressions));
  return (
    <figure className="card p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-ink">Google impressions per month</h3>
          <p className="text-sm text-ink-soft">All my sites combined, {RESULTS_PERIOD}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
          <TrendingUp aria-hidden="true" className="h-4 w-4" />
          7.5x in the last 3 months
        </span>
      </div>
      <div className="mt-8 flex h-56 items-end gap-2 sm:gap-3" aria-hidden="true">
        {monthly.map((m, i) => {
          const h = Math.max(2, (m.impressions / max) * 100);
          const last = i === monthly.length - 1;
          return (
            <div key={m.label} className="group relative flex h-full flex-1 flex-col justify-end">
              <span className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[11px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                {m.impressions.toLocaleString("en-US")}
              </span>
              <div
                data-bar
                className={`w-full rounded-t-lg ${
                  last
                    ? "bg-gradient-to-t from-accent to-violet"
                    : i >= 8
                      ? "bg-accent/70"
                      : "bg-accent/20 group-hover:bg-accent/40"
                }`}
                style={{ height: `${h}%` }}
              />
              <span className="mt-2 text-center text-[11px] text-ink-soft">{m.month}</span>
            </div>
          );
        })}
      </div>
      <figcaption className="sr-only">
        Monthly Google impressions: {monthly.map((m) => `${m.label} ${m.impressions}`).join(", ")}.
      </figcaption>
    </figure>
  );
}

export function SourcesList() {
  return (
    <div className="card p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-ink">Where visitors come from</h3>
      <p className="text-sm text-ink-soft">{TOTAL_SESSIONS.toLocaleString("en-US")} sessions tracked in GA4</p>
      <ul className="mt-6 space-y-4">
        {trafficSources.map((s, i) => (
          <li key={s.label}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className={i === 0 ? "font-semibold text-ink" : "text-ink-muted"}>{s.label}</span>
              <span className="tabular text-ink">
                {s.value.toLocaleString("en-US")} <span className="text-ink-soft">({s.share}%)</span>
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-canvas">
              <div
                className={`h-full rounded-full ${i === 0 ? "bg-gradient-to-r from-accent to-violet" : "bg-ink/25"}`}
                style={{ width: `${s.share}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 rounded-2xl bg-accent-soft p-4 text-sm leading-relaxed text-ink">
        <strong>AI search is real traffic.</strong> ChatGPT sends more visitors to my work than Google does.
        I build pages AI assistants can read, trust and recommend.
      </p>
    </div>
  );
}

export function RankingsList({ limit }: { limit?: number }) {
  const list = limit ? rankings.slice(0, limit) : rankings;
  return (
    <div className="card p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-ink">Ranking on Google page 1</h3>
      <p className="text-sm text-ink-soft">23 keywords in the top 10 that bring clicks</p>
      <ol className="mt-6 divide-y divide-line">
        {list.map((r) => (
          <li key={`${r.query}-${r.site}`} className="flex items-center gap-4 py-3">
            <span
              className={`grid h-9 w-11 shrink-0 place-items-center rounded-lg font-display text-sm font-bold tabular ${
                r.position === 1 ? "bg-ink text-white" : r.position <= 3 ? "bg-accent-soft text-accent" : "bg-canvas text-ink-muted"
              }`}
            >
              #{r.position}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium text-ink">&ldquo;{r.query}&rdquo;</span>
              <span className="block text-xs text-ink-soft">
                {r.site}
                {r.nonBrand && <span className="ml-1.5 rounded bg-violet-soft px-1.5 py-0.5 text-[10px] font-semibold text-violet">Non-brand</span>}
              </span>
            </span>
            <span className="text-sm tabular text-ink-muted">
              {r.clicks} <span className="text-ink-soft">clicks</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SiteCards() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {siteResults.map((s) => (
        <li key={s.name}>
          <Link
            href={s.href}
            className="spotlight group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">{s.kind}</span>
            <span className="mt-2 flex items-center justify-between text-xl font-semibold text-ink">
              {s.name}
              <ArrowUpRight aria-hidden="true" className="h-5 w-5 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
            </span>
            <span className="text-sm text-ink-soft">{s.domain}</span>
            <dl className="mt-5 grid grid-cols-3 gap-2">
              {s.stats.map((st) => (
                <div key={st.label}>
                  <dt className="text-[11px] text-ink-soft">{st.label}</dt>
                  <dd className="font-display text-lg font-semibold text-ink tabular">{st.value}</dd>
                </div>
              ))}
            </dl>
            <span className="mt-auto pt-5 text-sm font-medium text-accent">{s.highlight}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
