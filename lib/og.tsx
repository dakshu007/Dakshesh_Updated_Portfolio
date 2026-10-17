import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/**
 * Shared 1200x630 Open Graph card: light canvas, soft aurora, the category,
 * a big title and a subtitle. No external font fetch, so it builds offline.
 */
export function ogCard({
  eyebrow,
  title,
  subtitle,
  accent = "#2B4BF2",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  accent?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F8FA",
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-160px",
            top: "-160px",
            width: "620px",
            height: "620px",
            borderRadius: "9999px",
            background: `radial-gradient(circle, ${accent}55, #7B4DFF33 45%, transparent 70%)`,
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "#0A0B10",
                color: "#FFFFFF",
                fontSize: "30px",
                fontWeight: 800,
              }}
            >
              D
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "#0A0B10" }}>dakshesh.co.in</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              borderRadius: "999px",
              background: "#ECFDF5",
              color: "#047857",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            Open to work · Bangalore
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: accent,
              textTransform: "uppercase",
              letterSpacing: "3px",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: title.length > 26 ? "72px" : "96px",
              fontWeight: 800,
              color: "#0A0B10",
              lineHeight: 1.02,
              letterSpacing: "-3px",
              marginTop: "14px",
              maxWidth: "1050px",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: "30px", color: "#4A4F5C", marginTop: "22px", maxWidth: "1000px", lineHeight: 1.35 }}>
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: "10px",
            width: "100%",
            borderRadius: "999px",
            background: `linear-gradient(90deg, ${accent}, #7B4DFF, #E0479E)`,
          }}
        />
      </div>
    ),
    { ...ogSize }
  );
}
