import { redirect } from "next/navigation";

export default async function SaloPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // The regional introduction is intentionally skipped. The village index is
  // the canonical entry point for every Salo link in all supported languages.
  redirect(`/${locale}/salo/kylat`);
}
