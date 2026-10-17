import type { Metadata } from "next";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Building2, Rocket, Camera, GraduationCap } from "lucide-react";
import { SITE_URL, person, jobs, education } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";

const faqs = [
  {
    question: "Who is Dakshesh?",
    answer:
      "Dakshesh B, also known as Dakshesh, is a full-stack developer, frontend engineer and SEO engineer based in Bangalore, India. He builds fast, accessible web products end to end and grows them with technical SEO.",
  },
  {
    question: "What does Dakshesh do?",
    answer:
      "Dakshesh builds and runs MyKavo, a website monitoring SaaS available on web, WordPress, Chrome, AI assistants and Android. He also built BillZap, a GST billing app live on Google Play, and Habit Tracker, coming soon to Google Play. Before that he was a Frontend Engineer at Cartrabbit, building interfaces for six WooCommerce products used by 300,000+ stores.",
  },
  {
    question: "What technologies does Dakshesh use?",
    answer:
      "TypeScript, React, Next.js, Tailwind CSS, Node.js, PostgreSQL, Prisma, Supabase, Cloudflare Workers, Flutter, React Native, Playwright and Vitest, plus technical SEO, JSON-LD and Core Web Vitals.",
  },
  {
    question: "Is Dakshesh available for work?",
    answer:
      "Yes. Dakshesh is open to full-time Full-Stack Developer, Frontend Engineer and SEO Engineer roles in Bangalore and ready to relocate anywhere. Reach him at daksheshbabu@gmail.com or +91 87784 81650.",
  },
  {
    question: "Where did Dakshesh study?",
    answer:
      "Dakshesh completed a B.E. in Computer Science and Engineering at Dr. N.G.P. Institute of Technology (Anna University), Coimbatore, from 2021 to 2025.",
  },
];

export const metadata: Metadata = {
  title: "About Dakshesh B | Full-Stack Developer in Bangalore",
  description:
    "More about Dakshesh B, a full-stack developer, frontend engineer and SEO engineer in Bangalore. The work, the way I build, and a few photos along the way.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/about`,
    siteName: "Dakshesh B",
    locale: "en_US",
    alternateLocale: ["en_GB", "en_IN"],
    title: "About Dakshesh B | Full-Stack Developer in Bangalore",
    description:
      "More about Dakshesh B, a full-stack developer, frontend engineer and SEO engineer in Bangalore. The work, the way I build, and a few photos along the way.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dakshesh B",
    description:
      "More about Dakshesh B, a full-stack developer in Bangalore building fast web products that rank.",
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
  { icon: Rocket, label: "2 years shipping production code" },
  { icon: Building2, label: `${jobs[0].title}, ${jobs[0].company}` },
  { icon: GraduationCap, label: `B.E. CSE, ${education.period}` },
  { icon: MapPin, label: `${person.location}, open to relocate` },
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
            <h1 className="mt-5 display-1 text-ink" data-split>
              I build for the web, and I <span className="serif-em text-gradient">sweat the details.</span>
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-muted">
              {person.summary}
            </p>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-muted">
              Today I build MyKavo full time, a website monitoring SaaS that runs on
              the web, in WordPress, in Chrome, inside AI assistants and on Android.
              Before that, at Cartrabbit, I built the front end for six WooCommerce
              products used by more than 300,000 stores. Alongside, I design and ship
              my own apps and developer tools end to end, from the first commit to
              the page that sells them.
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
              alt="Dakshesh B, full-stack developer in Bangalore"
              width={person.imageWidth}
              height={person.imageHeight}
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="aspect-[3/4] w-full rounded-2xl border border-line object-cover"
              priority
            />
            <p className="mt-5 font-display text-lg font-semibold text-ink">
              {person.name}
            </p>
            <p className="text-sm text-ink-muted">Full-Stack Developer · Bangalore</p>
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
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {images.map((src, i) => (
                <li
                  key={src}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-canvas"
                >
                  <Image
                    src={src}
                    alt={`Dakshesh B, photo ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
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
                <dt className="font-display text-lg font-semibold text-ink">
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
