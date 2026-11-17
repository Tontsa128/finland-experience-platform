"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/types";

type MapPoint = {
  id: string;
  lat: number;
  lng: number;
  kind: "destination" | "reference";
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  href?: string;
};

const points: MapPoint[] = [
  { id: "salo", lat: 60.383, lng: 23.133, kind: "destination", name: { fi: "Salo", es: "Salo", en: "Salo" }, description: { fi: "Lounais-Suomen rannikkoseutu ja hyvä lähtöpiste alueen kyliin.", es: "Una localidad costera del suroeste de Finlandia y buen punto de partida para explorar la región.", en: "A coastal town in southwest Finland and a useful base for exploring the region." }, href: "/salo" },
  { id: "pernio", lat: 60.200, lng: 23.133, kind: "destination", name: { fi: "Perniö", es: "Perniö", en: "Perniö" }, description: { fi: "Maaseutukyliä, paikallista elämää ja reittejä kohti rannikkoa.", es: "Pueblos rurales, vida local y rutas hacia la costa.", en: "Rural villages, local life and routes towards the coast." }, href: "/salo" },
  { id: "mathildedal", lat: 60.1660, lng: 22.9540, kind: "destination", name: { fi: "Mathildedal", es: "Mathildedal", en: "Mathildedal" }, description: { fi: "Historiallinen ruukkikylä meren ja Teijon luonnon lähellä.", es: "Un pueblo histórico de antiguas ferrerías junto al mar y la naturaleza de Teijo.", en: "A historic ironworks village close to the sea and Teijo's nature." }, href: "/destinations/salo-mathildedal" },
  { id: "teijo", lat: 60.2050, lng: 23.0000, kind: "destination", name: { fi: "Teijon kansallispuisto", es: "Parque Nacional de Teijo", en: "Teijo National Park" }, description: { fi: "Järviä, metsiä, retkeilyreittejä ja rannikon luontoa.", es: "Lagos, bosques, rutas de senderismo y naturaleza costera.", en: "Lakes, forests, hiking trails and coastal nature." }, href: "/salo" },
  { id: "turku", lat: 60.4518, lng: 22.2666, kind: "reference", name: { fi: "Turku", es: "Turku", en: "Turku" }, description: { fi: "Tunnettu vertailukohta Lounais-Suomessa.", es: "Una ciudad de referencia en el suroeste de Finlandia.", en: "A familiar reference city in southwest Finland." } },
  { id: "helsinki", lat: 60.1699, lng: 24.9384, kind: "reference", name: { fi: "Helsinki", es: "Helsinki", en: "Helsinki" }, description: { fi: "Suomen pääkaupunki ja kansainvälinen saapumiskohde.", es: "La capital de Finlandia y un punto de llegada internacional.", en: "Finland's capital and an international arrival point." } },
];

const copy: Record<Locale, { selected: string; hint: string; attribution: string }> = {
  fi: { selected: "Lounais-Suomen kohteet", hint: "Valitse kartalta kohde nähdäksesi lisätiedot.", attribution: "Kartta-aineisto © OpenStreetMapin tekijät" },
  es: { selected: "Destinos del suroeste de Finlandia", hint: "Selecciona un lugar en el mapa para ver más información.", attribution: "Datos del mapa © colaboradores de OpenStreetMap" },
  en: { selected: "Southwest Finland destinations", hint: "Select a place on the map to see more information.", attribution: "Map data © OpenStreetMap contributors" },
};

export default function FinlandExperienceMap({ locale }: { locale: Locale }) {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    let cancelled = false;
    let createdMap: import("leaflet").Map | null = null;

    void import("leaflet").then((module) => {
      if (cancelled || !mapElement.current || mapInstance.current) return;
      const L = module.default;
      const map = L.map(mapElement.current, { scrollWheelZoom: false, zoomControl: true, preferCanvas: true }).setView([60.30, 23.35], 8);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      points.forEach((point) => {
        const isDestination = point.kind === "destination";
        const marker = L.marker([point.lat, point.lng], {
          icon: L.divIcon({
            className: "finland-map-marker",
            html: isDestination ? '<span class="finland-map-marker__dot" aria-hidden="true"></span>' : '<span class="finland-map-marker__reference" aria-hidden="true"></span>',
            iconSize: isDestination ? [24, 24] : [16, 16],
            iconAnchor: isDestination ? [12, 12] : [8, 8],
          }),
          keyboard: true,
          title: point.name[locale],
        }).addTo(map);

        const popup = document.createElement("div");
        popup.className = "min-w-40";
        const title = document.createElement("strong");
        title.className = "block text-sm text-slate-900";
        title.textContent = point.name[locale];
        const description = document.createElement("p");
        description.className = "mt-1 text-xs leading-5 text-slate-600";
        description.textContent = point.description[locale];
        popup.append(title, description);
        if (point.href) {
          const link = document.createElement("a");
          link.className = "mt-3 inline-block text-xs font-bold text-emerald-800 underline";
          link.href = "/" + locale + point.href;
          link.textContent = locale === "fi" ? "Tutustu alueeseen" : locale === "es" ? "Descubrir la zona" : "Explore the area";
          popup.append(link);
        }
        marker.bindPopup(popup);
      });

      map.fitBounds(L.latLngBounds(points.map((point) => [point.lat, point.lng])).pad(0.15), { maxZoom: 8 });
      mapInstance.current = map;
      createdMap = map;
      window.requestAnimationFrame(() => map.invalidateSize());
    });

    return () => {
      cancelled = true;
      createdMap?.remove();
      if (mapInstance.current === createdMap) mapInstance.current = null;
    };
  }, [locale]);

  const labels = copy[locale];
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-6">
        <div><p className="text-sm font-bold text-brand-950">{labels.selected}</p><p className="mt-1 text-xs text-slate-500">{labels.hint}</p></div>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-amber-600" />{locale === "fi" ? "Kohteet" : locale === "es" ? "Destinos" : "Destinations"}</span>
          <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-slate-500" />{locale === "fi" ? "Kaupungit" : locale === "es" ? "Ciudades" : "Cities"}</span>
        </div>
      </div>
      <div ref={mapElement} className="h-[440px] w-full bg-slate-100 sm:h-[560px]" role="application" aria-label={labels.selected} />
      <p className="border-t border-slate-100 px-4 py-2 text-[10px] text-slate-500 sm:px-6">{labels.attribution}</p>
    </div>
  );
}
