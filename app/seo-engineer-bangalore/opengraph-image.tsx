import { getRole } from "@/lib/roles";
import { ogCard, ogSize } from "@/lib/og";

export const alt = "Dakshesh B, hiring page";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  const role = getRole("seo-engineer-bangalore")!;
  return ogCard({
    eyebrow: "Hiring in Bangalore",
    title: role.role,
    accentTitle: "in Bangalore.",
    subtitle: "Dakshesh B. Open to full-time roles, ready to relocate anywhere. Creator of MyKavo and BillZap.",
  });
}
