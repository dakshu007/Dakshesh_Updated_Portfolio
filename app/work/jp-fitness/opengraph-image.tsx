import { ImageResponse } from "next/og";
import { getProject } from "@/lib/data";

export const alt = "JP Fitness website case study by Dakshesh B";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const project = getProject("jp-fitness")!;

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
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#1A53F0",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Client work
          </div>
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
            {project.title}
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#52525B",
              marginTop: "20px",
              maxWidth: "1000px",
            }}
          >
            {project.tagline}
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
