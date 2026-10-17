import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const asset = (file: string) => readFileSync(path.join(process.cwd(), "lib", "og-assets", file));
const dataUri = (buf: Buffer, type: string) => `data:${type};base64,${buf.toString("base64")}`;

/** Brand assets, inlined so the cards render without any network fetch. */
const LOGO = dataUri(readFileSync(path.join(process.cwd(), "public", "icon.svg")), "image/svg+xml");
const PORTRAIT = dataUri(asset("portrait.jpg"), "image/jpeg");
const FONTS = [
  { name: "Notch", data: asset("StackSansNotch-700.ttf"), weight: 700 as const, style: "normal" as const },
  { name: "Notch", data: asset("StackSansNotch-300.ttf"), weight: 300 as const, style: "normal" as const },
  { name: "Text", data: asset("StackSansText-400.ttf"), weight: 400 as const, style: "normal" as const },
  { name: "Text", data: asset("StackSansText-600.ttf"), weight: 600 as const, style: "normal" as const },
];

type Card = {
  eyebrow: string;
  title: string;
  /** Optional second line of the title, set in the light weight with a gradient. */
  accentTitle?: string;
  subtitle: string;
  accent?: string;
  /** Product cards show a big brand tile instead of the portrait. */
  product?: { value: string; label: string; from: string; to: string; badge?: string; ink?: string };
};

/**
 * Premium 1200x630 share banner used by every page: light canvas, aurora
 * glow, dot grid, the cloud D logo, Stack Sans type, and either the portrait
 * (people pages) or a brand tile with the headline achievement (products).
 */
export function ogCard({ eyebrow, title, accentTitle, subtitle, accent = "#2B4BF2", product }: Card) {
  const titleSize = title.length > 22 ? 64 : title.length > 14 ? 78 : 96;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#F7F8FA",
          fontFamily: "Text",
          color: "#0A0B10",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: "radial-gradient(rgba(10,11,16,0.10) 1.4px, transparent 1.6px)",
            backgroundSize: "26px 26px",
          }}
        />
        {/* Aurora */}
        <div
          style={{
            position: "absolute",
            right: -220,
            top: -260,
            width: 820,
            height: 820,
            display: "flex",
            borderRadius: 9999,
            backgroundImage: `radial-gradient(circle, ${accent}55 0%, rgba(123,77,255,0.28) 38%, rgba(224,71,158,0.12) 58%, rgba(247,248,250,0) 72%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -260,
            bottom: -320,
            width: 700,
            height: 700,
            display: "flex",
            borderRadius: 9999,
            backgroundImage: "radial-gradient(circle, rgba(201,214,255,0.9) 0%, rgba(247,248,250,0) 68%)",
          }}
        />

        {/* Left column */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 720,
            padding: "64px 0 60px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} width={58} height={58} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: "Notch", fontWeight: 700, fontSize: 30, letterSpacing: -0.5 }}>dakshesh.co.in</div>
              <div style={{ fontSize: 18, color: "#646A78" }}>Dakshesh B · Bangalore, India</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                fontWeight: 600,
                color: accent,
                textTransform: "uppercase",
                letterSpacing: 3,
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Notch",
                fontWeight: 700,
                fontSize: titleSize,
                lineHeight: 1,
                letterSpacing: -2,
                marginTop: 16,
              }}
            >
              <span>{title}</span>
              {accentTitle ? (
                <span
                  style={{
                    fontWeight: 300,
                    fontSize: Math.min(Math.round(titleSize * 0.66), 60),
                    lineHeight: 1.05,
                    marginTop: 10,
                    backgroundImage: `linear-gradient(90deg, ${accent}, #7B4DFF 55%, #E0479E)`,
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {accentTitle}
                </span>
              ) : null}
            </div>
            <div style={{ display: "flex", fontSize: 26, lineHeight: 1.4, color: "#4A4F5C", marginTop: 22, maxWidth: 620 }}>
              {subtitle}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            {["Full-Stack", "Frontend", "SEO Engineer"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1.5px solid #E6E8EE",
                  background: "rgba(255,255,255,0.85)",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#4A4F5C",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ position: "relative", display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
          {product ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: 360,
                height: 420,
                padding: 34,
                borderRadius: 40,
                color: product.ink ?? "#FFFFFF",
                backgroundImage: `linear-gradient(145deg, ${product.from}, ${product.to})`,
                boxShadow: "0 40px 80px -30px rgba(10,11,16,0.45)",
                transform: "rotate(-4deg)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div
                  style={{
                    display: "flex",
                    padding: "6px 14px",
                    borderRadius: 999,
                    background: product.ink ? "rgba(10,11,16,0.1)" : "rgba(255,255,255,0.25)",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {product.badge ?? "Built by Dakshesh"}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "Notch", fontWeight: 700, fontSize: product.value.length > 5 ? 84 : 112, lineHeight: 1, letterSpacing: -3 }}>
                  {product.value}
                </div>
                <div style={{ display: "flex", fontSize: 24, marginTop: 12, lineHeight: 1.3, opacity: 0.92 }}>{product.label}</div>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  padding: 12,
                  borderRadius: 36,
                  background: "#FFFFFF",
                  boxShadow: "0 40px 80px -30px rgba(10,11,16,0.45)",
                  transform: "rotate(3deg)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PORTRAIT} width={330} height={380} alt="" style={{ borderRadius: 26, objectFit: "cover" }} />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: -40,
                  bottom: 34,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 20px",
                  borderRadius: 999,
                  background: "#FFFFFF",
                  boxShadow: "0 18px 40px -16px rgba(10,11,16,0.35)",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                <div style={{ width: 12, height: 12, borderRadius: 999, background: "#10B981", display: "flex" }} />
                Open to work · Bangalore
              </div>
            </div>
          )}
        </div>

        {/* Bottom gradient rule */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 8,
            display: "flex",
            backgroundImage: `linear-gradient(90deg, ${accent}, #7B4DFF, #E0479E)`,
          }}
        />
      </div>
    ),
    { ...ogSize, fonts: FONTS }
  );
}
