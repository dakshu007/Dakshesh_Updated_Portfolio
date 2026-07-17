import { ImageResponse } from "next/og";
import { products } from "@/lib/data";
import { getProductContent } from "@/lib/products-content";

export const alt = "A product built by Dakshesh B";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  const content = getProductContent(slug);
  const name = product?.name ?? "Dakshesh B";
  const tagline = content?.tagline ?? "Frontend Web Developer";
  const category = content?.category ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAFAF7",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "#1A53F0",
              color: "#FFFFFF",
              fontSize: "32px",
              fontWeight: 800,
            }}
          >
            D
          </div>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#0A0A0A" }}>
            dakshesh.co.in
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {category ? (
            <div
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#1A53F0",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {category}
            </div>
          ) : null}
          <div
            style={{
              fontSize: "92px",
              fontWeight: 800,
              color: "#0A0A0A",
              lineHeight: 1.02,
              letterSpacing: "-3px",
              marginTop: "12px",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#52525B",
              marginTop: "20px",
              maxWidth: "1000px",
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: "12px",
            width: "100%",
            borderRadius: "999px",
            background: "#1A53F0",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
