import { ogCard, ogSize } from "@/lib/og";

export const alt = "Success stories by Dakshesh B";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: "Success stories",
    title: "Real businesses.",
    accentTitle: "Real customers.",
    subtitle: "Local SEO and fast websites that turn Google searches into calls, visits and sales.",
    accent: "#EF4444",
    product: { value: "30+", label: "new gym members in 75 days for JP Fitness", from: "#EF4444", to: "#7B4DFF", badge: "Latest story" },
  });
}
