import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="section-y relative scroll-mt-20 pt-0 sm:pt-0">
      <div className="section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow" data-reveal>Client work</p>
            <h2 id="work-heading" className="display-2 mt-5 text-ink" data-split>
              Local businesses, <span className="serif-em text-gradient">built to rank.</span>
            </h2>
          </div>
          <p className="max-w-md text-ink-muted" data-reveal>
            Fast sites with local SEO and one-tap enquiries, tracked from day one so clients see
            exactly what they get.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug} data-reveal>
              <Link
                href={`/work/${p.slug}`}
                className="spotlight group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                {/* Browser mock */}
                <div className="relative h-56 overflow-hidden border-b border-line bg-canvas sm:h-64" aria-hidden="true">
                  <div
                    className="absolute inset-0 opacity-90 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: `radial-gradient(circle at 20% 20%, ${p.accent}33, transparent 55%), radial-gradient(circle at 85% 80%, #2B4BF222, transparent 50%)`,
                    }}
                  />
                  <div className="absolute inset-x-8 bottom-0 top-8 rounded-t-2xl border border-line bg-white shadow-card transition-transform duration-700 group-hover:-translate-y-2">
                    <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                      <span className="ml-3 rounded-md bg-canvas px-3 py-0.5 font-mono text-[11px] text-ink-soft">{p.liveLabel}</span>
                    </div>
                    <div className="p-5">
                      <p.icon className="h-6 w-6" style={{ color: p.accent }} />
                      <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">{p.title}</p>
                      <p className="mt-1 text-sm text-ink-muted">{p.location}</p>
                      <div className="mt-4 flex gap-2">
                        <span className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: p.accent }}>
                          Call now
                        </span>
                        <span className="rounded-full bg-[#0B7A43] px-3 py-1.5 text-xs font-semibold text-white">WhatsApp</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">{p.kind}</p>
                  <h3 className="mt-2 flex items-center justify-between gap-3 text-2xl font-semibold text-ink">
                    {p.title}
                    <ArrowUpRight aria-hidden="true" className="h-6 w-6 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  </h3>
                  <p className="mt-2 text-ink-muted">{p.tagline}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-4">
                    {p.stats.map((s) => (
                      <div key={s.label}>
                        <dt className="text-xs text-ink-soft">{s.label}</dt>
                        <dd className="font-display text-xl font-semibold text-ink tabular">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
