import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { person, experienceLabel } from "@/lib/site";
import ExperienceValue from "./ExperienceValue";
import HeroTyping from "./HeroTyping";

// Soft, on-palette gradient shown until a hero photo is added.
const HERO_GRADIENT =
  "radial-gradient(80% 60% at 72% 12%, #EAF1F2 0%, rgba(234,241,242,0) 60%)," +
  "radial-gradient(70% 55% at 22% 38%, #E7DCEF 0%, rgba(231,220,239,0) 55%)," +
  "linear-gradient(180deg, #E9F0EC 0%, #DCEAD6 38%, #E6DDEE 70%, #FAFAF7 100%)";

// Use a hero photo if one is present at public/images/hero-bg.<ext>.
function heroImageSrc(): string | null {
  for (const ext of ["jpg", "jpeg", "png", "webp", "avif"]) {
    const rel = `images/hero-bg.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", rel))) return `/${rel}`;
  }
  return null;
}

export default function Hero() {
  const heroSrc = heroImageSrc();

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20"
    >
      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {heroSrc ? (
          <Image
            src={heroSrc}
            alt=""
            fill
            priority
            sizes="100vw"
          quality={60}
            className="object-cover object-center"
          />
        ) : (
          <div className="h-full w-full" style={{ background: HERO_GRADIENT }} />
        )}
        {/* Readability scrim: strong canvas behind the text on the left,
            fading out on the right so the image shows vividly. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(250,250,247,0.94) 0%, rgba(250,250,247,0.80) 42%, rgba(250,250,247,0.40) 66%, rgba(250,250,247,0) 92%)",
          }}
        />
        {/* Extra even wash on small screens, where the text spans the full
            width and the left-biased gradient alone is not enough. */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{ background: "rgba(250,250,247,0.42)" }}
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

      <div className="section">
        <p className="eyebrow">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Frontend Web Engineer
        </p>

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
          {person.tagline} Currently a Web Engineer at Cartrabbit, where my work
          reaches more than 300,000 stores.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link href="/#work" className="btn-primary">
            View work
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link href="/#products" className="btn-secondary">
            See products
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        {/* Quick facts */}
        <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
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
            { v: "6", l: "Products at Cartrabbit" },
            { v: "300k+", l: "Stores served" },
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
    </section>
  );
}
