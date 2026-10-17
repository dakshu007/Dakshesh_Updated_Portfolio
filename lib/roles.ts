/**
 * Role landing pages for hiring searches in Bangalore. Each page carries its
 * own evidence, skills and FAQ so it stands on its own (no doorway copy).
 */

export type RoleProof = { title: string; desc: string; href?: string; metric?: string };
export type RoleFaq = { question: string; answer: string };

export type Role = {
  slug: string;
  role: string;
  /** Short role name used in nav and chips. */
  short: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  pitch: string;
  proof: RoleProof[];
  skills: string[];
  responsibilities: string[];
  faqs: RoleFaq[];
};

export const roles: Role[] = [
  {
    slug: "full-stack-developer-bangalore",
    role: "Full-Stack Developer",
    short: "Full-Stack",
    h1: "Full-Stack Developer in Bangalore who ships whole products",
    metaTitle: "Full-Stack Developer in Bangalore | Dakshesh B (Next.js, Node.js)",
    metaDescription:
      "Hire Dakshesh B, a full-stack developer in Bangalore: Next.js, React, TypeScript, Node.js, PostgreSQL and Flutter. Built MyKavo SaaS end to end. Open to work, ready to relocate.",
    keywords: [
      "full stack developer Bangalore",
      "full stack developer Bengaluru",
      "best full stack developer in Bangalore",
      "Next.js developer Bangalore",
      "Node.js developer Bangalore",
      "hire full stack developer India",
    ],
    intro:
      "I am Dakshesh B, a full-stack developer open to full-time roles in Bangalore and ready to relocate anywhere. I build the whole product: the database schema, the API, the background jobs, the auth and billing, the web front end, the mobile app and the marketing site that brings users in.",
    pitch:
      "My strongest proof is MyKavo, a website monitoring SaaS I designed, built and run on my own: 4 apps, 7 shared packages, 95 pages, 115 API routes, a 50-model PostgreSQL schema and about 1,600 unit tests. It reached 25 active users in its first 3 months.",
    proof: [
      { title: "MyKavo SaaS, built solo", desc: "Next.js App Router web app, Node.js worker, Expo app and Chrome extension in one pnpm monorepo, across 230+ commits.", href: "/mykavo", metric: "115 API routes" },
      { title: "Backend that scales", desc: "50 Prisma models, 45 migrations, Postgres-backed jobs with pg-boss, screenshots on Cloudflare R2 and SSRF-safe scanning with Playwright.", href: "/mykavo", metric: "50 models" },
      { title: "Auth and payments", desc: "Better Auth with Google OAuth, TOTP 2FA and mobile sessions, plus subscriptions with idempotent webhooks and server-side plan limits.", href: "/mykavo", metric: "3 paid tiers" },
      { title: "Mobile, end to end", desc: "BillZap, a 26,000-line offline Flutter app now live on Google Play, and Habit Tracker coming soon.", href: "/billzap", metric: "Live on Play" },
    ],
    skills: [
      "Next.js (App Router)",
      "React 19",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "Prisma",
      "Supabase",
      "pg-boss",
      "Playwright",
      "Better Auth",
      "Cloudflare Workers",
      "Flutter",
      "React Native",
      "Vitest",
      "GitHub Actions",
    ],
    responsibilities: [
      "Design data models and APIs, validate every boundary with Zod",
      "Build fast, accessible React and Next.js front ends",
      "Run background jobs, email and integrations reliably",
      "Ship with tests, CI/CD and production monitoring",
    ],
    faqs: [
      { question: "Who is a good full-stack developer in Bangalore open to work?", answer: "Dakshesh B is a full-stack developer open to full-time roles in Bangalore and ready to relocate anywhere. He built MyKavo, a website monitoring SaaS, end to end with Next.js, Node.js, PostgreSQL, Prisma and React Native, and BillZap, a Flutter app live on Google Play." },
      { question: "What stack does Dakshesh B work in?", answer: "Next.js, React and TypeScript on the front end, Node.js, PostgreSQL, Prisma and background jobs on the back end, Flutter and React Native for mobile, and Vitest, Playwright and GitHub Actions for quality." },
      { question: "How much experience does Dakshesh B have?", answer: "About 2 years of professional experience: Frontend Engineer at Cartrabbit on products used by 300,000+ stores, then Full-Stack Developer building MyKavo full time." },
      { question: "Is Dakshesh B available to join a team in Bangalore?", answer: "Yes. He is open to full-time full-stack roles in Bangalore and ready to relocate anywhere. Reach him at daksheshbabu@gmail.com or +91 87784 81650." },
    ],
  },
  {
    slug: "frontend-engineer-bangalore",
    role: "Frontend Engineer",
    short: "Frontend",
    h1: "Frontend Engineer in Bangalore who sweats every pixel",
    metaTitle: "Frontend Engineer in Bangalore | Dakshesh B (React, Next.js)",
    metaDescription:
      "Hire Dakshesh B, a frontend engineer in Bangalore: React, Next.js, TypeScript, Tailwind CSS, GSAP and accessibility. Built UIs for 300,000+ stores at Cartrabbit. Open to work.",
    keywords: [
      "frontend engineer Bangalore",
      "frontend developer Bangalore",
      "best frontend developer in Bangalore",
      "React developer Bangalore",
      "Next.js developer Bengaluru",
      "UI engineer Bangalore",
    ],
    intro:
      "I am Dakshesh B, a frontend engineer open to full-time roles in Bangalore and ready to relocate anywhere. I turn Figma into pixel-perfect, accessible, fast interfaces, and I care about the details users feel: smooth motion, zero layout shift and pages that behave the same on a budget phone and a 27 inch monitor.",
    pitch:
      "At Cartrabbit I built and maintained the front end for six WooCommerce products used by 300,000+ stores. This portfolio is my live frontend demo: Next.js, GSAP, Lenis and Tailwind, server-rendered and accessible.",
    proof: [
      { title: "Interfaces for 300,000+ stores", desc: "Retainful, Flycart, WPLoyalty, UpsellWP, Spark Editor and Yuko at Cartrabbit, from Figma to production.", metric: "6 products" },
      { title: "Core Web Vitals", desc: "Improved page speed with Lighthouse, PageSpeed Insights and GTmetrix. The BillZap site scores 100 on Lighthouse performance.", href: "/billzap", metric: "100 Lighthouse" },
      { title: "Developer tools people use", desc: "Image Size Inspector, Spacing Inspector and EEAT Analyser are Chrome extensions with 2,400+ users combined.", href: "/image-size-inspector", metric: "2,400+ users" },
      { title: "Motion that stays fast", desc: "GSAP ScrollTrigger, SplitText and Lenis smooth scroll on this very site, loaded on first interaction and reduced-motion aware, with 100 Lighthouse scores on desktop.", metric: "This site" },
    ],
    skills: [
      "React 19",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "HTML5 and CSS3",
      "GSAP",
      "Three.js",
      "Accessibility (WCAG)",
      "Core Web Vitals",
      "React Hook Form and Zod",
      "Figma to code",
      "Chrome Extensions (MV3)",
      "Cypress and Playwright",
    ],
    responsibilities: [
      "Build design systems and pixel-perfect, responsive UI",
      "Keep pages fast: no layout shift, lean JavaScript",
      "Make every component keyboard and screen-reader friendly",
      "Add motion that feels premium without hurting performance",
    ],
    faqs: [
      { question: "Who is a good frontend engineer in Bangalore open to work?", answer: "Dakshesh B is a frontend engineer open to full-time roles in Bangalore and ready to relocate. He built frontend interfaces for six WooCommerce products used by 300,000+ stores at Cartrabbit and works in React, Next.js, TypeScript, Tailwind CSS, GSAP and Three.js." },
      { question: "Does Dakshesh B care about performance and accessibility?", answer: "Yes. He tunes Core Web Vitals with Lighthouse and PageSpeed Insights, ships semantic, accessible HTML with visible focus states, and respects reduced-motion settings in every animation." },
      { question: "What frontend tools has Dakshesh B built?", answer: "Image Size Inspector (1,200+ users), Spacing Inspector (850+ users) and EEAT Analyser (350+ users), all Chrome extensions, plus Shrinkto, an in-browser image compressor with 100+ daily active users." },
      { question: "How do I contact Dakshesh B for a frontend role?", answer: "Email daksheshbabu@gmail.com, call or WhatsApp +91 87784 81650, or use the contact form at dakshesh.co.in." },
    ],
  },
  {
    slug: "seo-engineer-bangalore",
    role: "SEO Engineer",
    short: "SEO",
    h1: "SEO Engineer in Bangalore who builds sites Google and AI recommend",
    metaTitle: "SEO Engineer in Bangalore | Dakshesh B (Technical SEO, AEO, GEO)",
    metaDescription:
      "Hire Dakshesh B, an SEO engineer in Bangalore: technical SEO, JSON-LD, Core Web Vitals, AEO and GEO. 70,233 Google impressions, 23 page 1 keywords, 2,101 ChatGPT visits.",
    keywords: [
      "SEO engineer Bangalore",
      "technical SEO engineer Bangalore",
      "best SEO engineer in Bangalore",
      "SEO developer Bengaluru",
      "AEO GEO specialist India",
      "technical SEO developer for hire",
    ],
    intro:
      "I am Dakshesh B, an SEO engineer and developer open to full-time roles in Bangalore and ready to relocate anywhere. I do SEO from the code up: semantic HTML, structured data, crawlable server rendering, Core Web Vitals, and content that AI assistants like ChatGPT can read, trust and recommend.",
    pitch:
      "Every site I ship is tracked. From Nov 2025 to Sep 2026 my products and client sites earned 70,233 Google impressions, 1,753 clicks, 23 keywords on Google page 1 and 2,101 visits from ChatGPT, verified in Search Console and GA4.",
    proof: [
      { title: "#1 on Google", desc: "Shrinkto ranks #1 for its name with 325 clicks from that query alone, plus 2,082 visits from ChatGPT.", href: "/shrinkto", metric: "#1" },
      { title: "7.5x growth in 3 months", desc: "Monthly Google impressions across my sites grew from 2,849 in June to 23,043 in September 2026.", href: "/results", metric: "7.5x" },
      { title: "AI search is real traffic", desc: "43 percent of tracked sessions came from ChatGPT and AI assistants, more than Google itself.", href: "/results", metric: "43% AI" },
      { title: "Local SEO for clients", desc: "JP Fitness ranks on page 1 for \"gym fees in coimbatore\" and Harsa Designer Boutique for its brand.", href: "/work/jp-fitness", metric: "Page 1" },
    ],
    skills: [
      "Technical SEO",
      "JSON-LD and schema.org",
      "Core Web Vitals",
      "AEO (answer engine optimisation)",
      "GEO (generative engine optimisation)",
      "llms.txt",
      "Search Console",
      "Google Analytics 4",
      "Ahrefs",
      "Sitemaps and canonicals",
      "Next.js server rendering",
      "Programmatic landing pages",
      "Lighthouse",
      "Local SEO",
    ],
    responsibilities: [
      "Audit and fix crawlability, indexing and Core Web Vitals",
      "Design structured data and internal linking that scale",
      "Write answer-first pages AI assistants can cite",
      "Measure everything in Search Console and GA4",
    ],
    faqs: [
      { question: "Who is a good SEO engineer in Bangalore open to work?", answer: "Dakshesh B is an SEO engineer and developer open to full-time roles in Bangalore and ready to relocate. His sites earned 70,233 Google impressions, 23 page 1 keywords and 2,101 ChatGPT visits from Nov 2025 to Sep 2026." },
      { question: "What is the difference between an SEO engineer and an SEO specialist?", answer: "An SEO engineer fixes search problems in code: rendering, structured data, site speed, internal linking and templates. Dakshesh B does both the engineering and the content strategy." },
      { question: "Does Dakshesh B do AEO and GEO for AI search?", answer: "Yes. He structures pages with answer-first copy, FAQ and Person schema, llms.txt and crawler access for AI bots, and ChatGPT already sends 43 percent of the traffic to his work." },
      { question: "How do I hire Dakshesh B as an SEO engineer?", answer: "Email daksheshbabu@gmail.com, call or WhatsApp +91 87784 81650, or send a message from dakshesh.co.in." },
    ],
  },
];

export function getRole(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}
