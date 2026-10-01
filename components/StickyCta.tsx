"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { person } from "@/lib/site";
import WhatsAppIcon from "./icons/WhatsApp";

/**
 * Always-reachable contact. On phones: a bottom bar with WhatsApp, Call and
 * Get a quote. On larger screens: a small floating "available" pill. Shows
 * after the visitor scrolls past the hero and hides while the contact form
 * or footer is on screen, so it never covers the thing it points to.
 */
export default function StickyCta() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = [document.getElementById("contact"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (targets.length === 0) {
      setBlocked(false);
      return;
    }
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setBlocked(visible.size > 0);
      },
      { threshold: 0.05 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  const show = scrolled && !blocked;

  return (
    <>
      {/* Mobile bar */}
      <div
        aria-hidden={!show}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-18px_rgba(10,10,10,0.35)] backdrop-blur-xl transition-transform duration-300 md:hidden ${
          show ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}
      >
        <div className="grid grid-cols-[auto_auto_1fr] gap-2">
          <a
            href={person.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={show ? 0 : -1}
            data-cta="sticky-whatsapp"
            aria-label="Chat on WhatsApp"
            className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white"
          >
            <WhatsAppIcon className="h-6 w-6" />
          </a>
          <a
            href={`tel:${person.phoneHref}`}
            tabIndex={show ? 0 : -1}
            data-cta="sticky-call"
            aria-label={`Call ${person.phone}`}
            className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface text-ink"
          >
            <Phone aria-hidden="true" className="h-5 w-5" />
          </a>
          <Link
            href="/#contact"
            tabIndex={show ? 0 : -1}
            data-cta="sticky-quote"
            className="btn-primary h-12 text-base"
          >
            Get a free quote
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Desktop pill */}
      <div
        aria-hidden={!show}
        className={`fixed bottom-6 left-6 z-40 hidden transition-all duration-300 md:block ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-1 rounded-full border border-line bg-white/90 p-1.5 pl-4 shadow-lift backdrop-blur-xl">
          <span className="relative mr-1 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="mr-2 text-sm font-semibold text-ink">Available for projects</span>
          <a
            href={person.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={show ? 0 : -1}
            data-cta="floating-whatsapp"
            aria-label="Chat on WhatsApp"
            className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <Link
            href="/#contact"
            tabIndex={show ? 0 : -1}
            data-cta="floating-lets-talk"
            className="btn-primary h-9 px-4 py-0"
          >
            Let us talk
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
