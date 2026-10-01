import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import type { AnalyticsReport } from "@/lib/analytics";
import TrendChart from "./results/TrendChart";
import {
  KpiGrid,
  LiveBadge,
  ProjectCard,
  RankingsList,
  SourcesBars,
  cardClass,
  periodText,
} from "./results/parts";
import WhatsAppIcon from "./icons/WhatsApp";
import { person } from "@/lib/site";

/**
 * Home-page proof: the numbers my work has earned on Google, ChatGPT and in
 * real visits, straight from Search Console and GA4 (via Windsor.ai). Dark,
 * dashboard-style, ending in a direct call to action.
 */
export default function LiveResults({ report }: { report: AnalyticsReport }) {
  const growth = report.growth && report.growth > 1.2 ? report.growth : null;
  const sessionsOf = (id: string) => report.sources.find((s) => s.id === id)?.sessions ?? 0;
  const aiBeatsGoogle = sessionsOf("ai") > sessionsOf("google");
  const aiShare = sessionsOf("ai") / Math.max(1, report.totals.sessions);
  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      className="viz-light relative isolate scroll-mt-24 overflow-hidden py-24 sm:py-28"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #F2F5FF 0%, #F7F8FC 45%, #FAFAF7 100%)" }}
        />
        <div className="bg-grid-light absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[26rem] w-[52rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="section">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow">Live results</p>
            <h2 id="results-heading" className="mt-4 display-2 text-ink">
              I do not just build websites. I build websites that get found.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              Every site I ship is tracked. These are the real numbers my
              products and client sites have earned on Google, ChatGPT and in
              real visits from {periodText(report)}, refreshed automatically.
            </p>
          </div>
          <div data-reveal className="shrink-0">
            <LiveBadge report={report} tone="light" />
          </div>
        </div>

        <div className="mt-12">
          <KpiGrid report={report} tone="light" />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.55fr_1fr]">
          <div data-reveal className={`${cardClass("light")} p-5 sm:p-7`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold text-ink">
                  Google impressions per month
                </h3>
                <p className="text-sm text-ink-soft">All sites combined, {periodText(report)}</p>
              </div>
              {growth && (
                <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                  <TrendingUp aria-hidden="true" className="h-4 w-4" />
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
          </div>

          <div data-reveal className={`${cardClass("light")} p-5 sm:p-7`}>
            <h3 className="font-display text-lg font-bold text-ink">
              Where visitors come from
            </h3>
            <p className="text-sm text-ink-soft">
              {report.totals.sessions.toLocaleString("en-IN")} sessions tracked in GA4
            </p>
            <div className="mt-6">
              <SourcesBars report={report} tone="light" />
            </div>
            {aiShare > 0.1 && (
              <p className="mt-6 rounded-2xl bg-accent-soft p-4 text-sm leading-relaxed text-ink-muted">
                <span className="font-semibold text-ink">AI search is real traffic.</span>{" "}
                {aiBeatsGoogle
                  ? "ChatGPT sends more visitors to my work than Google does. "
                  : `${Math.round(aiShare * 100)}% of visits come from ChatGPT and other AI assistants. `}
                I build pages that AI assistants can read, trust and recommend.
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.55fr]">
          <div data-reveal className={`${cardClass("light")} p-5 sm:p-7`}>
            <h3 className="font-display text-lg font-bold text-ink">
              Ranking on Google page 1
            </h3>
            <p className="text-sm text-ink-soft">
              {report.totals.pageOneKeywords} keywords in the top 10 that bring clicks
            </p>
            <div className="mt-3">
              <RankingsList rankings={report.rankings} tone="light" limit={8} />
            </div>
          </div>

          <div data-reveal>
            <ul className="grid h-full gap-4 sm:grid-cols-2">
              {report.sites.slice(0, 4).map((site) => (
                <li key={site.id}>
                  <ProjectCard site={site} tone="light" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Conversion moment */}
        <div
          data-reveal
          className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-accent/20 bg-gradient-to-r from-accent-soft via-white to-white p-6 shadow-card sm:p-8 lg:flex-row lg:items-center"
        >
          <div>
            <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Want numbers like these for your business?
            </p>
            <p className="mt-2 text-ink-muted">
              Tell me about your site. I will send a free, honest plan to get it
              ranking and converting, {person.responseTime}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#contact"
              data-cta="results-get-plan"
              className="btn-primary"
            >
              Get my free growth plan
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a
              href={person.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="results-whatsapp"
              className="btn-secondary"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#1FAF55]" />
              WhatsApp me
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-ink-soft" data-reveal>
          <Link
            href="/results"
            data-cta="results-full-report"
            className="font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
          >
            See the full live report
          </Link>{" "}
          with every site, keyword and trend.
        </p>
      </div>
    </section>
  );
}
