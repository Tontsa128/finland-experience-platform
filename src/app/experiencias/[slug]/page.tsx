import { permanentRedirect } from "next/navigation";

export default async function LegacyExperienceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  permanentRedirect(`/fi/experiences/${encodeURIComponent((await params).slug)}`);
}
