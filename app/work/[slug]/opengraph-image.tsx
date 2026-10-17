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
  const project = getProject(slug);
  return ogCard({
    eyebrow: "Client case study",
    title: project?.title ?? "Client work",
    subtitle: project?.tagline ?? "A website by Dakshesh B",
    accent: project?.accent ?? "#2B4BF2",
  });
}
