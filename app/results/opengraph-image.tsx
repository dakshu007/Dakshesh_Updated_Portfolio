import { ogCard, ogSize } from "@/lib/og";

export const alt = "SEO and growth results for sites built by Dakshesh B";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: "Verified results",
    title: "Sites I build",
    accentTitle: "get found.",
    subtitle: "23 keywords on Google page 1 and 2,101 visits from ChatGPT, from Search Console and GA4.",
    product: { value: "70,233", label: "Google impressions earned", from: "#2B4BF2", to: "#7B4DFF", badge: "7.5x in 3 months" },
  });
}
