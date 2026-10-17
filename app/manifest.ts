import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dakshesh B - Full-Stack Developer in Bangalore",
    short_name: "Dakshesh B",
    description:
      "Portfolio of Dakshesh B, a full-stack developer, frontend engineer and SEO engineer in Bangalore.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F8FA",
    theme_color: "#F7F8FA",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  };
}
