# Handoff / project status

Quick context for a new chat session. Design and SEO decisions are in `DECISIONS.md`; how to run and deploy is in `README.md`.

## Live
- Site: https://dakshesh.co.in (Netlify site `daksheshb`, id `dc5cdbdb-3fb5-4c5f-b6c4-090c98fa4091`)
- Code: https://github.com/dakshu007/Dakshesh_Updated_Portfolio
- Stack: Next.js 15 (App Router, TS), Tailwind, GSAP (ScrollTrigger, SplitText), Lenis, Three.js, lucide-react. Fonts: Stack Sans Notch (headlines) and Stack Sans Text (body), self-hosted and subset in `app/fonts/`.

## Deploy
```
netlify deploy --build --prod --site dc5cdbdb-3fb5-4c5f-b6c4-090c98fa4091
```
The October 2026 live site had been deployed from a local copy that was ahead of git (Results, Services, Harsa case study). The October 2026 revamp rebuilt all of that from the live pages, so git is now the source of truth again. Deploy from git only.

## Positioning (October 2026 revamp)
- Dakshesh B: Full-Stack Developer, Frontend Engineer and SEO Engineer in Bangalore. Open to full-time roles in Bangalore, ready to relocate anywhere. Facts come from the resume at `public/dakshesh-b-full-stack-developer-resume.pdf`.
- Target queries: full-stack developer / frontend engineer / SEO engineer / software developer in Bangalore. Each has a landing page: `/full-stack-developer-bangalore`, `/frontend-engineer-bangalore`, `/seo-engineer-bangalore` (content in `lib/roles.ts`).

## Structure
- Home (`app/page.tsx`): Hero (headline + Hire me form) > Cartrabbit marquee > Products carousel (all products in one, MyKavo and Habit Tracker marked Exclusive) > BillZap live on Google Play > Results (Search Console) > Client work > Experience > Skills > Hire (recruiters + freelance) > FAQ > Contact.
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

## Performance and agentic audits (Lighthouse 13)
- Measured locally with Lighthouse 13.5 (the engine behind PageSpeed Insights): every page scores 100 for Accessibility, Best Practices, SEO and Agentic Browsing; desktop Performance 100; mobile Performance 94 to 98 (simulated slow 4G; real LCP is about 0.2s).
- GSAP and Lenis load on the first interaction (`lib/interaction.ts`); content is fully visible without them.
- Below-the-fold home sections use `content-visibility: auto` (`app/globals.css`).
- Agentic: llms.txt, a valid accessibility tree, WebMCP annotations on the contact form and read-only WebMCP tools (`components/AgentTools.tsx`). No `ai-catalog.json` on purpose: the site has no agents or MCP servers to list, so Lighthouse marks it not applicable.
- Share images: every route has an `opengraph-image.tsx` built from `lib/og.tsx` (Stack Sans TTFs and the portrait live in `lib/og-assets/`).

## Hire me form tracking
- The hero form and the contact section form share `components/ContactForm.tsx` and post to Formspree. Each submission carries a `source` field ("Hero form" or "Contact section form") and the email subject ends with it, so you can see which form was used.
- GA4 events: `form_start` (first time someone focuses a field) and `generate_lead` (successful send), both with a `form_location` parameter of `hero` or `contact`. In GA4, see Reports > Engagement > Events.

## Success stories
- `/success-stories` tells the JP Fitness local SEO story (content in `lib/stories.ts`): testimonial from Jaya Prakash, steps, timeline, funnel, a live ROI calculator (`components/RoiCalculator.tsx`), SEO vs ads, Search Console proof, checklist, FAQ and a lead form (`source: story`).
- Schema: Article, Review, FAQPage, BreadcrumbList. Linked from the header, footer, home (client work), the JP Fitness case study and llms.txt.
- To add another story, add it to `lib/stories.ts` and extend the page.
