"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, ArrowUpRight, Boxes } from "lucide-react";
import { products } from "@/lib/data";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    onChange();
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    triggerRef.current?.focus();
  }, []);

  const focusItem = (index: number) => {
    const items = panelRef.current?.querySelectorAll<HTMLAnchorElement>(
      "[data-product-link]"
    );
    if (!items || items.length === 0) return;
    const next = (index + items.length) % items.length;
    items[next]?.focus();
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
      panelRef.current?.querySelectorAll<HTMLAnchorElement>(
        "[data-product-link]"
      ) ?? []
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
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setMenuOpen(false);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex items-center justify-between gap-4 transition-all duration-500 ease-out ${
          scrolled
            ? "mt-3 h-14 w-[calc(100%-1.25rem)] max-w-4xl rounded-full border border-white/40 bg-white/60 px-4 pl-5 shadow-lift ring-1 ring-white/20 backdrop-blur-xl backdrop-saturate-150 sm:px-5 sm:pl-6"
            : "mt-0 h-16 w-full max-w-6xl rounded-none border border-transparent px-5 sm:px-6 lg:px-8"
        }`}
      >
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-ink"
        >
          dakshesh<span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <NavItem href="/#work">Work</NavItem>

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
              onClick={() => setMenuOpen(true)}
              onKeyDown={onTriggerKeyDown}
              className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              Products
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 transition-transform duration-200 ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              id="products-panel"
              ref={panelRef}
              hidden={!menuOpen}
              onKeyDown={onPanelKeyDown}
              className="absolute right-0 top-full w-[min(92vw,40rem)] pt-3"
            >
              <div className="rounded-2xl border border-line bg-surface p-3 shadow-lift">
                <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">
                  Products I have shipped
                </p>
                <ul className="grid gap-1 sm:grid-cols-2">
                  {products.map((product) => (
                    <li key={product.id}>
                      <Link
                        data-product-link
                        href={`/${product.id}`}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-accent-soft focus-visible:bg-accent-soft"
                      >
                        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent group-hover:bg-white">
                          <product.icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                            {product.name}
                            {product.soon && (
                              <span className="rounded-full bg-accent-soft px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                                Soon
                              </span>
                            )}
                          </span>
                          <span className="block text-sm text-ink-muted">
                            {product.description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <NavItem href="/#about">About</NavItem>
          <NavItem href="/#skills">Skills</NavItem>
          <Link href="/#contact" className="btn-primary ml-2 px-5 py-2.5">
            Let us talk
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <X aria-hidden="true" className="h-6 w-6" />
          ) : (
            <Menu aria-hidden="true" className="h-6 w-6" />
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="mx-auto mt-2 w-[calc(100%-1.25rem)] max-w-4xl overflow-hidden rounded-2xl border border-line bg-canvas/95 shadow-lift backdrop-blur-xl md:hidden"
      >
        <nav
          aria-label="Mobile"
          className="section flex max-h-[calc(100vh-4rem)] flex-col gap-1 overflow-y-auto py-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-semibold text-ink hover:bg-accent-soft hover:text-accent"
            >
              {link.label}
            </Link>
          ))}

          <button
            type="button"
            aria-expanded={mobileProductsOpen}
            aria-controls="mobile-products"
            onClick={() => setMobileProductsOpen((v) => !v)}
            className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-ink hover:bg-accent-soft hover:text-accent"
          >
            <span className="flex items-center gap-2">
              <Boxes aria-hidden="true" className="h-5 w-5" />
              Products
            </span>
            <ChevronDown
              aria-hidden="true"
              className={`h-5 w-5 transition-transform ${
                mobileProductsOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <ul id="mobile-products" hidden={!mobileProductsOpen} className="pl-2">
            {products.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/${product.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-muted hover:text-accent"
                >
                  <product.icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                  <span className="font-medium text-ink">{product.name}</span>
                  {product.soon && (
                    <span className="rounded-full bg-accent-soft px-1.5 py-0.5 text-[10px] font-bold uppercase text-accent">
                      Soon
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-3"
          >
            Let us talk
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-full px-3.5 py-2 text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
    >
      {children}
    </Link>
  );
}
