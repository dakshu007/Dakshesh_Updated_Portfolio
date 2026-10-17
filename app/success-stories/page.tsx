import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Quote, Plus } from "lucide-react";
import { SITE_URL, person, LAST_UPDATED } from "@/lib/site";
import { projects } from "@/lib/data";
import { stories } from "@/lib/stories";
import { breadcrumbSchema, PERSON_ID } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";

const TITLE = "Success Stories: Local SEO and Website Results for Real Businesses | Dakshesh B";
const DESCRIPTION =
  "Client success stories from Dakshesh B: how local SEO and fast websites brought real customers to real businesses, like 30+ new gym members in 75 days for JP Fitness.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "SEO success stories",
    "local SEO case studies",
    "SEO results for small business",
    "local SEO expert Bangalore",
    "SEO expert Coimbatore",
  ],
  alternates: { canonical: "/success-stories" },
  openGraph: { type: "website", url: `${SITE_URL}/success-stories`, siteName: person.name, locale: "en_IN", title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function SuccessStoriesIndex() {
  const listUrl = `${SITE_URL}/success-stories`;
  const clientResults = projects.filter((p) => !stories.some((s) => s.client === p.title));

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Success stories",
      description: DESCRIPTION,
      url: listUrl,
      dateModified: LAST_UPDATED,
      author: { "@id": PERSON_ID },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: stories.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${listUrl}/${s.slug}`,
          name: s.title,
        })),
      },
    },
    breadcrumbSchema([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Success stories", url: listUrl },
    ]),
  ];

  return (
    <div className="relative pt-28 sm:pt-32">
      <JsonLd schema={schema} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] overflow-hidden">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent_75%)]" />
        <div className="absolute -top-24 right-0 h-[30rem] w-[30rem] rounded-full bg-[#FDE2E2] opacity-70 blur-[120px]" />
        <div className="absolute left-0 top-40 h-[24rem] w-[24rem] rounded-full bg-[#DCE4FF] blur-[120px]" />
      </div>

      <div className="section">
        <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Success stories" }]} />

        <header className="mt-10 max-w-4xl">
          <p className="eyebrow" data-reveal>Success stories</p>
          <h1 className="display-1 mt-6 text-ink" data-split>
            Real businesses. <span className="serif-em text-gradient">Real customers.</span>
          </h1>
          <p className="lead mt-6 max-w-2xl" data-reveal>
            What happens after the website goes live: the searches it wins, the calls it brings and the customers who
            walk in. Told by the owners, backed by Google Search Console.
          </p>
        </header>

        {/* Stories */}
        <section aria-labelledby="stories-h" className="mt-14">
          <h2 id="stories-h" className="sr-only">
            All success stories
          </h2>
          <ul className="grid gap-6">
            {stories.map((s) => (
              <li key={s.slug} data-reveal>
                <Link
                  href={`/success-stories/${s.slug}`}
                  className="group grid overflow-hidden rounded-[2.5rem] border border-line bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift lg:grid-cols-[1.2fr_0.8fr]"
                >
                  <div className="p-7 sm:p-10">
                    <p className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="rounded-full bg-red-50 px-3 py-1 font-semibold text-red-700">{s.service}</span>
                      <span className="text-ink-muted">
                        {s.industry} · {s.location}
                      </span>
                    </p>
                    <h3 className="display-3 mt-5 text-ink">{s.title}</h3>
                    <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{s.excerpt}</p>
                    <figure className="mt-6 rounded-2xl border border-line bg-canvas p-5">
                      <Quote aria-hidden="true" className="h-5 w-5 text-red-500" />
                      <blockquote className="mt-2 leading-relaxed text-ink">
                        &ldquo;{s.testimonial.split(". ").slice(0, 2).join(". ")}.&rdquo;
                      </blockquote>
                      <figcaption className="mt-2 text-sm text-ink-muted">
                        {s.owner.name}, {s.owner.role}
                      </figcaption>
                    </figure>
                    <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
                      Read the full story
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <div
                    className="relative flex flex-col justify-between gap-8 p-7 text-white sm:p-10"
                    style={{ background: `linear-gradient(145deg, ${s.accent}, #7B4DFF)` }}
                  >
                    <span className="self-start rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">{s.client}</span>
                    <div>
                      <p className="font-display text-7xl font-semibold leading-none tracking-tight sm:text-8xl">{s.result.value}</p>
                      <p className="mt-3 text-lg">{s.result.label}</p>
                    </div>
                    <dl className="grid grid-cols-2 gap-4 border-t border-white/25 pt-5 text-sm">
                      {s.stats.slice(1, 3).map((st) => (
                        <div key={st.label}>
                          <dt className="sr-only">{st.label}</dt>
                          <dd className="font-display text-2xl font-semibold">{st.value}</dd>
                          <dd className="mt-1 leading-snug text-white">{st.label}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Link>
              </li>
            ))}

            <li data-reveal>
              <a
                href="#your-story"
                className="flex flex-col items-center justify-center gap-3 rounded-[2.5rem] border-2 border-dashed border-ink/15 bg-white/60 p-10 text-center transition-colors hover:border-ink/30 hover:bg-white"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white">
                  <Plus aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="font-display text-2xl font-semibold text-ink">Your business could be the next story</span>
                <span className="max-w-md text-ink-muted">Tell me what you sell and where. I will send a free, honest plan within 24 hours.</span>
              </a>
            </li>
          </ul>
        </section>

        {/* More client results */}
        {clientResults.length > 0 && (
          <section aria-labelledby="more-results-h" className="mt-20">
            <h2 id="more-results-h" className="display-3 text-ink" data-split>
              More client results
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {clientResults.map((p) => (
                <li key={p.slug} data-reveal>
                  <Link href={`/work/${p.slug}`} className="spotlight card flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">{p.kind}</span>
                    <span className="mt-2 text-xl font-semibold text-ink">{p.title}</span>
                    <span className="mt-1 text-sm text-ink-muted">{p.location}</span>
                    <span className="mt-4 text-ink-muted">
                      #{p.rankings[0].position} on Google for &ldquo;{p.rankings[0].query}&rdquo; · {p.stats[0].value} {p.stats[0].label.toLowerCase()}
                    </span>
                  </Link>
                </li>
              ))}
              <li data-reveal>
                <Link href="/results" className="spotlight card flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">All sites</span>
                  <span className="mt-2 text-xl font-semibold text-ink">70,233 Google impressions</span>
                  <span className="mt-4 text-ink-muted">Every site I have built, with Search Console and GA4 numbers.</span>
                </Link>
              </li>
            </ul>
          </section>
        )}

        {/* CTA */}
        <section id="your-story" aria-labelledby="your-story-h" className="mt-24 scroll-mt-28 pb-24">
          <div className="grid gap-10 rounded-[2.5rem] border border-line bg-gradient-to-br from-[#EEF1FF] via-white to-[#FDF2F8] p-7 shadow-card sm:p-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow" data-reveal>Your turn</p>
              <h2 id="your-story-h" className="display-2 mt-5 text-ink" data-split>
                Let&apos;s write your success story.
              </h2>
              <p className="lead mt-5" data-reveal>
                Local SEO and a fast website that turns searches into calls, WhatsApp messages and walk-ins. Tracked from
                day one, so you see exactly what you get.
              </p>
            </div>
            <div className="rounded-[2rem] border border-line bg-white p-6 shadow-lift sm:p-8">
              <ContactForm source="story" defaultIntent="project" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
