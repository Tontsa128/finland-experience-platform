import { redirect } from "next/navigation";

export default function LegacyExperienceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  redirect(`/es/experiences/${encodeURIComponent(params.slug)}`);
}
