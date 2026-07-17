# Decisions and assumptions

Every choice made where the brief left room, plus the stubs you may want to revisit. No em dashes or en dashes are used anywhere in the project copy, headings, metadata, alt text, JSON-LD or docs, per the brief.

## Current design (redesign)

The site was redesigned to a light, minimal, high-contrast look inspired by hackajob, with a dedicated page per product. Key points:

- Palette: warm off-white canvas `#FAFAF7`, white cards, near-black ink `#0A0A0A`, secondary `#52525B`, accent electric blue `#1A53F0`, and one near-black section `#0B0B0F` (the metrics band) for contrast. Two colours do the heavy lifting (ink + blue). All body pairings meet WCAG AA.
- Type: Space Grotesk for display headings, Inter for body and UI, both via `next/font` with `display: swap`.
- Flat design: Three.js was removed (it did not fit the flat, minimal direction and it keeps the bundle smaller). The signature moment is the bold typography plus the dark count-up band.
- Information architecture: every product now has its own top-level page (`/mykavo`, `/billzap`, `/shrinkto`, `/spacing-inspector`, `/focuslens`, `/eeat-analyser`, `/designlock`, `/melody-flow`, `/image-size-inspector`), each with its own metadata, canonical, OG image and `SoftwareApplication` / `WebApplication` / `MobileApplication` JSON-LD. JP Fitness is a Work page at `/work/jp-fitness`. The old `/projects/*` URLs 301-redirect to the new ones (`next.config.mjs`).
- MyKavo is the flagship SaaS (added July 2026): first in the products array with `featured: true`, a real logo, a dedicated warm-yellow spotlight section on the home page (`components/SaasSpotlight.tsx`) styled in the product's black and yellow brand rather than the site accent, a "Try free now" external CTA, and a SaaS badge in the header dropdown and products grid. Shipped-product counts across the site went from eight to nine.
- Product page copy was grounded in each product's live site, so it reflects what each tool actually does. Content lives in `lib/products-content.ts`.
- Hero background: the hero uses a soft on-palette gradient by default. Drop an image at `public/images/hero-bg.jpg` (or `.png` / `.webp`) and the hero will use it automatically on the next build, with a light scrim so the headline stays readable (`components/Hero.tsx`).
- Live experience counter: the hero "Building for the web" figure is computed from a start date (October 2024) so it reads "1.8" in June 2026 and rolls forward one month on the 1st of each month (1.8, 1.9, 1.10, 1.11, 2.0). It recomputes on the client from the visitor's current date, so it stays current without a redeploy (`lib/site.ts` `experienceLabel`, `components/ExperienceValue.tsx`).
- Profile photo: the About section and the Person JSON-LD use a real photo at `public/images/dakshesh-b-portrait.jpg`.
- Cartrabbit logo: the Experience card uses the real Cartrabbit mark at `public/images/cartrabbit-logo.svg`.
- Cartrabbit product strip: the six product names link to their live sites (new tab) and turn their brand colour on hover, set per item via a `--bc` CSS variable and the `.brand-link` rule in `app/globals.css` (Tailwind does not generate arbitrary `var()` hover utilities, so the hover lives in CSS).

## Confirmed with you

- Contact form delivery: Formspree, live at `https://formspree.io/f/xrevwraj`.
- GitHub: https://github.com/dakshu007
- LinkedIn: https://www.linkedin.com/in/dakshesh-b-wordpress-developer/

## Design

- Colour system: Option A, Ink and Indigo. Background `#F8FAFC`, cards `#FFFFFF`, accent indigo `#4F46E5` (hover `#4338CA`), text `#0F172A` with muted `#475569` and soft `#64748B`. Light mode only, no dark toggle. All body text pairings meet WCAG AA (4.5:1 or better); the accent on white and white on accent both pass.
- Spelling: Indian English (optimise, colour) in prose. Code identifiers stay in standard CSS spelling (for example the `color` property).
- One surprising moment: the lazy Three.js hero accent on desktop, plus the pinned horizontal scroll on the projects strip. Everything else stays calm and minimal.

## Content

- Hero H1 reads "Dakshesh builds" followed by the cycling product typewriter (changed from "Dakshesh B worked in" at the owner's request). The exact name string "Dakshesh B" still appears in the page title, Person/WebSite JSON-LD and the About section, so the page still owns the name query. There is exactly one H1 per page.
- About, Skills, Experience, Projects, Products, Metrics and Contact all use the real content from the brief. No lorem ipsum.
- Skill groups use tasteful chips, not fake percentage bars.
- Metrics: 300,000+ stores, 840+ extension users, 6 products maintained, 8 products shipped. Animated count-up on scroll, with the real value always present for screen readers and crawlers.

## Images (placeholders to replace)

All thumbnails and the profile image are first-party SVG placeholders, built on-brand so the site looks finished today. Replace them with real assets when you have them. See the table in `README.md`.

- `public/images/dakshesh-b-frontend-developer.svg` - profile monogram. Replace with a real photo. Keep the keyword-rich filename.
- `public/images/projects/jp-fitness.svg`
- `public/images/projects/chrome-extensions.svg`
- `public/images/projects/melody-flow.svg`
- `public/images/projects/billzap.svg`

Because the placeholders are SVG, `next.config.mjs` enables `dangerouslyAllowSVG` with a strict CSP (`script-src 'none'; sandbox`) and attachment disposition, which keeps serving SVG safe. If you move fully to raster images you can remove that block.

## SEO

- Metadata API only. Unique title and description per page. Self-referencing canonical on the home page and each case study (canonical is set per page, never globally, so sub-routes are not all pointed at `/`).
- `metadataBase` is `https://dakshesh.co.in` (override with `NEXT_PUBLIC_SITE_URL`).
- Open Graph and Twitter `summary_large_image` on every page. A generated 1200x630 OG image lives at `app/opengraph-image.tsx` for the home page, and each case study has its own generated OG image at `app/projects/[slug]/opengraph-image.tsx`.
- Structured-data `image` fields use the generated PNG OG endpoints (`/opengraph-image` for Person, `/projects/<slug>/opengraph-image` for each project), because SVG is not a valid image type for schema.org rich results. The on-page thumbnails stay as SVG for the visual.
- `robots`: index, follow, `max-image-preview:large`, `max-snippet:-1`, `max-video-preview:-1`.
- JSON-LD: Person and WebSite site-wide, ProfilePage on the home page, BreadcrumbList plus SoftwareApplication / MobileApplication / WebSite on each case study. `sameAs` includes GitHub, LinkedIn and both old Netlify sites.
- `app/robots.ts` and `app/sitemap.ts` generate the crawl files with absolute URLs. The 404 page is `noindex`.
- `public/llms.txt` gives AI agents a plain-text summary with key links.

## Performance and accessibility

- Server Components by default. Client islands are limited to the header dropdown, the contact form, the count-up, the scroll animations and the Three.js mount.
- The hero H1 is the LCP element and is plain server-rendered text, so it paints instantly. No hero image to wait on.
- Three.js is loaded with `next/dynamic` (`ssr: false`), mounted only at 1024px and up, skipped entirely under `prefers-reduced-motion`. It caps device pixel ratio at 2, pauses when the tab is hidden, and disposes geometry, materials and the renderer on unmount.
- GSAP reveals are skipped under reduced motion, and content is always visible without JavaScript (we only hide elements once GSAP is confirmed ready).
- Security headers (HSTS, nosniff, frame options, referrer policy, permissions policy) are set in `next.config.mjs`. External links use `rel="noopener noreferrer"`. The `x-powered-by` header is off.
- Semantic landmarks, one H1 per page, ordered headings, a skip-to-content link, visible focus rings, labelled form fields with `aria-describedby` errors and an `aria-live` status region, and an accessible mega-dropdown (button with `aria-expanded`, arrow-key navigation, Home and End, Esc to close with focus returning to the trigger, click-outside and Tab-out to close, plus a mobile accordion).

## Stubs and things to revisit

- Contact form: live. The Formspree endpoint `https://formspree.io/f/xrevwraj` is wired as the default in `components/Contact.tsx` and in `.env.local`, so the form works on any host without extra setup. Override it any time with `NEXT_PUBLIC_FORMSPREE_ENDPOINT`. A honeypot field filters basic bots. Note: a brand new Formspree form may ask the owner to confirm the address by email on the first submission before messages are delivered.
- Profile and project images are placeholders (see above).
- Case study pages are solid first drafts generated from the resume content. Expand any of them with real screenshots, numbers and a longer write-up when ready. Tell me if you want full long-form case studies.
- `worksFor` in the Person schema points to `https://cartrabbit.io/`. Adjust if the canonical Cartrabbit URL differs.

## Post-deploy checklist

1. Connect `dakshesh.co.in` in Vercel (or Netlify) and force HTTPS.
2. Confirm `NEXT_PUBLIC_SITE_URL=https://dakshesh.co.in` is set in the host so canonicals, sitemap, robots and JSON-LD all use the live origin.
3. Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` and send a test message to confirm delivery.
4. Submit `https://dakshesh.co.in/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
5. Request indexing for the home page and for the query "Dakshesh B".
6. Confirm the same name string "Dakshesh B" is used on LinkedIn and GitHub, and that the `sameAs` array in `lib/site.ts` lists every profile.
7. If you control the old Netlify sites, set 301 redirects from `daksheshb.netlify.app` and `dakshesh-dev.netlify.app` to the new domain.
8. Replace the placeholder profile and project images with real assets.
9. Re-run Lighthouse on mobile and desktop and confirm all four categories stay green.
