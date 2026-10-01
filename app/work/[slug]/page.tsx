import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft, Check } from "lucide-react";
import { getProject, projects } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { projectSchema, breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import CtaBand from "@/components/CtaBand";
import SiteResults from "@/components/results/SiteResults";
import { getAnalytics } from "@/lib/analytics";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `${SITE_URL}/work/${project.slug}`;
  return {
    title: project.metaTitle,
    description: project.metaDescription,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url,
      siteName: "Dakshesh B",
      locale: "en_IN",
      title: project.metaTitle,
      description: project.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: project.metaTitle,
      description: project.metaDescription,
    },
  };
}



export default async function WorkPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const report = await getAnalytics();
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Work", url: `${SITE_URL}/#work` },
    { name: project.title, url: `${SITE_URL}/work/${project.slug}` },
  ]);

  return (
    <>
    <article className="section pb-8 pt-28 sm:pt-32">
      <JsonLd schema={[projectSchema(project), breadcrumb]} />

      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/#work" className="hover:text-accent">
              Work
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-ink-muted" aria-current="page">
            {project.title}
          </li>
        </ol>
      </nav>

      <header className="mt-10 max-w-prose">
        <span className="eyebrow">
          Client work · {project.category}
          {project.isNew && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] tracking-wide text-emerald-700">
              New client
            </span>
          )}
        </span>
        <h1 className="mt-4 display-2 text-ink">{project.title}</h1>
        <p className="mt-4 text-xl leading-relaxed text-ink-muted">
          {project.tagline}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {project.liveLabel ?? "View live"}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          )}
          <Link href="/#contact" data-cta="case-study-work-with-me" className="btn-secondary">
            Get a site like this
          </Link>
        </div>
      </header>

      <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-accent-soft">
        <Image
          src={project.thumbnail}
          alt={project.thumbnailAlt}
          width={1200}
          height={750}
          className="w-full"
          priority
        />
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="max-w-prose">
          <h2 className="text-2xl font-bold text-ink">Overview</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            {project.summary}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-ink">
            What I focused on
          </h2>
          <ul className="mt-6 space-y-3">
            {project.impact.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <Check aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="text-lg text-ink-muted">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">
              Built with
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <SiteResults report={report} siteId={project.slug} />

      <Link
        href="/#work"
        className="mt-16 inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-hover"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Back to work
      </Link>
    </article>
    <CtaBand
      id="case-study-cta"
      title={`Want results like ${project.title}?`}
      subtitle="A fast, local-SEO website that ranks for your business and makes it easy to call or WhatsApp you."
    />
    </>
  );
}
