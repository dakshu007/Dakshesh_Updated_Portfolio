import { ogCard, ogSize } from "@/lib/og";

export const alt = "About Dakshesh B";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: "About",
    title: "Dakshesh B",
    accentTitle: "sweats the details.",
    subtitle: "Full-stack developer, frontend engineer and SEO engineer in Bangalore. The work, the way I build, and a few photos.",
  });
}
