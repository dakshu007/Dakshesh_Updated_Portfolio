import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Download, Check, MapPin, Mail, Phone } from "lucide-react";
import { getRole, roles } from "@/lib/roles";
import { SITE_URL, person, jobs, experienceLabel } from "@/lib/site";
import { mainProducts, achievementText } from "@/lib/data";
import { breadcrumbSchema, faqSchema, PERSON_ID } from "@/lib/jsonld";
import JsonLd from "./JsonLd";
import Breadcrumbs from "./Breadcrumbs";
import CtaBand from "./CtaBand";
import ExperienceValue from "./ExperienceValue";

export function roleMetadata(slug: string): Metadata {
  const role = getRole(slug);
  if (!role) return {};
  return {
    title: role.metaTitle,
    description: role.metaDescription,
    keywords: role.keywords,
    alternates: { canonical: `/${role.slug}` },
    openGraph: {
      type: "profile",
      url: `${SITE_URL}/${role.slug}`,
      siteName: person.name,
      locale: "en_IN",
      title: role.metaTitle,
      description: role.metaDescription,
    },
    twitter: { card: "summary_large_image", title: role.metaTitle, description: role.metaDescription },
  };
}

/** Landing page for one hiring search, e.g. "frontend engineer Bangalore". */
export default function RolePage({ slug }: { slug: string }) {
  const role = getRole(slug)!;
  const otherRoles = roles.filter((r) => r.slug !== slug);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE_URL}/${role.slug}`,
    name: role.metaTitle,
    description: role.metaDescription,
    mainEntity: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
  };

  return (
    <article className="relative pt-28 sm:pt-32">
      <JsonLd
        schema={[
          pageSchema,
          faqSchema(role.faqs),
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Hire", url: `${SITE_URL}/#hire` },
            { name: `${role.role} in Bangalore`, url: `${SITE_URL}/${role.slug}` },
          ]),
        ]}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem]">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent_75%)]" />
        <div className="absolute -top-24 right-0 h-[30rem] w-[30rem] rounded-full bg-[#DCE4FF] blur-[120px]" />
        <div className="absolute left-0 top-40 h-[24rem] w-[24rem] rounded-full bg-[#F1E8FF] blur-[120px]" />
      </div>

      <div className="section">
        <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Hire", href: "/#hire" }, { name: `${role.role} in Bangalore` }]} />

        <header className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700" data-reveal>
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-emerald-500" />
              Open to work · Bangalore · Ready to relocate
            </p>
            <h1 className="display-1 mt-6 text-ink" data-split>
              {role.h1}
            </h1>
            <p className="lead mt-6 max-w-2xl" data-reveal>
              {role.intro}
            </p>
            <div className="mt-9 flex flex-wrap gap-3" data-reveal>
              <Link href="/#contact" className="btn-primary px-7 py-4" data-magnetic>
                Hire me as your {role.role}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <a href={person.resume} download className="btn-secondary py-4">
                <Download aria-hidden="true" className="h-4 w-4" />
                Resume (PDF)
              </a>
            </div>
          </div>

          <div className="card p-6" data-reveal="scale">
            <div className="flex items-center gap-4">
              <Image src={person.image} alt={`${person.name}, ${role.role} in Bangalore`} width={80} height={106} className="h-[106px] w-20 rounded-2xl object-cover" />
              <div>
                <p className="font-display text-xl font-semibold text-ink">{person.name}</p>
                <p className="text-sm text-ink-muted">{role.role}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-ink-soft">
                  <MapPin aria-hidden="true" className="h-4 w-4" /> Bangalore, India
                </p>
              </div>
            </div>
            <dl className="mt-5 space-y-2.5 border-t border-line pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Experience</dt>
                <dd className="font-medium text-ink">
                  <ExperienceValue initial={experienceLabel()} />
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Current</dt>
                <dd className="text-right font-medium text-ink">{jobs[0].title}, {jobs[0].company}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Before</dt>
                <dd className="text-right font-medium text-ink">{jobs[1].title}, {jobs[1].company}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Work mode</dt>
                <dd className="font-medium text-ink">On-site, hybrid, remote</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-col gap-2 border-t border-line pt-5 text-sm">
              <a href={`mailto:${person.email}`} className="flex items-center gap-2 font-medium text-ink hover:text-accent">
                <Mail aria-hidden="true" className="h-4 w-4 text-ink-soft" /> {person.email}
              </a>
              <a href={`tel:${person.phoneHref}`} className="flex items-center gap-2 font-medium text-ink hover:text-accent">
                <Phone aria-hidden="true" className="h-4 w-4 text-ink-soft" /> {person.phone}
              </a>
            </div>
          </div>
        </header>

        <section aria-labelledby="proof-h" className="mt-24">
          <p className="eyebrow" data-reveal>Proof, not promises</p>
          <h2 id="proof-h" className="display-2 mt-5 max-w-3xl text-ink" data-split>
            Why hire me as your {role.role}
          </h2>
          <p className="lead mt-5 max-w-3xl" data-reveal>{role.pitch}</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {role.proof.map((p) => {
              const inner = (
                <>
                  {p.metric && <span className="font-display text-3xl font-semibold tracking-tight text-ink">{p.metric}</span>}
                  <span className="mt-4 block text-lg font-semibold text-ink">{p.title}</span>
                  <span className="mt-2 block leading-relaxed text-ink-muted">{p.desc}</span>
                </>
              );
              return (
                <li key={p.title} data-reveal>
                  {p.href ? (
                    <Link href={p.href} className="spotlight card block h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                      {inner}
                    </Link>
                  ) : (
                    <div className="card h-full p-7">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="skills-h" className="mt-24 grid gap-10 rounded-[2.5rem] border border-line bg-white p-7 shadow-card sm:p-12 lg:grid-cols-2">
          <div>
            <h2 id="skills-h" className="display-3 text-ink" data-split>
              {role.role} skills
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {role.skills.map((s) => (
                <li key={s} className="rounded-full border border-line bg-canvas px-3.5 py-1.5 text-sm font-medium text-ink-muted" data-reveal>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="display-3 text-ink" data-split>
              What I will own
            </h2>
            <ul className="mt-6 space-y-3">
              {role.responsibilities.map((r) => (
                <li key={r} className="flex gap-3 text-ink-muted" data-reveal>
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="products-h" className="mt-24">
          <h2 id="products-h" className="display-3 text-ink" data-split>
            Products I have shipped
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {mainProducts.map((p) => (
              <li key={p.id}>
                <Link href={`/${p.id}`} className="spotlight group flex h-full flex-col rounded-3xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${p.brand.from}, ${p.brand.to})` }}>
                    <p.icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="mt-4 font-semibold text-ink">{p.name}</span>
                  <span className="mt-1 text-sm text-ink-muted">
                    {achievementText(p)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="role-faq" className="mt-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow" data-reveal>FAQ</p>
            <h2 id="role-faq" className="display-3 mt-5 text-ink" data-split>
              Hiring a {role.role.toLowerCase()} in Bangalore
            </h2>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {role.faqs.map((f) => (
              <div key={f.question} className="py-6" data-reveal>
                <dt className="text-lg font-semibold text-ink">{f.question}</dt>
                <dd className="mt-2 leading-relaxed text-ink-muted">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav aria-label="Other roles" className="mt-16 flex flex-wrap items-center gap-3 text-sm">
          <span className="text-ink-soft">Also hiring for:</span>
          {otherRoles.map((r) => (
            <Link key={r.slug} href={`/${r.slug}`} className="chip hover:border-ink hover:text-ink">
              {r.role} in Bangalore
            </Link>
          ))}
        </nav>
      </div>

      <CtaBand />
    </article>
  );
}
