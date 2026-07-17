# Handoff / project status

Quick context for a new chat session. The full design and SEO decisions are in `DECISIONS.md`; how to run and deploy is in `README.md`.

## Live
- Site: https://dakshesh.co.in (custom domain on Netlify, HTTPS active)
- Also serves at: https://daksheshb.netlify.app
- Stack: Next.js 15 (App Router, TS), Tailwind, GSAP, lucide-react. Fonts: Space Grotesk (display) + Inter (body).

## Deploy
From the project root:
```
netlify deploy --build --prod --site dc5cdbdb-3fb5-4c5f-b6c4-090c98fa4091
```
Netlify site: `daksheshb` (id `dc5cdbdb-3fb5-4c5f-b6c4-090c98fa4091`). If a deploy hits "Error while running build", it is usually transient: just run it again.

## Keys and config
- Contact form: Formspree `https://formspree.io/f/xrevwraj` (default in `components/Contact.tsx`, also `.env.local`).
- Google Analytics: GA4 `G-3JWWGHRKZ2` (`app/layout.tsx` + `components/Analytics.tsx`).
- Google Search Console: verification file is live at `/googled23738155d4d0020.html`.

## Structure
- Home is a one-page scroll. Sub-routes: 8 product pages at `/[slug]` (`app/[slug]/`), `/work/jp-fitness`, `/about` (with photo gallery + FAQ).
- Section image backgrounds (hero, products, about, experience, contact) live in `public/images/*-bg.jpg`, each with a readability scrim.
- Black sections: the Cartrabbit strip (`components/LogoStrip.tsx`), Work, Skills, Metrics band, Footer.
- Hero headline is a typewriter cycling 14 products in brand colours (`components/HeroTyping.tsx`, list in `lib/data.ts` `heroProducts`).
- Gallery is dynamic: drop photos into `public/images/gallery/` and they appear on `/about`.
- Content/data: `lib/site.ts`, `lib/data.ts`, `lib/products-content.ts`, `lib/jsonld.ts`.

## Open items (user side)
1. Google Search Console: verify the property, submit `sitemap.xml`, and request indexing for `/` and `/about`.
2. Keep the name "Dakshesh B" / "Dakshesh" consistent on LinkedIn and GitHub; add a couple of backlinks to dakshesh.co.in.
3. Optional: add more gallery photos to `public/images/gallery/`; a click-to-enlarge lightbox could be added.
4. Re-run PageSpeed on the live URL to confirm scores after the latest perf pass.
