"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Download } from "lucide-react";
import { person, WHATSAPP_URL } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/**
 * Mobile-only contact dock. Slides in after the hero so a recruiter or client
 * is always one tap from a call, a WhatsApp chat, the resume or the form.
 */
export default function MobileDock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 transition-all duration-500 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <div className="glass flex items-center gap-1.5 rounded-full p-1.5 shadow-lift">
        <a
          href={`tel:${person.phoneHref}`}
          aria-label={`Call ${person.phone}`}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink ring-1 ring-black/5"
        >
          <Phone aria-hidden="true" className="h-[18px] w-[18px]" />
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#25D366] text-white"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>
        <a
          href={person.resume}
          download
          aria-label="Download resume"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink ring-1 ring-black/5"
        >
          <Download aria-hidden="true" className="h-[18px] w-[18px]" />
        </a>
        <Link href="/#hire-form" className="btn-primary h-11 flex-1 py-0">
          Hire me
        </Link>
      </div>
    </div>
  );
}
