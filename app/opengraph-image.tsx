import { ogCard, ogSize } from "@/lib/og";

export const alt = "Dakshesh B, Full-Stack Developer, Frontend Engineer and SEO Engineer in Bangalore";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogCard({
    eyebrow: "Full-Stack · Frontend · SEO Engineer",
    title: "Dakshesh B",
    subtitle: "Builds fast web products that rank on Google and get recommended by AI. Creator of MyKavo and BillZap.",
  });
}
