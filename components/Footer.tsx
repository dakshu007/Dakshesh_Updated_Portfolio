import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { person, socials } from "@/lib/site";
import { mainProducts, projects } from "@/lib/data";
import { roles } from "@/lib/roles";
import Logo from "./Logo";

const explore = [
  { href: "/#products", label: "Products" },
  { href: "/results", label: "Results" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-white pb-28 md:pb-0">
      <div className="section pt-16">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-[1.4fr_0.7fr_0.9fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-ink">
              <Logo size={34} />
              <span>
                dakshesh<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              {person.name} is a Full-Stack Developer, Frontend Engineer and SEO Engineer in
              Bangalore. {person.availability}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { href: socials.linkedin, label: "LinkedIn profile", icon: Linkedin },
                { href: socials.github, label: "GitHub profile", icon: Github },
                { href: `mailto:${person.email}`, label: "Send an email", icon: Mail },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-ink hover:text-ink"
                >
                  <s.icon aria-hidden="true" className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <FooterNav title="Explore" links={explore} />
          <FooterNav
            title="Products"
            links={mainProducts.map((p) => ({ href: `/${p.id}`, label: p.name }))}
          />
          <FooterNav
            title="Hire in Bangalore"
            links={[
              ...roles.map((r) => ({ href: `/${r.slug}`, label: `${r.role} in Bangalore` })),
              ...projects.map((p) => ({ href: `/work/${p.slug}`, label: `${p.title} case study` })),
            ]}
          />
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none mt-16 select-none whitespace-nowrap text-center font-display font-semibold leading-none tracking-[-0.06em] text-ink/[0.05]"
          style={{ fontSize: "clamp(4rem, 17vw, 22rem)" }}
        >
          dakshesh
        </p>

        <div className="flex flex-col gap-4 border-t border-line py-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {person.name}. Designed and built in Bangalore with Next.js, GSAP and Three.js.
          </p>
          <div className="flex items-center gap-5">
            <a href="/llms.txt" className="hover:text-ink">llms.txt</a>
            <a href="/sitemap.xml" className="hover:text-ink">Sitemap</a>
            <a href="#main" className="inline-flex items-center gap-1 font-medium text-ink-muted hover:text-ink">
              Back to top
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 -rotate-45" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterNav({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm font-medium text-ink-muted transition-colors hover:text-ink">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
