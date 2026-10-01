import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { focusProducts, otherProducts } from "@/lib/data";
import type { AnalyticsReport } from "@/lib/analytics";
import { compact } from "@/lib/analytics";
import SectionHeading from "./SectionHeading";

/** A one-line live proof for a product, when Search Console tracks it. */
function liveLine(report: AnalyticsReport, id: string): string | null {
  const site = report.sites.find((s) => s.id === id);
  if (!site || site.impressions === 0) return null;
  const top = report.rankings.find((r) => r.siteId === id);
  const parts = [`${compact(site.impressions)} impressions`];
  if (top) parts.push(`#${Math.max(1, Math.round(top.position))} on Google`);
  else if (site.clicks > 0) parts.push(`${compact(site.clicks)} clicks`);
  return parts.join(" · ");
}

export default function ProductsStrip({ report }: { report: AnalyticsReport }) {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative isolate scroll-mt-24 overflow-hidden py-24 sm:py-28"
    >
      {/* Background image with a hero-style scrim for readability and clean
          fades into the sections above and below. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/images/products-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(250,250,247,0.94) 0%, rgba(250,250,247,0.8) 55%, rgba(250,250,247,0.55) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #FAFAF7 0%, rgba(250,250,247,0) 16%, rgba(250,250,247,0) 84%, #FAFAF7 100%)",
          }}
        />
      </div>

      <div className="section">
        <SectionHeading
          headingId="products-heading"
          eyebrow="Products"
          title="Six products I build and grow"
          description="A SaaS, a web app, Chrome extensions, an SEO tool and an Android app, each designed, built, launched and ranked by me."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {focusProducts.map((product) => {
            const line = liveLine(report, product.id);
            return (
              <li key={product.id} data-reveal>
                <Link
                  href={`/${product.id}`}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                    product.featured ? "border-[#EAB308]/50 hover:border-[#EAB308]" : "border-line hover:border-accent"
                  }`}
                >
                  {product.featured && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FFC700]/25 blur-2xl"
                    />
                  )}
                  <div className="flex items-center justify-between">
                    {product.logo ? (
                      <Image
                        src={product.logo}
                        alt=""
                        width={52}
                        height={52}
                        className="h-[52px] w-[52px] rounded-2xl ring-1 ring-black/10"
                      />
                    ) : (
                      <span className="grid h-[52px] w-[52px] place-items-center rounded-2xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                        <product.icon aria-hidden="true" className="h-6 w-6" />
                      </span>
                    )}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-5 w-5 text-ink-soft transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>
                  <h3 className="mt-5 flex flex-wrap items-center gap-2 font-display text-xl font-bold text-ink">
                    {product.name}
                    {product.featured && (
                      <span className="rounded-full bg-[#FFF3C4] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#A16207]">
                        SaaS · full time
                      </span>
                    )}
                    {product.soon && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                        {product.soonLabel ?? "Soon"}
                      </span>
                    )}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {product.description}
                  </p>
                  {line && (
                    <p className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-semibold text-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {line}
                    </p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {otherProducts.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2" data-reveal>
            <span className="mr-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">
              Earlier side projects
            </span>
            {otherProducts.map((product) => (
              <Link
                key={product.id}
                href={`/${product.id}`}
                className="chip transition-colors hover:border-accent hover:text-accent"
              >
                <product.icon aria-hidden="true" className="h-4 w-4" />
                {product.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
