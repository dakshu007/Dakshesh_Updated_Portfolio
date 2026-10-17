"use client";

import { useRef, useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle, Briefcase, Rocket } from "lucide-react";

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

const SOURCES = {
  hero: {
    label: "Hero form",
    toolname: "hire_dakshesh",
    tooldescription:
      "Hire Dakshesh B, a full-stack developer, frontend engineer and SEO engineer in Bangalore. Send the role or project details; he replies within 24 hours.",
  },
  contact: {
    label: "Contact section form",
    toolname: "contact_dakshesh",
    tooldescription:
      "Send Dakshesh B, a full-stack developer, frontend engineer and SEO engineer in Bangalore, a message about a full-time role or a freelance project. He replies within 24 hours.",
  },
} as const;

/**
 * The hire / contact form, used in the hero (compact) and the contact
 * section (full). Posts to Formspree with the form location attached, and
 * sends GA4 events (form_start on first focus, generate_lead on success) so
 * you can see who starts and who finishes each form.
 */
export default function ContactForm({
  source,
  compact = false,
}: {
  source: keyof typeof SOURCES;
  compact?: boolean;
}) {
  const meta = SOURCES[source];
  const [intent, setIntent] = useState<Intent>("hiring");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const started = useRef(false);
  const id = (name: string) => `${source}-${name}`;

  const onFocus = () => {
    if (started.current) return;
    started.current = true;
    window.gtag?.("event", "form_start", { form_location: source });
  };

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

    fd.set(
      "_subject",
      `${intent === "hiring" ? "Role for Dakshesh" : "Project enquiry"}: ${data.name} (${meta.label})`
    );

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
      window.gtag?.("event", "generate_lead", { intent, form_location: source });
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again, or email me directly.");
    }
  };

  const field =
    "w-full rounded-2xl border border-line bg-canvas px-4 text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-accent focus:bg-white";

  return (
    <form
      onSubmit={onSubmit}
      onFocus={onFocus}
      noValidate
      aria-label={compact ? "Hire Dakshesh B" : "Contact Dakshesh B"}
      {...webmcp({ toolname: meta.toolname, tooldescription: meta.tooldescription })}
    >
      <input type="hidden" name="source" value={meta.label} />

      <fieldset>
        <legend className="sr-only">I am</legend>
        <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-canvas p-1.5">
          {(
            [
              { id: "hiring", label: compact ? "Hiring" : "Hiring for a role", icon: Briefcase },
              { id: "project", label: compact ? "A project" : "Starting a project", icon: Rocket },
            ] as const
          ).map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition-all ${
                compact ? "py-2.5" : "py-3"
              } ${intent === opt.id ? "bg-white text-ink shadow-card" : "text-ink-muted hover:text-ink"}`}
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

      <div className={`grid sm:grid-cols-2 ${compact ? "mt-4 gap-3" : "mt-6 gap-5"}`}>
        <Field id={id("name")} name="name" label="Name" type="text" autoComplete="name" error={errors.name} hint="Your full name." compact={compact} className={field} />
        <Field id={id("email")} name="email" label="Email" type="email" autoComplete="email" error={errors.email} hint="Email address for the reply." compact={compact} className={field} />
        {!compact && (
          <>
            <Field
              id={id("company")}
              name="company"
              label={intent === "hiring" ? "Company and role" : "Business or website"}
              type="text"
              autoComplete="organization"
              optional
              hint="Company and role, or the business or website the project is for."
              className={field}
            />
            <Field id={id("phone")} name="phone" label="Phone or WhatsApp" type="tel" autoComplete="tel" optional hint="Optional phone or WhatsApp number for a faster reply." className={field} />
          </>
        )}
      </div>

      <div className={compact ? "mt-3" : "mt-5"}>
        <label htmlFor={id("message")} className={compact ? "sr-only" : "block text-sm font-semibold text-ink"}>
          Message
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={compact ? 3 : 5}
          {...webmcp({ toolparamdescription: "The message: role, team and location, or the project goal." })}
          placeholder={
            intent === "hiring"
              ? "The role, team and location. A job link is perfect."
              : "A few lines about your business and goal is enough."
          }
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id("message")}-error` : undefined}
          className={`${field} py-3 ${compact ? "" : "mt-2"}`}
        />
        {errors.message && (
          <p id={`${id("message")}-error`} className="mt-1.5 flex items-center gap-1 text-sm text-red-700">
            <AlertCircle aria-hidden="true" className="h-4 w-4" />
            {errors.message}
          </p>
        )}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor={id("gotcha")}>Leave this field empty</label>
        <input id={id("gotcha")} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`btn-primary w-full text-base disabled:cursor-not-allowed disabled:opacity-70 ${compact ? "mt-4 py-3.5" : "mt-6 py-4"}`}
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
        className={`mt-3 flex items-center gap-2 text-sm ${
          status === "success" ? "text-green-700" : status === "error" ? "text-red-700" : "sr-only"
        }`}
      >
        {status === "success" && <CheckCircle2 aria-hidden="true" className="h-4 w-4" />}
        {status === "error" && <AlertCircle aria-hidden="true" className="h-4 w-4" />}
        {statusMessage}
      </p>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type,
  autoComplete,
  error,
  optional,
  hint,
  compact,
  className,
}: {
  id: string;
  name: string;
  label: string;
  type: string;
  autoComplete: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  compact?: boolean;
  className: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={compact ? "sr-only" : "block text-sm font-semibold text-ink"}>
        {label}
        {optional && <span className="ml-1 font-normal text-ink-soft">(optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={compact ? label : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${className} ${compact ? "py-3" : "mt-2 py-3"}`}
        {...(hint ? webmcp({ toolparamdescription: hint }) : {})}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-sm text-red-700">
          <AlertCircle aria-hidden="true" className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}
