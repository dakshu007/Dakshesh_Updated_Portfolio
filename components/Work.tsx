import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import type { AnalyticsReport } from "@/lib/analytics";
import { compact } from "@/lib/analytics";
import SectionHeading from "./SectionHeading";

export default function Work({ report }: { report: AnalyticsReport }) {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-24 bg-black py-24 sm:py-28"
    >
      <div className="section">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            headingId="work-heading"
            eyebrow="Client work"
            title="Websites for local businesses, built to rank"
            description="Fast sites with local SEO and one-tap enquiries, tracked from day one so my clients see exactly what they get."
            dark
          />
          <Link
            href="/#contact"
            data-cta="work-header"
            className="btn-on-dark shrink-0 self-start lg:self-auto"
          >
            Get a site like these
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-2">
          {projects.map((project) => {
            const site = report.sites.find((s) => s.id === project.slug);
            // Rankings are sorted best first.
            const best = report.rankings.find((r) => r.siteId === project.slug);
            const top =
              report.rankings.find((r) => r.siteId === project.slug && !r.branded) ?? best;
            return (
              <li key={project.slug} data-reveal>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-canvas transition-transform duration-300 hover:-translate-y-1">
                  <Link
                    href={`/work/${project.slug}`}
                    className="relative block aspect-[16/9] overflow-hidden bg-accent-soft"
                    aria-label={`Read the ${project.title} case study`}
                  >
                    <Image
                      src={project.thumbnail}
                      alt={project.thumbnailAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    {project.isNew && (
                      <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-card">
                        New client
                      </span>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <div className="flex items-center gap-2 text-accent">
                      <project.icon aria-hidden="true" className="h-5 w-5" />
                      <span className="text-xs font-bold uppercase tracking-[0.16em]">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-ink-muted">{project.tagline}</p>

                    {site && (
                      <dl className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-surface p-4 ring-1 ring-line">
                        <div>
                          <dt className="text-[11px] text-ink-soft">Impressions</dt>
                          <dd className="font-display text-lg font-bold text-ink">{compact(site.impressions)}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] text-ink-soft">Google clicks</dt>
                          <dd className="font-display text-lg font-bold text-ink">{compact(site.clicks)}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] text-ink-soft">Best ranking</dt>
                          <dd className="font-display text-lg font-bold text-ink">
                            {best ? `#${Math.max(1, Math.round(best.position))}` : "New"}
                          </dd>
                        </div>
                      </dl>
                    )}
                    {top && (
                      <p className="mt-3 text-sm text-ink-muted">
                        Ranking for &ldquo;{top.query}&rdquo; on Google page 1.
                      </p>
                    )}

                    <div className="mt-auto flex flex-wrap items-center gap-4 pt-7">
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-1.5 font-semibold text-accent hover:text-accent-hover"
                      >
                        Read case study
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-ink-muted hover:text-accent"
                        >
                          {project.liveLabel ?? "Live"}
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-white/80" data-reveal>
          Looking for my own products?{" "}
          <Link
            href="/#products"
            className="font-semibold text-white underline underline-offset-4 hover:text-white/80"
          >
            See the six I build and grow
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
