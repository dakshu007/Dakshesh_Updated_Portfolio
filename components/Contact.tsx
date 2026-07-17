"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { person, socials } from "@/lib/site";
import SectionHeading from "./SectionHeading";

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
  "https://formspree.io/f/xrevwraj";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const details = [
  {
    icon: Mail,
    label: "Email",
    value: person.email,
    href: `mailto:${person.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: person.phone,
    href: `tel:${person.phoneHref}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: person.location,
  },
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

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
          "Thanks, your message is on its way. I will get back to you soon."
        );
        form.reset();
      } else {
        throw new Error("Request failed");
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Something went wrong sending the message. Please try again or email me directly."
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
        <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            headingId="contact-heading"
            eyebrow="Contact"
            title="Let us build something"
            description="Have a role, a project or a product idea? Send a note and I will reply soon."
          />

          <ul className="mt-8 space-y-4">
            {details.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <item.icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-medium text-ink hover:text-accent"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-medium text-ink">{item.value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-2">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Github aria-hidden="true" className="h-5 w-5" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Linkedin aria-hidden="true" className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={onSubmit}
          noValidate
          className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8"
          data-reveal
        >
          <div className="space-y-5">
            <Field
              id="name"
              label="Name"
              type="text"
              autoComplete="name"
              error={errors.name}
            />
            <Field
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email}
            />
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-ink"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink outline-none transition-colors focus:border-accent"
              />
              {errors.message && (
                <p
                  id="message-error"
                  className="mt-1.5 flex items-center gap-1 text-sm text-red-600"
                >
                  <AlertCircle aria-hidden="true" className="h-4 w-4" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Honeypot, visually and programmatically hidden from people. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="_gotcha">Leave this field empty</label>
              <input
                id="_gotcha"
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  Send message
                  <Send aria-hidden="true" className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Live region announces success or error to assistive tech. */}
            <p
              role="status"
              aria-live="polite"
              className={`flex items-center gap-2 text-sm ${
                status === "success"
                  ? "text-green-700"
                  : status === "error"
                    ? "text-red-600"
                    : "sr-only"
              }`}
            >
              {status === "success" && (
                <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
              )}
              {status === "error" && (
                <AlertCircle aria-hidden="true" className="h-4 w-4" />
              )}
              {statusMessage}
            </p>
          </div>
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
}: {
  id: string;
  label: string;
  type: string;
  autoComplete: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink outline-none transition-colors focus:border-accent"
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1 text-sm text-red-600"
        >
          <AlertCircle aria-hidden="true" className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}
