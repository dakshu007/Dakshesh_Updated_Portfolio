import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { person, WHATSAPP_URL } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/** Closing call to action used at the end of inner pages. */
export default function CtaBand({
  title = "Hiring a developer in Bangalore?",
  text = "I am open to full-time Full-Stack, Frontend and SEO Engineer roles, and ready to relocate anywhere. I also take on a few freelance projects.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-label="Get in touch" className="py-16 sm:py-24">
      <div className="section">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 text-center text-white sm:px-12 sm:py-20" data-reveal="scale">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-accent/50 blur-[100px]" />
            <div className="absolute -bottom-24 right-0 h-80 w-96 rounded-full bg-violet/40 blur-[100px]" />
          </div>
          <h2 className="display-2 mx-auto max-w-3xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{text}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/#contact" className="btn-on-dark" data-magnetic>
              Let&apos;s talk
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a href={person.resume} download className="btn border border-white/20 text-white hover:bg-white/10">
              <Download aria-hidden="true" className="h-4 w-4" />
              Resume
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn border border-white/20 text-white hover:bg-white/10">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
