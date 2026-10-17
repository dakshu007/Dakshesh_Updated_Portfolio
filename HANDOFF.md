# Handoff / project status

Quick context for a new chat session. Design and SEO decisions are in `DECISIONS.md`; how to run and deploy is in `README.md`.

## Live
- Site: https://dakshesh.co.in (Netlify site `daksheshb`, id `dc5cdbdb-3fb5-4c5f-b6c4-090c98fa4091`)
- Code: https://github.com/dakshu007/Dakshesh_Updated_Portfolio
- Stack: Next.js 15 (App Router, TS), Tailwind, GSAP (ScrollTrigger, SplitText), Lenis, Three.js, lucide-react. Fonts: Geist, Geist Mono, Instrument Serif.

## Deploy
```
netlify deploy --build --prod --site dc5cdbdb-3fb5-4c5f-b6c4-090c98fa4091
```
The October 2026 live site had been deployed from a local copy that was ahead of git (Results, Services, Harsa case study). The October 2026 revamp rebuilt all of that from the live pages, so git is now the source of truth again. Deploy from git only.

## Positioning (October 2026 revamp)
- Dakshesh B: Full-Stack Developer, Frontend Engineer and SEO Engineer in Bangalore. Open to full-time roles in Bangalore, ready to relocate anywhere. Facts come from the resume at `public/dakshesh-b-full-stack-developer-resume.pdf`.
- Target queries: full-stack developer / frontend engineer / SEO engineer / software developer in Bangalore. Each has a landing page: `/full-stack-developer-bangalore`, `/frontend-engineer-bangalore`, `/seo-engineer-bangalore` (content in `lib/roles.ts`).

## Structure
- Home (`app/page.tsx`): Hero (Three.js orb) > Cartrabbit marquee > Products carousel (all products in one, MyKavo and Habit Tracker marked Exclusive) > BillZap live on Google Play > Results (Search Console) > Client work > Experience > Skills > Hire (recruiters + freelance) > FAQ > Contact.
- Product pages at `/[slug]` (`lib/data.ts` + `lib/products-content.ts`). New: `/habit-tracker`. `/billzap` CTAs go to Google Play.
- FocusLens, DesignLock and Melody Flow are "earlier side projects": their page content is intentionally unchanged.
- `/results` (data in `lib/results.ts`), `/work/[slug]` (JP Fitness, Harsa Designer Boutique), `/about` (gallery from `public/images/gallery/`).
- `llms.txt` and `llms-full.txt` are generated from the same data (`lib/llms.ts`), so they never drift.

## Keys and config
- Contact form: Formspree `https://formspree.io/f/xrevwraj`.
- GA4 `G-3JWWGHRKZ2`. Search Console verification file in `public/`.

## Updating numbers
- Product achievements: `products[].achievement` in `lib/data.ts`.
- Search Console / GA4 numbers: `lib/results.ts`.
- Experience counter rolls forward monthly from Oct 2024 (`lib/site.ts`).
