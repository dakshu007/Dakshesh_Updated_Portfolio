import Link from "next/link";
import {
  ArrowUpRight,
  Download,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Briefcase,
  Clock,
  Building2,
  Globe2,
  Rocket,
  Code2,
  Search,
  Puzzle,
} from "lucide-react";
import { person, socials, experienceLabel, WHATSAPP_URL } from "@/lib/site";
import { roles } from "@/lib/roles";
import ExperienceValue from "./ExperienceValue";
import { WhatsAppIcon } from "./icons";

const roleIcons = [Code2, Rocket, Search];

const services = [
  { icon: Building2, title: "Business websites", desc: "Fast, local-SEO sites that bring calls and WhatsApp enquiries." },
  { icon: Rocket, title: "SaaS and web apps", desc: "Dashboards, auth, payments and the landing pages that sell them." },
  { icon: Search, title: "SEO, speed and AI search", desc: "Core Web Vitals, technical SEO and ChatGPT-ready content." },
  { icon: Puzzle, title: "Extensions and tools", desc: "Chrome extensions, WordPress plugins and small tools." },
];

export default function Hire() {
  const facts = [
    { icon: Briefcase, label: "Roles", value: "Full-Stack · Frontend · SEO Engineer" },
    { icon: MapPin, label: "Location", value: "Bangalore, ready to relocate anywhere" },
    { icon: Clock, label: "Experience", value: <ExperienceValue initial={experienceLabel()} /> },
    { icon: Globe2, label: "Work mode", value: "On-site, hybrid or remote" },
  ];

  return (
    <section id="hire" aria-labelledby="hire-heading" className="section-y relative scroll-mt-20">
      <div className="section">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-line bg-white p-6 shadow-lift sm:p-10 lg:p-14" data-reveal="scale">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#DCE4FF] blur-[110px]" />
            <div className="absolute -bottom-40 left-1/4 h-[24rem] w-[30rem] rounded-full bg-[#F1E8FF] blur-[110px]" />
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                <span className="h-2 w-2 animate-pulse-dot rounded-full bg-emerald-500" />
                Open to work
              </p>
              <h2 id="hire-heading" className="display-2 mt-6 text-ink" data-split>
                Hiring in Bangalore? <span className="serif-em text-gradient">Let&apos;s talk.</span>
              </h2>
              <p className="lead mt-5 max-w-xl">
                I&apos;m looking for a full-time role where I can own product end to end. I bring
                shipped products with real users, clean code with tests, and the SEO skills to make
                what we build get found.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {facts.map((f) => (
                  <li key={f.label} className="flex items-start gap-3 rounded-2xl border border-line bg-canvas/70 p-4">
                    <f.icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-wider text-ink-soft">{f.label}</span>
                      <span className="mt-0.5 block font-semibold text-ink">{f.value}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={person.resume} download className="btn-primary" data-magnetic>
                  <Download aria-hidden="true" className="h-4 w-4" />
                  Download resume (PDF)
                </a>
                <a href={`mailto:${person.email}?subject=Role%20for%20Dakshesh%20B`} className="btn-secondary">
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  Email me
                </a>
              </div>
              <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <li>
                  <a href={`tel:${person.phoneHref}`} className="inline-flex items-center gap-1.5 font-medium text-ink-muted hover:text-ink">
                    <Phone aria-hidden="true" className="h-4 w-4" /> {person.phone}
                  </a>
                </li>
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-ink-muted hover:text-ink">
                    <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp
                  </a>
                </li>
                <li>
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-ink-muted hover:text-ink">
                    <Linkedin aria-hidden="true" className="h-4 w-4 text-[#0A66C2]" /> LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">Roles I fit</p>
              <ul className="mt-4 space-y-4">
                {roles.map((r, i) => {
                  const Icon = roleIcons[i] ?? Code2;
                  return (
                    <li key={r.slug} data-reveal>
                      <Link
                        href={`/${r.slug}`}
                        className="spotlight group flex gap-5 rounded-3xl border border-line bg-white p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-card"
                      >
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink text-white transition-colors duration-300 group-hover:bg-accent">
                          <Icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-3">
                            <span className="text-lg font-semibold text-ink">{r.role} in Bangalore</span>
                            <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{r.proof[0].desc}</span>
                          <span className="mt-3 flex flex-wrap gap-1.5">
                            {r.skills.slice(0, 5).map((s) => (
                              <span key={s} className="rounded-full bg-canvas px-2.5 py-0.5 text-xs text-ink-muted">
                                {s}
                              </span>
                            ))}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Freelance */}
          <div className="mt-14 border-t border-line pt-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">Not hiring? I also freelance</p>
                <h3 className="display-3 mt-3 text-ink">Pick what you need. I handle the rest.</h3>
              </div>
              <Link href="#contact" className="btn-secondary">
                Get a free quote
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {services.map((s) => (
                <li key={s.title} className="rounded-2xl border border-line bg-canvas/60 p-5" data-reveal>
                  <s.icon aria-hidden="true" className="h-5 w-5 text-accent" />
                  <p className="mt-3 font-semibold text-ink">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
