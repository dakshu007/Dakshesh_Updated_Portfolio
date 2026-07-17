import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function ProductsStrip() {
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
              "linear-gradient(to right, rgba(250,250,247,0.93) 0%, rgba(250,250,247,0.74) 55%, rgba(250,250,247,0.45) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #FAFAF7 0%, rgba(250,250,247,0) 16%, rgba(250,250,247,0) 84%, #FAFAF7 100%)",
          }}
        />
        <div
          className="absolute inset-0 sm:hidden"
          style={{ background: "rgba(250,250,247,0.45)" }}
        />
      </div>

      <div className="section">
        <SectionHeading
          headingId="products-heading"
          eyebrow="Products"
          title="Eight products, each with its own home"
          description="Side projects and developer tools I designed, built and launched. Open any one to see what it does."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id} data-reveal>
              <Link
                href={`/${product.id}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                    <product.icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 -translate-x-1 translate-y-1 text-ink-soft opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent group-hover:opacity-100"
                  />
                </div>
                <h3 className="mt-5 flex items-center gap-2 font-display text-lg font-bold text-ink">
                  {product.name}
                  {product.soon && (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                      Soon
                    </span>
                  )}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {product.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
