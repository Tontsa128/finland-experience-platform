import { permanentRedirect } from "next/navigation";

export default function LegacyDestinationDetailPage({ params }: { params: { slug: string } }) {
  permanentRedirect(`/fi/destinations/${encodeURIComponent(params.slug)}`);
}
