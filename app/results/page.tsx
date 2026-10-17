import type { Metadata } from "next";
import { Gauge, Code, Bot, MousePointerClick } from "lucide-react";
import { SITE_URL, person } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import { RESULTS_PERIOD, RESULTS_SOURCE } from "@/lib/results";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import {
  VerifiedBadge,
  TotalsGrid,
  ImpressionsChart,
  SourcesList,
  RankingsList,
  SiteCards,
} from "@/components/ResultsBlocks";

const TITLE = "SEO and Growth Results | Dakshesh B, SEO Engineer in Bangalore";
const DESCRIPTION =
  "Real Google Search Console and GA4 numbers for every site Dakshesh B has built: 70,233 impressions, 23 page 1 keywords and 2,101 ChatGPT visits.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/results" },
  openGraph: { type: "website", url: `${SITE_URL}/results`, siteName: person.name, title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const playbook = [
  { icon: Code, title: "Technical SEO from day one", desc: "Clean semantic HTML, one clear H1, canonicals, sitemaps and structured data on every page, so Google understands the site the day it launches." },
  { icon: Gauge, title: "Fast by default", desc: "Core Web Vitals tuned on real devices: optimised images, lean JavaScript and no layout shift. Speed is a ranking signal and a conversion signal." },
  { icon: Bot, title: "Ready for AI search", desc: "Pages written and structured so ChatGPT and other assistants can read, trust and recommend them, plus an llms.txt summary for AI agents." },
  { icon: MousePointerClick, title: "Built to convert", desc: "Click-to-call, WhatsApp and short forms in the right places, measured in GA4, so traffic turns into enquiries rather than bounces." },
];

function datasetSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Search and traffic results for sites built by Dakshesh B",
    description: `Google impressions, clicks, rankings and AI assistant referrals for sites built by ${person.name}, ${RESULTS_PERIOD}, from ${RESULTS_SOURCE}.`,
    url: `${SITE_URL}/results`,
    creator: { "@id": `${SITE_URL}/#person` },
    temporalCoverage: "2025-11/2026-09",
    variableMeasured: ["Google impressions", "Google clicks", "Average position", "Sessions by source"],
    isAccessibleForFree: true,
  };
}

export default function ResultsPage() {
  return (
    <article className="relative pt-28 sm:pt-32">
      <JsonLd
        schema={[
          datasetSchema(),
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Results", url: `${SITE_URL}/results` },
          ]),
        ]}
      />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent_75%)]" />

      <div className="section">
        <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Results" }]} />
        <header className="mt-10 max-w-4xl">
          <div data-reveal>
            <VerifiedBadge />
          </div>
          <h1 className="display-1 mt-6 text-ink" data-split>
            Sites I build <span className="serif-em text-gradient">get found.</span>
          </h1>
          <p className="lead mt-6 max-w-2xl" data-reveal>
            Real numbers from Google Search Console and GA4 for every site I have built: my SaaS, my
            products, my Chrome extensions and my client websites. {RESULTS_PERIOD}.
          </p>
        </header>

        <div className="mt-14" data-reveal>
          <TotalsGrid />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div data-reveal>
            <ImpressionsChart />
          </div>
          <div data-reveal>
            <SourcesList />
          </div>
        </div>

        <section aria-labelledby="sites-h" className="mt-24">
          <p className="eyebrow" data-reveal>Site by site</p>
          <h2 id="sites-h" className="display-2 mt-5 text-ink" data-split>
            What each project has earned
          </h2>
          <div className="mt-10" data-reveal>
            <SiteCards />
          </div>
        </section>

        <section aria-labelledby="rank-h" className="mt-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow" data-reveal>Rankings</p>
            <h2 id="rank-h" className="display-2 mt-5 text-ink" data-split>
              23 keywords on Google page 1
            </h2>
            <p className="lead mt-5" data-reveal>
              Average Google position for searches that bring at least three clicks. Non-brand means
              people found the site without already knowing its name, the hardest traffic to win.
            </p>
          </div>
          <div data-reveal>
            <RankingsList />
          </div>
        </section>

        <section aria-labelledby="playbook-h" className="mt-24">
          <p className="eyebrow" data-reveal>How I do it</p>
          <h2 id="playbook-h" className="display-2 mt-5 text-ink" data-split>
            The same playbook goes into your site
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {playbook.map((p) => (
              <li key={p.title} className="spotlight card p-7" data-reveal>
                <p.icon aria-hidden="true" className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{p.desc}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-prose text-sm leading-relaxed text-ink-soft">
            Method: impressions, clicks and positions come from Google Search Console, and visitors,
            sessions and traffic sources from Google Analytics 4, for {RESULTS_PERIOD}. Sites that
            started tracking recently show data from their first full month. Visitor numbers cover the
            sites with GA4 installed (Shrinkto, MyKavo, Harsa Designer Boutique); the others report
            Search Console data only.
          </p>
        </section>
      </div>

      <CtaBand title="Let us put your business on page 1." text="Send me your site or your idea. I will reply with a free, honest plan for speed, SEO and more enquiries." />
    </article>
  );
}
