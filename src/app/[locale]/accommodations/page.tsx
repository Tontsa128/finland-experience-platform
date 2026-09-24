import { cabins, getLocalized } from "@/lib/data";
import { CabinCard } from "@/components/ui/CabinCard";
import type { Locale } from "@/types";

export default function AccommodationsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  return (
    <div className="container-narrow py-16">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Southern Finland • Summer</p>
      <h1 className="mt-2 section-title">{locale === "fi" ? "Majoitukset" : locale === "es" ? "Alojamientos" : "Places to stay"}</h1>
      <p className="section-subtitle mt-3 mb-10">
        {locale === "fi" ? "Mökkejä, boutique-majoituksia, glampingia ja merenrantahuviloita Etelä-Suomessa, saaristossa ja Ahvenanmaalla. Hinnat ovat suuntaa-antavia ja saatavuus tarkistetaan palveluntarjoajalta."
          : locale === "es" ? "Cabañas, boutique stays, glamping y villas junto al mar en el sur de Finlandia, el archipiélago y Åland. Los precios son orientativos y la disponibilidad se confirma con el proveedor."
          : "Cottages, boutique stays, glamping and seaside villas in southern Finland, the archipelago and Åland. Prices are indicative and availability is confirmed with the provider."}
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cabins.map((c, i) => <CabinCard key={c.id} cabin={c} index={i} />)}
      </div>
    </div>
  );
}
