import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Smartphone,
  Gauge,
  Webhook,
  Boxes,
  GitBranch,
  Sparkles,
  Radar,
  Receipt,
  ImageDown,
  Ruler,
  Timer,
  Search,
  Lock,
  Music,
  Scaling,
  Dumbbell,
  Scissors,
} from "lucide-react";

/* ----------------------------- Skills ----------------------------- */

export type SkillGroup = {
  id: string;
  title: string;
  icon: LucideIcon;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "core-frontend",
    title: "Core Frontend",
    icon: Code2,
    skills: [
      "HTML5 (semantic, ARIA)",
      "CSS3 (Flexbox, Grid, animations)",
      "JavaScript (ES6+, vanilla, DOM, events)",
      "jQuery",
    ],
  },
  {
    id: "responsive-ui",
    title: "Responsive and UI",
    icon: Smartphone,
    skills: [
      "Responsive, mobile-first",
      "Bootstrap",
      "Tailwind CSS",
      "Pixel-perfect from Figma",
    ],
  },
  {
    id: "performance-seo",
    title: "Performance and SEO",
    icon: Gauge,
    skills: ["Core Web Vitals", "On-page SEO", "Lighthouse audits"],
  },
  {
    id: "apis",
    title: "APIs and Integrations",
    icon: Webhook,
    skills: ["REST APIs", "JSON", "Webhooks", "Payment gateways"],
  },
  {
    id: "platforms",
    title: "Platforms",
    icon: Boxes,
    skills: [
      "WordPress and WooCommerce (themes, hooks, filters)",
      "Elementor and Divi",
      "Chrome Extensions (Manifest V3)",
      "Flutter and Dart",
      "PHP",
      "SQL and MySQL",
    ],
  },
  {
    id: "tools",
    title: "Tools and Workflow",
    icon: GitBranch,
    skills: ["Git and GitHub", "Pull requests and code review"],
  },
  {
    id: "ai",
    title: "AI-assisted Development",
    icon: Sparkles,
    skills: ["Claude Code", "Cursor"],
  },
];

/* ----------------------------- Products ----------------------------- */

export type Product = {
  /** Also the top-level route slug, e.g. /billzap */
  id: string;
  name: string;
  description: string;
  url: string;
  icon: LucideIcon;
  soon?: boolean;
  /** Custom text for the "soon" badge, e.g. "Play Store soon". */
  soonLabel?: string;
  /** One of the main products I actively build and grow (shown first). */
  focus?: boolean;
  /** Real brand mark in /public, used instead of the icon where available. */
  logo?: string;
  /** Flagship SaaS product, highlighted across the site. */
  featured?: boolean;
};

export const products: Product[] = [
  // Main focus, in priority order.
  {
    id: "mykavo",
    name: "MyKavo",
    description: "Website change detection and monitoring SaaS.",
    url: "https://mykavo.app/",
    icon: Radar,
    logo: "/images/logos/mykavo.png",
    featured: true,
    focus: true,
  },
  {
    id: "shrinkto",
    name: "Shrinkto",
    description: "Compress images to an exact file size, in the browser.",
    url: "https://shrinkto.com/",
    icon: ImageDown,
    focus: true,
  },
  {
    id: "image-size-inspector",
    name: "Image Size Inspector",
    description: "Chrome extension to inspect any image size instantly.",
    url: "https://imageinspect.netlify.app/",
    icon: Scaling,
    focus: true,
  },
  {
    id: "spacing-inspector",
    name: "Spacing Inspector",
    description: "Chrome extension to measure element spacing.",
    url: "https://spacinginspector.netlify.app/",
    icon: Ruler,
    focus: true,
  },
  {
    id: "eeat-analyser",
    name: "EEAT Analyser",
    description: "SEO E-E-A-T audit tool.",
    url: "https://eeatanalyser.netlify.app/",
    icon: Search,
    focus: true,
  },
  {
    id: "billzap",
    name: "BillZap",
    description: "Voice GST billing app for India, coming to Google Play.",
    url: "https://billzap.netlify.app/",
    icon: Receipt,
    soon: true,
    soonLabel: "Play Store soon",
    focus: true,
  },
  // Earlier side projects.
  {
    id: "focuslens",
    name: "FocusLens",
    description: "Chrome productivity tracker.",
    url: "https://focuslens-productivity-tracker.netlify.app/",
    icon: Timer,
  },
  {
    id: "designlock",
    name: "DesignLock",
    description: "WordPress plugin to lock down designs.",
    url: "https://designlock.netlify.app/",
    icon: Lock,
  },
  {
    id: "melody-flow",
    name: "Melody Flow",
    description: "Offline music app for Android.",
    url: "https://melody-flow-player.netlify.app/",
    icon: Music,
    soon: true,
  },
];

export const focusProducts = products.filter((p) => p.focus);
export const otherProducts = products.filter((p) => !p.focus);

/* ----------------------------- Projects ----------------------------- */

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  impact: string[];
  stack: string[];
  liveUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
  icon: LucideIcon;
  thumbnail: string;
  thumbnailAlt: string;
  focusKeyword: string;
  metaTitle: string;
  metaDescription: string;
  // schema.org type used on the case-study page.
  schemaType: "WebSite" | "SoftwareApplication" | "MobileApplication";
  /** Short label for the kind of business, shown on cards. */
  category: string;
  /** Marks a recent client. */
  isNew?: boolean;
};

export const projects: Project[] = [
  {
    slug: "jp-fitness",
    title: "JP Fitness",
    tagline: "Fast, SEO-optimised gym business website.",
    summary:
      "A marketing site for a local gym, built with React, Next.js and Tailwind CSS, with Lucide icons. The focus was speed, clean on-page SEO and turning visitors into walk-ins and calls.",
    impact: [
      "Served WebP images and deferred the map load to keep the page light and fast.",
      "Added Open Graph and Twitter tags so shared links look right on every platform.",
      "Click-to-WhatsApp and click-to-call CTAs to convert mobile visitors quickly.",
    ],
    stack: ["React", "Next.js", "Tailwind CSS", "Lucide", "SEO"],
    liveUrl: "https://jpfitness.co.in",
    liveLabel: "jpfitness.co.in",
    icon: Dumbbell,
    thumbnail: "/images/projects/jp-fitness.svg",
    thumbnailAlt: "JP Fitness gym website home page on a laptop screen",
    focusKeyword: "JP Fitness website",
    metaTitle: "JP Fitness Website Case Study | Dakshesh B",
    metaDescription:
      "How I built JP Fitness, a fast and SEO-optimised gym website with WebP images, deferred map loading and click-to-call CTAs. A case study by Dakshesh B.",
    schemaType: "WebSite",
    category: "Gym business website",
  },
  {
    slug: "harsa-designer-boutique",
    title: "Harsa Designer Boutique",
    tagline: "A local-SEO website for a designer boutique in RS Puram, Coimbatore.",
    summary:
      "A website for a designer boutique in RS Puram, Coimbatore, offering blouse stitching, bridal blouse design, aari work and customised outfits. The goal was simple: be found by women searching for a boutique in Coimbatore, show the work beautifully, and make it one tap to enquire.",
    impact: [
      "A dedicated page for every service (blouse stitching, bridal blouse design, aari work, customised outfits), each targeting its own local search.",
      "Local SEO blog content for searches like the best designer boutiques in Coimbatore and RS Puram.",
      "A gallery, FAQ and contact page built to turn browsing into WhatsApp and call enquiries, tracked in GA4.",
    ],
    stack: ["Website design", "Local SEO", "Content", "GA4", "Search Console"],
    liveUrl: "https://harshdesignerboutique.com/",
    liveLabel: "harshdesignerboutique.com",
    icon: Scissors,
    thumbnail: "/images/projects/harsa-designer-boutique.svg",
    thumbnailAlt: "Harsa Designer Boutique website preview",
    focusKeyword: "Harsa Designer Boutique website",
    metaTitle: "Harsa Designer Boutique Website Case Study | Dakshesh B",
    metaDescription:
      "How I built a local-SEO website for Harsa Designer Boutique in RS Puram, Coimbatore: service pages, local blog content and one-tap enquiries. A case study by Dakshesh B.",
    schemaType: "WebSite",
    category: "Designer boutique website",
    isNew: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/* ----------------------------- Hero typing ----------------------------- */

export type HeroProduct = { name: string; color: string };

/**
 * Products cycled through in the hero typewriter: the six products I actively
 * build and grow, MyKavo first (its brand yellow darkened to amber for
 * contrast on the light hero).
 */
export const heroProducts: HeroProduct[] = [
  { name: "MyKavo", color: "#B45309" },
  { name: "Shrinkto", color: "#0D9488" },
  { name: "Image Size Inspector", color: "#0891B2" },
  { name: "Spacing Inspector", color: "#4F46E5" },
  { name: "EEAT Analyser", color: "#D97706" },
  { name: "BillZap", color: "#0F9D58" },
];
