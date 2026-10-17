/**
 * Site-wide config and the canonical personal data for Dakshesh B.
 * This is the single source of truth used by metadata, JSON-LD, llms.txt and
 * the UI. No em dashes or en dashes anywhere in copy: use a plain hyphen.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://dakshesh.co.in"
).replace(/\/$/, "");

/** Last meaningful content update, used for dateModified and sitemap. */
export const LAST_UPDATED = "2026-10-17";

export const person = {
  name: "Dakshesh B",
  firstName: "Dakshesh",
  role: "Full-Stack Developer",
  /** The three roles the site is built to rank for, in priority order. */
  roles: ["Full-Stack Developer", "Frontend Engineer", "SEO Engineer"],
  headline:
    "Full-Stack Developer, Frontend Engineer and SEO Engineer in Bangalore",
  tagline:
    "I design, build and grow fast web products that rank on Google and get recommended by AI.",
  summary:
    "Full-Stack Developer with 2 years of professional experience building production web and mobile applications. I designed, built and run MyKavo, a live website monitoring SaaS (Next.js, Node.js, PostgreSQL, React Native, Chrome extension), and BillZap, an offline GST billing app published on Google Play. Before that I built frontend interfaces for six WooCommerce products used by 300,000+ stores at Cartrabbit. I am strong in React and Next.js, REST API and database design, background jobs, authentication and payments, browser automation and technical SEO.",
  location: "Bangalore, India",
  city: "Bengaluru",
  cityAlt: "Bangalore",
  region: "Karnataka",
  country: "IN",
  availability: "Open to full-time roles in Bangalore. Ready to relocate anywhere.",
  email: "daksheshbabu@gmail.com",
  phone: "+91 87784 81650",
  phoneHref: "+918778481650",
  image: "/images/dakshesh-b-portrait.jpg",
  imageWidth: 1086,
  imageHeight: 1448,
  resume: "/dakshesh-b-full-stack-developer-resume.pdf",
} as const;

export const WHATSAPP_URL =
  "https://wa.me/918778481650?text=Hi%20Dakshesh%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20talk.";

export const socials = {
  github: "https://github.com/dakshu007",
  linkedin: "https://www.linkedin.com/in/daksheshb/",
  linkedinOld: "https://www.linkedin.com/in/dakshesh-b-wordpress-developer/",
  wordpress: "https://profiles.wordpress.org/dakshu007/",
  playDeveloper:
    "https://play.google.com/store/apps/developer?id=Dakshesh+B",
  oldSite1: "https://daksheshb.netlify.app/",
  oldSite2: "https://dakshesh-dev.netlify.app/",
} as const;

/** All profiles that represent the same person, for schema.org sameAs. */
export const sameAs = [
  socials.linkedin,
  socials.github,
  socials.wordpress,
  socials.playDeveloper,
  socials.linkedinOld,
  socials.oldSite1,
  socials.oldSite2,
];

export type Job = {
  title: string;
  company: string;
  companyUrl: string;
  logo: string;
  period: string;
  start: string;
  end?: string;
  location: string;
  summary: string;
  stack?: string[];
  highlights: string[];
};

export const jobs: Job[] = [
  {
    title: "Full-Stack Developer and Founder",
    company: "MyKavo",
    companyUrl: "https://mykavo.app/",
    logo: "/images/logos/mykavo.png",
    period: "Aug 2026 - Present",
    start: "2026-08",
    location: "Remote, India",
    summary:
      "Website change and regression monitoring SaaS for agencies and site owners. I designed, built and run it end to end.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Playwright",
      "React Native",
    ],
    highlights: [
      "Architected a pnpm monorepo of 4 apps and 7 shared packages: a Next.js App Router web app (95 pages, 115 API routes), a Node.js worker, an Expo app and a Chrome MV3 extension, across 230+ commits.",
      "Built the monitoring engine: a Playwright headless Chromium scanner with SSRF-safe URL validation, DOM normalisation, pixel-level visual diffing, Lighthouse audits and a rules-based severity engine.",
      "Designed a 50-model PostgreSQL schema with Prisma and 45 migrations, with scans, schedulers and email sweeps running as Postgres-backed background jobs (pg-boss).",
      "Implemented auth and billing: Better Auth (Google OAuth, TOTP 2FA, mobile sessions) and Dodo Payments subscriptions with idempotent webhooks across Free, Pro and Agency plans.",
      "Drove SEO-led growth: landing-page architecture, a blog CMS, JSON-LD, free SEO tools and AI answer engine optimisation, to 36.6K Google impressions and 25 active users in 3 months.",
      "Kept quality high with about 1,600 Vitest unit tests, Zod validation at every API boundary and CI/CD deploys.",
    ],
  },
  {
    title: "Frontend Engineer",
    company: "Cartrabbit",
    companyUrl: "https://cartrabbit.io/",
    logo: "/images/cartrabbit-logo.svg",
    period: "Nov 2024 - Aug 2026",
    start: "2024-11",
    end: "2026-08",
    location: "Coimbatore, India",
    summary:
      "WooCommerce product company. I built and maintained the front end for six production products serving 300,000+ stores.",
    stack: ["HTML5", "CSS3", "JavaScript", "PHP", "WordPress", "REST APIs"],
    highlights: [
      "Built and maintained interfaces for Retainful, Flycart, WPLoyalty, UpsellWP, Spark Editor and Yuko, used by 300,000+ stores.",
      "Converted Figma designs into pixel-perfect, responsive, cross-browser interfaces, and integrated REST APIs, payment gateways and webhooks.",
      "Improved Core Web Vitals and page speed with Lighthouse, PageSpeed Insights and GTmetrix, and tracked rankings and site health in Ahrefs.",
      "Built n8n workflow automations and owned pull requests from code review through QA in an Agile team.",
    ],
  },
];

export const education = {
  degree: "B.E. Computer Science and Engineering",
  school: "Dr. N.G.P. Institute of Technology (Anna University)",
  schoolUrl: "https://www.drngpit.ac.in/",
  location: "Coimbatore",
  period: "2021 - 2025",
};

/**
 * Live experience counter, counted from October 2024. It recomputes on the
 * client from the visitor's date, so it stays current without a redeploy.
 */
export const EXPERIENCE_START_YEAR = 2024;
export const EXPERIENCE_START_MONTH = 9; // October, 0-based

export function experienceMonths(now: Date = new Date()): number {
  const months =
    (now.getFullYear() - EXPERIENCE_START_YEAR) * 12 +
    (now.getMonth() - EXPERIENCE_START_MONTH);
  return Math.max(0, months);
}

/** "2 yrs", "2 yrs 3 mo" */
export function experienceLabel(now: Date = new Date()): string {
  const months = experienceMonths(now);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest} mo`;
  return rest === 0 ? `${years} yrs` : `${years} yrs ${rest} mo`;
}
