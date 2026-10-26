import Link from "next/link";
import { photoCredits } from "@/lib/photo-library";

type Locale = "fi" | "en" | "es";

const copy = {
  fi: {
    eyebrow: "Kuvien lähteet",
    title: "Kuvien lähteet ja tekijätiedot",
    intro: "Tällä sivulla luetellaan kuvakirjastoon kirjatut lähteet ja ilmoitetut käyttöehdot. Avaa alkuperäinen lähde ja tarkista sen ajantasaiset ehdot.",
    noteTitle: "Kuvien käyttö ja lähdemerkinnät",
    note: "Mathildedalin oppaassa käytettävien kuvien käyttö on vahvistettu projektin omistajan toimesta. Näytämme lähde- ja tekijätiedot kuvan ehtojen mukaisesti. Tämä luettelo sisältää kuvakirjastoon kirjatut lähteet, eikä välttämättä jokaista sivuston korttikuvaa.",
    source: "Avaa alkuperäinen lähde",
    sourceNote: "Lähdetieto / käyttöoikeushuomio",
  },
  en: {
    eyebrow: "Image sources",
    title: "Image sources and attribution",
    intro: "This page lists sources and usage notes recorded in the shared photo library. Open the original source and check its current terms.",
    noteTitle: "Image use and attribution",
    note: "The project owner has confirmed permission to use the images selected for the Mathildedal guide. Source and photographer credits are shown according to the applicable image terms. This list contains sources recorded in the shared photo library and may not include every image used in site cards.",
    source: "Open original source",
    sourceNote: "Source / rights note",
  },
  es: {
    eyebrow: "Fuentes de imágenes",
    title: "Fuentes y atribución de imágenes",
    intro: "Esta página recoge las fuentes y notas de uso registradas en la biblioteca compartida de imágenes. Abre la fuente original y comprueba sus condiciones actuales.",
    noteTitle: "Uso y atribución de imágenes",
    note: "El propietario del proyecto ha confirmado el permiso para utilizar las imágenes seleccionadas para la guía de Mathildedal. Los créditos de la fuente y del fotógrafo se muestran según las condiciones aplicables a cada imagen. Esta lista recoge las fuentes registradas en la biblioteca compartida y puede no incluir todas las imágenes utilizadas en las fichas.",
    source: "Abrir la fuente original",
    sourceNote: "Fuente / nota sobre derechos",
  },
} satisfies Record<Locale, Record<string, string>>;

export default async function PhotoCreditsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "es" ? "es" : rawLocale === "en" ? "en" : "fi";
  const c = copy[locale];

  return (
    <main className="bg-snow py-16 sm:py-24">
      <div className="container-narrow">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">{c.eyebrow}</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold text-brand-950 sm:text-6xl">{c.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{c.intro}</p>
        <aside className="mt-8 max-w-4xl rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-brand-950">{c.noteTitle}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700">{c.note}</p>
        </aside>
        <div className="mt-10 grid gap-4">
          {photoCredits.map((photo) => (
            <article key={photo.sourcePage} className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
              <p className="font-semibold text-brand-950">{photo.credit}</p>
              <p className="mt-1 text-sm text-slate-600">{c.sourceNote}: {photo.license}</p>
              <Link href={photo.sourcePage} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold text-brand-700 hover:text-brand-950">
                {c.source} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
