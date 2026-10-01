import Image from "next/image";
import { Check, ArrowUpRight } from "lucide-react";
import { experience, currentRole } from "@/lib/site";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative isolate scroll-mt-24 overflow-hidden py-24 sm:py-28"
    >
      {/* Background image with a hero-style scrim for readability and clean
          fades into the sections above and below. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/images/experience-bg.jpg"
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
        <SectionHeading
          headingId="experience-heading"
          eyebrow="Experience"
          title="What I am doing now, and before"
        />

        <ol className="relative mt-12 space-y-6 before:absolute before:bottom-6 before:left-[1.45rem] before:top-6 before:w-px before:bg-line sm:before:left-[1.7rem]">
          {/* Now: MyKavo */}
          <li data-reveal className="relative">
            <div className="rounded-3xl border border-[#EAB308]/40 bg-gradient-to-br from-[#FFFBEB] to-white p-7 shadow-lift sm:p-9">
              <div className="flex flex-col gap-4 border-b border-[#EAB308]/25 pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <Image
                    src="/images/logos/mykavo.png"
                    alt="MyKavo logo"
                    width={48}
                    height={48}
                    className="relative h-12 w-12 shrink-0 rounded-2xl ring-1 ring-black/10"
                  />
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">
                      {currentRole.title}
                    </h3>
                    <p className="mt-1 text-ink-muted">
                      <a
                        href={currentRole.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#A16207] hover:text-[#854D0E]"
                      >
                        {currentRole.company}
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </a>{" "}
                      · {currentRole.location}
                    </p>
                  </div>
                </div>
                <p className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-ink px-3.5 py-1.5 text-sm font-semibold text-white">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFC700] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFC700]" />
                  </span>
                  {currentRole.period}
                </p>
              </div>
              <p className="mt-6 max-w-prose text-ink-muted">{currentRole.summary}</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {currentRole.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#FFF3C4] text-[#A16207]">
                      <Check aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-ink-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Before: Cartrabbit */}
          <li data-reveal className="relative">
            <div className="rounded-3xl border border-line bg-surface p-7 shadow-card sm:p-9">
              <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line bg-canvas">
                    <Image
                      src="/images/cartrabbit-logo.svg"
                      alt="Cartrabbit logo"
                      width={50}
                      height={52}
                      className="h-7 w-auto"
                    />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">
                      {experience.title}
                    </h3>
                    <p className="mt-1 text-ink-muted">
                      <a
                        href={experience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-accent hover:text-accent-hover"
                      >
                        {experience.company}
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </a>{" "}
                      · {experience.location}
                    </p>
                  </div>
                </div>
                <p className="shrink-0 self-start rounded-full bg-canvas px-3.5 py-1.5 text-sm font-semibold text-ink-muted ring-1 ring-inset ring-line">
                  {experience.period} · {experience.duration}
                </p>
              </div>

              <p className="mt-6 max-w-prose text-ink-muted">{experience.summary}</p>

              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {experience.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                      <Check aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="text-ink-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
