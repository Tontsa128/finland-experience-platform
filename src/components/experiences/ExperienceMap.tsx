"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Experience } from "@/types";

type MapItem = Pick<Experience, "id" | "slug" | "name" | "category" | "coordinates" | "address" | "images">;

type Props = {
  items: MapItem[];
  locale: "fi" | "es" | "en";
  selectedSlug?: string;
  onSelect?: (slug: string) => void;
  className?: string;
};

function label(item: MapItem, locale: Props["locale"]) {
  return item.name?.[locale] || item.name?.fi || item.slug;
}

export default function ExperienceMap({ items, locale, selectedSlug, onSelect, className = "" }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const [ready, setReady] = useState(false);

  const points = useMemo(
    () => items.filter((item) => item.coordinates && Number.isFinite(item.coordinates.lat) && Number.isFinite(item.coordinates.lng)),
    [items],
  );

  useEffect(() => {
    let cancelled = false;
    async function boot() {
      if (!mapRef.current || instanceRef.current) return;
      const L = await import("leaflet");
      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, { scrollWheelZoom: true, zoomControl: true });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
      }).addTo(map);
      instanceRef.current = map;
      setReady(true);
    }
    boot();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const map = instanceRef.current;
    if (!map || !ready) return;
    const L = require("leaflet") as typeof import("leaflet");
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    points.forEach((item) => {
      const selected = item.slug === selectedSlug;
      const icon = L.divIcon({
        className: "",
        html: `<span style="display:flex;align-items:center;justify-content:center;width:${selected ? 38 : 30}px;height:${selected ? 38 : 30}px;border-radius:999px;background:#0f3d3e;color:white;border:3px solid white;box-shadow:0 5px 16px rgba(0,0,0,.22);font-size:13px;font-weight:800">${points.indexOf(item)+1}</span>`,
        iconSize: [selected ? 38 : 30, selected ? 38 : 30],
        iconAnchor: [selected ? 19 : 15, selected ? 19 : 15],
      });
      const marker = L.marker([item.coordinates!.lat, item.coordinates!.lng], { icon })
        .addTo(map)
        .bindTooltip(label(item, locale), { direction: "top", offset: [0, -12] });
      marker.on("click", () => onSelect?.(item.slug));
      markersRef.current.set(item.slug, marker);
    });

    if (selectedSlug) {
      const selected = points.find((item) => item.slug === selectedSlug);
      if (selected?.coordinates) map.flyTo([selected.coordinates.lat, selected.coordinates.lng], Math.max(map.getZoom(), 12), { duration: 0.5 });
    } else if (points.length > 1) {
      const bounds = L.latLngBounds(points.map((item) => [item.coordinates!.lat, item.coordinates!.lng] as [number, number]));
      map.fitBounds(bounds.pad(0.12), { maxZoom: 11 });
    } else if (points[0]?.coordinates) {
      map.setView([points[0].coordinates.lat, points[0].coordinates.lng], 12);
    }
  }, [points, locale, selectedSlug, onSelect, ready]);

  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-card ${className}`}>
      <div ref={mapRef} className="h-[480px] w-full sm:h-[560px]" aria-label={locale === "fi" ? "Interaktiivinen kartta" : locale === "es" ? "Mapa interactivo" : "Interactive map"} />
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-xl bg-white/95 px-3 py-2 text-xs text-slate-600 shadow">
        {locale === "fi" ? "Kartta: OpenStreetMap" : locale === "es" ? "Mapa: OpenStreetMap" : "Map: OpenStreetMap"}
      </div>
    </div>
  );
}
