import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { mainProducts, legacyProducts, type Product } from "@/lib/data";
import { GooglePlayIcon } from "./icons";
import { CarouselButtons } from "./CarouselButtons";

const MYKAVO_PLATFORMS = [
  { name: "Web", live: true },
  { name: "WordPress", live: true },
  { name: "Chrome", live: true },
  { name: "AI assistants", live: true },
  { name: "CI deploys", live: true },
  { name: "Android", live: true },
  { name: "Shopify", live: false },
];

/**
 * Every product in one clean carousel. Native scroll-snap (touch and trackpad
 * friendly) plus arrow buttons, mouse drag and a progress rail. MyKavo and
 * Habit Tracker get the premium Exclusive card.
 */
export default function ProductCarousel() {
  return (
    <section id="products" aria-labelledby="products-heading" className="section-y relative scroll-mt-20 overflow-hidden">
      <div className="section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="eyebrow" data-reveal>Products and achievements</p>
            <h2 id="products-heading" className="display-2 mt-5 text-ink" data-split>
              Seven products. Real users. <span className="serif-em text-gradient">One builder.</span>
            </h2>
            <p className="lead mt-5 max-w-2xl" data-reveal>
              A SaaS on every platform, two Android apps, a web app and three Chrome extensions, each
              designed, built, launched and grown by me.
            </p>
          </div>
          <CarouselButtons trackId="products-track" />
        </div>
      </div>
      <ul
        id="products-track"
        aria-label="Products"
        className="no-scrollbar mt-12 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pt-2 active:cursor-grabbing"
        style={{
          paddingInline: "calc(max(0px, (100vw - 100rem) / 2) + clamp(1.25rem, 4vw, 4rem))",
          scrollPaddingInline: "calc(max(0px, (100vw - 100rem) / 2) + clamp(1.25rem, 4vw, 4rem))",
        }}
        data-reveal
      >
        {mainProducts.map((p) => (
          <li
            key={p.id}
            className={`shrink-0 snap-start ${
              p.exclusive ? "w-[min(86vw,34rem)]" : "w-[min(78vw,21rem)]"
            }`}
          >
            {p.exclusive ? <ExclusiveCard product={p} /> : <ProductCard product={p} />}
          </li>
        ))}
      </ul>

      <div className="section">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="h-[3px] w-40 overflow-hidden rounded-full bg-line" aria-hidden="true">
            <div
              data-rail="products-track"
              className="h-full w-full origin-left rounded-full bg-ink transition-transform duration-300"
              style={{ transform: "scaleX(0.12)" }}
            />
          </div>
          <p className="text-sm text-ink-soft">
            Earlier side projects:{" "}
            {legacyProducts.map((p, i) => (
              <span key={p.id}>
                <Link href={`/${p.id}`} className="font-medium text-ink-muted underline-offset-4 hover:text-ink hover:underline">
                  {p.name}
                </Link>
                {i < legacyProducts.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

function Mark({ product, size = 48 }: { product: Product; size?: number }) {
  if (product.logo) {
    return (
      <Image
        src={product.logo}
        alt={`${product.name} logo`}
        width={size}
        height={size}
        className="rounded-2xl ring-1 ring-black/10"
        style={{ width: size, height: size }}
        draggable={false}
      />
    );
  }
  return (
    <span
      className="grid place-items-center rounded-2xl text-white shadow-sm"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${product.brand.from}, ${product.brand.to})`,
      }}
    >
      <product.icon aria-hidden="true" className="h-1/2 w-1/2" />
    </span>
  );
}

function StatusPill({ product, dark = false }: { product: Product; dark?: boolean }) {
  const tone =
    product.status === "new"
      ? dark
        ? "bg-emerald-400/15 text-emerald-300"
        : "bg-emerald-50 text-emerald-700"
      : product.status === "soon"
        ? dark
          ? "bg-sky-400/15 text-sky-300"
          : "bg-sky-50 text-sky-700"
        : dark
          ? "bg-white/10 text-white/80"
          : "bg-canvas text-ink-muted";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${product.status === "soon" ? "bg-sky-400" : "bg-emerald-500"}`} />
      {product.statusLabel}
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="spotlight group relative isolate flex h-full min-h-[27rem] flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white p-7 shadow-card transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-lift">
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: product.brand.from }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <Mark product={product} />
        <StatusPill product={product} />
      </div>
      <p className="relative mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
        {product.category}
      </p>
      <h3 className="mt-1.5 text-2xl font-semibold text-ink">
        <Link href={`/${product.id}`} className="after:absolute after:inset-0 after:z-[2] after:content-['']" draggable={false}>
          {product.name}
        </Link>
      </h3>
      <p className="relative mt-3 text-[15px] leading-relaxed text-ink-muted">{product.description}</p>

      <div className="relative mt-auto pt-8">
        <p className="flex items-baseline gap-2">
          {product.status === "new" ? (
            <span className="flex items-center gap-2 font-display text-[2.6rem] font-semibold leading-none tracking-tight text-ink">
              <GooglePlayIcon className="h-8 w-8" /> Live
            </span>
          ) : (
            <span className="font-display text-[2.6rem] font-semibold leading-none tracking-tight text-ink tabular">
              {product.achievement.value}
            </span>
          )}
        </p>
        <p className="mt-2 text-sm font-medium text-ink-muted">{product.achievement.label}</p>
        <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
          <span className="font-semibold text-ink">See the product</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-canvas text-ink transition-all duration-300 group-hover:rotate-[-45deg] group-hover:bg-ink group-hover:text-white">
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
}

function ExclusiveCard({ product }: { product: Product }) {
  const isKavo = product.id === "mykavo";
  return (
    <article className="exclusive-border group relative isolate flex h-full min-h-[27rem] flex-col overflow-hidden rounded-[1.75rem] bg-night p-8 text-white shadow-lift">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
        <div
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl transition-transform duration-700 group-hover:scale-125"
          style={{ background: product.brand.from }}
        />
        <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-violet opacity-30 blur-3xl" />
        <div className="bg-dots absolute inset-0 opacity-[0.15] invert" />
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Mark product={product} size={52} />
          <div>
            <h3 className="text-2xl font-semibold">
              <Link href={`/${product.id}`} className="after:absolute after:inset-0 after:z-[2] after:content-['']" draggable={false}>
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-white/60">{product.category}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
          <Sparkles aria-hidden="true" className="h-3 w-3 text-violet" /> Exclusive
        </span>
      </div>

      <p className="relative mt-6 max-w-md text-[15px] leading-relaxed text-white/75">{product.description}</p>

      {isKavo ? (
        <ul className="relative mt-6 flex flex-wrap gap-2" aria-label="MyKavo platforms">
          {MYKAVO_PLATFORMS.map((pl) => (
            <li
              key={pl.name}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                pl.live ? "border-white/15 bg-white/5 text-white/85" : "border-dashed border-white/20 text-white/50"
              }`}
            >
              {pl.name}
              {!pl.live && " · soon"}
            </li>
          ))}
        </ul>
      ) : (
        <div className="relative mt-6 flex items-center gap-3">
          <ul className="flex gap-1.5" aria-hidden="true">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <li
                key={i}
                className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-semibold ${
                  i < 5 ? "bg-sky-400 text-night" : i === 5 ? "bg-white/15 text-white" : "border border-dashed border-white/25 text-white/50"
                }`}
              >
                {d}
              </li>
            ))}
          </ul>
          <span className="text-xs text-white/60">Streaks that forgive</span>
        </div>
      )}

      <div className="relative mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
        <div>
          {isKavo ? (
            <p className="font-display text-[3.4rem] font-semibold leading-none tracking-tight">
              {product.achievement.value}
            </p>
          ) : (
            <p className="flex items-center gap-2.5 font-display text-[2.6rem] font-semibold leading-none tracking-tight">
              <GooglePlayIcon className="h-9 w-9" /> Soon
            </p>
          )}
          <p className="mt-2 text-sm text-white/65">{product.achievement.label}</p>
        </div>
        <span className="pointer-events-none relative inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-transform duration-300 group-hover:-translate-y-0.5">
          Explore {product.name}
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}
