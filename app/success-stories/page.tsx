import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Quote,
  Search,
  MousePointerClick,
  MapPin,
  UserPlus,
  X,
  TrendingUp,
} from "lucide-react";
import { SITE_URL, person, LAST_UPDATED } from "@/lib/site";
import { getProject } from "@/lib/data";
import { jpStory as story } from "@/lib/stories";
import { breadcrumbSchema, faqSchema, PERSON_ID } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RoiCalculator from "@/components/RoiCalculator";
import ContactForm from "@/components/ContactForm";
import { VerifiedBadge } from "@/components/ResultsBlocks";

const URL = `${SITE_URL}/success-stories`;

export const metadata: Metadata = {
  title: story.metaTitle,
  description: story.metaDescription,
  keywords: [
    "local SEO success story",
    "local SEO case study",
    "SEO for gyms",
    "gym SEO Coimbatore",
    "SEO vs Google Ads for local business",
    "gym near me SEO",
    "local SEO expert Bangalore",
    "SEO expert Coimbatore",
  ],
  alternates: { canonical: "/success-stories" },
  openGraph: {
    type: "article",
    url: URL,
    siteName: person.name,
    locale: "en_IN",
    title: story.metaTitle,
    description: story.metaDescription,
    publishedTime: story.published,
    modifiedTime: LAST_UPDATED,
    authors: [person.name],
  },
  twitter: { card: "summary_large_image", title: story.metaTitle, description: story.metaDescription },
};

const funnelIcons = [Search, MousePointerClick, MapPin, UserPlus];

function schemas() {
  const gym = {
    "@type": "ExerciseGym",
    name: story.client,
    url: story.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kalapatti, Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  };
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${URL}#article`,
      headline: story.title,
      description: story.metaDescription,
      url: URL,
      image: `${URL}/opengraph-image`,
      datePublished: story.published,
      dateModified: LAST_UPDATED,
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
      about: [gym, { "@type": "Thing", name: "Local search engine optimisation" }],
      mainEntityOfPage: URL,
      inLanguage: "en-IN",
    },
    {
      "@context": "https://schema.org",
      "@type": "Review",
      author: { "@type": "Person", name: story.owner.name, jobTitle: story.owner.role, worksFor: gym },
      reviewBody: story.testimonial,
      itemReviewed: {
        "@type": "Service",
        name: "Local SEO and website for JP Fitness",
        provider: { "@id": PERSON_ID },
        areaServed: "Coimbatore",
      },
      datePublished: story.published,
    },
    faqSchema(story.faqs),
    breadcrumbSchema([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Success stories", url: URL },
    ]),
  ];
}

export default function SuccessStoriesPage() {
  const harsa = getProject("harsa-designer-boutique")!;

  return (
    <article className="relative pt-28 sm:pt-32">
      <JsonLd schema={schemas()} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] overflow-hidden">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent_75%)]" />
        <div className="absolute -top-24 right-0 h-[30rem] w-[30rem] rounded-full bg-[#FDE2E2] opacity-70 blur-[120px]" />
        <div className="absolute left-0 top-40 h-[24rem] w-[24rem] rounded-full bg-[#DCE4FF] blur-[120px]" />
      </div>

      <div className="section">
        <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Success stories" }]} />

        {/* Hero */}
        <header className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="min-w-0">
            <p className="eyebrow" data-reveal>Success story · Local SEO · {story.location}</p>
            <h1 className="display-1 mt-6 text-ink" data-split>
              How local SEO brought JP Fitness <span className="serif-em text-gradient">35 new members in 35 days.</span>
            </h1>
            <p className="lead mt-6 max-w-2xl" data-reveal>
              {story.dek}
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-reveal>
              <a href="#get-plan" className="btn-primary px-7 py-4" data-magnetic>
                Get the same for your business
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <a href={story.url} target="_blank" rel="noopener noreferrer" className="btn-secondary py-4">
                Visit {story.domain}
              </a>
            </div>
          </div>
          <dl className="grid min-w-0 grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line" data-reveal>
            {story.stats.map((s) => (
              <div key={s.label} className="bg-white p-5 sm:p-6">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-semibold tracking-tight text-ink tabular sm:text-4xl">{s.value}</dd>
                <dd className="mt-1.5 text-sm leading-snug text-ink-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* Testimonial */}
        <section aria-labelledby="testimonial-h" className="mt-20">
          <h2 id="testimonial-h" className="sr-only">
            What the owner says
          </h2>
          <figure className="relative overflow-hidden rounded-[2.5rem] bg-ink px-7 py-12 text-white sm:px-14 sm:py-16" data-reveal="scale">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#EF4444]/35 blur-[100px]" />
              <div className="absolute -bottom-24 right-0 h-80 w-96 rounded-full bg-violet/35 blur-[100px]" />
            </div>
            <Quote aria-hidden="true" className="relative h-10 w-10 text-white/40" />
            <blockquote className="relative mt-6 max-w-4xl font-display text-2xl font-medium leading-snug tracking-tight sm:text-4xl">
              &ldquo;{story.testimonial}&rdquo;
            </blockquote>
            <figcaption className="relative mt-10 flex flex-wrap items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white font-display text-xl font-bold text-ink">JP</span>
              <span>
                <span className="block text-lg font-semibold">{story.owner.name}</span>
                <span className="block text-white/75">
                  {story.owner.role}, {story.client}, {story.location}
                </span>
              </span>
            </figcaption>
            <p className="relative mt-6 text-xs text-white/60">Shared by the owner, lightly edited for clarity.</p>
          </figure>
        </section>

        {/* In short */}
        <section aria-labelledby="in-short-h" className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow" data-reveal>In short</p>
            <h2 id="in-short-h" className="display-3 mt-5 text-ink" data-split>
              The whole story in one paragraph
            </h2>
          </div>
          <p className="lead text-ink" data-reveal>
            {story.inShort}
          </p>
        </section>

        {/* Challenge + steps */}
        <section aria-labelledby="challenge-h" className="mt-24 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow" data-reveal>The starting point</p>
            <h2 id="challenge-h" className="display-2 mt-5 text-ink" data-split>
              &ldquo;I did not believe in SEO.&rdquo;
            </h2>
            {story.challenge.map((p) => (
              <p key={p.slice(0, 20)} className="mt-5 leading-relaxed text-ink-muted" data-reveal>
                {p}
              </p>
            ))}
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">What I did</h3>
            <ol className="mt-5 space-y-4">
              {story.steps.map((s, i) => (
                <li key={s.title} className="spotlight card flex gap-5 p-6 sm:p-7" data-reveal>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ink font-display text-lg font-semibold text-white">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-lg font-semibold text-ink">{s.title}</span>
                    <span className="mt-1.5 block leading-relaxed text-ink-muted">{s.desc}</span>
                  </span>
                </li>
              ))}
            </ol>

            <h3 className="mt-12 font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">Timeline</h3>
            <ol className="mt-5 grid gap-3 sm:grid-cols-3">
              {story.timeline.map((t, i) => (
                <li key={t.when} className={`rounded-3xl border p-5 ${i === 2 ? "border-emerald-200 bg-emerald-50" : "border-line bg-white"}`} data-reveal>
                  <span className={`block font-display text-lg font-semibold ${i === 2 ? "text-emerald-800" : "text-ink"}`}>{t.when}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{t.what}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Funnel */}
        <section aria-labelledby="funnel-h" className="mt-24">
          <p className="eyebrow" data-reveal>How it converts</p>
          <h2 id="funnel-h" className="display-2 mt-5 max-w-3xl text-ink" data-split>
            From a Google search to a gym membership
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {story.funnel.map((f, i) => {
              const Icon = funnelIcons[i];
              return (
                <li key={f.title} className="relative card p-6" data-reveal>
                  <span className="font-mono text-xs text-ink-soft">Step {i + 1}</span>
                  <Icon aria-hidden="true" className="mt-4 h-7 w-7 text-accent" />
                  <span className="mt-4 block text-xl font-semibold text-ink">{f.title}</span>
                  <span className="mt-1.5 block leading-relaxed text-ink-muted">{f.desc}</span>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Maths */}
        <section aria-labelledby="maths-h" className="mt-24">
          <p className="eyebrow" data-reveal>The maths</p>
          <h2 id="maths-h" className="display-2 mt-5 max-w-3xl text-ink" data-split>
            ₹4,999 for three months. <span className="serif-em text-gradient">Do the profit maths.</span>
          </h2>
          <p className="lead mt-5 max-w-2xl" data-reveal>
            Move the sliders to your own fee and see what 35 new members are worth against the cost of the SEO.
          </p>
          <div className="mt-10" data-reveal>
            <RoiCalculator />
          </div>
        </section>

        {/* SEO vs ads */}
        <section aria-labelledby="ads-h" className="mt-24">
          <p className="eyebrow" data-reveal>SEO vs ads</p>
          <h2 id="ads-h" className="display-2 mt-5 max-w-3xl text-ink" data-split>
            Ads rent you customers. SEO is lifelong free advertising.
          </h2>
          <p className="lead mt-5 max-w-2xl" data-reveal>
            Ads bring people only for the period you pay for. Set up SEO correctly once and it keeps bringing
            organic visitors month after month.
          </p>
          <div className="mt-10 overflow-x-auto rounded-3xl border border-line bg-white shadow-card" data-reveal>
            <table className="w-full min-w-[36rem] text-left">
              <caption className="sr-only">SEO compared with paid ads for a local business</caption>
              <thead>
                <tr className="border-b border-line text-sm">
                  <th scope="col" className="p-5 font-semibold text-ink-muted"><span className="sr-only">Compared on</span></th>
                  <th scope="col" className="p-5 font-semibold text-emerald-800">SEO</th>
                  <th scope="col" className="p-5 font-semibold text-ink-muted">Paid ads</th>
                </tr>
              </thead>
              <tbody>
                {story.seoVsAds.map((r) => (
                  <tr key={r.label} className="border-b border-line last:border-0">
                    <th scope="row" className="p-5 align-top text-sm font-semibold text-ink">{r.label}</th>
                    <td className="p-5 align-top text-ink">
                      <span className="flex gap-2">
                        <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                        {r.seo}
                      </span>
                    </td>
                    <td className="p-5 align-top text-ink-muted">
                      <span className="flex gap-2">
                        <X aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                        {r.ads}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Proof */}
        <section aria-labelledby="proof-h" className="mt-24 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow" data-reveal>Proof from Google</p>
            <h2 id="proof-h" className="display-2 mt-5 text-ink" data-split>
              Go search it yourself
            </h2>
            <p className="lead mt-5" data-reveal>
              Search &ldquo;JP Fitness&rdquo; or &ldquo;gym near me&rdquo; around Kalapatti and the website shows on
              Google page 1. These are the average positions from Google Search Console.
            </p>
            <div className="mt-6" data-reveal>
              <VerifiedBadge />
            </div>
          </div>
          <div className="card p-6 sm:p-8" data-reveal>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
              <TrendingUp aria-hidden="true" className="h-5 w-5 text-accent" />
              JP Fitness on Google page 1
            </h3>
            <ol className="mt-5 divide-y divide-line">
              {story.rankings.map((r) => (
                <li key={r.query} className="flex items-center justify-between gap-4 py-3">
                  <span className="font-medium text-ink">&ldquo;{r.query}&rdquo;</span>
                  <span className={`grid h-9 w-11 place-items-center rounded-lg font-display text-sm font-bold ${r.position <= 3 ? "bg-accent-soft text-accent" : "bg-canvas text-ink-muted"}`}>
                    #{r.position}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-ink-soft">7,877 impressions and 250 clicks from Google since Nov 2025.</p>
          </div>
        </section>

        {/* Checklist */}
        <section aria-labelledby="checklist-h" className="mt-24 rounded-[2.5rem] border border-line bg-white p-7 shadow-card sm:p-12">
          <p className="eyebrow" data-reveal>For every local business</p>
          <h2 id="checklist-h" className="display-3 mt-5 max-w-2xl text-ink" data-split>
            The local SEO checklist I used
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {story.checklist.map((c) => (
              <li key={c} className="flex gap-3 leading-relaxed text-ink-muted" data-reveal>
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                  <Check aria-hidden="true" className="h-4 w-4" />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* More stories */}
        <section aria-labelledby="more-h" className="mt-24">
          <h2 id="more-h" className="display-3 text-ink" data-split>
            More results
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            <li>
              <Link href={`/work/${harsa.slug}`} className="spotlight card flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">{harsa.kind}</span>
                <span className="mt-2 text-xl font-semibold text-ink">{harsa.title}</span>
                <span className="mt-2 text-ink-muted">#3 on Google for its name and 19 visits from ChatGPT since August 2026.</span>
              </Link>
            </li>
            <li>
              <Link href="/work/jp-fitness" className="spotlight card flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">Case study</span>
                <span className="mt-2 text-xl font-semibold text-ink">How the JP Fitness site was built</span>
                <span className="mt-2 text-ink-muted">The technical side: speed, structure and one-tap enquiries.</span>
              </Link>
            </li>
            <li>
              <Link href="/results" className="spotlight card flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">All sites</span>
                <span className="mt-2 text-xl font-semibold text-ink">70,233 Google impressions</span>
                <span className="mt-2 text-ink-muted">Every site I have built, with Search Console and GA4 numbers.</span>
              </Link>
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section aria-labelledby="story-faq" className="mt-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow" data-reveal>FAQ</p>
            <h2 id="story-faq" className="display-3 mt-5 text-ink" data-split>
              Local SEO questions
            </h2>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {story.faqs.map((f) => (
              <div key={f.question} className="py-6" data-reveal>
                <dt className="text-lg font-semibold text-ink">{f.question}</dt>
                <dd className="mt-2 leading-relaxed text-ink-muted">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA form */}
        <section id="get-plan" aria-labelledby="plan-h" className="mt-24 scroll-mt-28 pb-24">
          <div className="grid gap-10 rounded-[2.5rem] border border-line bg-gradient-to-br from-[#EEF1FF] via-white to-[#FDF2F8] p-7 shadow-card sm:p-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow" data-reveal>Your turn</p>
              <h2 id="plan-h" className="display-2 mt-5 text-ink" data-split>
                Want results like JP Fitness?
              </h2>
              <p className="lead mt-5" data-reveal>
                Tell me your business and city. I will reply within 24 hours with a free, honest local SEO plan:
                what to fix, what to rank for, and what it costs.
              </p>
              <ul className="mt-6 space-y-2 text-ink-muted">
                {["Free plan, no obligation", "Fixed price, no surprises", "Tracked in Search Console from day one"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check aria-hidden="true" className="h-4 w-4 text-emerald-600" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-line bg-white p-6 shadow-lift sm:p-8">
              <ContactForm source="story" defaultIntent="project" />
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
