import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { products } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...products.map((product) => ({
      url: `${SITE_URL}/${product.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/work/jp-fitness`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
