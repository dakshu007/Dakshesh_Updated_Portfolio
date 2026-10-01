import Link from "next/link";
import {
  ArrowUpRight,
  Eye,
  MousePointerClick,
  Users,
  Bot,
  Trophy,
  Globe2,
} from "lucide-react";
import type { AnalyticsReport, MonthPoint, Ranking, SiteReport } from "@/lib/analytics";
import { compact, monthLabel } from "@/lib/analytics";
import CountUp from "../CountUp";

export type Tone = "dark" | "light";

/** Card surface for each tone. */
export function cardClass(tone: Tone) {
  return tone === "dark"
    ? "rounded-3xl border border-night-line bg-night-soft/80 backdrop-blur"
    : "rounded-3xl border border-line bg-surface shadow-card";
}

const text = {
  dark: { primary: "text-white", muted: "text-white/70", soft: "text-white/50" },
  light: { primary: "text-ink", muted: "text-ink-muted", soft: "text-ink-soft" },
};

/* ----------------------------- Live badge ----------------------------- */

export function LiveBadge({ report, tone }: { report: AnalyticsReport; tone: Tone }) {
  return (
    <p
      className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border px-3.5 py-1.5 text-xs font-medium ${
        tone === "dark"
          ? "border-night-line bg-white/5 text-white/70"
          : "border-line bg-surface text-ink-muted"
      }`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className={`font-semibold ${text[tone].primary}`}>
        Verified
      </span>
      <span aria-hidden="true">·</span>
      <span>Data to {monthLabel(report.periodEnd, true)}</span>
      <span aria-hidden="true" className="max-sm:hidden">·</span>
      <span className="max-sm:hidden">Google Search Console and GA4</span>
    </p>
  );
}

/* ----------------------------- KPI tiles ----------------------------- */

export function KpiGrid({ report, tone }: { report: AnalyticsReport; tone: Tone }) {
  const t = report.totals;
  const tiles = [
    { icon: Eye, value: t.impressions, label: "Google impressions", note: "times my sites showed in search" },
    { icon: MousePointerClick, value: t.clicks, label: "Clicks from Google", note: "people who chose my result" },
    { icon: Users, value: t.visitors, label: "Real visitors", note: `${compact(t.pageViews)} page views` },
    { icon: Bot, value: t.aiSessions, label: "Visits from ChatGPT", note: "AI assistants recommend my work" },
    { icon: Trophy, value: t.pageOneKeywords, label: "Page 1 keywords", note: "that bring clicks every month" },
    { icon: Globe2, value: t.countries, label: "Countries reached", note: "visitors from around the world" },
  ];
  return (
    <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          data-reveal
          className={`${cardClass(tone)} flex flex-col p-4 sm:p-6`}
        >
          <dt className="order-2 mt-1">
            <span className={`block text-sm font-semibold ${text[tone].primary}`}>
              {tile.label}
            </span>
            <span className={`mt-0.5 block text-xs leading-snug ${text[tone].soft}`}>
              {tile.note}
            </span>
          </dt>
          <dd className="order-1">
            <tile.icon
              aria-hidden="true"
              className={`mb-3 h-5 w-5 ${tone === "dark" ? "text-[#8EAEFF]" : "text-accent"}`}
            />
            <span
              className={`block font-display text-3xl font-bold tracking-tight sm:text-4xl ${text[tone].primary}`}
            >
              <CountUp value={tile.value} />
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ----------------------------- Traffic sources ----------------------------- */

export function SourcesBars({ report, tone }: { report: AnalyticsReport; tone: Tone }) {
  const max = Math.max(1, ...report.sources.map((s) => s.sessions));
  const total = report.sources.reduce((a, s) => a + s.sessions, 0) || 1;
  return (
    <ul className="space-y-4">
      {report.sources.map((s) => {
        const highlight = s.id === "ai";
        const pct = Math.round((s.sessions / total) * 100);
        return (
          <li key={s.id}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className={`font-medium ${highlight ? text[tone].primary : text[tone].muted}`}>
                {s.label}
              </span>
              <span className={`tabular-nums ${text[tone].muted}`}>
                <span className={`font-semibold ${text[tone].primary}`}>
                  {s.sessions.toLocaleString("en-IN")}
                </span>{" "}
                <span className={text[tone].soft}>({pct}%)</span>
              </span>
            </div>
            <div
              className="mt-2 h-2.5 w-full overflow-hidden rounded-full"
              style={{ background: "var(--viz-track)" }}
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.max(2, (s.sessions / max) * 100)}%`,
                  background: highlight ? "var(--viz-mark)" : "var(--viz-muted-mark)",
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ----------------------------- Rankings ----------------------------- */

export function RankingsList({
  rankings,
  tone,
  limit,
}: {
  rankings: Ranking[];
  tone: Tone;
  limit?: number;
}) {
  const rows = typeof limit === "number" ? rankings.slice(0, limit) : rankings;
  return (
    <ol className={`divide-y ${tone === "dark" ? "divide-night-line" : "divide-line"}`}>
      {rows.map((r) => {
        const pos = Math.max(1, Math.round(r.position));
        const podium = pos <= 3;
        return (
          <li key={`${r.siteId}-${r.query}`} className="flex items-center gap-3 py-3">
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-sm font-bold ${
                podium
                  ? "bg-accent text-white"
                  : tone === "dark"
                    ? "border border-night-line text-white"
                    : "border border-line text-ink"
              }`}
              aria-label={`Position ${pos}`}
            >
              #{pos}
            </span>
            <span className="min-w-0 flex-1">
              <span className={`block truncate font-semibold ${text[tone].primary}`}>
                &ldquo;{r.query}&rdquo;
              </span>
              <span className={`block truncate text-xs ${text[tone].soft}`}>
                {r.siteName}
                {!r.branded && (
                  <span
                    className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      tone === "dark" ? "bg-emerald-400/15 text-emerald-300" : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    Non-brand
                  </span>
                )}
              </span>
            </span>
            <span className={`shrink-0 text-right text-xs ${text[tone].soft}`}>
              <span className={`block text-sm font-semibold tabular-nums ${text[tone].primary}`}>
                {r.clicks.toLocaleString("en-IN")}
              </span>
              clicks
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/* ----------------------------- Sparkline ----------------------------- */

export function Sparkline({ points, label }: { points: MonthPoint[]; label: string }) {
  // Start the line at the first month with data so new sites are not flat.
  const firstIdx = points.findIndex((p) => p.impressions > 0);
  const series = firstIdx >= 0 ? points.slice(firstIdx) : points;
  const values = series.map((p) => p.impressions);
  const max = Math.max(1, ...values);
  const n = Math.max(1, values.length - 1);
  const xy = values.map((v, i) => [(i / n) * 100, 30 - (v / max) * 26] as const);
  const line = xy.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `M0,32 L${xy.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" L")} L100,32 Z`;
  const [lx, ly] = xy[xy.length - 1] ?? [100, 30];
  return (
    <div className="relative h-12 w-full" role="img" aria-label={label}>
      <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <path d={area} fill="var(--viz-mark)" opacity="0.1" />
        <polyline
          points={line}
          fill="none"
          stroke="var(--viz-mark)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2"
        style={{
          left: `${lx}%`,
          top: `${(ly / 32) * 100}%`,
          background: "var(--viz-mark)",
          // Surface ring keeps the end dot legible on the line.
          ["--tw-ring-color" as string]: "var(--viz-surface)",
        }}
      />
    </div>
  );
}

/* ----------------------------- Project cards ----------------------------- */

function duration(seconds?: number) {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export function ProjectCard({ site, tone }: { site: SiteReport; tone: Tone }) {
  const external = site.href.startsWith("http");
  const stats = [
    { label: "Impressions", value: compact(site.impressions) },
    { label: "Clicks", value: compact(site.clicks) },
    site.visitors !== undefined
      ? { label: "Visitors", value: compact(site.visitors) }
      : { label: "Click rate", value: `${(site.ctr * 100).toFixed(1)}%` },
  ];
  const first = site.monthly.find((p) => p.impressions > 0);
  const trendLabel = first
    ? `${site.name} monthly Google impressions since ${monthLabel(first.month, true)}`
    : `${site.name} monthly Google impressions`;
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={`text-[11px] font-bold uppercase tracking-[0.14em] ${tone === "dark" ? "text-[#8EAEFF]" : "text-accent"}`}>
            {site.kind}
          </p>
          <h3 className={`mt-1 font-display text-xl font-bold leading-tight ${text[tone].primary}`}>
            {site.name}
          </h3>
          <p className={`truncate text-xs ${text[tone].soft}`}>{site.domain}</p>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className={`h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${text[tone].soft}`}
        />
      </div>

      <div className="mt-4">
        <Sparkline points={site.monthly} label={trendLabel} />
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className={`text-[11px] ${text[tone].soft}`}>{s.label}</dt>
            <dd className={`font-display text-lg font-bold ${text[tone].primary}`}>{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className={`mt-4 space-y-1.5 border-t pt-4 text-sm ${tone === "dark" ? "border-night-line" : "border-line"}`}>
        {site.topKeyword && (
          <p className={text[tone].muted}>
            <span className={`font-semibold ${text[tone].primary}`}>
              #{Math.max(1, Math.round(site.topKeyword.position))} on Google
            </span>{" "}
            for &ldquo;{site.topKeyword.query}&rdquo;
          </p>
        )}
        {site.aiSessions ? (
          <p className={text[tone].muted}>
            <span className={`font-semibold ${text[tone].primary}`}>
              {site.aiSessions.toLocaleString("en-IN")} visits
            </span>{" "}
            from ChatGPT
          </p>
        ) : null}
        {site.avgSessionSeconds && site.avgSessionSeconds > 120 ? (
          <p className={text[tone].muted}>
            <span className={`font-semibold ${text[tone].primary}`}>
              {duration(site.avgSessionSeconds)}
            </span>{" "}
            average visit
          </p>
        ) : null}
      </div>
    </>
  );

  const cls = `${cardClass(tone)} group flex h-full flex-col p-5 transition-all hover:-translate-y-1 ${
    tone === "dark" ? "hover:border-[#8EAEFF]/60" : "hover:border-accent hover:shadow-lift"
  }`;

  return external ? (
    <a href={site.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <Link href={site.href} className={cls}>
      {body}
    </Link>
  );
}

export function periodText(report: AnalyticsReport) {
  return `${monthLabel(report.periodStart, true)} to ${monthLabel(report.periodEnd, true)}`;
}
