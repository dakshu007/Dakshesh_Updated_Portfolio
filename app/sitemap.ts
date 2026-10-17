import type { MetadataRoute } from "next";
import { SITE_URL, LAST_UPDATED } from "@/lib/site";
import { products, projects } from "@/lib/data";
import { roles } from "@/lib/roles";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_UPDATED);
  const url = (path: string) => `${SITE_URL}${path}`;

  return [
    { url: url("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    ...roles.map((r) => ({
      url: url(`/${r.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: url("/results"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/about"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...products.map((p) => ({
      url: url(`/${p.id}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: p.legacy ? 0.5 : 0.8,
    })),
    ...projects.map((p) => ({
      url: url(`/work/${p.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
