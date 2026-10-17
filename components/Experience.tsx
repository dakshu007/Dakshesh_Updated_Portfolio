import Image from "next/image";
import Link from "next/link";
import { GraduationCap, MapPin, ArrowUpRight, Briefcase } from "lucide-react";
import { jobs, education, person } from "@/lib/site";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="section-y relative scroll-mt-20">
      <div className="section">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* About card, sticky on desktop */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow" data-reveal>About and experience</p>
            <h2 id="experience-heading" className="display-2 mt-5 text-ink" data-split>
              A developer who ships <span className="serif-em text-gradient">whole products.</span>
            </h2>
            <p className="lead mt-5" data-reveal>{person.summary}</p>

            <div className="mt-8 flex items-center gap-4 rounded-3xl border border-line bg-white p-4 shadow-card" data-reveal>
              <Image
                src={person.image}
                alt="Dakshesh B, full-stack developer in Bangalore"
                width={96}
                height={128}
                sizes="96px"
                className="h-24 w-20 rounded-2xl object-cover"
              />
              <div className="min-w-0">
                <p className="font-display text-lg font-semibold text-ink">{person.name}</p>
                <p className="text-sm text-ink-muted">{person.roles.join(" · ")}</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-soft">
                  <MapPin aria-hidden="true" className="h-4 w-4" /> {person.location}
                </p>
              </div>
            </div>
            <Link href="/about" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent" data-reveal>
              More about me and a gallery
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          {/* Timeline */}
          <ol className="relative space-y-6 pl-8 sm:pl-12">
            <div aria-hidden="true" className="absolute bottom-4 left-[11px] top-4 w-px bg-line sm:left-[15px]">
              <div data-draw className="h-full w-full origin-top bg-gradient-to-b from-accent via-violet to-[#E0479E]" />
            </div>

            {jobs.map((job, i) => (
              <li key={job.company} className="relative" data-reveal>
                <span
                  aria-hidden="true"
                  className={`absolute -left-8 top-8 grid h-6 w-6 place-items-center rounded-full border-4 border-canvas sm:-left-12 sm:h-8 sm:w-8 ${
                    i === 0 ? "bg-accent" : "bg-ink"
                  }`}
                >
                  <Briefcase className="h-3 w-3 text-white sm:h-3.5 sm:w-3.5" />
                </span>
                <article className="card spotlight p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={job.logo}
                        alt={`${job.company} logo`}
                        width={52}
                        height={52}
                        className="h-[52px] w-[52px] rounded-2xl bg-white object-contain p-1 ring-1 ring-black/5"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-ink">{job.title}</h3>
                        <p className="text-ink-muted">
                          <a href={job.companyUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:text-accent">
                            {job.company}
                          </a>{" "}
                          · {job.location}
                        </p>
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${i === 0 ? "bg-accent-soft text-accent" : "bg-canvas text-ink-muted"}`}>
                      {job.period}
                    </span>
                  </div>
                  <p className="mt-5 text-ink-muted">{job.summary}</p>
                  <ul className="mt-5 space-y-2.5">
                    {job.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-ink-muted">
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  {job.stack && (
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech used">
                      {job.stack.map((s) => (
                        <li key={s} className="rounded-full border border-line bg-canvas px-3 py-1 text-xs font-medium text-ink-muted">
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </li>
            ))}

            <li className="relative" data-reveal>
              <span aria-hidden="true" className="absolute -left-8 top-6 grid h-6 w-6 place-items-center rounded-full border-4 border-canvas bg-violet sm:-left-12 sm:h-8 sm:w-8">
                <GraduationCap className="h-3 w-3 text-white sm:h-3.5 sm:w-3.5" />
              </span>
              <article className="card p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-ink">{education.degree}</h3>
                    <p className="text-ink-muted">
                      {education.school}, {education.location}
                    </p>
                  </div>
                  <span className="rounded-full bg-canvas px-3 py-1 text-xs font-semibold text-ink-muted">{education.period}</span>
                </div>
              </article>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
