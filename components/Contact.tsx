"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Download,
  Briefcase,
  Rocket,
  ArrowUpRight,
} from "lucide-react";
import { person, socials, WHATSAPP_URL } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/xrevwraj";

/**
 * WebMCP declarative annotations (toolname, tooldescription,
 * toolparamdescription) let browser AI agents use the form as a tool.
 * React passes these unknown lowercase attributes straight to the DOM.
 */
const webmcp = (attrs: Record<string, string>) => attrs as Record<string, string>;

type Status = "idle" | "submitting" | "success" | "error";
type Errors = { name?: string; email?: string; message?: string };
type Intent = "hiring" | "project";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const channels = [
  { icon: Mail, label: "Email", value: person.email, href: `mailto:${person.email}` },
  { icon: Phone, label: "Call", value: person.phone, href: `tel:${person.phoneHref}` },
  { icon: Linkedin, label: "LinkedIn", value: "in/daksheshb", href: socials.linkedin, external: true },
  { icon: Github, label: "GitHub", value: "dakshu007", href: socials.github, external: true },
];

export default function Contact() {
  const [intent, setIntent] = useState<Intent>("hiring");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [statusMessage, setStatusMessage] = useState("");

  const validate = (data: { name: string; email: string; message: string }): Errors => {
    const next: Errors = {};
    if (!data.name.trim()) next.name = "Please tell me your name.";
    if (!data.email.trim()) next.email = "Please add your email.";
    else if (!EMAIL_RE.test(data.email)) next.email = "That email does not look right.";
    if (!data.message.trim()) next.message = "Please add a short message.";
    else if (data.message.trim().length < 10)
      next.message = "A little more detail helps, at least 10 characters.";
    return next;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    if ((fd.get("_gotcha") as string)?.length) return;

    const data = {
      name: (fd.get("name") as string) ?? "",
      email: (fd.get("email") as string) ?? "",
      message: (fd.get("message") as string) ?? "",
    };
    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }

    fd.set("_subject", intent === "hiring" ? `Role for Dakshesh: ${data.name}` : `Project enquiry: ${data.name}`);

    setStatus("submitting");
    setStatusMessage("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setStatusMessage("Thanks, your message is on its way. I will reply within 24 hours.");
      form.reset();
      window.gtag?.("event", "generate_lead", { intent });
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again, or email me directly.");
    }
  };

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
          <form
            onSubmit={onSubmit}
            noValidate
            aria-label="Contact Dakshesh B"
            {...webmcp({
              toolname: "contact_dakshesh",
              tooldescription:
                "Send Dakshesh B, a full-stack developer, frontend engineer and SEO engineer in Bangalore, a message about a full-time role or a freelance project. He replies within 24 hours.",
            })}
            className="rounded-[2rem] border border-line bg-white p-6 shadow-lift sm:p-9"
            data-reveal
          >
            <fieldset>
              <legend className="text-sm font-semibold text-ink">I am</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-canvas p-1.5">
                {(
                  [
                    { id: "hiring", label: "Hiring for a role", icon: Briefcase },
                    { id: "project", label: "Starting a project", icon: Rocket },
                  ] as const
                ).map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-all ${
                      intent === opt.id ? "bg-white text-ink shadow-card" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name="intent"
                      value={opt.id}
                      checked={intent === opt.id}
                      onChange={() => setIntent(opt.id)}
                      className="sr-only"
                      {...webmcp({ toolparamdescription: "Why you are writing: hiring for a role or starting a project." })}
                    />
                    <opt.icon aria-hidden="true" className="h-4 w-4" />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Name" type="text" autoComplete="name" error={errors.name} hint="Your full name." />
              <Field id="email" label="Email" type="email" autoComplete="email" error={errors.email} hint="Email address for the reply." />
              <Field
                id="company"
                label={intent === "hiring" ? "Company and role" : "Business or website"}
                type="text"
                autoComplete="organization"
                optional
                hint="Company and role, or the business or website the project is for."
              />
              <Field id="phone" label="Phone or WhatsApp" type="tel" autoComplete="tel" optional hint="Optional phone or WhatsApp number for a faster reply." />
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="block text-sm font-semibold text-ink">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                {...webmcp({ toolparamdescription: "The message: role, team and location, or the project goal." })}
                placeholder={
                  intent === "hiring"
                    ? "The role, team and location. A job link is perfect."
                    : "A few lines about your business and goal is enough."
                }
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="mt-2 w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/70 focus:border-accent focus:bg-white"
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle aria-hidden="true" className="h-4 w-4" />
                  {errors.message}
                </p>
              )}
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="_gotcha">Leave this field empty</label>
              <input id="_gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary mt-6 w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  {intent === "hiring" ? "Send role details" : "Send project details"}
                  <Send aria-hidden="true" className="h-4 w-4" />
                </>
              )}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={`mt-4 flex items-center gap-2 text-sm ${
                status === "success" ? "text-green-700" : status === "error" ? "text-red-600" : "sr-only"
              }`}
            >
              {status === "success" && <CheckCircle2 aria-hidden="true" className="h-4 w-4" />}
              {status === "error" && <AlertCircle aria-hidden="true" className="h-4 w-4" />}
              {statusMessage}
            </p>
            <p className="mt-3 text-center text-xs text-ink-soft">Your details stay private. No spam, ever.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type,
  autoComplete,
  error,
  optional,
  hint,
}: {
  id: string;
  label: string;
  type: string;
  autoComplete: string;
  error?: string;
  optional?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-ink-soft">(optional)</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-ink outline-none transition-colors focus:border-accent focus:bg-white"
        {...(hint ? webmcp({ toolparamdescription: hint }) : {})}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
          <AlertCircle aria-hidden="true" className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}
