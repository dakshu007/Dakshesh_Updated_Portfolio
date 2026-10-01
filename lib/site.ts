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
    "Frontend web developer with 1 year and 10 months of professional experience building responsive, accessible and high-performance interfaces with HTML, CSS and modern JavaScript. I was a Web Engineer at Cartrabbit until July 2026, maintaining the front end for six production WooCommerce products serving more than 300,000 stores. Today I work full time on MyKavo, my own website monitoring SaaS, and take on a few client websites alongside it.",
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

/** Current focus: building MyKavo full time. */
export const currentRole = {
  company: "MyKavo",
  companyUrl: "https://mykavo.app/",
  title: "Founder and Developer",
  period: "Aug 2026 - Present",
  location: "Kotagiri, India (remote)",
  summary:
    "After 1 year and 10 months at Cartrabbit, I now build MyKavo full time: a website change detection and monitoring SaaS I design, develop, market and run end to end.",
  highlights: [
    "Design and build the whole product: visual diffs, SEO, link, script and performance monitoring, alerts and billing.",
    "Run growth myself: the marketing site, technical SEO and content that took MyKavo from zero to tens of thousands of Google impressions.",
    "Take on a small number of client websites alongside, such as JP Fitness and Harsa Designer Boutique.",
  ],
} as const;

/** Previous role. Left on 31 July 2026 after 1 year 10 months. */
export const experience = {
  company: "Cartrabbit",
  companyUrl: "https://cartrabbit.io/",
  title: "Web Engineer and Developer",
  period: "Oct 2024 - Jul 2026",
  duration: "1 yr 10 mos",
  location: "Coimbatore, India",
  summary:
    "Cartrabbit is a WooCommerce product company. For 1 year and 10 months I developed and maintained the front end for six production products used by more than 300,000 stores.",
  highlights: [
    "Developed and maintained the front end for six production WooCommerce products: Retainful, Flycart, WPLoyalty, UpsellWP, Spark Editor and Yuko.",
    "Shipped pixel-perfect, responsive interfaces from Figma using semantic HTML, modern CSS and vanilla JavaScript.",
    "Tuned Core Web Vitals and on-page SEO so product pages loaded fast and ranked well.",
    "Worked the full pull request flow: code review, payment gateway and REST API integration, and AI-assisted development with Claude Code and Cursor.",
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
 * Professional experience shown in the hero. Fixed on purpose: 1 year and 10
 * months at Cartrabbit (Oct 2024 to 31 Jul 2026). Shown as "1.10 yrs".
 */
export const EXPERIENCE_LABEL = "1.10";
