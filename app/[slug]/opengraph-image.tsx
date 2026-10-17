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
  const product = getProduct(slug)!;
  const content = getProductContent(slug);
  return ogCard({
    eyebrow: content?.category ?? "Product",
    title: product.name,
    subtitle: content?.tagline ?? product.description,
    accent: product.brand.to,
    product: {
      value: product.achievement.value || product.category.split(" ")[0],
      label: product.achievement.label || "An earlier side project",
      from: product.brand.from,
      to: product.brand.to,
      badge: product.exclusive ? "Exclusive" : product.statusLabel,
      ink: product.id === "mykavo" ? "#0A0B10" : undefined,
    },
  });
}
