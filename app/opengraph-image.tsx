import { ogCard, ogSize } from "@/lib/og";

export const alt = "Dakshesh B, Full-Stack Developer, Frontend Engineer and SEO Engineer in Bangalore";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogCard({
    eyebrow: "Portfolio · Open to work",
    title: "Dakshesh B",
    accentTitle: "builds products that rank.",
    subtitle: "Creator of MyKavo and BillZap. Front ends used by 300,000+ stores. Based in Bangalore.",
  });
}
