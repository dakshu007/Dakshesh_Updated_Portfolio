import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dakshesh B - Frontend Web Developer",
    short_name: "Dakshesh B",
    description:
      "Portfolio of Dakshesh B, a frontend web developer building fast, accessible interfaces and shipping products end to end.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF7",
    theme_color: "#1A53F0",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
