import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowDown, Check, TrendingUp, Trophy, Bot, Globe2 } from "lucide-react";
import { person, experienceLabel } from "@/lib/site";
import type { AnalyticsReport } from "@/lib/analytics";
import { compact } from "@/lib/analytics";
import ExperienceValue from "./ExperienceValue";
import HeroTyping from "./HeroTyping";
import WhatsAppIcon from "./icons/WhatsApp";
import { Sparkline } from "./results/parts";

// Static path (no filesystem probe) so ISR regeneration on the server always
// renders the same background.
const HERO_IMAGE = "/images/hero-bg.jpg";

const trust = [
  `Reply ${person.responseTime}`,
  "Free 15 minute call",
  "Remote, worldwide",
];

export default function Hero({ report }: { report: AnalyticsReport }) {
  const month = new Date().toLocaleString("en-US", { month: "long", timeZone: "Asia/Kolkata" });
  const top = report.rankings[0];
  const growth = report.growth && report.growth > 1.2 ? report.growth : null;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20"
    >
      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={60}
          className="object-cover object-center"
        />
        {/* Readability scrim: strong canvas behind the text on the left,
            fading out on the right so the image shows vividly. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(250,250,247,0.95) 0%, rgba(250,250,247,0.84) 42%, rgba(250,250,247,0.42) 70%, rgba(250,250,247,0.1) 100%)",
          }}
        />
        {/* Extra even wash on small screens, where the text spans the full
            width and the left-biased gradient alone is not enough. */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: "rgba(250,250,247,0.5)" }}
        />
        {/* Clean fade into the next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(250,250,247,0), #FAFAF7)",
          }}
        />
      </div>

      <div className="section grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <Link
            href="/#contact"
            data-cta="hero-availability"
            className="group inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-white/80 py-1.5 pl-2.5 pr-3.5 text-sm font-semibold text-ink shadow-card backdrop-blur transition-colors hover:border-emerald-600/50"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Available for new projects in {month}
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <h1 className="mt-6 font-display font-bold leading-[1.06] tracking-tight">
            <span className="block text-balance text-[clamp(2rem,5.2vw,3.75rem)] text-ink">
              Dakshesh builds
            </span>
            <span
              aria-hidden="true"
              className="mt-1 block whitespace-nowrap text-[clamp(1.75rem,4.6vw,3rem)]"
            >
              <HeroTyping />
            </span>
            <span className="sr-only">
              MyKavo, Flycart, Yuko, Retainful, WPLoyalty, UpsellWP, Spark
              Editor, BillZap, Shrinkto, Spacing Inspector, FocusLens, EEAT
              Analyser, DesignLock, Melody Flow and Image Size Inspector.
            </span>
          </h1>

          <p className="mt-7 max-w-prose text-lg leading-relaxed text-ink-muted sm:text-xl">
            I design and build fast websites, SaaS products and web apps that{" "}
            <span className="font-semibold text-ink">rank on Google</span> and{" "}
            <span className="font-semibold text-ink">turn visitors into customers</span>.
            Web Engineer at Cartrabbit, where my front end reaches more than
            300,000 stores.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/#contact"
              data-cta="hero-start-project"
              className="cta-glow btn-primary px-7 py-3.5 text-base max-sm:w-full"
            >
              Start your project
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a
              href={person.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="hero-whatsapp"
              className="btn border border-ink/10 bg-white px-6 py-3.5 text-base text-ink shadow-card hover:border-[#25D366] max-sm:w-full"
            >
              <WhatsAppIcon className="h-5 w-5 text-[#1FAF55]" />
              WhatsApp me
            </a>
            <Link
              href="/#results"
              data-cta="hero-see-results"
              className="btn px-3 py-3.5 text-base text-ink-muted hover:text-accent"
            >
              See live results
              <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted">
            {trust.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check aria-hidden="true" className="h-4 w-4 text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>

          {/* Quick facts */}
          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
            <div>
              <dt className="sr-only">Building for the web</dt>
              <dd>
                <span className="block font-display text-2xl font-bold text-ink sm:text-3xl">
                  <ExperienceValue initial={experienceLabel()} />
                </span>
                <span className="mt-1 block text-sm text-ink-muted">
                  Building for the web
                </span>
              </dd>
            </div>
            {[
              { v: "9", l: "Products shipped" },
              { v: "300k+", l: "Stores served" },
              { v: String(report.totals.countries), l: "Countries reached" },
            ].map((item) => (
              <div key={item.l}>
                <dt className="sr-only">{item.l}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold text-ink sm:text-3xl">
                    {item.v}
                  </span>
                  <span className="mt-1 block text-sm text-ink-muted">
                    {item.l}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Live proof card */}
        <aside
          aria-label="Live results snapshot"
          className="viz-light relative mx-auto w-full max-w-sm motion-safe:animate-float lg:mx-0 lg:justify-self-end"
        >
          <div className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-lift ring-1 ring-black/5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live from Google
              </p>
              {growth && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                  <TrendingUp aria-hidden="true" className="h-3.5 w-3.5" />
                  {growth.toFixed(1)}x
                </span>
              )}
            </div>

            <p className="mt-4 font-display text-4xl font-bold tracking-tight text-ink">
              {report.totals.impressions.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-ink-muted">
              Google impressions earned by sites I built
            </p>

            <div className="mt-4">
              <Sparkline points={report.monthly} label="Monthly Google impressions, all sites" />
            </div>

            <ul className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
              {top && (
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-white">
                    <Trophy aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span className="text-ink-muted">
                    <span className="font-semibold text-ink">
                      #{Math.max(1, Math.round(top.position))} on Google
                    </span>{" "}
                    for &ldquo;{top.query}&rdquo;
                  </span>
                </li>
              )}
              {report.totals.aiSessions > 0 && (
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Bot aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span className="text-ink-muted">
                    <span className="font-semibold text-ink">
                      {compact(report.totals.aiSessions)} visits
                    </span>{" "}
                    from ChatGPT
                  </span>
                </li>
              )}
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Globe2 aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="text-ink-muted">
                  <span className="font-semibold text-ink">
                    {report.totals.pageOneKeywords} keywords
                  </span>{" "}
                  on page 1
                </span>
              </li>
            </ul>

            <Link
              href="/results"
              data-cta="hero-proof-card"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
            >
              See the full live report
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
