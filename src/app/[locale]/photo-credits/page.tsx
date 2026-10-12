import Link from "next/link";
import type { Locale } from "@/types";
import { photoCredits } from "@/lib/photo-library";

const copy = {
  fi: {
    eyebrow: "Kuvien lähteet ja oikeudet",
    title: "Kuvien lähdetiedot",
    intro: "Tällä sivulla näet kuvien lähteet, kuvaajat ja lisenssi- tai käyttötilannetiedot. Yrityksen tai tapahtuman sivulla näkyminen ei itsessään anna lupaa julkaista kuvaa uudelleen.",
    open: "Lisenssitieto ilmoitettu",
    openNote: "Käytä kuvaa vain ilmoitetun lisenssin ehtojen ja mahdollisten nimeämisvaatimusten mukaisesti.",
    pending: "Käyttöoikeus vahvistamatta",
    pendingNote: "Kuvaa ei julkaista kohdesisällössä ennen kuin uudelleenkäytön lupa tai soveltuva lisenssi on vahvistettu.",
    source: "Avaa alkuperäinen lähde",
  },
  es: {
    eyebrow: "Fuentes y derechos de imagen",
    title: "Fuentes de las fotografías",
    intro: "Esta página recoge las fuentes, los créditos y la información disponible sobre las licencias o los permisos. Que una imagen aparezca en la web de una empresa o evento no autoriza por sí solo a reutilizarla.",
    open: "Licencia indicada",
    openNote: "Utiliza la imagen únicamente conforme a las condiciones de la licencia indicada y sus requisitos de atribución.",
    pending: "Derechos de uso sin confirmar",
    pendingNote: "La imagen no se publica en el contenido del destino hasta confirmar el permiso de reutilización o una licencia aplicable.",
    source: "Abrir la fuente original",
  },
  en: {
    eyebrow: "Image sources and rights",
    title: "Photo source information",
    intro: "This page records image sources, credits and available licence or permission information. An image appearing on a business or event website does not, by itself, grant permission to republish it.",
    open: "Licence information listed",
    openNote: "Use the image only in accordance with the stated licence terms and any attribution requirements.",
    pending: "Reuse permission not confirmed",
    pendingNote: "The image is withheld from destination content until reuse permission or an applicable licence has been confirmed.",
    source: "Open original source",
  },
} satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  intro: string;
  open: string;
  openNote: string;
  pending: string;
  pendingNote: string;
  source: string;
}>;

export default async function PhotoCreditsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "fi" || rawLocale === "es" || rawLocale === "en" ? rawLocale : "en";
  const t = copy[locale];

  return (
    <main className="bg-snow py-16 sm:py-24">
      <div className="container-narrow">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">{t.eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-6xl">{t.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{t.intro}</p>
        <div className="mt-10 grid gap-4">
          {photoCredits.map((photo) => {
            const licenceListed = /^(CC BY(?:-SA)? [0-9.]+|Public domain)$/.test(photo.license);
            return (
              <article key={photo.sourcePage} className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
                <p className="font-semibold text-brand-950">{photo.credit}</p>
                <p className="mt-1 text-sm text-slate-600">{photo.license}</p>
                <p className="mt-3 text-sm font-semibold text-brand-800">{licenceListed ? t.open : t.pending}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{licenceListed ? t.openNote : t.pendingNote}</p>
                <Link href={photo.sourcePage} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold text-brand-700 hover:text-brand-950">
                  {t.source} →
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
