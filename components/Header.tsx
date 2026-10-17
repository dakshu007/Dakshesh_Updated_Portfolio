"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, ArrowUpRight, Sparkles } from "lucide-react";
import { mainProducts, legacyProducts, achievementText } from "@/lib/data";
import { roles } from "@/lib/roles";
import { person } from "@/lib/site";
import Logo from "./Logo";

const navLinks = [
  { href: "/#results", label: "Results" },
  { href: "/#experience", label: "Experience" },
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (mobileOpen) window.__lenis?.stop();
    else window.__lenis?.start();
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    triggerRef.current?.focus();
  }, []);

  const focusItem = (index: number) => {
    const items = panelRef.current?.querySelectorAll<HTMLAnchorElement>("[data-product-link]");
    if (!items || items.length === 0) return;
    items[(index + items.length) % items.length]?.focus();
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setMenuOpen(true);
      requestAnimationFrame(() => focusItem(0));
    } else if (e.key === "Escape") {
      setMenuOpen(false);
    }
  };

  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    const items = Array.from(
      panelRef.current?.querySelectorAll<HTMLAnchorElement>("[data-product-link]") ?? []
    );
    const current = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItem(current + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItem(current - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusItem(items.length - 1);
    }
  };

  const onDropdownBlur = (e: React.FocusEvent) => {
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex items-center justify-between gap-4 transition-all duration-500 ease-out ${
          scrolled
            ? "mt-3 h-14 w-[calc(100%-1.5rem)] max-w-5xl rounded-full border border-white/70 bg-white/70 pl-5 pr-2 shadow-lift backdrop-blur-xl backdrop-saturate-150"
            : "mt-0 h-[4.5rem] w-full max-w-site border border-transparent"
        }`}
        style={scrolled ? undefined : { paddingInline: "clamp(1.25rem, 4vw, 4rem)" }}
      >
        <Link href="/" className="group flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-ink">
          <Logo size={34} className="transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
          <span>
            dakshesh<span className="text-accent">.</span>
          </span>
          <span className="sr-only">, {person.headline}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => {
              if (dropdownRef.current?.contains(document.activeElement)) return;
              setMenuOpen(false);
            }}
            onBlur={onDropdownBlur}
          >
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="products-panel"
              onClick={() => setMenuOpen((v) => !v)}
              onKeyDown={onTriggerKeyDown}
              className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              Products
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              id="products-panel"
              ref={panelRef}
              hidden={!menuOpen}
              onKeyDown={onPanelKeyDown}
              className="absolute left-1/2 top-full w-[min(92vw,44rem)] -translate-x-1/2 pt-3"
            >
              <div className="overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-lift">
                <p className="px-3 pb-2 pt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                  Products I design, build and grow
                </p>
                <ul className="grid gap-1 sm:grid-cols-2">
                  {mainProducts.map((product) => (
                    <li key={product.id}>
                      <Link
                        data-product-link
                        href={`/${product.id}`}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-canvas focus-visible:bg-canvas"
                      >
                        <ProductMark product={product} />
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-ink">
                            {product.name}
                            {product.exclusive && (
                              <span className="inline-flex items-center gap-0.5 rounded-full bg-ink px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                                <Sparkles aria-hidden="true" className="h-2.5 w-2.5" /> Exclusive
                              </span>
                            )}
                            {product.status === "new" && (
                              <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                                Live
                              </span>
                            )}
                            {product.status === "soon" && (
                              <span className="rounded-full bg-sky-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-700">
                                Soon
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 block text-[13px] leading-snug text-ink-muted">
                            {achievementText(product)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line px-3 pb-1 pt-3 text-[13px] text-ink-soft">
                  <span>Earlier:</span>
                  {legacyProducts.map((p) => (
                    <Link
                      key={p.id}
                      data-product-link
                      href={`/${p.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="font-medium text-ink-muted hover:text-ink"
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#hire-form" className="btn-primary ml-2 px-5 py-2.5" data-magnetic>
            Hire me
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
        </button>
      </div>

      {/* Scroll progress */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="fixed left-0 top-0 h-[2px] w-full origin-left bg-gradient-to-r from-accent via-violet to-[#E0479E]"
        style={{ transform: "scaleX(0)" }}
      />

      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="mx-auto mt-2 w-[calc(100%-1.5rem)] overflow-hidden rounded-3xl border border-line bg-white/95 shadow-lift backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="flex max-h-[calc(100dvh-6rem)] flex-col gap-1 overflow-y-auto p-4" data-lenis-prevent>
          <p className="px-3 pt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Products</p>
          <ul className="grid grid-cols-2 gap-1">
            {mainProducts.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/${product.id}`}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink hover:bg-canvas"
                >
                  <product.icon aria-hidden="true" className="h-4 w-4 shrink-0 text-ink-muted" />
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="my-2 h-px bg-line" />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-canvas"
            >
              {link.label}
            </Link>
          ))}
          <div className="my-2 h-px bg-line" />
          <p className="px-3 pt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Hiring in Bangalore</p>
          {roles.map((r) => (
            <Link
              key={r.slug}
              href={`/${r.slug}`}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-canvas hover:text-ink"
            >
              {r.role} in Bangalore
            </Link>
          ))}
          <Link href="/#hire-form" onClick={() => setMobileOpen(false)} className="btn-primary mt-3">
            Hire me
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

function ProductMark({ product }: { product: (typeof mainProducts)[number] }) {
  if (product.logo) {
    return (
      <Image
        src={product.logo}
        alt=""
        width={40}
        height={40}
        className="mt-0.5 h-10 w-10 shrink-0 rounded-xl ring-1 ring-black/5"
      />
    );
  }
  return (
    <span
      className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"
      style={{ background: `linear-gradient(135deg, ${product.brand.from}, ${product.brand.to})` }}
    >
      <product.icon aria-hidden="true" className="h-5 w-5" />
    </span>
  );
}
