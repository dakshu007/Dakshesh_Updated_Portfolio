import { ImageResponse } from "next/og";

export const alt = "Dakshesh B - Frontend Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Server-rendered Open Graph image (1200x630): name, role and accent.
// No external font fetch, so it builds offline and stays fast.
export default function OpengraphImage() {
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
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "#1A53F0",
              color: "#FFFFFF",
              fontSize: "40px",
              fontWeight: 800,
            }}
          >
            D
          </div>
          <div style={{ fontSize: "30px", fontWeight: 700, color: "#0A0A0A" }}>
            dakshesh.co.in
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              color: "#0A0A0A",
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            Dakshesh B
          </div>
          <div
            style={{
              fontSize: "40px",
              fontWeight: 600,
              color: "#1A53F0",
              marginTop: "16px",
            }}
          >
            Frontend Web Developer
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#52525B",
              marginTop: "20px",
              maxWidth: "900px",
            }}
          >
            Fast, accessible, high-performance interfaces. React, Next.js and
            JavaScript.
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
