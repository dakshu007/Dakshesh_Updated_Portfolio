/**
 * Site-wide config and the canonical personal data for Dakshesh B.
 * This is the single source of truth used by metadata, JSON-LD and the UI.
 * No em dashes or en dashes anywhere in copy: use a plain hyphen.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://dakshesh.co.in"
).replace(/\/$/, "");

export const person = {
  name: "Dakshesh B",
  firstName: "Dakshesh",
  role: "Frontend Web Developer",
  altRole: "Web Engineer",
  tagline:
    "I build fast, accessible, high-performance interfaces and ship full web products end to end.",
  summary:
    "Frontend web developer with around two years of experience building responsive, accessible and high-performance interfaces with HTML, CSS and modern JavaScript. I work as a Web Engineer at Cartrabbit, where I help maintain six production WooCommerce products serving more than 300,000 stores. I also build with Flutter and Dart, and ship full stack products end to end.",
  location: "Kotagiri, India",
  locationNote: "Remote friendly",
  email: "daksheshbabu@gmail.com",
  phone: "+91 87784 81650",
  phoneHref: "+918778481650",
  // WhatsApp click-to-chat with a friendly pre-filled first line.
  whatsapp:
    "https://wa.me/918778481650?text=" +
    encodeURIComponent(
      "Hi Dakshesh, I saw your portfolio and I would like to discuss a project."
    ),
  responseTime: "within 24 hours",
  // Profile photo lives in /public/images.
  image: "/images/dakshesh-b-portrait.jpg",
  imageWidth: 1086,
  imageHeight: 1448,
} as const;

export const socials = {
  github: "https://github.com/dakshu007",
  linkedin: "https://www.linkedin.com/in/dakshesh-b-wordpress-developer/",
  // Old sites kept for sameAs / 301 history.
  oldSite1: "https://daksheshb.netlify.app/",
  oldSite2: "https://dakshesh-dev.netlify.app/",
} as const;

/** All profiles that represent the same person, for schema.org sameAs. */
export const sameAs = [
  socials.github,
  socials.linkedin,
  socials.oldSite1,
  socials.oldSite2,
];

export const experience = {
  company: "Cartrabbit",
  companyUrl: "https://cartrabbit.io/",
  title: "Web Engineer and Developer",
  period: "Nov 2024 - Present",
  location: "Coimbatore, India",
  summary:
    "Cartrabbit is a WooCommerce product company. I develop and maintain the front end for six production products used by more than 300,000 stores.",
  highlights: [
    "Develop and maintain the front end for six production WooCommerce products: Retainful, Flycart, WPLoyalty, UpsellWP, Spark Editor and Yuko.",
    "Ship pixel-perfect, responsive interfaces from Figma using semantic HTML, modern CSS and vanilla JavaScript.",
    "Tune Core Web Vitals and on-page SEO so product pages load fast and rank well.",
    "Work the full pull request flow: code review, payment gateway and REST API integration, and AI-assisted development with Claude Code and Cursor.",
  ],
} as const;

/** Headline metrics used in the count-up band. */
export const metrics = [
  { value: 300000, suffix: "+", label: "Stores served", caption: "across Cartrabbit products" },
  { value: 840, suffix: "+", label: "Extension users", caption: "across my Chrome extensions" },
  { value: 6, suffix: "", label: "Products maintained", caption: "in production at Cartrabbit" },
  { value: 9, suffix: "", label: "Products shipped", caption: "built and launched end to end" },
] as const;

/**
 * Live experience counter. Anchored so that as of June 2026 it reads "1.8"
 * (1 year 8 months) and rolls forward one month on the 1st of each month:
 * 1.8 -> 1.9 -> 1.10 -> 1.11 -> 2.0 and so on. Computed from the current date,
 * so it updates on its own without a redeploy when viewed client-side.
 */
export const EXPERIENCE_START_YEAR = 2024;
export const EXPERIENCE_START_MONTH = 9; // October, 0-based

export function experienceLabel(now: Date = new Date()): string {
  let months =
    (now.getFullYear() - EXPERIENCE_START_YEAR) * 12 +
    (now.getMonth() - EXPERIENCE_START_MONTH);
  if (months < 0) months = 0;
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  return `${years}.${remainder}`;
}
