"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Locale } from "@/types";

type RegionPoint = {
  id: string;
  lat: number;
  lng: number;
  label: Record<Locale, string>;
  note: Record<Locale, string>;
  href: string;
};

const points: RegionPoint[] = [
  {
    id: "salo-sports-park",
    lat: 60.38035,
    lng: 23.136833,
    label: { fi: "Salo – urheilupuiston reitin lähtöpiste", es: "Salo – inicio de ruta en el parque deportivo", en: "Salo – Sports Park trail start" },
    note: { fi: "Salon kaupungin keskustan alue ja ulkoilureittien lähtöpiste.", es: "Zona urbana de Salo y punto de salida de rutas al aire libre.", en: "Salo town area and a starting point for outdoor routes." },
    href: "/places/salo-center",
  },
  {
    id: "mathildedal",
    lat: 60.220583,
    lng: 22.905273,
    label: { fi: "Mathildedal", es: "Mathildedal", en: "Mathildedal" },
    note: { fi: "Historiallinen ruukkikylä Salon kaupungissa.", es: "Pueblo histórico de la ferrería, en el municipio de Salo.", en: "Historic ironworks village within the city of Salo." },
    href: "/mathildedal",
  },
  {
    id: "teijo",
    lat: 60.21017,
    lng: 22.93617,
    label: { fi: "Teijon luontokeskus", es: "Centro de naturaleza de Teijo", en: "Teijo Nature Centre" },
    note: { fi: "Teijon kansallispuiston palvelupiste Matildanjärventiellä.", es: "Punto de servicios del Parque Nacional de Teijo en Matildanjärventie.", en: "Visitor service point for Teijo National Park on Matildanjärventie." },
    href: "/places/teijo",
  },
  {
    id: "sarkisalo",
    lat: 60.113889,
    lng: 22.95,
    label: { fi: "Särkisalo", es: "Särkisalo", en: "Särkisalo" },
    note: { fi: "Salon eteläistä saaristoa ja merenrantakyliä.", es: "Archipiélago meridional de Salo y pueblos costeros.", en: "Southern Salo archipelago and coastal villages." },
    href: "/places/sarkisalo",
  },
];

function escapeHtml(value: string) {
  const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return value.replace(/[&<>"']/g, (character) => entities[character] ?? character);
}

export default function SaloRegionMap({ locale }: { locale: Locale }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<import("leaflet").Map | null>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function boot() {
      if (!mapRef.current || instanceRef.current) return;
      const L = await import("leaflet");
      if (cancelled || !mapRef.current) return;
      const map = L.map(mapRef.current, { scrollWheelZoom: false, zoomControl: true });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
      }).addTo(map);
      const bounds = L.latLngBounds(points.map((point) => [point.lat, point.lng] as [number, number]));
      map.fitBounds(bounds.pad(0.15), { maxZoom: 10 });
      points.forEach((point, index) => {
        const safeLabel = escapeHtml(point.label[locale]);
        const safeNote = escapeHtml(point.note[locale]);
        const href = `/${locale}${point.href}`;
        const safeHref = escapeHtml(href);
        const directions = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`;
        const detailsLabel = locale === "fi" ? "Avaa kohteen sivu" : locale === "es" ? "Ver detalles" : "Open place details";
        const directionsLabel = locale === "fi" ? "Navigoi tähän" : locale === "es" ? "Cómo llegar" : "Get directions";
        const icon = L.divIcon({
          className: "",
          html: `<span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:999px;background:#0f3d3e;color:#fff;border:3px solid #fff;box-shadow:0 4px 14px rgba(0,0,0,.24);font-size:13px;font-weight:800">${index + 1}</span>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        });
        L.marker([point.lat, point.lng], { icon }).addTo(map)
          .bindTooltip(safeLabel, { direction: "top", offset: [0, -12] })
          .bindPopup(`<strong>${safeLabel}</strong><br/><span>${safeNote}</span><br/><a href="${safeHref}">${detailsLabel} →</a><br/><a href="${directions}" target="_blank" rel="noopener noreferrer">${directionsLabel} ↗</a>`);
      });
      instanceRef.current = map;
    }
    boot().catch(() => { if (!cancelled) setMapError(true); });
    return () => {
      cancelled = true;
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, [locale]);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100 shadow-soft">
        {mapError ? (
          <div className="flex min-h-[340px] items-center justify-center p-8 text-center text-sm text-slate-600">
            {locale === "fi" ? "Karttaa ei voitu ladata. Avaa kohteet alla olevista linkeistä." : locale === "es" ? "No se pudo cargar el mapa. Abre los lugares desde los enlaces." : "The map could not load. Open places using the links below."}
          </div>
        ) : <div ref={mapRef} className="h-[360px] w-full sm:h-[460px]" aria-label={locale === "fi" ? "Salon seudun kartta" : locale === "es" ? "Mapa de la región de Salo" : "Map of the Salo region"} />}
      </div>
      <div className="grid content-start gap-3">
        {points.map((point, index) => (
          <Link key={point.id} href={`/${locale}${point.href}`} className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-950 text-sm font-bold text-white">{index + 1}</span>
            <span className="min-w-0 flex-1"><span className="block font-semibold text-brand-950">{point.label[locale]}</span><span className="mt-1 block text-sm leading-6 text-slate-600">{point.note[locale]}</span></span>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-brand-700" />
          </Link>
        ))}
        <p className="flex items-start gap-2 rounded-xl bg-brand-50 p-4 text-xs leading-5 text-slate-600"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />{locale === "fi" ? "Kartassa on alue- ja palvelupisteitä, ei jokaisen yrityksen tarkkaa osoitetta. Yrityskohtainen karttahaku näytetään kohdesivulla, kun sijainti on vahvistettu." : locale === "es" ? "El mapa muestra localidades y puntos de servicio, no la dirección exacta de cada empresa. La búsqueda por proveedor aparece cuando se verifica la ubicación." : "The map shows localities and visitor service points, not exact addresses for every business. Provider-level map searches appear on detail pages when the location is verified."}</p>
      </div>
    </div>
  );
}
