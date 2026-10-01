/**
 * Results: Google Search Console + Google Analytics 4 numbers for every site
 * Dakshesh has built, analysed from Windsor.ai and committed as a snapshot
 * in ./snapshot.json (data to 30 Sep 2026).
 *
 * There is no live fetching for now. To update the numbers, replace the rows
 * in snapshot.json and redeploy; buildReport() derives everything the UI
 * shows (totals, trends, rankings, sources) from those raw rows. A future
 * in-house analytics tool can feed the same RawData shape.
 * Import this from server components only.
 */

import snapshot from "./snapshot.json";

/* ----------------------------- Site metadata ----------------------------- */

export type SiteKind = "SaaS" | "Product" | "Chrome extension" | "Client website" | "Portfolio";

type SiteMeta = {
  id: string;
  name: string;
  kind: SiteKind;
  /** Where the card links: an internal case study / product page, or external. */
  href: string;
  domain: string;
  /** GA4 property names and ids that belong to this site. */
  ga?: string[];
  /** Hidden from per-site lists (still counted in totals). */
  hidden?: boolean;
};

const SITES: SiteMeta[] = [
  { id: "mykavo", name: "MyKavo", kind: "SaaS", href: "/mykavo", domain: "mykavo.app", ga: ["MyKavo", "552221560"] },
  { id: "shrinkto", name: "Shrinkto", kind: "Product", href: "/shrinkto", domain: "shrinkto.com", ga: ["Shrink To Traffics", "536778170"] },
  { id: "image-size-inspector", name: "Image Size Inspector", kind: "Chrome extension", href: "/image-size-inspector", domain: "imageinspect.netlify.app" },
  { id: "jp-fitness", name: "JP Fitness", kind: "Client website", href: "/work/jp-fitness", domain: "jpfitness.co.in" },
  { id: "spacing-inspector", name: "Spacing Inspector", kind: "Chrome extension", href: "/spacing-inspector", domain: "spacinginspector.netlify.app" },
  { id: "portfolio", name: "dakshesh.co.in", kind: "Portfolio", href: "/", domain: "dakshesh.co.in" },
  { id: "harsa-designer-boutique", name: "Harsa Designer Boutique", kind: "Client website", href: "/work/harsa-designer-boutique", domain: "harshdesignerboutique.com", ga: ["Harsa Designer Boutique", "552223904"] },
  { id: "billzap", name: "BillZap", kind: "Product", href: "/billzap", domain: "billzap.netlify.app", hidden: true },
];

function hostOf(value: unknown): string {
  const raw = String(value ?? "").trim().toLowerCase();
  return raw
    .replace(/^sc-domain:/, "")
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
}

function siteForHost(value: unknown): SiteMeta | undefined {
  const host = hostOf(value);
  return SITES.find((s) => s.domain === host);
}

function siteForGa(row: Row): SiteMeta | undefined {
  const keys = [row.account_name, row.account_id].map((v) => String(v ?? ""));
  return SITES.find((s) => s.ga?.some((g) => keys.includes(g)));
}

/* ----------------------------- Report types ----------------------------- */

export type MonthPoint = { month: string; impressions: number; clicks: number };

export type SiteReport = {
  id: string;
  name: string;
  kind: SiteKind;
  href: string;
  domain: string;
  impressions: number;
  clicks: number;
  ctr: number;
  /** Average Google position across all queries (lower is better). */
  position: number | null;
  monthly: MonthPoint[];
  visitors?: number;
  sessions?: number;
  pageViews?: number;
  engagementRate?: number;
  avgSessionSeconds?: number;
  aiSessions?: number;
  /** Best page-1 keyword that brings clicks, if any. */
  topKeyword?: Ranking;
};

export type Ranking = {
  query: string;
  siteId: string;
  siteName: string;
  position: number;
  clicks: number;
  impressions: number;
  branded: boolean;
};

export type SourceSlice = {
  id: "ai" | "google" | "direct" | "other-search" | "other";
  label: string;
  sessions: number;
};

export type AnalyticsReport = {
  source: "live" | "snapshot";
  updatedAt: string;
  /** First and last full month with Search Console data, "YYYY-MM". */
  periodStart: string;
  periodEnd: string;
  totals: {
    impressions: number;
    clicks: number;
    visitors: number;
    sessions: number;
    pageViews: number;
    aiSessions: number;
    countries: number;
    pageOneKeywords: number;
    sites: number;
  };
  /** Impressions growth: last 3 full months vs the 3 before, as a multiplier. */
  growth: number | null;
  monthly: MonthPoint[];
  sites: SiteReport[];
  rankings: Ranking[];
  sources: SourceSlice[];
};

/* ----------------------------- Raw input ----------------------------- */

type Row = Record<string, string | number | null | undefined>;

export type RawData = {
  fetchedAt: string;
  dateFrom: string;
  dateTo: string;
  gscSites: Row[];
  gscMonthly: Row[];
  gscQueries: Row[];
  gaProperties: Row[];
  gaSources: Row[];
  gaCountries: Row[];
  gscCountries: Row[];
};

const num = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

/** Accepts "2026|9", "202609", "2026-09" and returns "2026-09". */
function normaliseMonth(v: unknown): string | null {
  const s = String(v ?? "");
  const m = s.match(/^(\d{4})\D?(\d{1,2})$/);
  if (!m) return null;
  return `${m[1]}-${m[2].padStart(2, "0")}`;
}

function monthsBetween(start: string, end: string): string[] {
  const out: string[] = [];
  let [y, m] = start.split("-").map(Number);
  const [ey, em] = end.split("-").map(Number);
  while (y < ey || (y === ey && m <= em)) {
    out.push(`${y}-${String(m).padStart(2, "0")}`);
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return out;
}

const AI_SOURCES = /chatgpt|openai|perplexity|gemini|bard|copilot|claude|you\.com|phind/i;
const OTHER_SEARCH = /^(bing|duckduckgo|yahoo|yandex|ecosia|baidu|brave)/i;
const NOT_A_COUNTRY = /^\(not set\)$|^zzz$|^xkk$|^$/i;

/* ----------------------------- Build ----------------------------- */

export function buildReport(raw: RawData, source: AnalyticsReport["source"]): AnalyticsReport {
  // Months: only full months (the current month is partial and GSC lags).
  const lastFull = (() => {
    const d = new Date(raw.dateTo + "T00:00:00Z");
    const nextDay = new Date(d.getTime() + 86400000);
    // If dateTo is the last day of its month, that month is complete.
    const sameMonth = nextDay.getUTCMonth() === d.getUTCMonth();
    const ref = sameMonth ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - 1, 1)) : d;
    return `${ref.getUTCFullYear()}-${String(ref.getUTCMonth() + 1).padStart(2, "0")}`;
  })();

  // Per-site monthly
  const siteMonthly = new Map<string, Map<string, MonthPoint>>();
  const allMonths = new Map<string, MonthPoint>();
  for (const row of raw.gscMonthly) {
    const site = siteForHost(row.account_id ?? row.site ?? row.account_name);
    const month = normaliseMonth(row.year_month);
    if (!site || !month || month > lastFull) continue;
    const imp = num(row.impressions);
    const clk = num(row.clicks);
    const perSite = siteMonthly.get(site.id) ?? new Map<string, MonthPoint>();
    const p = perSite.get(month) ?? { month, impressions: 0, clicks: 0 };
    p.impressions += imp;
    p.clicks += clk;
    perSite.set(month, p);
    siteMonthly.set(site.id, perSite);
    const a = allMonths.get(month) ?? { month, impressions: 0, clicks: 0 };
    a.impressions += imp;
    a.clicks += clk;
    allMonths.set(month, a);
  }

  const monthsWithData = [...allMonths.values()]
    .filter((p) => p.impressions > 0)
    .map((p) => p.month)
    .sort();
  const periodStart = monthsWithData[0] ?? lastFull;
  const periodEnd = lastFull;
  const timeline = monthsBetween(periodStart, periodEnd);
  const fill = (m: Map<string, MonthPoint> | undefined) =>
    timeline.map((month) => m?.get(month) ?? { month, impressions: 0, clicks: 0 });
  const monthly = fill(allMonths);

  // Rankings: page-1 keywords that actually bring clicks.
  const rankings: Ranking[] = [];
  for (const row of raw.gscQueries) {
    const site = siteForHost(row.account_id ?? row.site);
    const query = String(row.query ?? "").trim();
    const position = num(row.position);
    const clicks = num(row.clicks);
    if (!site || !query || clicks < 3 || position <= 0 || position > 10) continue;
    const brandBits = [site.name, site.domain.split(".")[0], site.id]
      .map((s) => s.toLowerCase().replace(/[^a-z]/g, ""));
    const compact = query.toLowerCase().replace(/[^a-z]/g, "");
    rankings.push({
      query,
      siteId: site.id,
      siteName: site.name,
      position,
      clicks,
      impressions: num(row.impressions),
      branded: brandBits.some((b) => b.length > 3 && (compact.includes(b) || b.includes(compact))),
    });
  }
  rankings.sort((a, b) => a.position - b.position || b.clicks - a.clicks);

  // GA4 per property
  const gaBySite = new Map<string, Row>();
  for (const row of raw.gaProperties) {
    const site = siteForGa(row);
    if (site) gaBySite.set(site.id, row);
  }

  // Traffic sources
  const sourceTotals: Record<SourceSlice["id"], number> = {
    ai: 0,
    google: 0,
    direct: 0,
    "other-search": 0,
    other: 0,
  };
  const aiBySite = new Map<string, number>();
  for (const row of raw.gaSources) {
    const s = String(row.source ?? "");
    const sessions = num(row.sessions);
    if (AI_SOURCES.test(s)) {
      sourceTotals.ai += sessions;
      const site = siteForGa(row);
      if (site) aiBySite.set(site.id, (aiBySite.get(site.id) ?? 0) + sessions);
    } else if (/^google$/i.test(s)) sourceTotals.google += sessions;
    else if (/^\(direct\)$/i.test(s)) sourceTotals.direct += sessions;
    else if (OTHER_SEARCH.test(s)) sourceTotals["other-search"] += sessions;
    else sourceTotals.other += sessions;
  }

  const gaTotals = raw.gaProperties.reduce<{ visitors: number; sessions: number; pageViews: number }>(
    (acc, row) => ({
      visitors: acc.visitors + num(row.totalusers),
      sessions: acc.sessions + num(row.sessions),
      pageViews: acc.pageViews + num(row.screen_page_views),
    }),
    { visitors: 0, sessions: 0, pageViews: 0 }
  );

  // Anything not covered by the source rows (small sources) goes to "other".
  const classified = Object.values(sourceTotals).reduce((a, b) => a + b, 0);
  if (gaTotals.sessions > classified) sourceTotals.other += gaTotals.sessions - classified;

  const sources: SourceSlice[] = (
    [
      { id: "ai", label: "ChatGPT and AI assistants", sessions: sourceTotals.ai },
      { id: "direct", label: "Direct and shared links", sessions: sourceTotals.direct },
      { id: "google", label: "Google Search", sessions: sourceTotals.google },
      { id: "other-search", label: "Bing and other search", sessions: sourceTotals["other-search"] },
      { id: "other", label: "Referrals and other", sessions: sourceTotals.other },
    ] as SourceSlice[]
  )
    .filter((s) => s.sessions > 0)
    .sort((a, b) => b.sessions - a.sessions);

  // Sites
  const sites: SiteReport[] = [];
  for (const meta of SITES) {
    const gsc = raw.gscSites.find((r) => siteForHost(r.account_id ?? r.site)?.id === meta.id);
    const ga = gaBySite.get(meta.id);
    if (!gsc && !ga) continue;
    const impressions = num(gsc?.impressions);
    const clicks = num(gsc?.clicks);
    sites.push({
      id: meta.id,
      name: meta.name,
      kind: meta.kind,
      href: meta.href,
      domain: meta.domain,
      impressions,
      clicks,
      ctr: impressions > 0 ? clicks / impressions : 0,
      position: gsc && num(gsc.position) > 0 ? num(gsc.position) : null,
      monthly: fill(siteMonthly.get(meta.id)),
      visitors: ga ? num(ga.totalusers) : undefined,
      sessions: ga ? num(ga.sessions) : undefined,
      pageViews: ga ? num(ga.screen_page_views) : undefined,
      engagementRate: ga ? num(ga.engagement_rate) : undefined,
      avgSessionSeconds: ga ? num(ga.average_session_duration) : undefined,
      aiSessions: aiBySite.get(meta.id),
      topKeyword: rankings.find((r) => r.siteId === meta.id),
    });
  }
  const visibleSites = sites
    .filter((s) => !SITES.find((m) => m.id === s.id)?.hidden)
    .sort((a, b) => b.clicks + (b.sessions ?? 0) - (a.clicks + (a.sessions ?? 0)));

  // Countries with at least one real visitor (GA4) or click (Search Console).
  const countries = new Set<string>();
  for (const row of raw.gaCountries) {
    const c = String(row.country ?? "").trim();
    if (!NOT_A_COUNTRY.test(c) && num(row.totalusers ?? 1) > 0) countries.add(c);
  }
  for (const row of raw.gscCountries) {
    const c = String(row.country ?? "").trim();
    if (!NOT_A_COUNTRY.test(c) && num(row.clicks ?? 1) > 0) countries.add(c);
  }

  // Growth: last 3 full months vs the 3 before them.
  const imp = monthly.map((p) => p.impressions);
  const last3 = imp.slice(-3).reduce((a, b) => a + b, 0);
  const prev3 = imp.slice(-6, -3).reduce((a, b) => a + b, 0);

  return {
    source,
    updatedAt: raw.fetchedAt,
    periodStart,
    periodEnd,
    totals: {
      impressions: sites.reduce((a, s) => a + s.impressions, 0),
      clicks: sites.reduce((a, s) => a + s.clicks, 0),
      visitors: gaTotals.visitors,
      sessions: gaTotals.sessions,
      pageViews: gaTotals.pageViews,
      aiSessions: sourceTotals.ai,
      countries: countries.size,
      pageOneKeywords: rankings.length,
      sites: sites.length,
    },
    growth: prev3 > 0 ? last3 / prev3 : null,
    monthly,
    sites: visibleSites,
    rankings,
    sources,
  };
}

/* ----------------------------- Report ----------------------------- */

const report = buildReport(snapshot as unknown as RawData, "snapshot");

/** The report every results component reads (the committed snapshot). */
export async function getAnalytics(): Promise<AnalyticsReport> {
  return report;
}

/* ----------------------------- Formatting ----------------------------- */

export function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace(/\.0$/, "")}M`;
  if (n >= 10_000) return `${(n / 1000).toFixed(n >= 100_000 ? 0 : 1).replace(/\.0$/, "")}K`;
  return n.toLocaleString("en-IN");
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function monthLabel(month: string, withYear = false): string {
  const [y, m] = month.split("-").map(Number);
  return withYear ? `${MONTHS[m - 1]} ${y}` : MONTHS[m - 1];
}

export function formatUpdated(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
