import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check, ArrowLeft } from "lucide-react";
import { projects, getProject } from "@/lib/data";
import { SITE_URL, person } from "@/lib/site";
import { projectSchema, breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import { VerifiedBadge } from "@/components/ResultsBlocks";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.metaTitle,
    description: project.metaDescription,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/work/${project.slug}`,
      siteName: person.name,
      locale: "en_IN",
      title: project.metaTitle,
      description: project.metaDescription,
    },
    twitter: { card: "summary_large_image", title: project.metaTitle, description: project.metaDescription },
  };
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Work", url: `${SITE_URL}/#work` },
    { name: project.title, url: `${SITE_URL}/work/${project.slug}` },
  ]);

  return (
    <article className="relative pt-28 sm:pt-32">
      <JsonLd schema={[projectSchema(project), breadcrumb]} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem]">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent_75%)]" />
        <div className="absolute -top-20 right-0 h-[28rem] w-[28rem] rounded-full opacity-25 blur-[120px]" style={{ background: project.accent }} />
      </div>

      <div className="section">
        <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Work", href: "/#work" }, { name: project.title }]} />

        <header className="mt-10 max-w-4xl">
          <span className="chip" data-reveal>
            <project.icon aria-hidden="true" className="h-4 w-4" style={{ color: project.accent }} />
            {project.kind} · {project.location}
          </span>
          <h1 className="display-1 mt-6 text-ink" data-split>
            {project.title}
          </h1>
          <p className="lead mt-6 max-w-2xl" data-reveal>
            {project.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-reveal>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" data-magnetic>
              Visit {project.liveLabel}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <Link href="/#contact" className="btn-secondary">
              Get a site like this
            </Link>
          </div>
        </header>

        <section aria-labelledby="results-h" className="mt-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 id="results-h" className="display-3 text-ink" data-split>
              What it has earned so far
            </h2>
            <VerifiedBadge />
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4" data-reveal>
            {project.stats.map((s) => (
              <div key={s.label} className="bg-white p-6 sm:p-8">
                <dt className="text-sm text-ink-muted">{s.label}</dt>
                <dd className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink tabular sm:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-ink-soft">Tracked since {project.since}, data to Sep 2026.</p>
        </section>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
          <section aria-labelledby="overview-h">
            <p className="eyebrow" data-reveal>Overview</p>
            <h2 id="overview-h" className="display-3 mt-5 text-ink" data-split>
              The brief
            </h2>
            <p className="lead mt-6" data-reveal>{project.summary}</p>

            <h2 className="display-3 mt-16 text-ink" data-split>
              What I focused on
            </h2>
            <ul className="mt-8 space-y-4">
              {project.focus.map((f) => (
                <li key={f} className="flex gap-3 rounded-2xl border border-line bg-white p-5 leading-relaxed text-ink-muted" data-reveal>
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <aside className="space-y-4 lg:pt-16">
            <div className="card p-6" data-reveal>
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">Ranking on Google page 1</h3>
              <ul className="mt-4 divide-y divide-line">
                {project.rankings.map((r) => (
                  <li key={r.query} className="flex items-center justify-between gap-3 py-3 text-sm">
                    <span className="font-medium text-ink">&ldquo;{r.query}&rdquo;</span>
                    <span className="rounded-lg bg-accent-soft px-2 py-0.5 font-display font-bold text-accent">#{r.position}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6" data-reveal>
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">Built with</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line bg-canvas px-3 py-1 text-sm text-ink-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-16 flex flex-wrap gap-6">
          <Link href="/results" className="inline-flex items-center gap-2 font-semibold text-ink hover:text-accent">
            See results for every site
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link href="/#work" className="inline-flex items-center gap-2 font-semibold text-ink-muted hover:text-ink">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to work
          </Link>
        </div>
      </div>

      <CtaBand
        title={`Want results like ${project.title}?`}
        text="A fast, local-SEO website that ranks for your business and makes it easy to call or WhatsApp you. Reply within 24 hours."
      />
    </article>
  );
}
