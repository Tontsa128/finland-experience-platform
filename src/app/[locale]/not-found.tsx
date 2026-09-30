import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  const headerStore = await headers();
  const locale = headerStore.get("x-next-intl-locale") || "fi";
  const copy = locale === "es"
    ? { text: "La página no existe o ha sido trasladada.", home: "Volver a la página de inicio" }
    : locale === "en"
      ? { text: "The page could not be found or has been moved.", home: "Back to the homepage" }
      : { text: "Sivua ei löytynyt tai se on siirretty.", home: "Takaisin etusivulle" };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-6xl font-bold text-brand-900">404</h1>
      <p className="mb-8 mt-4 max-w-md text-lg text-slate-600">{copy.text}</p>
      <Link href={`/${locale}`} className="btn-primary">{copy.home}</Link>
    </div>
  );
}
