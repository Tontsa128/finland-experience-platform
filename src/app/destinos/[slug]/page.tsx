import { permanentRedirect } from "next/navigation";

export default async function LegacyDestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  permanentRedirect(`/fi/destinations/${encodeURIComponent(slug)}`);
}
