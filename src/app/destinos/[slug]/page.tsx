import { permanentRedirect } from "next/navigation";

export default async function LegacyDestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  permanentRedirect(`/fi/destinations/${encodeURIComponent((await params).slug)}`);
}
