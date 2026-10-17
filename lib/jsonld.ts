import {
  SITE_URL,
  LAST_UPDATED,
  person,
  education,
  sameAs,
} from "./site";
import { skillGroups, products, mainProducts, type Project } from "./data";
import { productContent } from "./products-content";

/**
 * JSON-LD builders. Everything is server-rendered into a
 * <script type="application/ld+json"> tag so crawlers and AI agents
 * read it without running JavaScript. No em dashes in any string.
 */

export const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const MYKAVO_ID = `${SITE_URL}/#mykavo`;

const knowsAbout = Array.from(
  new Set([
    "Full-stack development",
    "Frontend engineering",
    "Search engine optimisation",
    "Technical SEO",
    "Answer engine optimisation",
    "Generative engine optimisation",
    "Web performance",
    "SaaS development",
    "Mobile app development",
    ...skillGroups.flatMap((group) => group.skills),
  ])
);

const bengaluru = {
  "@type": "City",
  name: "Bengaluru",
  alternateName: "Bangalore",
  containedInPlace: {
    "@type": "State",
    name: "Karnataka",
    containedInPlace: { "@type": "Country", name: "India" },
  },
};

const occupation = (name: string, skills: string[]) => ({
  "@type": "Occupation",
  name,
  occupationLocation: bengaluru,
  skills: skills.join(", "),
  experienceRequirements: "About 2 years of professional experience",
});

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: person.name,
    alternateName: ["Dakshesh", "Dakshesh Babu", "dakshu007"],
    givenName: person.firstName,
    jobTitle: person.headline,
    description: `${person.name} is a full-stack developer, frontend engineer and SEO engineer in Bangalore (Bengaluru), India. ${person.availability} He built MyKavo, a website monitoring SaaS on every platform, and BillZap, a GST billing app live on Google Play, and previously built frontend interfaces used by 300,000+ stores at Cartrabbit.`,
    url: `${SITE_URL}/`,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}${person.image}`,
      width: person.imageWidth,
      height: person.imageHeight,
    },
    email: `mailto:${person.email}`,
    telephone: person.phoneHref,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    homeLocation: bengaluru,
    nationality: { "@type": "Country", name: "India" },
    hasOccupation: [
      occupation("Full-Stack Developer", [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "Flutter",
      ]),
      occupation("Frontend Engineer", [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "GSAP",
        "Three.js",
        "Accessibility",
      ]),
      occupation("SEO Engineer", [
        "Technical SEO",
        "JSON-LD",
        "Core Web Vitals",
        "AEO",
        "GEO",
        "Search Console",
      ]),
    ],
    worksFor: { "@id": MYKAVO_ID },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.school,
      url: education.schoolUrl,
      address: { "@type": "PostalAddress", addressLocality: "Coimbatore", addressCountry: "IN" },
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: education.degree,
      recognizedBy: { "@type": "CollegeOrUniversity", name: education.school },
    },
    knowsAbout,
    knowsLanguage: ["English"],
    sameAs,
  };
}

export function mykavoOrgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": MYKAVO_ID,
    name: "MyKavo",
    url: "https://mykavo.app/",
    logo: `${SITE_URL}/images/logos/mykavo.png`,
    founder: { "@id": PERSON_ID },
    foundingDate: "2026",
    description: "Website change and regression monitoring SaaS.",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: `${person.name} Portfolio`,
    alternateName: "dakshesh.co.in",
    url: `${SITE_URL}/`,
    inLanguage: "en",
    description: `Portfolio of ${person.name}, ${person.headline}.`,
    publisher: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: `${SITE_URL}/`,
    name: `${person.name} - ${person.headline}`,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
    dateCreated: "2026-06-01",
    dateModified: LAST_UPDATED,
    inLanguage: "en",
  };
}

export function breadcrumbSchema(trail: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.title} website`,
    headline: project.metaTitle,
    description: project.metaDescription,
    url: `${SITE_URL}/work/${project.slug}`,
    image: `${SITE_URL}/work/${project.slug}/opengraph-image`,
    creator: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    about: {
      "@type": "WebSite",
      name: project.title,
      url: project.liveUrl,
    },
    dateModified: LAST_UPDATED,
  };
}

function appSchema(slug: string) {
  const product = products.find((p) => p.id === slug);
  const content = productContent[slug];
  if (!product || !content) return null;
  const price = content.price ?? { amount: "0", currency: "USD" };

  return {
    "@type": content.schemaType,
    "@id": `${SITE_URL}/${product.id}#app`,
    name: product.name,
    description: content.metaDescription,
    url: `${SITE_URL}/${product.id}`,
    image: `${SITE_URL}/${product.id}/opengraph-image`,
    applicationCategory: content.applicationCategory,
    operatingSystem: content.platform,
    featureList: content.features.map((f) => f.title),
    creator: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    ...(content.installUrl ? { installUrl: content.installUrl } : {}),
    offers: {
      "@type": "Offer",
      price: price.amount,
      priceCurrency: price.currency,
      ...(product.status === "soon"
        ? { availability: "https://schema.org/PreOrder" }
        : { availability: "https://schema.org/InStock" }),
    },
    sameAs: Array.from(new Set([product.url, product.site].filter(Boolean))),
  };
}

export function productSchema(slug: string) {
  const app = appSchema(slug);
  return app ? { "@context": "https://schema.org", ...app } : null;
}

/** Every main product as an ItemList, for the home page. */
export function productListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Products built by ${person.name}`,
    itemListElement: mainProducts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/${p.id}`,
      name: p.name,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}
