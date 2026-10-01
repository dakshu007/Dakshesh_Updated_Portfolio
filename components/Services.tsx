import Link from "next/link";
import { ArrowRight, Store, Rocket, LineChart, Puzzle, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AnalyticsReport } from "@/lib/analytics";
import { compact } from "@/lib/analytics";
import SectionHeading from "./SectionHeading";

type Service = {
  icon: LucideIcon;
  type: string;
  title: string;
  text: string;
  deliverables: string[];
  proofSite: string;
  proof: (r: AnalyticsReport) => string | null;
};

const pos = (p: number) => `#${Math.max(1, Math.round(p))}`;

function bestRanking(r: AnalyticsReport, siteId: string, nonBrandFirst = false) {
  const list = r.rankings.filter((k) => k.siteId === siteId);
  return (nonBrandFirst && list.find((k) => !k.branded)) || list[0];
}

const services: Service[] = [
  {
    icon: Store,
    type: "Business website",
    title: "Business websites that bring enquiries",
    text: "A fast, mobile-first site for your shop, gym, clinic or brand that shows up on Google and makes it easy to call, WhatsApp or book.",
    deliverables: ["Design and build in Next.js", "Local SEO and Google Business ready", "Click-to-call and WhatsApp CTAs"],
    proofSite: "JP Fitness",
    proof: (r) => {
      const k = bestRanking(r, "jp-fitness", true);
      const site = r.sites.find((s) => s.id === "jp-fitness");
      if (!k || !site) return null;
      return `${pos(k.position)} on Google for “${k.query}” and ${compact(site.clicks)} clicks from search`;
    },
  },
  {
    icon: Rocket,
    type: "SaaS or web app",
    title: "SaaS products and web apps",
    text: "From idea to paying users: product design, dashboards, auth, payments and the marketing site that sells it, all shipped end to end.",
    deliverables: ["React and Next.js front end", "Auth, payments and dashboards", "Launch-ready landing pages"],
    proofSite: "MyKavo",
    proof: (r) => {
      const site = r.sites.find((s) => s.id === "mykavo");
      if (!site) return null;
      const mins = site.avgSessionSeconds ? Math.round(site.avgSessionSeconds / 60) : 0;
      return `${compact(site.impressions)} Google impressions${mins >= 2 ? ` and ${mins} minute average visits` : ""}`;
    },
  },
  {
    icon: LineChart,
    type: "SEO and growth",
    title: "SEO, speed and AI search",
    text: "Already have a site? I fix what holds it back: Core Web Vitals, technical SEO, structured data and content AI assistants can recommend.",
    deliverables: ["Speed and Core Web Vitals audit", "Technical and on-page SEO", "ChatGPT and AI search readiness"],
    proofSite: "Shrinkto",
    proof: (r) => {
      const site = r.sites.find((s) => s.id === "shrinkto");
      const k = bestRanking(r, "shrinkto");
      if (!site) return null;
      const parts = [
        site.aiSessions ? `${site.aiSessions.toLocaleString("en-IN")} visits from ChatGPT` : null,
        k ? `${pos(k.position)} on Google for “${k.query}”` : null,
      ].filter(Boolean);
      return parts.length ? parts.join(" and ") : null;
    },
  },
  {
    icon: Puzzle,
    type: "Chrome extension or tool",
    title: "Chrome extensions and tools",
    text: "Browser extensions, WordPress plugins and small tools that solve one problem well, with a landing page that ranks for it.",
    deliverables: ["Chrome Extensions (Manifest V3)", "WordPress and WooCommerce plugins", "Landing page and store listing"],
    proofSite: "Image Size Inspector",
    proof: (r) => {
      const site = r.sites.find((s) => s.id === "image-size-inspector");
      const k = bestRanking(r, "image-size-inspector");
      if (!site) return null;
      return `${compact(site.impressions)} impressions${k ? ` and ${pos(k.position)} for “${k.query}”` : ""}`;
    },
  },
];

export default function Services({ report }: { report: AnalyticsReport }) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-24 py-24 sm:py-28"
    >
      <div className="section">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            headingId="services-heading"
            eyebrow="What I can build for you"
            title="Pick what you need. I handle the rest."
            description="Design, development, SEO and launch, from one person who has done it for his own products first. Every offer below is backed by live numbers."
          />
          <Link
            href="/#contact"
            data-cta="services-header"
            className="btn-primary shrink-0 self-start lg:self-auto"
          >
            Get a free quote
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {services.map((s, i) => {
            const proof = s.proof(report);
            return (
              <li
                key={s.title}
                data-reveal
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lift sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-soft opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-white transition-colors group-hover:bg-accent">
                    <s.icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <span className="font-display text-sm font-bold text-ink-soft">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{s.text}</p>
                <ul className="mt-5 space-y-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-ink-muted">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {d}
                    </li>
                  ))}
                </ul>

                {proof && (
                  <p className="mt-6 rounded-2xl bg-canvas px-4 py-3 text-sm text-ink-muted ring-1 ring-line">
                    <span className="mr-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Live proof
                    </span>
                    <span className="font-semibold text-ink">{s.proofSite}:</span> {proof}
                  </p>
                )}

                <Link
                  href="/#contact"
                  data-cta={`service-${s.type.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  data-project-type={s.type}
                  className="mt-6 inline-flex items-center gap-1.5 self-start font-semibold text-accent hover:text-accent-hover"
                >
                  Start a project like this
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
