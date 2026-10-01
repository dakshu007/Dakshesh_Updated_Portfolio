import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gauge, Bot, Search, MousePointerClick } from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import { getAnalytics, compact } from "@/lib/analytics";
import JsonLd from "@/components/JsonLd";
import ScrollAnimations from "@/components/ScrollAnimations";
import CtaBand from "@/components/CtaBand";
import TrendChart from "@/components/results/TrendChart";
import {
  KpiGrid,
  LiveBadge,
  ProjectCard,
  RankingsList,
  SourcesBars,
  cardClass,
  periodText,
} from "@/components/results/parts";

// Regenerate in the background every 6 hours so the numbers stay live.
export const revalidate = 21600;

const title = "Live SEO and Growth Results | Dakshesh B, Web Developer";
const description =
  "Real Google Search Console and GA4 numbers for every site Dakshesh B has built: impressions, clicks, page 1 rankings, ChatGPT referrals and visitors, updated automatically.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/results" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/results`,
    siteName: "Dakshesh B",
    locale: "en_US",
    alternateLocale: ["en_GB", "en_IN"],
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Live SEO and Growth Results | Dakshesh B",
    description,
  },
};

const methods = [
  {
    icon: Search,
    title: "Technical SEO from day one",
    text: "Clean semantic HTML, one clear H1, canonicals, sitemaps and structured data on every page, so Google understands the site the day it launches.",
  },
  {
    icon: Gauge,
    title: "Fast by default",
    text: "Core Web Vitals tuned on real devices: optimised images, lean JavaScript and no layout shift. Speed is a ranking signal and a conversion signal.",
  },
  {
    icon: Bot,
    title: "Ready for AI search",
    text: "Pages written and structured so ChatGPT and other assistants can read, trust and recommend them, plus an llms.txt summary for AI agents.",
  },
  {
    icon: MousePointerClick,
    title: "Built to convert",
    text: "Click-to-call, WhatsApp and short forms in the right places, measured in GA4, so traffic turns into enquiries rather than bounces.",
  },
];

export default async function ResultsPage() {
  const report = await getAnalytics();
  const growth = report.growth && report.growth > 1.2 ? report.growth : null;

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Results", url: `${SITE_URL}/results` },
  ]);

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <ScrollAnimations />
      <article className="viz-light pb-8 pt-28 sm:pt-32">
        <div className="section">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-accent">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-ink-muted" aria-current="page">
                Results
              </li>
            </ol>
          </nav>

          <header className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">Live results</p>
              <h1 className="mt-4 display-1 text-ink">
                Proof, not promises.
              </h1>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-muted">
                Every site and product I build is connected to Google Search
                Console and Google Analytics. This page pulls those numbers
                through Windsor.ai and refreshes itself, so what you see is what
                my work is doing right now, from {periodText(report)}.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <LiveBadge report={report} tone="light" />
              <Link href="/#contact" data-cta="results-page-hero" className="btn-primary">
                Get results like these
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </header>

          <div className="mt-12">
            <KpiGrid report={report} tone="light" />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.55fr_1fr]">
            <section aria-labelledby="trend-heading" className={`${cardClass("light")} p-5 sm:p-7`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 id="trend-heading" className="font-display text-lg font-bold text-ink">
                    Google impressions per month
                  </h2>
                  <p className="text-sm text-ink-soft">All sites combined</p>
                </div>
                {growth && (
                  <p className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                    {growth.toFixed(1)}x in the last 3 months
                  </p>
                )}
              </div>
              <div className="mt-6">
                <TrendChart
                  data={report.monthly}
                  caption="Google impressions per month across all of my sites"
                />
              </div>
            </section>

            <section aria-labelledby="sources-heading" className={`${cardClass("light")} p-5 sm:p-7`}>
              <h2 id="sources-heading" className="font-display text-lg font-bold text-ink">
                Where visitors come from
              </h2>
              <p className="text-sm text-ink-soft">
                {report.totals.sessions.toLocaleString("en-IN")} sessions in GA4
              </p>
              <div className="mt-6">
                <SourcesBars report={report} tone="light" />
              </div>
            </section>
          </div>

          {/* Every site */}
          <section aria-labelledby="sites-heading" className="mt-20">
            <p className="eyebrow">Site by site</p>
            <h2 id="sites-heading" className="mt-3 display-2 text-ink">
              What each project has earned
            </h2>
            <p className="mt-3 max-w-prose text-lg text-ink-muted">
              {report.totals.sites} live sites tracked: my SaaS, my own products
              and Chrome extensions, and client websites.
            </p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {report.sites.map((site) => (
                <li key={site.id} data-reveal>
                  <ProjectCard site={site} tone="light" />
                </li>
              ))}
              <li data-reveal>
                <Link
                  href="/#contact"
                  data-cta="results-your-site-card"
                  className="group flex h-full min-h-[18rem] flex-col justify-between rounded-3xl bg-ink p-6 text-white shadow-lift transition-transform hover:-translate-y-1"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8EAEFF]">
                    Next project
                  </span>
                  <span>
                    <span className="block font-display text-2xl font-bold leading-tight">
                      Your site could be the next card here.
                    </span>
                    <span className="mt-3 block text-sm text-white/70">
                      Tracked from day one, so you see exactly what you get.
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    Start your project
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            </ul>
          </section>

          {/* Rankings */}
          <section aria-labelledby="rankings-heading" className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Rankings</p>
              <h2 id="rankings-heading" className="mt-3 display-2 text-ink">
                {report.totals.pageOneKeywords} keywords on Google page 1
              </h2>
              <p className="mt-3 text-lg text-ink-muted">
                Average Google position for searches that bring at least three
                clicks. &ldquo;Non-brand&rdquo; means people found the site
                without already knowing its name, the hardest kind of traffic to win.
              </p>
              <p className="mt-6 text-sm text-ink-soft">
                Top result: &ldquo;{report.rankings[0]?.query}&rdquo; at #
                {Math.max(1, Math.round(report.rankings[0]?.position ?? 1))} with{" "}
                {compact(report.rankings[0]?.clicks ?? 0)} clicks.
              </p>
            </div>
            <div className={`${cardClass("light")} min-w-0 px-5 py-2 sm:px-7`}>
              <RankingsList rankings={report.rankings} tone="light" />
            </div>
          </section>

          {/* How */}
          <section aria-labelledby="how-heading" className="mt-20">
            <p className="eyebrow">How I do it</p>
            <h2 id="how-heading" className="mt-3 display-2 text-ink">
              The same playbook goes into your site
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {methods.map((m) => (
                <li key={m.title} data-reveal className={`${cardClass("light")} p-6`}>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                    <m.icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{m.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <p className="mt-12 max-w-prose text-sm leading-relaxed text-ink-soft">
            Method: impressions, clicks and positions come from Google Search
            Console, and visitors, sessions and traffic sources from Google
            Analytics 4, for {periodText(report)}. Search Console sites that
            only recently started tracking show data from their first full
            month. Visitor numbers cover the sites with GA4 installed (
            {report.sites
              .filter((s) => s.visitors !== undefined)
              .map((s) => s.name)
              .join(", ")}
            ); the others report Search Console data only.
          </p>
        </div>
      </article>

      <CtaBand
        id="results-cta"
        title="Let us put your business on page 1."
        subtitle="Send me your site or your idea. I will reply with a free, honest plan for speed, SEO and more enquiries."
      />
    </>
  );
}
