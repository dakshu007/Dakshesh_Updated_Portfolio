import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { getProject } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Work() {
  const project = getProject("jp-fitness");
  if (!project) return null;

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-24 bg-black py-24 sm:py-28"
    >
      <div className="section">
        <SectionHeading
          headingId="work-heading"
          eyebrow="Selected work"
          title="Client work, shipped fast and built to rank"
          dark
        />

        <article
          data-reveal
          className="mt-12 grid overflow-hidden rounded-3xl border border-line bg-canvas lg:grid-cols-2"
        >
          <Link
            href="/work/jp-fitness"
            className="relative block aspect-[16/10] overflow-hidden bg-accent-soft lg:aspect-auto lg:min-h-[22rem]"
            aria-label={`Read the ${project.title} case study`}
          >
            <Image
              src={project.thumbnail}
              alt={project.thumbnailAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-center p-4 lg:p-8"
            />
          </Link>

          <div className="flex flex-col justify-center p-8 sm:p-10">
            <div className="flex items-center gap-2 text-accent">
              <project.icon aria-hidden="true" className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.16em]">
                Gym business website
              </span>
            </div>
            <h3 className="mt-4 font-display text-3xl font-bold text-ink">
              {project.title}
            </h3>
            <p className="mt-3 text-ink-muted">{project.summary}</p>

            <ul className="mt-6 space-y-2.5">
              {project.impact.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  />
                  <span className="text-sm text-ink-muted">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/work/jp-fitness"
                className="inline-flex items-center gap-1.5 font-semibold text-accent hover:text-accent-hover"
              >
                Read case study
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-ink-muted hover:text-accent"
                >
                  {project.liveLabel ?? "Live"}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </article>

        <p className="mt-8 text-white/80" data-reveal>
          Looking for my developer tools and apps?{" "}
          <Link
            href="/#products"
            className="font-semibold text-white underline underline-offset-4 hover:text-white/80"
          >
            Browse all eight products
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
