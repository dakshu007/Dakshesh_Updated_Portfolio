import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { person } from "@/lib/site";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative isolate scroll-mt-24 overflow-hidden py-24 sm:py-28"
    >
      {/* Background image with a hero-style scrim for readability and clean
          fades into the sections above and below. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/images/about-bg.jpg"
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
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
          <div>
            <p className="eyebrow" data-reveal>
              About
            </p>
            <h2
              id="about-heading"
              data-reveal
              className="mt-4 display-2 text-ink"
            >
              A frontend developer who ships products, not just pages.
            </h2>
            <p
              data-reveal
              className="mt-6 max-w-prose text-lg leading-relaxed text-ink-muted"
            >
              {person.summary}
            </p>
            <p
              data-reveal
              className="mt-4 max-w-prose text-lg leading-relaxed text-ink-muted"
            >
              I care about the details users feel: fast loads, clean
              accessibility, and interfaces that behave the same on a budget
              phone and a desktop. Right now that means MyKavo, which I build
              full time, plus a few client websites I take on alongside it.
            </p>
            <div
              data-reveal
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 font-semibold text-accent hover:text-accent-hover"
              >
                More about me and a gallery
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 font-semibold text-ink-muted hover:text-accent"
              >
                Get in touch
              </Link>
            </div>
          </div>

          <div
            data-reveal
            className="rounded-3xl border border-line bg-surface p-6 shadow-lift"
          >
            <Image
              src={person.image}
              alt="Dakshesh B, Frontend Web Developer, standing in a grass field"
              width={person.imageWidth}
              height={person.imageHeight}
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="aspect-[3/4] w-full rounded-2xl border border-line object-cover"
            />
            <p className="mt-5 font-display text-lg font-bold text-ink">
              {person.name}
            </p>
            <p className="text-sm text-ink-muted">{person.role}</p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-ink-soft">
              <MapPin aria-hidden="true" className="h-4 w-4 text-accent" />
              {person.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
