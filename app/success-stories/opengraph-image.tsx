import { ogCard, ogSize } from "@/lib/og";

export const alt = "Local SEO success story: JP Fitness, 30+ new members in 75 days";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: "Success story · Local SEO",
    title: "JP Fitness",
    accentTitle: "30+ members in 75 days.",
    subtitle: "How local SEO put a Coimbatore gym on Google page 1 for \"gym near me\", for ₹4,999.",
    accent: "#EF4444",
    product: { value: "30+", label: "new members in 75 days", from: "#EF4444", to: "#7B4DFF", badge: "Kalapatti, Coimbatore" },
  });
}
