"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ExternalLink, MapPin, Search, Sparkles } from "lucide-react";
import type { Experience, Locale } from "@/types";
import ExperienceMap from "@/components/experiences/ExperienceMap";

type Props = { experiences: Experience[]; locale: Locale };

const categoryLabels: Record<string, Record<Locale, string>> = {
  nature: { fi: "Luonto", es: "Naturaleza", en: "Nature" },
  water: { fi: "Vesi & saaristo", es: "Agua y archipiélago", en: "Water & archipelago" },
  "sauna-wellness": { fi: "Sauna & hyvinvointi", es: "Sauna y bienestar", en: "Sauna & wellness" },
  "cycling-action": { fi: "Pyöräily & aktiivinen", es: "Ciclismo y actividad", en: "Cycling & action" },
  "food-farm": { fi: "Ruoka & maatilat", es: "Gastronomía y granjas", en: "Food & farms" },
  "culture-history": { fi: "Kulttuuri & historia", es: "Cultura e historia", en: "Culture & history" },
  golf: { fi: "Golf", es: "Golf", en: "Golf" },
  fishing: { fi: "Kalastus", es: "Pesca", en: "Fishing" },
};

const audienceLabels: Record<string, Record<Locale, string>> = {
  families: { fi: "Perheille", es: "Familias", en: "Families" },
  couples: { fi: "Pariskunnille", es: "Parejas", en: "Couples" },
  friends: { fi: "Ystäville", es: "Amigos", en: "Friends" },
  groups: { fi: "Ryhmille", es: "Grupos", en: "Groups" },
  adults: { fi: "Aikuisille", es: "Adultos", en: "Adults" },
};

const seasonLabels: Record<string, Record<Locale, string>> = {
  spring: { fi: "Kevät", es: "Primavera", en: "Spring" },
  summer: { fi: "Kesä", es: "Verano", en: "Summer" },
  autumn: { fi: "Syksy", es: "Otoño", en: "Autumn" },
  winter: { fi: "Talvi", es: "Invierno", en: "Winter" },
};

const copy = {
  fi: {
    eyebrow: "Salo · Mathildedal · Teijo · Särkisalo",
    title: "Löydä elämys, joka tuntuu Suomelta.",
    intro: "Metsäpolku, lämmin sauna, saariston hiljaisuus, maatilan aamu tai vauhdikas päivä pyörän päällä. FINNEXPRIENCE kokoaa paikalliset elämykset yhteen – ja ohjaa sinut suoraan paikan omaan palveluun.",
    mapTitle: "Tutki elämyksiä kartalla",
    mapText: "Valitse numero kartalta tai selaa kohteita. Navigointi avautuu puhelimesi tai tietokoneesi karttapalvelussa.",
    search: "Hae paikkaa tai elämystä…",
    all: "Kaikki",
    navigate: "Navigoi",
    provider: "Palveluntarjoajalle",
    source: "Katso kohteen tiedot",
    checked: "Tiedot tarkistettu",
    noResults: "Hakuehdoilla ei löytynyt elämyksiä.",
    direct: "Varaus ja sopimus tehdään suoraan palveluntarjoajan kanssa.",
    audience: "Sopii",
    season: "Sesonki",
  },
  es: {
    eyebrow: "Salo · Mathildedal · Teijo · Särkisalo",
    title: "Descubre una experiencia que se sienta como Finlandia.",
    intro: "Un sendero en el bosque, una sauna junto al lago, la calma del archipiélago, una granja local o un día de ciclismo. FINNEXPRIENCE reúne experiencias locales y te dirige directamente al proveedor.",
    mapTitle: "Explora las experiencias en el mapa",
    mapText: "Selecciona un número en el mapa o explora la lista. La navegación se abre en el servicio de mapas de tu dispositivo.",
    search: "Busca un lugar o experiencia…",
    all: "Todas",
    navigate: "Navegar",
    provider: "Ir al proveedor",
    source: "Ver información",
    checked: "Información comprobada",
    noResults: "No se encontraron experiencias.",
    direct: "La reserva y el contrato se realizan directamente con el proveedor.",
    audience: "Ideal para",
    season: "Temporada",
  },
  en: {
    eyebrow: "Salo · Mathildedal · Teijo · Särkisalo",
    title: "Find an experience that feels like Finland.",
    intro: "A forest trail, a warm sauna, the quiet of the archipelago, a local farm morning or a day on a bike. FINNEXPRIENCE brings local experiences together and sends you directly to the provider.",
    mapTitle: "Explore experiences on the map",
    mapText: "Select a number on the map or browse the list. Navigation opens in your device's map service.",
    search: "Search a place or experience…",
    all: "All",
    navigate: "Navigate",
    provider: "Visit provider",
    source: "View details",
    checked: "Information checked",
    noResults: "No experiences matched your search.",
    direct: "Booking and the contract take place directly with the provider.",
    audience: "Great for",
    season: "Season",
  },
} as const;

function text(value: Record<Locale, string>, locale: Locale) {
  return value[locale] || value.fi || value.en || "";
}

function navigationUrl(item: Experience) {
  if (item.coordinates) return `https://www.google.com/maps/dir/?api=1&destination=${item.coordinates.lat},${item.coordinates.lng}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address || item.region || item.name.fi)}`;
}

export default function ExperienceDirectory({ experiences, locale }: Props) {
  const t = copy[locale];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [audience, setAudience] = useState("all");
  const [season, setSeason] = useState("all");
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>();

  const categories = useMemo(
    () => Array.from(new Set(experiences.map((item) => item.category))).filter(Boolean),
    [experiences],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return experiences.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesAudience = audience === "all" || item.audienceTags?.includes(audience);
      const matchesSeason = season === "all" || item.seasonTags?.includes(season);
      const haystack = [
        text(item.name, locale),
        text(item.shortDescription, locale),
        text(item.description, locale),
        item.address || "",
        item.region || "",
      ].join(" ").toLocaleLowerCase();
      return matchesCategory && matchesAudience && matchesSeason && (!q || haystack.includes(q));
    });
  }, [experiences, locale, query, category]);

  return (
    <div className="bg-white">
      <section className="bg-brand-950 text-white">
        <div className="container-narrow py-16 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-[.22em] text-white/60">{t.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl font-bold leading-[1.02] sm:text-7xl">{t.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/80 sm:text-xl">{t.intro}</p>
        </div>
      </section>

      <section className="container-narrow py-12 sm:py-16">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">{t.mapTitle}</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{t.mapTitle}</h2>
          <p className="mt-3 max-w-3xl text-slate-600">{t.mapText}</p>
        </div>
        <ExperienceMap
          items={filtered}
          locale={locale}
          selectedSlug={selectedSlug}
          onSelect={(slug) => {
            setSelectedSlug(slug);
            window.setTimeout(() => document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
          }}
        />
      </section>

      <section id="all-experiences" className="container-narrow pb-20">
        <div className="sticky top-16 z-20 -mx-4 mb-8 border-y border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
          <div className="flex flex-col gap-3">
            <label className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.search} className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-500 focus:bg-white" />
            </label>
            <div className="grid gap-3 lg:grid-cols-3">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-slate-400">{locale==="fi"?"Teema":locale==="es"?"Tema":"Theme"}</p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  <button onClick={() => setCategory("all")} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold ${category === "all" ? "bg-brand-900 text-white" : "bg-slate-100 text-slate-700"}`}>{t.all}</button>
                  {categories.map((value) => (
                    <button key={value} onClick={() => setCategory(value)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold ${category === value ? "bg-brand-900 text-white" : "bg-slate-100 text-slate-700"}`}>
                      {categoryLabels[value]?.[locale] || value}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-slate-400">{t.audience}</p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  <button onClick={() => setAudience("all")} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold ${audience === "all" ? "bg-brand-900 text-white" : "bg-slate-100 text-slate-700"}`}>{t.all}</button>
                  {Object.keys(audienceLabels).map((value) => (
                    <button key={value} onClick={() => setAudience(value)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold ${audience === value ? "bg-brand-900 text-white" : "bg-slate-100 text-slate-700"}`}>
                      {audienceLabels[value][locale]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-slate-400">{t.season}</p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  <button onClick={() => setSeason("all")} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold ${season === "all" ? "bg-brand-900 text-white" : "bg-slate-100 text-slate-700"}`}>{t.all}</button>
                  {Object.keys(seasonLabels).map((value) => (
                    <button key={value} onClick={() => setSeason(value)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold ${season === value ? "bg-brand-900 text-white" : "bg-slate-100 text-slate-700"}`}>
                      {seasonLabels[value][locale]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {filtered.length ? (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item, index) => {
              const isSelected = item.slug === selectedSlug;
              return (
                <article key={item.id} id={item.slug} className={`group overflow-hidden rounded-[1.75rem] border bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card ${isSelected ? "ring-2 ring-brand-600" : "border-slate-100"}`}>
                  <button type="button" className="relative block aspect-[16/10] w-full overflow-hidden text-left" onClick={() => setSelectedSlug(item.slug)}>
                    {item.images?.[0] ? <Image src={item.images[0]} alt={text(item.name, locale)} fill sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" /> : <div className="absolute inset-0 bg-brand-100" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-black text-brand-900 shadow">{index + 1}</span>
                    <span className="absolute bottom-4 left-4 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{categoryLabels[item.category]?.[locale] || item.category}</span>
                  </button>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-bold text-brand-950">{text(item.name, locale)}</h3>
                    <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{text(item.description, locale)}</p>
                    {item.address ? <p className="mt-4 flex gap-2 text-xs font-medium text-slate-500"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{item.address}</p> : null}
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800"><Sparkles className="h-3.5 w-3.5" />{t.checked}</span>
                      {(item.audienceTags || []).slice(0,3).map(tag => audienceLabels[tag]?.[locale] ? <span key={tag} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">{audienceLabels[tag][locale]}</span> : null)}
                      {(item.seasonTags || []).slice(0,2).map(tag => seasonLabels[tag]?.[locale] ? <span key={tag} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">{seasonLabels[tag][locale]}</span> : null)}
                    </div>
                    <p className="mt-4 text-xs leading-5 text-slate-500">{t.direct}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <Link href={`/${locale}/experiences/${item.slug}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-900 px-4 py-3 text-sm font-bold text-white hover:bg-brand-800">{t.source}<ArrowRight className="h-4 w-4" /></Link>
                      <a href={navigationUrl(item)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">{t.navigate}<ExternalLink className="h-4 w-4" /></a>
                    </div>
                    {item.providerUrl ? <a href={item.providerUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-center text-sm font-semibold text-brand-700 hover:underline">{t.provider}</a> : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-500">{t.noResults}</div>}
      </section>
    </div>
  );
}
