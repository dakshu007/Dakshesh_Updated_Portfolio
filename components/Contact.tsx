import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { person, socials, WHATSAPP_URL } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import ContactForm from "./ContactForm";

const channels = [
  { icon: Mail, label: "Email", value: person.email, href: `mailto:${person.email}` },
  { icon: Phone, label: "Call", value: person.phone, href: `tel:${person.phoneHref}` },
  { icon: Linkedin, label: "LinkedIn", value: "in/daksheshb", href: socials.linkedin, external: true },
  { icon: Github, label: "GitHub", value: "dakshu007", href: socials.github, external: true },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-y relative scroll-mt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -inset-y-32 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-[#DCE4FF] opacity-60 blur-[140px]" />
      </div>

      <div className="section">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow justify-center" data-reveal>Contact</p>
          <h2 id="contact-heading" className="display-1 mt-6 text-ink" data-split>
            Let&apos;s build <span className="serif-em text-gradient">something great.</span>
          </h2>
          <p className="lead mx-auto mt-6 max-w-2xl" data-reveal>
            Recruiter, founder or business owner, pick the fastest way to reach me. I reply within 24
            hours, usually much sooner.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Channels */}
          <div className="space-y-4" data-reveal>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-3xl bg-[#0B7A43] p-6 text-white shadow-[0_20px_40px_-20px_rgba(11,122,67,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <span className="flex-1">
                <span className="block text-xs font-semibold uppercase tracking-wider text-white">Fastest reply</span>
                <span className="block text-lg font-semibold">WhatsApp {person.phone}</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <ul className="grid gap-3 sm:grid-cols-2">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="spotlight flex h-full items-center gap-3 rounded-2xl border border-line bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                      <c.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium uppercase tracking-wider text-ink-soft">{c.label}</span>
                      <span className="block truncate font-semibold text-ink">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={person.resume}
              download
              className="flex items-center gap-4 rounded-3xl border border-dashed border-ink/20 bg-white/60 p-5 transition-colors hover:border-ink/40 hover:bg-white"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-white">
                <Download aria-hidden="true" className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-semibold text-ink">Download my resume</span>
                <span className="block text-sm text-ink-muted">PDF · Full-Stack Developer · updated Oct 2026</span>
              </span>
            </a>

            <p className="px-1 text-sm text-ink-soft">
              Based in {person.location}. {person.availability}
            </p>
          </div>

          {/* Form */}
          <div className="rounded-[2rem] border border-line bg-white p-6 shadow-lift sm:p-9" data-reveal>
            <ContactForm source="contact" />
            <p className="mt-3 text-center text-xs text-ink-soft">Your details stay private. No spam, ever.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

