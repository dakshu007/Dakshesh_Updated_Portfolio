"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { person, socials } from "@/lib/site";
import { track } from "./Analytics";
import WhatsAppIcon from "./icons/WhatsApp";

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
  "https://formspree.io/f/xrevwraj";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const projectTypes = [
  "Business website",
  "SaaS or web app",
  "SEO and growth",
  "Chrome extension or tool",
  "Something else",
];

const steps = [
  { title: "You send a note", text: "A few lines about your business and goal is enough." },
  { title: "Free 15 minute call", text: "We agree scope, timeline and what success looks like." },
  { title: "Fixed quote in 48 hours", text: "A clear price and plan. No surprises, no pressure." },
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const formRef = useRef<HTMLFormElement>(null);

  // "Start a project like this" links anywhere on the page pre-select a type.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-project-type]");
      const type = el?.dataset.projectType;
      if (type && projectTypes.includes(type)) setProjectType(type);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const validate = (data: {
    name: string;
    email: string;
    message: string;
  }): Errors => {
    const next: Errors = {};
    if (!data.name.trim()) next.name = "Please tell me your name.";
    if (!data.email.trim()) next.email = "Please add your email.";
    else if (!EMAIL_RE.test(data.email))
      next.email = "That email does not look right.";
    if (!data.message.trim()) next.message = "Please add a short message.";
    else if (data.message.trim().length < 10)
      next.message = "A little more detail helps, at least 10 characters.";
    return next;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: bots fill this hidden field.
    if ((fd.get("_gotcha") as string)?.length) return;

    const data = {
      name: (fd.get("name") as string) ?? "",
      email: (fd.get("email") as string) ?? "",
      message: (fd.get("message") as string) ?? "",
    };

    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    if (FORMSPREE_ENDPOINT.includes("your-form-id")) {
      setStatus("error");
      setStatusMessage(
        "The contact form is not configured yet. Please email me directly while I finish wiring it up."
      );
      return;
    }

    fd.set("_subject", `New ${projectType} enquiry from ${data.name}`);

    setStatus("submitting");
    setStatusMessage("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      if (res.ok) {
        setStatus("success");
        setStatusMessage(
          `Thanks ${data.name.split(" ")[0]}, your message is on its way. I will reply ${person.responseTime}.`
        );
        track("generate_lead", { method: "contact_form", project_type: projectType });
        form.reset();
      } else {
        throw new Error("Request failed");
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Something went wrong sending the message. Please try again, or WhatsApp or email me directly."
      );
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate scroll-mt-24 overflow-hidden py-20 sm:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/images/contact-bg.jpg"
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
              "linear-gradient(to right, rgba(250,250,247,0.95) 0%, rgba(250,250,247,0.82) 55%, rgba(250,250,247,0.6) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #FAFAF7 0%, rgba(250,250,247,0) 16%, rgba(250,250,247,0) 84%, #FAFAF7 100%)",
          }}
        />
      </div>

      <div className="section">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div data-reveal>
              <p className="eyebrow">Contact</p>
              <h2 id="contact-heading" className="mt-4 display-2 text-ink">
                Tell me about your project.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                Pick the fastest way to reach me, or fill in the form. I reply{" "}
                {person.responseTime}, usually much sooner.
              </p>
            </div>

            {/* One-tap contact */}
            <ul className="mt-8 grid gap-3" data-reveal>
              <li>
                <a
                  href={person.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="contact-whatsapp"
                  className="group flex items-center gap-4 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 p-4 transition-all hover:-translate-y-0.5 hover:border-[#25D366] hover:shadow-card"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#25D366] text-white">
                    <WhatsAppIcon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-semibold text-ink">
                      WhatsApp
                      <span className="rounded-full bg-[#25D366] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#06301A]">
                        Fastest reply
                      </span>
                    </span>
                    <span className="block text-sm text-ink-muted">
                      Message me now, {person.phone}
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="h-5 w-5 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
              <li className="grid gap-3">
                <a
                  href={`tel:${person.phoneHref}`}
                  data-cta="contact-call"
                  className="group flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-card"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Phone aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink">Call me</span>
                    <span className="block truncate text-sm text-ink-muted">{person.phone}</span>
                  </span>
                </a>
                <a
                  href={`mailto:${person.email}?subject=${encodeURIComponent("Project enquiry")}`}
                  data-cta="contact-email"
                  className="group flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-card"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Mail aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink">Email</span>
                    <span className="block truncate text-sm text-ink-muted">{person.email}</span>
                  </span>
                </a>
              </li>
            </ul>

            {/* What happens next */}
            <div className="mt-10" data-reveal>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">
                What happens next
              </p>
              <ol className="mt-4 space-y-4">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{step.title}</span>
                      <span className="block text-sm text-ink-muted">{step.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 flex items-center gap-2">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface text-ink-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Github aria-hidden="true" className="h-5 w-5" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface text-ink-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Linkedin aria-hidden="true" className="h-5 w-5" />
              </a>
              <span className="ml-2 text-sm text-ink-soft">{person.location}, working with clients worldwide</span>
            </div>
          </div>

          {/* Form */}
          <div data-reveal className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/25 via-[#7C3AED]/10 to-emerald-400/20 blur-2xl"
            />
            {status === "success" ? (
              <div
                role="status"
                className="flex h-full flex-col items-center justify-center rounded-3xl border border-line bg-surface p-8 text-center shadow-lift sm:p-10"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 aria-hidden="true" className="h-8 w-8" />
                </span>
                <p className="mt-5 font-display text-2xl font-bold text-ink">Message sent</p>
                <p className="mt-2 max-w-sm text-ink-muted">{statusMessage}</p>
                <a
                  href={person.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="contact-success-whatsapp"
                  className="btn mt-6 bg-[#25D366] text-[#06301A] hover:bg-[#3BE07A]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Want a faster reply? WhatsApp me
                </a>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm font-semibold text-ink-muted hover:text-accent"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={onSubmit}
                noValidate
                className="rounded-3xl border border-line bg-surface p-6 shadow-lift sm:p-8"
              >
                <p className="font-display text-xl font-bold text-ink">Get a free quote</p>
                <p className="mt-1 text-sm text-ink-muted">Takes under a minute. No spam, ever.</p>

                <fieldset className="mt-6">
                  <legend className="text-sm font-semibold text-ink">What do you need?</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <label key={type} className="cursor-pointer">
                        <input
                          type="radio"
                          name="project_type"
                          value={type}
                          checked={projectType === type}
                          onChange={() => setProjectType(type)}
                          className="peer sr-only"
                        />
                        <span className="inline-flex items-center rounded-full border border-line bg-canvas px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-ink/30 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Name" type="text" autoComplete="name" error={errors.name} />
                  <Field id="email" label="Email" type="email" autoComplete="email" error={errors.email} />
                </div>
                <div className="mt-5">
                  <Field
                    id="phone"
                    label="WhatsApp or phone"
                    hint="optional, for a faster reply"
                    type="tel"
                    autoComplete="tel"
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className="block text-sm font-semibold text-ink">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell me about your business and what you want to achieve."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/70 focus:border-accent focus:bg-white"
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
                      <AlertCircle aria-hidden="true" className="h-4 w-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Honeypot, visually and programmatically hidden from people. */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="_gotcha">Leave this field empty</label>
                  <input id="_gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  data-cta="contact-form-submit"
                  className="btn-primary mt-6 w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send my project details
                      <Send aria-hidden="true" className="h-4 w-4" />
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-xs text-ink-soft">
                  I reply {person.responseTime}. Your details stay private.
                </p>

                {/* Live region announces errors to assistive tech. */}
                <p
                  role="status"
                  aria-live="polite"
                  className={`mt-3 flex items-center gap-2 text-sm ${
                    status === "error" ? "text-red-600" : "sr-only"
                  }`}
                >
                  {status === "error" && <AlertCircle aria-hidden="true" className="h-4 w-4" />}
                  {status === "error" ? statusMessage : ""}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  hint,
  type,
  autoComplete,
  error,
}: {
  id: string;
  label: string;
  hint?: string;
  type: string;
  autoComplete: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {hint && <span className="ml-1.5 font-normal text-ink-soft">({hint})</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink outline-none transition-colors focus:border-accent focus:bg-white"
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
