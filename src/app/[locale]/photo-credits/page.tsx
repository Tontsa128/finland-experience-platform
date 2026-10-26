import Link from "next/link";
import { photoCredits } from "@/lib/photo-library";

type Locale = "fi" | "en" | "es";

const copy = {
  fi: {
    eyebrow: "Kuvien lähteet",
    title: "Kuvien lähteet ja tekijätiedot",
    intro: "Tällä sivulla luetellaan kuvakirjastoon kirjatut lähteet ja ilmoitetut käyttöehdot. Avaa alkuperäinen lähde ja tarkista sen ajantasaiset ehdot.",
    noteTitle: "Tärkeä huomio käyttöoikeuksista",
    note: "Lähteen tai kuvaajan nimen näyttäminen ei yksin todista, että kuvaa saa käyttää tällä sivustolla. Oikeus käyttää kuvaa, mahdollinen kaupallinen käyttö ja vaaditut tekijätiedot on vahvistettava oikeudenhaltijalta ennen tuotantojulkaisua. Kaikkia kohde- ja palveluntarjoajakorttien kuvia ei ole vielä kirjattu tähän luetteloon.",
    source: "Avaa alkuperäinen lähde",
    sourceNote: "Lähdetieto / käyttöoikeushuomio",
  },
  en: {
    eyebrow: "Image sources",
    title: "Image sources and attribution",
    intro: "This page lists sources and usage notes recorded in the shared photo library. Open the original source and check its current terms.",
    noteTitle: "Important note about image rights",
    note: "Displaying a source or photographer name does not, by itself, prove that an image may be used on this website. Permission to use the image, any commercial-use conditions and required attribution must be confirmed with the rights holder before production launch. Not all images used in destination and provider cards are listed here yet.",
    source: "Open original source",
    sourceNote: "Source / rights note",
  },
  es: {
    eyebrow: "Fuentes de imágenes",
    title: "Fuentes y atribución de imágenes",
    intro: "Esta página recoge las fuentes y notas de uso registradas en la biblioteca compartida de imágenes. Abre la fuente original y comprueba sus condiciones actuales.",
    noteTitle: "Nota importante sobre los derechos de imagen",
    note: "Mostrar una fuente o el nombre del fotógrafo no demuestra por sí solo que una imagen pueda utilizarse en este sitio web. Antes del lanzamiento, deben confirmarse con el titular los permisos de uso, las condiciones para uso comercial y la atribución exigida. Todavía no figuran aquí todas las imágenes de las fichas de destinos y proveedores.",
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
