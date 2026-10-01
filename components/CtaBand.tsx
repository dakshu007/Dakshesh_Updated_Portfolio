import Link from "next/link";
import { ArrowRight, Phone, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { person } from "@/lib/site";
import WhatsAppIcon from "./icons/WhatsApp";

const promises = [
  { icon: Clock, text: `Reply ${person.responseTime}` },
  { icon: Sparkles, text: "Free 15 minute call" },
  { icon: ShieldCheck, text: "Fixed quote, no surprises" },
];

/**
 * A loud, single-purpose call to action. Used before the contact section on
 * the home page and at the end of the results, product and case-study pages.
 */
export default function CtaBand({
  id = "cta",
  title = "Your next customer is searching right now.",
  subtitle = "Let us make sure they find you, trust you and get in touch. Fast websites, real SEO and products that convert.",
}: {
  id?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className="py-16 sm:py-20">
      <div className="section">
        <div
          data-reveal
          className="relative isolate overflow-hidden rounded-[2rem] bg-accent px-6 py-12 text-white shadow-lift sm:px-12 sm:py-16"
        >
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-[#7C3AED]/40 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                </span>
                Taking new projects
              </p>
              <h2
                id={`${id}-heading`}
                className="mt-5 font-display text-3xl font-bold leading-tight sm:text-5xl"
              >
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-lg text-white/85">{subtitle}</p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {promises.map((p) => (
                  <li key={p.text} className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
                    <p.icon aria-hidden="true" className="h-4 w-4" />
                    {p.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/#contact"
                data-cta={`${id}-start-project`}
                className="btn bg-white py-4 text-base text-ink hover:bg-white/90"
              >
                Start your project
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </Link>
              <a
                href={person.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={`${id}-whatsapp`}
                className="btn bg-[#25D366] py-4 text-base text-[#06301A] hover:bg-[#3BE07A]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${person.phoneHref}`}
                data-cta={`${id}-call`}
                className="btn border border-white/30 py-4 text-base text-white hover:border-white"
              >
                <Phone aria-hidden="true" className="h-5 w-5" />
                Call {person.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
