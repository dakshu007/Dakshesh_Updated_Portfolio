import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight, ArrowRight } from "lucide-react";
import WhatsAppIcon from "./icons/WhatsApp";
import { person, socials } from "@/lib/site";
import { products } from "@/lib/data";

const explore = [
  { href: "/results", label: "Results" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#products", label: "Products" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="section py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.8fr_1fr]">
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-display text-xl font-bold tracking-tight text-white"
            >
              dakshesh<span className="text-accent">.</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {person.role} in {person.location}. Building fast websites,
              SaaS products and SEO that bring real customers, for clients
              worldwide.
            </p>
            <Link
              href="/#contact"
              data-cta="footer-start-project"
              className="btn-on-dark mt-5"
            >
              Start your project
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                <Github aria-hidden="true" className="h-5 w-5" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                <Linkedin aria-hidden="true" className="h-5 w-5" />
              </a>
              <a
                href={person.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                data-cta="footer-whatsapp"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[#25D366] hover:text-[#25D366]"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${person.email}`}
                aria-label="Send an email"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                <Mail aria-hidden="true" className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Explore">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Products">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">
              Products
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {products.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/${product.id}`}
                    className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {person.name}. Built with Next.js, React, GSAP and
            Tailwind CSS.
          </p>
          <a
            href="#main"
            className="inline-flex items-center gap-1 font-medium text-white/70 transition-colors hover:text-white"
          >
            Back to top
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
