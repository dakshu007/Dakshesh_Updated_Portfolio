import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BellRing,
  Check,
  ScanEye,
  SearchCheck,
  Link2,
  Code2,
  Gauge,
  ShieldCheck,
} from "lucide-react";
import type { AnalyticsReport } from "@/lib/analytics";
import { compact } from "@/lib/analytics";

const checks = [
  { icon: ScanEye, label: "Visual" },
  { icon: SearchCheck, label: "SEO" },
  { icon: Link2, label: "Links" },
  { icon: Code2, label: "Scripts" },
  { icon: Gauge, label: "Speed" },
  { icon: ShieldCheck, label: "SSL" },
];

/**
 * Home-page spotlight for MyKavo, the SaaS I build full time. Left: the
 * pitch with live numbers. Right: an animated product moment (scan beam,
 * a caught price change, check progress and an alert), CSS only, and fully
 * static under prefers-reduced-motion (see .mk-* in globals.css).
 */
export default function SaasSpotlight({ report }: { report: AnalyticsReport }) {
  const site = report.sites.find((s) => s.id === "mykavo");
  const top = report.rankings.find((r) => r.siteId === "mykavo");
  const stats = [
    site && site.impressions > 0 ? { v: compact(site.impressions), l: "Google impressions" } : null,
    site?.avgSessionSeconds && site.avgSessionSeconds > 60
      ? { v: `${Math.round(site.avgSessionSeconds / 60)} min`, l: "Average visit" }
      : null,
    top ? { v: `#${Math.max(1, Math.round(top.position))}`, l: `On Google for “${top.query}”` } : null,
  ].filter((s): s is { v: string; l: string } => s !== null);

  return (
    <section
      id="mykavo"
      aria-labelledby="mykavo-heading"
      className="relative isolate scroll-mt-24 overflow-hidden py-24 sm:py-28"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #FFFBEB 0%, #FFF8E1 55%, #FAFAF7 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgba(161,98,7,0.18) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 70% 60% at 70% 40%, #000 30%, transparent 75%)",
          }}
        />
        <div className="absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-[#FFC700]/35 blur-[110px]" />
      </div>

      <div className="section grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        {/* Pitch */}
        <div data-reveal className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#EAB308]/40 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#A16207] backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFC700] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#EAB308]" />
            </span>
            Building it full time
          </p>

          <div className="mt-6 flex items-center gap-4">
            <Image
              src="/images/logos/mykavo.png"
              alt="MyKavo logo"
              width={60}
              height={60}
              className="h-[60px] w-[60px] rounded-2xl shadow-card ring-1 ring-black/10"
            />
            <div>
              <h2 id="mykavo-heading" className="font-display text-4xl font-bold tracking-tight text-ink">
                MyKavo
              </h2>
              <p className="text-sm font-medium text-ink-soft">Website change monitoring SaaS</p>
            </div>
          </div>

          <p className="mt-6 font-display text-3xl font-bold leading-tight text-ink sm:text-[2.5rem]">
            Know what changed.{" "}
            <span className="relative text-[#A16207] sm:whitespace-nowrap">
              <span className="mk-marker absolute inset-x-0 bottom-1 -z-10 h-3 rounded-full bg-[#FFE066]/70" aria-hidden="true" />
              Fix what matters.
            </span>
          </p>

          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-muted">
            MyKavo watches your websites for visual, SEO, link, script and
            performance changes, and alerts you with before and after evidence
            before small problems become expensive ones. I design, build and
            run it end to end.
          </p>

          {stats.length > 0 && (
            <dl className="mt-8 grid max-w-lg grid-cols-3 gap-2 sm:gap-3">
              {stats.map((s) => (
                <div key={s.l} className="flex min-w-0 flex-col rounded-2xl border border-[#EAB308]/30 bg-white/70 p-3 backdrop-blur sm:p-3.5">
                  <dt className="order-2 text-xs leading-snug text-ink-soft">{s.l}</dt>
                  <dd className="order-1 font-display text-xl font-bold text-ink sm:text-2xl">{s.v}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://mykavo.app/"
              target="_blank"
              rel="noopener noreferrer"
              data-cta="mykavo-try-free"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-base font-bold text-white shadow-lift transition-colors hover:bg-black"
            >
              Try free now
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[#FFC700] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <Link href="/mykavo" data-cta="mykavo-explore" className="btn-secondary px-6 py-3.5 text-base">
              Explore MyKavo
            </Link>
          </div>
          <p className="mt-3 text-sm text-ink-soft">Free plan included. No credit card needed.</p>
        </div>

        {/* Animated product moment */}
        <div data-reveal className="relative min-w-0">
          <p className="sr-only">
            Illustration: MyKavo scans a pricing page, detects that a price
            changed, runs visual, SEO, link, script, speed and SSL checks, and
            sends an alert with before and after evidence.
          </p>
          <div aria-hidden="true" className="relative mx-auto mb-16 mt-12 max-w-xl">
            {/* Browser frame */}
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_30px_80px_-30px_rgba(120,80,0,0.45)] ring-1 ring-[#EAB308]/20">
              <div className="flex items-center gap-3 border-b border-line bg-[#FCFBF7] px-4 py-3">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                </span>
                <span className="min-w-0 flex-1 truncate rounded-full bg-white px-3 py-1 text-xs text-ink-soft ring-1 ring-line">
                  mykavo.app / monitors / yourstore.com/pricing
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FFC700]" />
                  Watching
                </span>
              </div>

              {/* Page being monitored */}
              <div className="relative overflow-hidden p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="h-3 w-20 rounded-full bg-ink/80" />
                  <span className="flex gap-2">
                    <span className="h-2 w-10 rounded-full bg-line" />
                    <span className="h-2 w-10 rounded-full bg-line" />
                    <span className="h-2 w-10 rounded-full bg-line" />
                  </span>
                </div>
                <div className="mt-6 space-y-2">
                  <span className="block h-4 w-3/4 rounded-full bg-ink/10" />
                  <span className="block h-4 w-1/2 rounded-full bg-ink/10" />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                  {["Starter", "Pro", "Team"].map((plan, i) => (
                    <div
                      key={plan}
                      className={`relative min-w-0 rounded-2xl border p-2.5 sm:p-3 ${i === 1 ? "border-[#EAB308]/50 bg-[#FFFBEB]" : "border-line bg-canvas"}`}
                    >
                      <span className="block text-[11px] font-semibold text-ink-muted">{plan}</span>
                      <span className="relative mt-1 block h-7 font-display text-lg font-bold text-ink sm:text-xl">
                        {i === 1 ? (
                          <>
                            <span className="mk-old absolute inset-0">$49</span>
                            <span className="mk-new absolute inset-0 text-[#B91C1C]">$59</span>
                          </>
                        ) : i === 0 ? (
                          "$19"
                        ) : (
                          "$99"
                        )}
                      </span>
                      <span className="mt-2 block h-1.5 w-full rounded-full bg-line" />
                      <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-line" />
                      {i === 1 && (
                        <span className="mk-diff pointer-events-none absolute -inset-1.5 rounded-[1.1rem] border-2 border-dashed border-[#EF4444]">
                          <span className="absolute -top-3 right-2 rounded-full bg-[#EF4444] px-2 py-0.5 text-[10px] font-bold text-white">
                            Changed 8.4%
                          </span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2">
                  <span className="block h-2.5 w-full rounded-full bg-line" />
                  <span className="block h-2.5 w-5/6 rounded-full bg-line" />
                </div>

                {/* Scan beam */}
                <div className="mk-scan pointer-events-none absolute inset-x-0 top-0 h-full">
                  <div className="h-16 bg-gradient-to-b from-transparent to-[#FFC700]/25" />
                  <div className="h-0.5 bg-[#EAB308] shadow-[0_0_18px_4px_rgba(255,199,0,0.6)]" />
                </div>
              </div>

              {/* Checks */}
              <div className="border-t border-line bg-[#FCFBF7] px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between text-[11px] font-semibold text-ink-muted">
                  <span>Running 6 checks</span>
                  <span className="text-ink">Every hour</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                  <div className="mk-progress h-full rounded-full bg-gradient-to-r from-[#FFC700] to-[#EAB308]" />
                </div>
                <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {checks.map((c, i) => (
                    <li
                      key={c.label}
                      className="mk-check flex items-center gap-1.5 rounded-lg bg-white px-2 py-1.5 text-[11px] font-semibold text-ink ring-1 ring-line"
                      style={{ animationDelay: `${0.35 * i}s` }}
                    >
                      <c.icon className="h-3.5 w-3.5 text-[#A16207]" />
                      {c.label}
                      <Check className="ml-auto h-3 w-3 text-emerald-600" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Alert toast */}
            <div className="mk-toast absolute -bottom-20 left-2 w-72 rounded-2xl bg-ink p-4 text-white shadow-lift sm:-left-6">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FFC700] text-ink">
                  <BellRing className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">Price changed on /pricing</span>
                  <span className="mt-0.5 block text-xs text-white/60">Before and after attached · just now</span>
                </span>
              </div>
            </div>

            {/* Floating SEO card */}
            <div className="absolute -top-14 right-4 rounded-2xl border border-line bg-white px-4 py-3 shadow-lift motion-safe:animate-float sm:-right-6">
              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-ink-soft">
                <span className="h-2 w-2 rounded-full bg-[#EAB308]" />
                SEO check
              </span>
              <span className="mt-1 block text-sm font-semibold text-ink">Title tag changed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
