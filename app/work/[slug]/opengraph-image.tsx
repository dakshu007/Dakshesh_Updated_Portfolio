import { projects, getProject } from "@/lib/data";
import { ogCard, ogSize } from "@/lib/og";

export const alt = "Client website case study by Dakshesh B";
export const size = ogSize;
export const contentType = "image/png";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug)!;
  return ogCard({
    eyebrow: "Client case study",
    title: project.title,
    subtitle: project.tagline,
    accent: project.accent,
    product: {
      value: project.stats[0].value,
      label: `${project.stats[0].label}, ranking #${project.rankings[0].position} on Google`,
      from: project.accent,
      to: "#7B4DFF",
      badge: project.location,
    },
  });
}
