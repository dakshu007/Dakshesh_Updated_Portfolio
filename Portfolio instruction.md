# Claude Code Build Prompt - Dakshesh B Portfolio (`dakshesh.co.in`)

> Paste everything below the line into Claude Code. It is written as a single, self-contained build brief. Two quick corrections to your notes first, so the build is right:
>
> 1. **Icons = Lucide (`lucide-react`), font = Montserrat.** Lucide is an icon set, not a font. Use **Lucide icons throughout the entire UI** (nav, skills, project cards, contact, socials, buttons, the products dropdown). Font stays **Montserrat** (Google Fonts via `next/font`). Both are in the stack below.
> 2. **GSAP + Three.js + Lighthouse 100 is a real tension.** Three.js is heavy. The brief below keeps Three.js to *one* lightweight hero accent that is lazy-loaded and disabled on mobile + on `prefers-reduced-motion`, so you keep your green scores. Don't put WebGL on every section.

---

## ROLE

You are a senior frontend engineer + technical SEO specialist. Build a **production-grade personal portfolio** that loads fast, scores **100 / 100 / 100 / 100** on Lighthouse (Performance, Accessibility, Best Practices, SEO) on both mobile and desktop, is fully crawlable by search engines and AI agents, and has a **distinctive, memorable light-mode UI** that makes visitors keep scrolling.

Ship working, deployable code. No placeholders left as TODO. Where I haven't given a value, make a strong tasteful choice and note it in a `DECISIONS.md`.

---

## ABOUT ME (source of truth - use real content, not lorem ipsum)

- **Name:** Dakshesh B
- **Role / title:** Frontend Web Developer / Web Engineer
- **Tagline angle:** Builds responsive, accessible, high-performance interfaces (HTML5, CSS3, vanilla JS ES6+) - and ships full products end to end.
- **Location:** Kotagiri, India · open to Bangalore (remote-friendly)
- **Email:** daksheshbabu@gmail.com
- **Phone:** +91 87784 81650
- **Experience:** ~2 years. Web Engineer & Developer at **Cartrabbit** (Nov 2024-Present), a WooCommerce product company. Develops/maintains front-end for **6 production products** (Retainful, Flycart, WPLoyalty, UpsellWP, Spark Editor, Yuko) serving **300,000+ stores**.
- **Education:** B.E. Computer Science & Engineering, Dr. N.G.P. Institute of Technology, Coimbatore (2021-2025).
- **Old sites (for reference / redirect, not to copy):** https://daksheshb.netlify.app/ and https://dakshesh-dev.netlify.app/
- **New primary domain:** https://dakshesh.co.in/
- **Socials:** LinkedIn, GitHub, Portfolio (wire up real URLs - ask me if missing).

### Core skills to surface on the page
HTML5 (semantic, ARIA/accessibility), CSS3 (Flexbox, Grid, animations), JavaScript (ES6+, vanilla, DOM, events), jQuery, Responsive/Mobile-First, Bootstrap, Tailwind, Pixel-perfect from Figma, Core Web Vitals & performance, On-page SEO, Lighthouse, REST APIs / JSON / Webhooks / Payment gateways, WordPress + WooCommerce (custom themes, hooks/filters, Elementor, Divi), Chrome Extensions (Manifest V3), Flutter/Dart, PHP, SQL/MySQL, Git/GitHub/PRs/code review, AI-assisted dev (Claude Code, Cursor).

### Products (build the header "My Products" mega-dropdown from this exact list)
Each item: name, one-line description, external URL (open in new tab, `rel="noopener noreferrer"`).

1. **BillZap** - India's best GST Billing App - https://billzap.netlify.app/
2. **Shrinkto** - Image compressor (JPG, PNG, WebP) - https://shrinkto.com/
3. **Spacing Inspector** - Chrome extension, element spacing - https://spacinginspector.netlify.app/
4. **FocusLens** - Chrome productivity tracker - https://focuslens-productivity-tracker.netlify.app/
5. **EEAT Analyser** - SEO E-E-A-T audit tool - https://eeatanalyser.netlify.app/
6. **DesignLock** - WordPress plugin - https://designlock.netlify.app/
7. **Melody Flow** *(mark "Soon")* - Offline music app for Android - https://melody-flow-player.netlify.app/
8. **Image Size Inspector** - Inspect any image size instantly - https://imageinspect.netlify.app/

### Featured projects (give these full project cards / case studies)
- **JP Fitness** - fast, SEO-optimised gym business site (HTML/CSS/JS). WebP, deferred map loading, OG/Twitter tags, click-to-WhatsApp & call CTAs. https://jpfitness.co.in
- **Image Size Inspector & Spacing Inspector** - two published Manifest V3 Chrome extensions, **840+ combined active users**, 9+ image formats detected.
- **Melody Flow** - Flutter/Dart Android music player, 10-band EQ, lyrics sync, gapless playback, home-screen widget.
- **BillZap** - full-stack billing app + marketing site, end to end.

---

## TECH STACK (use exactly this)

| Layer | Choice |
|---|---|
| Framework | **Next.js (latest, App Router)** with **React** + **TypeScript** |
| Styling | **Tailwind CSS** (utility-first; minimal custom CSS) |
| Animation (DOM/scroll) | **GSAP** + **ScrollTrigger** |
| 3D accent (hero only) | **Three.js** - lazy-loaded, desktop-only, reduced-motion-aware |
| Icons | **lucide-react** - use Lucide icons everywhere across the UI |
| Font | **Montserrat** via `next/font/google` (self-hosted, `display: swap`, subset `latin`) |
| Deploy target | Vercel preferred (or Netlify, since domain history is Netlify) |

**Hard rules**
- App Router only. No `pages/` `<Head>` hacks.
- Metadata via the **Metadata API** (`export const metadata` / `generateMetadata`). One **unique** title + description per page. Self-referencing **canonical** on every page.
- All meaningful content is **server-rendered** (Server Components) so crawlers and AI agents see it without running JS. Use `"use client"` only for interactive islands (dropdown, theme-free animations, contact form).
- File-based `app/sitemap.ts` and `app/robots.ts`. No staging/Netlify URL left indexable.
- Images via `next/image`, AVIF/WebP, explicit width/height, `priority` only on the LCP image.
- No layout shift (reserve space for everything). Target CLS 0.

---

## COPY / WRITING RULES

- **Never use em dashes (-) or en dashes (-) anywhere in website copy, headings, metadata, alt text, JSON-LD, README, or DECISIONS. Use a normal hyphen (-) instead, or rewrite into separate sentences.** Em dashes read as AI-generated; keep the writing human.
- Write in clear, confident, human prose. Short sentences. No filler, no "as an AI", no clichd phrases.
- Use Indian English spelling consistently (optimise, colour optional - pick one and stay consistent).
- Where a separator is needed in copy, use a hyphen with spaces ( - ), a comma, or a colon - not a dash character.

## DESIGN DIRECTION

**Light mode only.** No dark mode toggle. Make light mode feel premium, not plain.

### Color - pick ONE of these 2-color systems (all light-mode, accessible AA+). Default to **Option A** unless I say otherwise.

- **Option A - Ink & Indigo (recommended, "frontend engineer" energy)**
  - Base / background: `#F8FAFC` (near-white) and pure `#FFFFFF` cards
  - Primary accent: **Indigo `#4F46E5`** (links, buttons, highlights)
  - Text: `#0F172A` (near-black slate)
  - Use accent sparingly: CTAs, active nav, key headings, progress bars.

- **Option B - Warm Minimal**
  - Background `#FAFAF9`, cards `#FFFFFF`
  - Accent **Emerald `#059669`**
  - Text `#1C1917`

- **Option C - Editorial**
  - Background `#FFFFFF`, soft section bg `#F4F4F5`
  - Accent **Coral `#F25C54`** + deep navy text `#0B1F3A`

> Rule: **2 colors max** doing the heavy lifting (1 neutral + 1 accent), plus tints/shades of each. Ensure **4.5:1** contrast for body text, **3:1** for large text and UI. Never put accent text on accent background without checking contrast.

### Typography
- Montserrat throughout. Weights: 400 (body), 500/600 (UI), 700/800 (display headings).
- One **H1 per page**. Logical H2→H3 hierarchy driven by content (you got this right).
- Generous line-height (1.6 body), comfortable measure (max ~70ch), real whitespace.

### Iconography
- Use **Lucide icons (`lucide-react`)** consistently across the whole site: nav items, skill group headers and chips, project card meta (stack, links, live demo), the My Products dropdown (each product + an external-link icon), contact details (mail, phone, map-pin), social links (github, linkedin), buttons (arrow-right, send), and the back-to-top control.
- Keep icon style uniform: consistent stroke width and size scale, accent or neutral color from the palette, never mix icon libraries. Decorative icons get `aria-hidden="true"`; icon-only buttons get an `aria-label`.

### Feel
Clean, minimal, lots of breathing room, confident type, *one* surprising delightful moment (the hero 3D accent or a signature scroll animation). Think "senior frontend dev who clearly cares about craft," not "template bought online." Subtle is better than busy.

### Animation budget (keep scores green)
- GSAP ScrollTrigger: fade/slide-up reveals on section entry, a horizontal-scroll or pinned moment for the products/projects strip, animated skill bars, number count-ups (300,000+, 840+, 6 products, 8 products).
- Micro-interactions: button hover, nav underline, card lift on hover.
- **Three.js:** ONE hero accent (e.g. slow rotating low-poly shape / particle field / interactive gradient mesh). Lazy-load with `next/dynamic` `{ ssr: false }`, only mount on `min-width: 1024px`, fully skip when `prefers-reduced-motion: reduce`. Keep the bundle small; tree-shake; cap DPR; pause when offscreen.
- Respect `prefers-reduced-motion` everywhere - provide instant, non-animated states.

---

## PAGE / SECTION STRUCTURE (single-page scroll + a few sub-routes for SEO)

**Home `/` (one-page scroll):**
1. **Header / Nav** (sticky, slim, blurred-on-scroll). Logo "Dakshesh". Links: About · Skills · Projects · Products ▾ · Contact. **"My Products ▾"** = mega-dropdown on hover (and click/focus for keyboard + mobile) listing all 8 products with name + one-liner + external link. Accessible: `aria-expanded`, focus trap, Esc to close, opens on hover *and* keyboard.
2. **Hero** - name, role, one-line value prop, primary CTA ("View Projects" / "Get in touch"), the lightweight Three.js accent behind/beside it. LCP element = hero heading or hero image; keep it instant.
3. **About** - short, sharp. ~2 yrs, Cartrabbit, 6 products, 300k+ stores, ships products end to end.
4. **Skills** - grouped (Core Frontend / Responsive & UI / Performance & SEO / APIs / Platforms / Tools / AI). Animated reveal, lucide icons, no skill "percentage bars" lies - use tasteful chips/grid.
5. **Experience** - Cartrabbit card with the 4 bullet achievements.
6. **Featured Projects** - rich cards: JP Fitness, the two Chrome extensions, Melody Flow, BillZap. Each: thumbnail (`next/image`), stack tags, 1-2 line impact, live link + (GitHub if public). Add a pinned/parallax scroll moment here.
7. **Products strip** - visual grid of all 8 products (mirrors the header dropdown) with logos/screens + links.
8. **Metrics band** - count-up animation: 300,000+ stores · 840+ extension users · 6 products maintained · 8 products shipped.
9. **Contact** - accessible form (name, email, message) with proper labels, validation, success/error states. Submit via a simple API route or a service (Formspree/Resend - make it work or stub clearly in DECISIONS.md). Plus direct email, phone, LinkedIn, GitHub.
10. **Footer** - nav repeat, socials, "Built with Next.js, React, GSAP, Three.js, Tailwind", copyright, back-to-top.

**Sub-routes (real pages, server-rendered, each with own metadata + canonical + breadcrumb schema):**
- `/projects/jp-fitness`, `/projects/chrome-extensions`, `/projects/melody-flow`, `/projects/billzap` - optional case-study pages. Build at least the structure + metadata so they're indexable. (Tell me if you want full write-ups; generate solid first drafts from the resume content.)

---

## SEO - IMPLEMENT ALL OF THIS

### Metadata (per page, via Metadata API)
- Unique **meta title** (~55-60 chars) and **meta description** (~150-160 chars).
- **Canonical** self-referencing URL on every page.
- **Open Graph** (title, description, url, siteName "Dakshesh B", type, locale `en_IN`, image 1200×630) + **Twitter Card** (`summary_large_image`).
- `robots`: index, follow, `max-image-preview:large`, `max-snippet:-1`.
- `metadataBase: new URL('https://dakshesh.co.in')`.
- Generate a real **OG image** (`/opengraph-image.tsx` or a static 1200×630) - name + role + accent.

**Home page targets (use, refine if better):**
- Title: `Dakshesh B - Frontend Web Developer | React, Next.js, JavaScript`
- Description: `Frontend web developer building fast, accessible, high-performance interfaces with React, Next.js & JavaScript. Shipping production web products and tools end to end.`
- **Focus keyword:** `Dakshesh B` (own the name - exact-match in title, H1, OG, schema, URL, alt text).
- **Secondary keywords:** `frontend web developer`, `React developer India`, `Next.js developer`, `frontend engineer portfolio`, `Dakshesh frontend developer`.
- Per-project pages get their own focus keyword (e.g. "JP Fitness website", "Image Size Inspector Chrome extension").

> Ranking your name #1: name in domain ✅ (`dakshesh.co.in`), exact name in `<title>` + single `<h1>` + `Person` schema + OG + filename/alt of profile image, consistent **same name string** across LinkedIn/GitHub, and a `sameAs` array linking all your profiles. Submit to Search Console + request indexing. Add the old Netlify URLs as `sameAs` too and 301 them to the new domain if you control them.

### Structured data (JSON-LD, server-rendered `<script type="application/ld+json">`)
- **Person** (you): name, jobTitle, url, image, email, address (Kotagiri/Bangalore), `knowsAbout` (skills), `sameAs` (LinkedIn, GitHub, old sites), `worksFor` Cartrabbit.
- **WebSite** with `potentialAction` SearchAction (optional) + `ProfilePage`.
- **BreadcrumbList** on sub-routes.
- **CreativeWork / SoftwareApplication** for each product/project where it fits (esp. the Chrome extensions and apps).
- Validate against schema.org - no errors.

### Crawl & indexing files
- `app/robots.ts` → allow all, point to sitemap, **block nothing important**, ensure no `noindex` ships to prod.
- `app/sitemap.ts` → list `/` and every sub-route with `lastModified`. Absolute `dakshesh.co.in` URLs.
- Clean human-readable slugs (`/projects/jp-fitness`, not `?id=3`).
- Internal linking between home sections and project pages.
- After deploy: submit sitemap in Google Search Console + Bing Webmaster.

### AI / agentic crawlability
- Real semantic HTML in the server response (headings, lists, links, `<nav>`, `<main>`, `<article>`, `<footer>`).
- Don't hide content behind JS-only rendering or click-to-reveal for the important stuff.
- Descriptive link text (not "click here"), descriptive `alt` on every image, descriptive headings - this is what AI Overviews and agents parse.
- Add `/llms.txt` (optional, nice-to-have) summarizing who you are + key links.

---

## PERFORMANCE & ACCESSIBILITY - TARGET ALL FOUR LIGHTHOUSE CATEGORIES = 100

### Performance
- Server Components by default; ship minimal client JS. Code-split with `next/dynamic` (Three.js, any heavy widget).
- `next/font` for Montserrat (no render-blocking Google Fonts request; `display: swap`).
- `next/image` everywhere, AVIF/WebP, correct `sizes`, `priority` only on LCP image, lazy-load the rest. Provide width/height to prevent CLS.
- Preconnect/preload only what's needed. Defer non-critical JS. No unused Tailwind (purge on).
- Cap Three.js: small geometry, capped pixel ratio (`Math.min(devicePixelRatio, 2)`), pause on offscreen/visibilitychange, dispose on unmount, desktop-only mount.
- Aim: LCP < 2.5s, INP < 200ms, CLS < 0.1 (target 0). Test mobile throttled.

### Accessibility (score 100 *and* genuinely usable)
- Semantic landmarks: `<header><nav><main><section><footer>`. One `<h1>`, ordered headings.
- All interactive elements keyboard-reachable; visible focus rings (don't remove outlines without replacement).
- Mega-dropdown: ARIA menu pattern, `aria-expanded`, arrow-key nav, Esc closes, focus returns to trigger.
- Color contrast AA (4.5:1 text / 3:1 UI) - verify the chosen palette.
- `alt` text on every image; decorative images `alt=""`. Form inputs have `<label>`s and error messaging tied via `aria-describedby`.
- `prefers-reduced-motion` honored: animations become instant/none.
- `lang="en"` on `<html>`, skip-to-content link, sensible page `<title>`.

### Best Practices
- HTTPS only, no console errors, no deprecated APIs, `rel="noopener noreferrer"` on external links, correct image aspect ratios, valid HTML, secure headers (CSP-friendly), no mixed content.

---

## RESPONSIVENESS
Mobile-first. Verified breakpoints: **mobile (≤640) · tablet (641-1024) · laptop (1025-1440) · desktop (>1440)**. Fluid type (`clamp()`), no horizontal scroll, tap targets ≥44px, dropdown works as an accessible accordion/expandable on touch. Test the hero, nav, products dropdown, and project grid at every breakpoint.

---

## DELIVERABLES
1. Full Next.js (App Router, TS) project, runnable with `npm install && npm run dev`, building clean with `npm run build`.
2. Tailwind configured (palette tokens for the chosen 2-color system), Montserrat wired via `next/font`, lucide-react installed.
3. All sections + the **My Products** mega-dropdown, populated with my **real** content above.
4. GSAP scroll animations + the single lazy Three.js hero accent (reduced-motion + desktop guards).
5. `app/sitemap.ts`, `app/robots.ts`, per-page Metadata, JSON-LD (Person/WebSite/Breadcrumb/SoftwareApplication), OG image.
6. `next/image` optimized assets; provide placeholder images where I haven't supplied screenshots and list them in `DECISIONS.md`.
7. `README.md` (run/deploy steps, where to drop real images, how to set the contact form key) + `DECISIONS.md` (every assumption + chosen color option + any stub).
8. A short **post-deploy checklist**: connect `dakshesh.co.in`, set `metadataBase`, submit sitemap to Search Console, request indexing for the name query, add `sameAs` profiles, 301 old Netlify sites.

## BUILD ORDER (do it in this sequence and keep it runnable at each step)
1. Scaffold Next.js + TS + Tailwind + fonts + lucide; global layout, palette tokens, base typography.
2. Header + accessible My Products mega-dropdown.
3. Hero (static first), then About, Skills, Experience, Projects, Products, Metrics, Contact, Footer - real content, fully responsive, semantic.
4. Metadata API + canonical + OG + JSON-LD + sitemap + robots.
5. Layer GSAP ScrollTrigger reveals + count-ups + pinned moment.
6. Add the lazy, guarded Three.js hero accent **last**, and re-check Lighthouse stays 100/100/100/100 on mobile + desktop. If 3D drops a score, scale it back automatically and note it.
7. Final a11y + perf pass; write README + DECISIONS + post-deploy checklist.

**Ask me only if blocked on:** real social URLs, project screenshots, and the contact-form delivery method. Otherwise make strong choices and document them. Start now.
