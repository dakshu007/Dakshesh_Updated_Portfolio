import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowLeft,
  Check,
  Users,
  Layers,
  Sparkle,
} from "lucide-react";
import { products } from "@/lib/data";
import { getProductContent } from "@/lib/products-content";
import { SITE_URL, person } from "@/lib/site";
import { productSchema, breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
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
      siteName: "Dakshesh B",
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

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  const content = getProductContent(slug);
  if (!product || !content) notFound();

  const Icon = product.icon;
  const others = products.filter((p) => p.id !== product.id);

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Products", url: `${SITE_URL}/#products` },
    { name: product.name, url: `${SITE_URL}/${product.id}` },
  ]);
  const schema = productSchema(product.id);

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <JsonLd schema={schema ? [schema, breadcrumb] : [breadcrumb]} />

      <div className="section">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/#products" className="hover:text-accent">
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-ink-muted" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="chip">
              <Layers aria-hidden="true" className="h-4 w-4 text-accent" />
              {content.category}
              {product.soon && (
                <span className="ml-1 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                  Soon
                </span>
              )}
            </span>
            <h1 className="mt-5 display-2 text-ink">{product.name}</h1>
            <p className="mt-4 max-w-prose text-xl leading-relaxed text-ink-muted">
              {content.tagline}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Visit {product.name}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <Link href="/#contact" className="btn-secondary">
                Work with me
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-surface">
            <div
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center"
            >
              <Icon className="h-28 w-28 text-accent/15" strokeWidth={1.25} />
            </div>
            <div className="absolute bottom-5 left-5 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-white">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold text-ink">
                {content.platform}
              </span>
            </div>
          </div>
        </header>

        {/* Overview */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="max-w-prose">
            <h2 className="text-2xl font-bold text-ink">What it is</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              {content.overview}
            </p>

            <h2 className="mt-12 text-2xl font-bold text-ink">
              What it does
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {content.features.map((feature) => (
                <li
                  key={feature.title}
                  className="rounded-2xl border border-line bg-surface p-5"
                >
                  <div className="flex items-center gap-2">
                    <Check
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-accent"
                    />
                    <h3 className="font-semibold text-ink">{feature.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {feature.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink-soft">
                <Users aria-hidden="true" className="h-4 w-4 text-accent" />
                Who it is for
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {content.whoFor}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink-soft">
                <Sparkle aria-hidden="true" className="h-4 w-4 text-accent" />
                At a glance
              </h2>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Type</dt>
                  <dd className="font-medium text-ink">{content.category}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Platform</dt>
                  <dd className="font-medium text-ink">{content.platform}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Built by</dt>
                  <dd className="font-medium text-ink">{person.name}</dd>
                </div>
              </dl>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-5 w-full"
              >
                Open live
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>

        {/* More products */}
        <section
          aria-labelledby="more-products"
          className="mt-20 border-t border-line pt-12"
        >
          <h2 id="more-products" className="text-2xl font-bold text-ink">
            More products
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other) => {
              const OtherIcon = other.icon;
              return (
                <li key={other.id}>
                  <Link
                    href={`/${other.id}`}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                      <OtherIcon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="mt-3 font-semibold text-ink group-hover:text-accent">
                      {other.name}
                    </span>
                    <span className="mt-1 text-sm text-ink-muted">
                      {other.description}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/#products"
            className="mt-10 inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-hover"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            All products
          </Link>
        </section>
      </div>
    </article>
  );
}
