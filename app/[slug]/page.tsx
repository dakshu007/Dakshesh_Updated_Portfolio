import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check, Users, Sparkles, Code2, ExternalLink } from "lucide-react";
import { products, mainProducts, getProduct, achievementText } from "@/lib/data";
import { getProductContent } from "@/lib/products-content";
import { SITE_URL, person } from "@/lib/site";
import { productSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductVisual from "@/components/ProductVisual";
import CtaBand from "@/components/CtaBand";
import { PlayBadge } from "@/components/BillZapLive";
import { GooglePlayIcon } from "@/components/icons";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  const content = getProductContent(slug);
  if (!product || !content) return {};

  const url = `${SITE_URL}/${product.id}`;
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `/${product.id}` },
    openGraph: {
      type: "website",
      url,
      siteName: person.name,
      locale: "en_IN",
      title: content.metaTitle,
      description: content.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

const platformTone: Record<string, string> = {
  Live: "bg-emerald-50 text-emerald-700",
  "By request": "bg-amber-50 text-amber-700",
  "Coming soon": "bg-sky-50 text-sky-700",
  "In testing": "bg-violet-soft text-violet",
};

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  const content = getProductContent(slug);
  if (!product || !content) notFound();

  const others = mainProducts.filter((p) => p.id !== product.id);
  const isPlay = product.id === "billzap";

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Products", url: `${SITE_URL}/#products` },
    { name: product.name, url: `${SITE_URL}/${product.id}` },
  ]);
  const schema = productSchema(product.id);
  const schemas: Record<string, unknown>[] = [breadcrumb];
  if (schema) schemas.unshift(schema);
  if (content.faqs?.length) schemas.push(faqSchema(content.faqs));

  return (
    <article className="relative pt-28 sm:pt-32">
      <JsonLd schema={schemas} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem]">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent_75%)]" />
        <div className="absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full opacity-30 blur-[120px]" style={{ background: product.brand.from }} />
      </div>

      <div className="section">
        <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Products", href: "/#products" }, { name: product.name }]} />

        {/* Hero */}
        <header className="mt-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-2" data-reveal>
              <span className="chip">{content.category}</span>
              {product.exclusive && (
                <span className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  <Sparkles aria-hidden="true" className="h-3.5 w-3.5" /> Exclusive
                </span>
              )}
              {product.status === "new" && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <GooglePlayIcon className="h-3.5 w-3.5" /> Live on Google Play
                </span>
              )}
              {product.status === "soon" && !product.legacy && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
                  <GooglePlayIcon className="h-3.5 w-3.5" /> Coming soon to Google Play
                </span>
              )}
            </div>
            <h1 className="display-1 mt-6 text-ink" data-split>
              {product.name}
            </h1>
            <p className="lead mt-6 max-w-xl text-pretty" data-reveal>
              {content.tagline}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3" data-reveal>
              {isPlay ? (
                <PlayBadge />
              ) : (
                <a href={product.url} target="_blank" rel="noopener noreferrer" className="btn-primary px-7 py-4" data-magnetic>
                  {content.ctaLabel ?? `Visit ${product.name}`}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              )}
              {product.site && (
                <a href={product.site} target="_blank" rel="noopener noreferrer" className="btn-secondary py-4">
                  {new URL(product.site).hostname}
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                </a>
              )}
              <Link href="/#contact" className="btn-ghost py-4">
                Work with me
              </Link>
            </div>
            <p className="mt-6 text-sm text-ink-soft" data-reveal>
              Designed, built and grown by{" "}
              <Link href="/" className="font-semibold text-ink hover:text-accent">
                {person.name}
              </Link>
              , {person.roles[0].toLowerCase()} in Bangalore.
            </p>
          </div>
          <div data-reveal="scale">
            <ProductVisual product={product} />
          </div>
        </header>

        {/* Stats */}
        {content.stats && (
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4" data-reveal>
            {content.stats.map((s) => (
              <div key={s.label} className="bg-white p-6 sm:p-8">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-4xl font-semibold tracking-tight text-ink tabular sm:text-5xl">{s.value}</dd>
                <dd className="mt-2 text-sm text-ink-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Overview */}
        <section aria-labelledby="overview" className="mt-24 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
          <div>
            <p className="eyebrow" data-reveal>Overview</p>
            <h2 id="overview" className="display-3 mt-5 text-ink" data-split>
              What is {product.name}?
            </h2>
            <p className="lead mt-6 max-w-prose" data-reveal>
              {content.overview}
            </p>
          </div>
          <aside className="space-y-4 lg:pt-16">
            <div className="card p-6" data-reveal>
              <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">
                <Users aria-hidden="true" className="h-4 w-4 text-accent" />
                Who it is for
              </h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{content.whoFor}</p>
            </div>
            <div className="card p-6" data-reveal>
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">At a glance</h3>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  ["Type", content.category],
                  ["Platform", content.platform],
                  ...(content.pricing ? [["Pricing", content.pricing]] : []),
                  ["Built by", person.name],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
                    <dt className="text-ink-soft">{k}</dt>
                    <dd className="text-right font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              {content.links && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {content.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-muted hover:border-ink hover:text-ink"
                      >
                        {l.label}
                        <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </section>

        {/* Platforms */}
        {content.platforms && (
          <section aria-labelledby="platforms" className="mt-24">
            <p className="eyebrow" data-reveal>Platforms</p>
            <h2 id="platforms" className="display-3 mt-5 text-ink" data-split>
              {product.id === "mykavo" ? "One monitor. Everywhere you work." : "Where it runs"}
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {content.platforms.map((pl) => {
                const inner = (
                  <>
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${platformTone[pl.status]}`}>
                      {pl.status}
                    </span>
                    <span className="mt-4 flex items-center justify-between text-lg font-semibold text-ink">
                      {pl.name}
                      {pl.href && <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-ink-soft" />}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-ink-muted">{pl.desc}</span>
                  </>
                );
                return (
                  <li key={pl.name} data-reveal>
                    {pl.href ? (
                      <a href={pl.href} target="_blank" rel="noopener noreferrer" className="spotlight block h-full rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                        {inner}
                      </a>
                    ) : (
                      <div className="h-full rounded-3xl border border-line bg-white p-6">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* Features */}
        <section aria-labelledby="features" className="mt-24">
          <p className="eyebrow" data-reveal>Features</p>
          <h2 id="features" className="display-3 mt-5 text-ink" data-split>
            What {product.name} does
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {content.features.map((feature, i) => (
              <li key={feature.title} className="spotlight card p-7" data-reveal>
                <span className="font-mono text-xs text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 flex items-center gap-2 text-lg font-semibold text-ink">
                  <Check aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />
                  {feature.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{feature.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* How I built it */}
        {(content.built || content.stack) && (
          <section aria-labelledby="built" className="mt-24 grid gap-10 rounded-[2.5rem] border border-line bg-white p-7 shadow-card sm:p-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow" data-reveal>For engineers and recruiters</p>
              <h2 id="built" className="display-3 mt-5 text-ink" data-split>
                How I built it
              </h2>
              {content.built && (
                <ul className="mt-8 space-y-4">
                  {content.built.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed text-ink-muted" data-reveal>
                      <Code2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {content.stack && (
              <div className="lg:pt-24">
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">Tech stack</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {content.stack.map((s) => (
                    <li key={s} className="rounded-full border border-line bg-canvas px-3.5 py-1.5 text-sm font-medium text-ink-muted" data-reveal>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* FAQ */}
        {content.faqs && (
          <section aria-labelledby="product-faq" className="mt-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow" data-reveal>FAQ</p>
              <h2 id="product-faq" className="display-3 mt-5 text-ink" data-split>
                {product.name} questions
              </h2>
            </div>
            <dl className="divide-y divide-line border-y border-line">
              {content.faqs.map((f) => (
                <div key={f.question} className="py-6" data-reveal>
                  <dt className="text-lg font-semibold text-ink">{f.question}</dt>
                  <dd className="mt-2 leading-relaxed text-ink-muted">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* More products */}
        <section aria-labelledby="more-products" className="mt-24">
          <h2 id="more-products" className="display-3 text-ink">
            More products
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {others.map((other) => (
              <li key={other.id}>
                <Link
                  href={`/${other.id}`}
                  className="spotlight group flex h-full flex-col rounded-3xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                >
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl text-white"
                    style={{ background: `linear-gradient(135deg, ${other.brand.from}, ${other.brand.to})` }}
                  >
                    <other.icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="mt-4 font-semibold text-ink">{other.name}</span>
                  <span className="mt-1 text-sm text-ink-muted">
                    {achievementText(other)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <CtaBand />
    </article>
  );
}
