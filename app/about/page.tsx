import type { Metadata } from "next";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Building2, Rocket, Camera } from "lucide-react";
import { SITE_URL, person, experience } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";

const faqs = [
  {
    question: "Who is Dakshesh?",
    answer:
      "Dakshesh B, also known as Dakshesh, is a frontend web developer and web engineer based in Kotagiri, India. He builds fast, accessible web interfaces and ships full web products end to end.",
  },
  {
    question: "What does Dakshesh do?",
    answer:
      "Dakshesh works as a frontend web developer, web engineer and Flutter developer. At Cartrabbit he maintains the front end for six WooCommerce products used by more than 300,000 stores, and he has shipped nine of his own products, including MyKavo, a website change detection and monitoring SaaS.",
  },
  {
    question: "What technologies does Dakshesh use?",
    answer:
      "Dakshesh builds with HTML, CSS and JavaScript, React, Next.js and Tailwind CSS, WordPress and WooCommerce, Chrome Extensions (Manifest V3), Flutter and Dart, and PHP.",
  },
  {
    question: "Is Dakshesh available for work?",
    answer:
      "Yes. Dakshesh is open to frontend and full stack roles, remote friendly, and based in Kotagiri, India. You can reach him at daksheshbabu@gmail.com.",
  },
];

export const metadata: Metadata = {
  title: "About Dakshesh B | Frontend Web Engineer",
  description:
    "More about Dakshesh B, a frontend web engineer in Kotagiri, India. The work, the way I build, and a few photos along the way.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/about`,
    siteName: "Dakshesh B",
    locale: "en_US",
    alternateLocale: ["en_GB", "en_IN"],
    title: "About Dakshesh B | Frontend Web Engineer",
    description:
      "More about Dakshesh B, a frontend web engineer in Kotagiri, India. The work, the way I build, and a few photos along the way.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dakshesh B",
    description:
      "More about Dakshesh B, a frontend web engineer building fast, accessible web products.",
  },
};

function galleryImages(): string[] {
  const dir = path.join(process.cwd(), "public", "images", "gallery");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f) && !f.startsWith("."))
    .sort()
    .map((f) => `/images/gallery/${f}`);
}

const facts = [
  { icon: Rocket, label: "Around 2 years building for the web" },
  { icon: Building2, label: "Web Engineer at Cartrabbit" },
  { icon: MapPin, label: person.location },
];

export default function AboutPage() {
  const images = galleryImages();

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "About", url: `${SITE_URL}/about` },
  ]);

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <JsonLd schema={[breadcrumb, faqSchema(faqs)]} />

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
            <li className="font-medium text-ink-muted" aria-current="page">
              About
            </li>
          </ol>
        </nav>

        {/* Intro */}
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="mt-4 display-2 text-ink">
              I build for the web, and I sweat the details.
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-muted">
              {person.summary}
            </p>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-muted">
              At {experience.company} I help maintain the front end for six
              production products used by more than 300,000 stores. Outside of
              that, I design and ship my own apps and developer tools end to
              end, from the first commit to the page that sells them.
            </p>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-muted">
              I care most about how a site feels: fast loads, clean
              accessibility, and interfaces that behave the same on a budget
              phone and a desktop. Good engineering should be invisible, the
              experience should just feel right.
            </p>

            <ul className="mt-8 flex flex-wrap gap-3">
              {facts.map((fact) => (
                <li key={fact.label} className="chip">
                  <fact.icon aria-hidden="true" className="h-4 w-4 text-accent" />
                  {fact.label}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#contact" className="btn-primary">
                Get in touch
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link href="/#products" className="btn-secondary">
                See products
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 shadow-card">
            <Image
              src={person.image}
              alt="Dakshesh B, Frontend Web Engineer"
              width={person.imageWidth}
              height={person.imageHeight}
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="aspect-[3/4] w-full rounded-2xl border border-line object-cover"
              priority
            />
            <p className="mt-5 font-display text-lg font-bold text-ink">
              {person.name}
            </p>
            <p className="text-sm text-ink-muted">Frontend Web Engineer</p>
          </div>
        </div>

        {/* Gallery */}
        <section aria-labelledby="gallery-heading" className="mt-20">
          <div className="flex items-center gap-2 text-accent">
            <Camera aria-hidden="true" className="h-5 w-5" />
            <p className="text-xs font-bold uppercase tracking-[0.18em]">
              Gallery
            </p>
          </div>
          <h2
            id="gallery-heading"
            className="mt-3 display-2 text-ink"
          >
            A few frames
          </h2>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-ink-muted">
            Moments from work and life, away from the screen.
          </p>

          {images.length > 0 ? (
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {images.map((src, i) => (
                <li
                  key={src}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-canvas"
                >
                  <Image
                    src={src}
                    alt={`Dakshesh B, photo ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    quality={70}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-ink-soft">
              Photos coming soon.
            </p>
          )}
        </section>

        {/* FAQ - also feeds AI answers and search for "Dakshesh" */}
        <section aria-labelledby="faq-heading" className="mt-20 max-w-prose">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-heading" className="mt-3 display-2 text-ink">
            About Dakshesh
          </h2>
          <dl className="mt-8 divide-y divide-line border-t border-line">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-5">
                <dt className="font-display text-lg font-bold text-ink">
                  {faq.question}
                </dt>
                <dd className="mt-2 leading-relaxed text-ink-muted">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </article>
  );
}
