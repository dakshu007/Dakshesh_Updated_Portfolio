# Dakshesh B - Portfolio

Personal portfolio for Dakshesh B, Frontend Web Developer. Built to load fast, score well on Lighthouse across all four categories, stay fully crawlable for search engines and AI agents, and feel like the work of someone who cares about craft.

Live domain: https://dakshesh.co.in

## Continuing this project (new machine or new Claude Code account)

Everything needed to pick this project up from scratch:

1. **Read the context docs first**: `HANDOFF.md` (current state, keys, structure) and `DECISIONS.md` (every design and SEO decision made so far). Point Claude Code at both at the start of a session, for example: "Read HANDOFF.md, DECISIONS.md and README.md to catch up, then wait for my next change."
2. **Get the code**: `git clone https://github.com/dakshu007/Dakshesh_Updated-_Portfolio.git`
3. **Install and run**: `npm install`, then `npm run dev` (http://localhost:3000). Copy `.env.example` to `.env.local` (current live values are documented in `HANDOFF.md`).
4. **Deploy to production** (Netlify site `daksheshb`, domain dakshesh.co.in). Log in once with `netlify login`, then:
   ```bash
   netlify deploy --build --prod --site dc5cdbdb-3fb5-4c5f-b6c4-090c98fa4091
   ```
   If the build fails with a generic "Error while running build", it is usually transient: run the same command again.
5. **Push to GitHub**: authenticate once with `gh auth login` (account `dakshu007`), then normal `git push`. The remote is `https://github.com/dakshu007/Dakshesh_Updated-_Portfolio.git` on branch `main`.
6. **Copy rules used across the site**: no em dashes or en dashes anywhere in copy or docs (plain hyphens only), Indian English spellings in prose (optimise, colour), and exactly one H1 per page.

## Tech stack

- Next.js (App Router) with React and TypeScript
- Tailwind CSS for styling (light only: near-black ink plus one electric-blue accent, hackajob-inspired)
- GSAP and ScrollTrigger for scroll reveals and the count-up band
- lucide-react icons throughout
- Space Grotesk (display headings) and Inter (body) via `next/font/google` (self-hosted, `display: swap`)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

Build and run the production output:

```bash
npm run build
npm run start
```

## Configuration

Copy the example env file and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | The contact form posts here. Create a form at https://formspree.io and paste its endpoint, for example `https://formspree.io/f/abcdwxyz`. Until this is set, the form validates and shows a clear "not configured yet" message instead of failing silently. |
| `WINDSOR_API_KEY` | Makes the live results live. Server-side only. When set, the home page, `/results`, product pages and the JP Fitness case study fetch Google Search Console and GA4 numbers from the Windsor.ai API and regenerate every 6 hours (ISR). When unset or if Windsor fails, the snapshot in `lib/analytics/snapshot.json` is used. |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for metadata, canonicals, sitemap, robots and JSON-LD. Defaults to `https://dakshesh.co.in` when unset. |

## Where to drop real images

All placeholders are first-party SVG files. Replace them with real screenshots or photos (JPG, PNG, WebP or AVIF all work with `next/image`) and update the matching path. If you change the file extension, update the path in code too.

| What | File | Used in |
| --- | --- | --- |
| Profile photo | `public/images/dakshesh-b-portrait.jpg` | `lib/site.ts` (`person.image`), About section |
| JP Fitness thumbnail | `public/images/projects/jp-fitness.svg` | Work section and the `/work/jp-fitness` page |

The product pages use the product's lucide icon rather than a screenshot, so they need no image files. Social cards (Open Graph) for every page are generated as PNGs by the `opengraph-image.tsx` routes, so structured-data and share images are always valid raster images. Keep alt text descriptive and keep the focus keyword in the profile image filename.

If you switch to raster images you can remove `dangerouslyAllowSVG` from `next.config.mjs`.

## Editing content

All copy and data has one home:

- `lib/site.ts` - name, role, contact details, socials, experience, metrics
- `lib/data.ts` - skills, the 9 products (MyKavo first, the flagship SaaS), and the featured projects (including per-project metadata and schema type)
- `lib/jsonld.ts` - structured data builders

There is no `pages/` directory and no client-side data fetching. All meaningful content is server-rendered.

## Project structure

```
app/
  layout.tsx              Root layout, fonts, site-wide metadata, Person + WebSite JSON-LD
  page.tsx                Home (one-page scroll), ProfilePage JSON-LD
  [slug]/                 The 9 product pages (statically generated, dynamicParams=false)
    page.tsx              Product detail, SoftwareApplication/WebApplication/MobileApplication + Breadcrumb JSON-LD
    opengraph-image.tsx   Per-product 1200x630 OG image
  work/jp-fitness/        Client work case study (WebSite + Breadcrumb JSON-LD) + its OG image
  opengraph-image.tsx     Home 1200x630 OG image
  icon.svg                Favicon
  manifest.ts             Web app manifest
  robots.ts               robots.txt
  sitemap.ts              sitemap.xml (home + about + 9 products + work)
  not-found.tsx           404
components/               UI sections and interactive islands
lib/
  site.ts                 Name, contact, socials, experience, metrics
  data.ts                 Skills, the 9 products, the JP Fitness project
  products-content.ts     Per-product page content (grounded in each live site)
  jsonld.ts               Structured-data builders
public/images/            Profile image and the JP Fitness thumbnail
public/llms.txt           Plain-text summary for AI agents
```

Product slugs and routing: each product in `lib/data.ts` is rendered at `/<id>` by `app/[slug]/page.tsx`. To add a product, add it to `products` in `lib/data.ts` and a matching entry in `lib/products-content.ts`. Old `/projects/*` URLs are 301-redirected in `next.config.mjs`.

## Deploy

Vercel is the simplest path:

1. Push this repo to GitHub.
2. Import it in Vercel. The default build command (`next build`) and output are detected automatically.
3. Add the environment variables from the table above in the Vercel project settings.
4. Add the custom domain `dakshesh.co.in`.

Netlify works too with the Next.js runtime. Set the same environment variables there.

## Post-deploy checklist

See the bottom of `DECISIONS.md` for the full list. In short: connect the domain, confirm `NEXT_PUBLIC_SITE_URL`, submit the sitemap to Google Search Console and Bing, request indexing for the name query, confirm the `sameAs` profiles, and 301 the old Netlify sites to the new domain.
