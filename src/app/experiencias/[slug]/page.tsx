import { permanentRedirect } from "next/navigation";

export default async function LegacyExperienceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  permanentRedirect(`/fi/experiences/${encodeURIComponent(slug)}`);
}
