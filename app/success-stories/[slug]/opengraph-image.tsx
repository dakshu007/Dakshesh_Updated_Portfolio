import { ogCard, ogSize } from "@/lib/og";
import { stories, getStory } from "@/lib/stories";

export const alt = "Client success story by Dakshesh B";
export const size = ogSize;
export const contentType = "image/png";

export const dynamicParams = false;

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getStory(slug)!;
  return ogCard({
    eyebrow: `Success story · ${story.service}`,
    title: story.client,
    accentTitle: `${story.result.short}.`,
    subtitle: story.ogSubtitle,
    accent: story.accent,
    product: { value: story.result.value, label: story.result.label, from: story.accent, to: "#7B4DFF", badge: story.location },
  });
}
