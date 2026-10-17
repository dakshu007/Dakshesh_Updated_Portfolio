import { ogCard, ogSize } from "@/lib/og";

export const alt = "Local SEO success story: JP Fitness, 35 new members in 35 days";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: "Success story · Local SEO",
    title: "JP Fitness",
    accentTitle: "35 members in 35 days.",
    subtitle: "How local SEO put a Coimbatore gym on Google page 1 for \"gym near me\", for ₹4,999.",
    accent: "#EF4444",
    product: { value: "35", label: "new members in about 35 days", from: "#EF4444", to: "#7B4DFF", badge: "Kalapatti, Coimbatore" },
  });
}
