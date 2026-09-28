import { permanentRedirect } from "next/navigation";

export default function LegacyExperienceDetailPage({ params }: { params: { slug: string } }) {
  permanentRedirect(`/fi/experiences/${encodeURIComponent(params.slug)}`);
}
