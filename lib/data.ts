import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Server,
  Smartphone,
  KeyRound,
  FlaskConical,
  Search,
  Wrench,
  Layout,
  Radar,
  Receipt,
  ImageDown,
  Ruler,
  Timer,
  Lock,
  Music,
  Scaling,
  Dumbbell,
  Flame,
  Shirt,
  BadgeCheck,
} from "lucide-react";

/* ----------------------------- Skills ----------------------------- */

export type SkillGroup = {
  id: string;
  title: string;
  icon: LucideIcon;
  skills: string[];
};

/** Straight from the resume, grouped by what they do. */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Layout,
    skills: [
      "React 19",
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "GSAP and Three.js",
      "React Hook Form and Zod",
      "Accessibility (WCAG)",
      "Pixel-perfect from Figma",
    ],
  },
  {
    id: "backend",
    title: "Backend and data",
    icon: Server,
    skills: [
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "Prisma",
      "Supabase and Neon",
      "pg-boss background jobs",
      "Cloudflare Workers and R2",
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    icon: Smartphone,
    skills: [
      "Flutter and Dart",
      "Riverpod and Hive",
      "React Native and Expo",
      "Android builds",
      "Google Play releases",
    ],
  },
  {
    id: "auth",
    title: "Auth and payments",
    icon: KeyRound,
    skills: [
      "Better Auth",
      "OAuth 2.0 and 2FA",
      "Dodo Payments",
      "UPI QR",
      "Resend and Brevo email",
    ],
  },
  {
    id: "seo",
    title: "SEO and AI search",
    icon: Search,
    skills: [
      "Technical SEO",
      "JSON-LD structured data",
      "Core Web Vitals",
      "AEO and GEO (AI answer engines)",
      "llms.txt",
      "Search Console and GA4",
      "Ahrefs",
    ],
  },
  {
    id: "testing",
    title: "Testing and DevOps",
    icon: FlaskConical,
    skills: [
      "Vitest",
      "Playwright",
      "Cypress",
      "Lighthouse",
      "GitHub Actions CI/CD",
      "Netlify",
      "pnpm monorepos",
    ],
  },
  {
    id: "languages",
    title: "Languages",
    icon: Code2,
    skills: [
      "TypeScript",
      "JavaScript (ES6+)",
      "Dart",
      "SQL",
      "PHP",
      "Python",
      "HTML5 and CSS3",
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: Wrench,
    skills: [
      "Claude Code",
      "Cursor",
      "n8n",
      "Figma",
      "Swagger",
      "Git and GitHub",
      "WordPress and WooCommerce",
      "Chrome Extensions (MV3)",
    ],
  },
];

/* ----------------------------- Products ----------------------------- */

export type ProductStatus = "live" | "new" | "soon";

export type Product = {
  /** Also the top-level route slug, e.g. /billzap */
  id: string;
  name: string;
  description: string;
  /** Primary external destination (Play Store for BillZap). */
  url: string;
  urlLabel: string;
  /** Marketing site, when different from url. */
  site?: string;
  icon: LucideIcon;
  category: string;
  status: ProductStatus;
  statusLabel: string;
  /** The headline achievement shown in the carousel. */
  achievement: { value: string; label: string };
  /** Brand colours for the card. */
  brand: { from: string; to: string; ink: string };
  logo?: string;
  /** Exclusive products get the premium dark card. */
  exclusive?: boolean;
  /** Earlier side projects, kept as pages but out of the main carousel. */
  legacy?: boolean;
};

export const products: Product[] = [
  {
    id: "mykavo",
    name: "MyKavo",
    description:
      "Website change and regression monitoring SaaS. Know what changed, fix what matters.",
    url: "https://mykavo.app/",
    urlLabel: "mykavo.app",
    icon: Radar,
    category: "SaaS · on every platform",
    status: "live",
    statusLabel: "Live",
    achievement: { value: "25", label: "active users in just 3 months" },
    brand: { from: "#FACC15", to: "#F59E0B", ink: "#0A0B10" },
    logo: "/images/logos/mykavo.png",
    exclusive: true,
  },
  {
    id: "habit-tracker",
    name: "Habit Tracker",
    description:
      "A calm, beautiful Android habit app with illustrated cards, forgiving streaks, GPS runs and sleep tracking.",
    url: "https://habbit-track-daily.netlify.app/",
    urlLabel: "habbit-track-daily.netlify.app",
    icon: Flame,
    category: "Android app",
    status: "soon",
    statusLabel: "Coming soon",
    achievement: { value: "Soon", label: "on Google Play, now in testing" },
    brand: { from: "#38BDF8", to: "#818CF8", ink: "#0A0B10" },
    exclusive: true,
  },
  {
    id: "billzap",
    name: "BillZap",
    description:
      "Free offline GST billing app for Indian shops. Invoice in 30 seconds, UPI QR, WhatsApp share.",
    url: "https://play.google.com/store/apps/details?id=com.billzap.app",
    urlLabel: "Google Play",
    site: "https://billzap.app/",
    icon: Receipt,
    category: "Android app",
    status: "new",
    statusLabel: "Live on Google Play",
    achievement: { value: "Live", label: "just released on Google Play" },
    brand: { from: "#22C55E", to: "#059669", ink: "#052E16" },
  },
  {
    id: "shrinkto",
    name: "Shrinkto",
    description:
      "Compress JPG, PNG, WebP and AVIF to an exact KB size, privately in the browser.",
    url: "https://shrinkto.com/",
    urlLabel: "shrinkto.com",
    icon: ImageDown,
    category: "Web app",
    status: "live",
    statusLabel: "Live",
    achievement: { value: "100+", label: "daily active users" },
    brand: { from: "#2DD4BF", to: "#0D9488", ink: "#042F2E" },
  },
  {
    id: "image-size-inspector",
    name: "Image Size Inspector",
    description:
      "Right-click any image to see its real size, file size, format, palette and alt text.",
    url: "https://imageinspect.netlify.app/",
    urlLabel: "imageinspect.netlify.app",
    icon: Scaling,
    category: "Chrome extension",
    status: "live",
    statusLabel: "Live",
    achievement: { value: "1,000+", label: "users, rated 5.0 on Chrome" },
    brand: { from: "#22D3EE", to: "#0891B2", ink: "#083344" },
  },
  {
    id: "spacing-inspector",
    name: "Spacing Inspector",
    description:
      "Hover any element to see its CSS margin and padding, measured live on the page.",
    url: "https://chromewebstore.google.com/detail/spacing-inspector/ppnnhboeiefjhloholfbahddldadcjmk",
    urlLabel: "Chrome Web Store",
    site: "https://spacinginspector.netlify.app/",
    icon: Ruler,
    category: "Chrome extension",
    status: "live",
    statusLabel: "Live",
    achievement: { value: "850+", label: "users on Chrome" },
    brand: { from: "#A78BFA", to: "#6D28D9", ink: "#2E1065" },
  },
  {
    id: "eeat-analyser",
    name: "EEAT Analyser",
    description:
      "Audit any page for Google's E-E-A-T signals with 70 checks and a ranked fix plan.",
    url: "https://eeatanalyser.netlify.app/",
    urlLabel: "eeatanalyser.netlify.app",
    icon: BadgeCheck,
    category: "Chrome extension",
    status: "live",
    statusLabel: "Live",
    achievement: { value: "350+", label: "users, rated 5.0 on Chrome" },
    brand: { from: "#FB923C", to: "#EA580C", ink: "#431407" },
  },
  {
    id: "focuslens",
    name: "FocusLens",
    description: "Chrome productivity tracker.",
    url: "https://focuslens-productivity-tracker.netlify.app/",
    urlLabel: "focuslens-productivity-tracker.netlify.app",
    icon: Timer,
    category: "Chrome extension",
    status: "live",
    statusLabel: "Earlier project",
    achievement: { value: "", label: "" },
    brand: { from: "#C4B5FD", to: "#7C3AED", ink: "#2E1065" },
    legacy: true,
  },
  {
    id: "designlock",
    name: "DesignLock",
    description: "WordPress plugin to lock down designs.",
    url: "https://designlock.netlify.app/",
    urlLabel: "designlock.netlify.app",
    icon: Lock,
    category: "WordPress plugin",
    status: "live",
    statusLabel: "Earlier project",
    achievement: { value: "", label: "" },
    brand: { from: "#93C5FD", to: "#2563EB", ink: "#172554" },
    legacy: true,
  },
  {
    id: "melody-flow",
    name: "Melody Flow",
    description: "Offline music app for Android.",
    url: "https://melody-flow-player.netlify.app/",
    urlLabel: "melody-flow-player.netlify.app",
    icon: Music,
    category: "Android app",
    status: "soon",
    statusLabel: "Earlier project",
    achievement: { value: "", label: "" },
    brand: { from: "#F9A8D4", to: "#DB2777", ink: "#500724" },
    legacy: true,
  },
];

export const mainProducts = products.filter((p) => !p.legacy);
export const legacyProducts = products.filter((p) => p.legacy);

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/* ----------------------------- Client work ----------------------------- */

export type Project = {
  slug: string;
  title: string;
  kind: string;
  tagline: string;
  summary: string;
  focus: string[];
  stack: string[];
  liveUrl: string;
  liveLabel: string;
  icon: LucideIcon;
  location: string;
  since: string;
  stats: { label: string; value: string }[];
  rankings: { query: string; position: number }[];
  metaTitle: string;
  metaDescription: string;
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "jp-fitness",
    title: "JP Fitness",
    kind: "Gym business website",
    tagline: "Fast, SEO-optimised gym website that ranks in Coimbatore.",
    summary:
      "A marketing site for a local gym in Kalapatti, Coimbatore, built with React, Next.js and Tailwind CSS. The focus was speed, clean on-page SEO and turning visitors into walk-ins, calls and WhatsApp enquiries.",
    focus: [
      "WebP images and a deferred map load to keep the page light and fast on budget phones.",
      "Local SEO for gym searches in Coimbatore, with structured data and Google Business ready pages.",
      "Open Graph and Twitter tags so shared links look right on every platform.",
      "Click-to-WhatsApp and click-to-call CTAs to convert mobile visitors quickly.",
    ],
    stack: ["React", "Next.js", "Tailwind CSS", "Local SEO", "GA4"],
    liveUrl: "https://jpfitness.co.in",
    liveLabel: "jpfitness.co.in",
    icon: Dumbbell,
    location: "Kalapatti, Coimbatore",
    since: "Nov 2025",
    stats: [
      { label: "Google impressions", value: "7,877" },
      { label: "Clicks from Google", value: "250" },
      { label: "Click rate", value: "3.2%" },
      { label: "Best ranking", value: "#3" },
    ],
    rankings: [
      { query: "jp fitness kalapatti", position: 3 },
      { query: "jp fitness coimbatore", position: 3 },
      { query: "jp fitness", position: 5 },
      { query: "gym fees in coimbatore", position: 5 },
      { query: "gym near me", position: 7 },
    ],
    metaTitle: "JP Fitness Website Case Study | Dakshesh B",
    metaDescription:
      "How Dakshesh B built JP Fitness, a fast, SEO-optimised gym website in Coimbatore that ranks on Google page 1 with 7,877 impressions and 250 clicks.",
    accent: "#EF4444",
  },
  {
    slug: "harsa-designer-boutique",
    title: "Harsa Designer Boutique",
    kind: "Designer boutique website",
    tagline: "A local-SEO website for a designer boutique in RS Puram.",
    summary:
      "A website for a designer boutique in RS Puram, Coimbatore, offering blouse stitching, bridal blouse design, aari work and customised outfits. The goal was simple: be found by women searching for a boutique in Coimbatore, show the work beautifully, and make it one tap to enquire.",
    focus: [
      "A dedicated page for every service (blouse stitching, bridal blouse design, aari work, customised outfits), each targeting its own local search.",
      "Local SEO blog content for searches like the best designer boutiques in Coimbatore and RS Puram.",
      "A gallery, FAQ and contact page built to turn browsing into WhatsApp and call enquiries, tracked in GA4.",
    ],
    stack: ["Next.js", "Tailwind CSS", "Local SEO", "Blog content", "GA4"],
    liveUrl: "https://harshdesignerboutique.com/",
    liveLabel: "harshdesignerboutique.com",
    icon: Shirt,
    location: "RS Puram, Coimbatore",
    since: "Aug 2026",
    stats: [
      { label: "Google impressions", value: "733" },
      { label: "Clicks from Google", value: "18" },
      { label: "Visitors", value: "149" },
      { label: "Visits from ChatGPT", value: "19" },
    ],
    rankings: [{ query: "harsa designer boutique", position: 3 }],
    metaTitle: "Harsa Designer Boutique Website Case Study | Dakshesh B",
    metaDescription:
      "How Dakshesh B built a local-SEO website for Harsa Designer Boutique in RS Puram, Coimbatore: service pages, local blog content and one-tap enquiries.",
    accent: "#DB2777",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/* ----------------------------- Hero ----------------------------- */

/** Words cycled in the hero headline. */
export const heroRoles = [
  "Full-Stack Developer",
  "Frontend Engineer",
  "SEO Engineer",
  "Product Builder",
];

/** Cartrabbit products, shown in the logo marquee. */
export const cartrabbitProducts = [
  { name: "Retainful", href: "https://www.retainful.com/", logo: "/images/logos/retainful.svg", color: "#F85C1B" },
  { name: "Flycart", href: "https://www.flycart.org/", logo: "/images/logos/flycart.svg", color: "#EA242B" },
  { name: "WPLoyalty", href: "https://wployalty.net/", logo: "/images/logos/wployalty.svg", color: "#4F47EB" },
  { name: "UpsellWP", href: "https://upsellwp.com/", logo: "/images/logos/upsellwp.svg", color: "#03337B" },
  { name: "Spark Editor", href: "https://sparkeditor.com/", logo: "/images/logos/spark.svg", color: "#165134" },
  { name: "Yuko", href: "https://yuko.so/", logo: "/images/logos/yuko.svg", color: "#6F65F8" },
];

/** Headline numbers, used in the hero and llms.txt. */
export const headlineStats = [
  { value: 300000, suffix: "+", label: "Stores using interfaces I built", short: "300k+" },
  { value: 2200, suffix: "+", label: "Chrome extension users", short: "2,200+" },
  { value: 70233, suffix: "", label: "Google impressions earned", short: "70K+" },
  { value: 130, suffix: "", label: "Countries reached", short: "130" },
];

/** "25 active users in just 3 months", or "Just released on Google Play". */
export function achievementText(p: Product): string {
  const { value, label } = p.achievement;
  if (/^[\d#]/.test(value)) return `${value} ${label}`;
  return label.charAt(0).toUpperCase() + label.slice(1);
}
