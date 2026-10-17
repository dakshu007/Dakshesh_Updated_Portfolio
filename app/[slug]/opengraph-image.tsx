import { products, getProduct } from "@/lib/data";
import { getProductContent } from "@/lib/products-content";
import { ogCard, ogSize } from "@/lib/og";

export const alt = "A product built by Dakshesh B";
export const size = ogSize;
export const contentType = "image/png";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  const content = getProductContent(slug);
  return ogCard({
    eyebrow: content?.category ?? "Product",
    title: product?.name ?? "Dakshesh B",
    subtitle: content?.tagline ?? "Built by Dakshesh B",
    accent: product?.brand.to ?? "#2B4BF2",
  });
}
