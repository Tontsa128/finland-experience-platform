"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { translateFinnishText } from "@/components/admin/AITranslationPanel";

type Locale = "fi" | "en" | "es";
type Kind = "destination" | "property" | "experience";

type Translation = {
  name: string;
  shortDescription: string;
  description: string;
  fullDescription: string;
  highlights: string;
  travelInformation: string;
  whatToBring: string;
  safetyInformation: string;
  seoTitle: string;
  seoDescription: string;
};

type Item = {
  id: string;
  kind: Kind;
  slug: string;
  title: string;
  status: string;
  region: string;
  translations: Record<Locale, Translation>;
  raw: any;
};

const emptyTranslation = (): Translation => ({
  name: "", shortDescription: "", description: "", fullDescription: "",
  highlights: "", travelInformation: "", whatToBring: "", safetyInformation: "",
  seoTitle: "", seoDescription: "",
});

function blankTranslations(): Record<Locale, Translation> {
  return { fi: emptyTranslation(), en: emptyTranslation(), es: emptyTranslation() };
}

function normalize(kind: Kind, raw: any): Item {
  const translations = blankTranslations();
  const list = kind === "destination" ? raw.destination_translations : kind === "property" ? raw.property_translations : raw.experience_translations;
  for (const t of list || []) {
    const locale = (t.language_code || t.locale) as Locale;
    if (!["fi", "en", "es"].includes(locale)) continue;
    translations[locale] = {
      ...translations[locale],
      name: t.name || t.title || "",
      shortDescription: t.short_description || "",
      description: t.description || "",
      fullDescription: t.full_description || "",
      highlights: t.highlights || "",
      travelInformation: t.travel_information || "",
      whatToBring: t.what_to_bring || "",
      safetyInformation: t.safety_information || "",
      seoTitle: t.seo_title || "",
      seoDescription: t.seo_description || "",
    };
  }
  if (kind === "property") {
    for (const locale of ["fi","en","es"] as Locale[]) {
      const t = (raw.property_translations || []).find((x:any) => x.locale === locale);
      if (t) {
        translations[locale].name = t.name || "";
        translations[locale].shortDescription = t.short_description || "";
        translations[locale].description = t.description || "";
        translations[locale].seoTitle = t.seo_title || "";
        translations[locale].seoDescription = t.seo_description || "";
      }
    }
  }
  if (kind === "destination") {
    for (const locale of ["fi","en","es"] as Locale[]) {
      translations[locale].seoTitle = raw["seo_title_"+locale] || "";
      translations[locale].seoDescription = raw["seo_description_"+locale] || "";
    }
  }
  const title = translations.fi.name || translations.fi.fullDescription.slice(0, 60) || raw.slug;
  return { id: String(raw.id), kind, slug: raw.slug, title, status: raw.status || "draft", region: raw.region || "", translations, raw };
}

export default function ContentStudioPage() {
  const [kind, setKind] = useState<Kind>("destination");
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);
  const [locale, setLocale] = useState<Locale>("fi");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [search, setSearch] = useState("");
  const [media, setMedia] = useState<any[]>([]);
  const [showMedia, setShowMedia] = useState(false);
  const [mediaQuery, setMediaQuery] = useState("");

  const load = useCallback(async () => {
    setError("");
    const endpoint = kind === "destination" ? "/api/admin/destinations" : kind === "property" ? "/api/admin/properties" : "/api/admin/experiences";
    const r = await fetch(endpoint, { cache: "no-store" });
    const b = await r.json();
    if (!r.ok) throw new Error(b.error || "Sisältöä ei voitu ladata.");
    const source = kind === "destination" ? b.destinations : kind === "property" ? b.properties : b.experiences;
    const normalized = (source || []).map((x:any) => normalize(kind, x));
    setItems(normalized);
    return normalized;
  }, [kind]);

  const loadMedia = useCallback(async () => {
    const r = await fetch("/api/admin/media", { cache: "no-store" });
    const b = await r.json();
    if (!r.ok) throw new Error(b.error || "Kuvapankkia ei voitu ladata.");
    setMedia(b.media || []);
  }, []);

  useEffect(() => {
    setSelected(null);
    Promise.all([load(), loadMedia()]).catch(e => setError(e instanceof Error ? e.message : "Lataus epäonnistui."));
  }, [kind, load, loadMedia]);

  const filtered = useMemo(() => items.filter(x =>
    (x.title + " " + x.slug + " " + x.region).toLowerCase().includes(search.toLowerCase())
  ), [items, search]);

  function updateTranslation(field: keyof Translation, value: string) {
    if (!selected) return;
    setSelected({ ...selected, translations: {
      ...selected.translations,
      [locale]: { ...selected.translations[locale], [field]: value }
    }});
  }

  async function translateAll() {
    if (!selected) return;
    const fi = selected.translations.fi;
    if (!fi.name.trim()) return setError("Täytä ensin suomenkielinen nimi/otsikko.");
    setBusy(true); setError(""); setNotice("");
    try {
      const fields: Array<[keyof Translation, "travel"|"seo"|"button"|"general"]> = [
        ["name","travel"],["shortDescription","travel"],["description","travel"],["fullDescription","travel"],
        ["highlights","travel"],["travelInformation","travel"],["whatToBring","travel"],["safetyInformation","travel"],
        ["seoTitle","seo"],["seoDescription","seo"]
      ];
      const next = { ...selected.translations, en: { ...selected.translations.en }, es: { ...selected.translations.es } };
      for (const [field, context] of fields) {
        const source = fi[field];
        if (!source.trim()) continue;
        const tr = await translateFinnishText(source, context);
        next.en[field] = tr.english;
        next.es[field] = tr.spanish;
      }
      setSelected({ ...selected, translations: next });
      setNotice("EN- ja ES-luonnokset luotu. Tarkista ne ennen tallennusta.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Käännös epäonnistui.");
    } finally { setBusy(false); }
  }

  async function save() {
    if (!selected) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const t = selected.translations;
      let body:any;
      let endpoint = "";
      if (selected.kind === "destination") {
        endpoint = "/api/admin/destinations";
        body = {
          id: Number(selected.id), slug: selected.slug, region: selected.region,
          heroImageUrl: selected.raw.hero_image_url,
          publishAt: selected.raw.publish_at || null,
          status: selected.status === "published" ? "published" : selected.status === "archived" ? "archived" : "draft",
          translations: {
            fi: { name:t.fi.name, shortDescription:t.fi.shortDescription, fullDescription:t.fi.fullDescription, highlights:t.fi.highlights, travelInformation:t.fi.travelInformation },
            en: { name:t.en.name, shortDescription:t.en.shortDescription, fullDescription:t.en.fullDescription, highlights:t.en.highlights, travelInformation:t.en.travelInformation },
            es: { name:t.es.name, shortDescription:t.es.shortDescription, fullDescription:t.es.fullDescription, highlights:t.es.highlights, travelInformation:t.es.travelInformation }
          },
          seo: { fi:{title:t.fi.seoTitle,description:t.fi.seoDescription}, en:{title:t.en.seoTitle,description:t.en.seoDescription}, es:{title:t.es.seoTitle,description:t.es.seoDescription} },
          mediaIds:(selected.raw.destination_media||[]).map((x:any)=>x.media?.id).filter(Boolean)
        };
      } else if (selected.kind === "property") {
        endpoint = "/api/admin/properties";
        body = {
          id:selected.id, slug:selected.slug, propertyType:selected.raw.property_type, region:selected.raw.region,
          maxGuests:selected.raw.max_guests, bedrooms:selected.raw.bedrooms, bathrooms:selected.raw.bathrooms,
          basePriceEur:selected.raw.base_price_eur, providerName:selected.raw.provider_name, providerUrl:selected.raw.provider_url,
          featured:selected.raw.featured, status:selected.status === "published" ? "published" : selected.status === "archived" ? "archived" : "draft",
          mediaIds:Array.from(new Set([selected.raw.selected_media_id,...(selected.raw.property_media||[]).map((x:any)=>x.media?.id).filter(Boolean)].filter(Boolean))),
          translations:{
            fi:{name:t.fi.name,shortDescription:t.fi.shortDescription,description:t.fi.description,locationName:selected.raw.property_translations?.find((x:any)=>x.locale==="fi")?.location_name,seoTitle:t.fi.seoTitle,seoDescription:t.fi.seoDescription},
            en:{name:t.en.name,shortDescription:t.en.shortDescription,description:t.en.description,locationName:selected.raw.property_translations?.find((x:any)=>x.locale==="en")?.location_name,seoTitle:t.en.seoTitle,seoDescription:t.en.seoDescription},
            es:{name:t.es.name,shortDescription:t.es.shortDescription,description:t.es.description,locationName:selected.raw.property_translations?.find((x:any)=>x.locale==="es")?.location_name,seoTitle:t.es.seoTitle,seoDescription:t.es.seoDescription}
          }
        };
      } else {
        endpoint = "/api/admin/experiences";
        body = {
          id:Number(selected.id), destinationId:selected.raw.destination_id, categoryId:selected.raw.category_id, slug:selected.slug,
          durationMinutes:selected.raw.duration_minutes,minGroupSize:selected.raw.min_group_size,maxGroupSize:selected.raw.max_group_size,
          difficultyLevel:selected.raw.difficulty_level,status:selected.status === "published" ? "published" : selected.status === "archived" ? "archived" : "draft",
          mediaIds:Array.from(new Set([selected.raw.selected_media_id,...(selected.raw.experience_media||[]).map((x:any)=>x.media?.id).filter(Boolean)].filter(Boolean))),
          pricing:selected.raw.pricing_rules?.[0] ? {basePriceEur:selected.raw.pricing_rules[0].base_price_eur,adultPriceEur:selected.raw.pricing_rules[0].adult_price_eur,childPriceEur:selected.raw.pricing_rules[0].child_price_eur} : undefined,
          translations:{
            fi:{title:t.fi.name,shortDescription:t.fi.shortDescription,fullDescription:t.fi.fullDescription,whatToBring:t.fi.whatToBring,safetyInformation:t.fi.safetyInformation},
            en:{title:t.en.name,shortDescription:t.en.shortDescription,fullDescription:t.en.fullDescription,whatToBring:t.en.whatToBring,safetyInformation:t.en.safetyInformation},
            es:{title:t.es.name,shortDescription:t.es.shortDescription,fullDescription:t.es.fullDescription,whatToBring:t.es.whatToBring,safetyInformation:t.es.safetyInformation}
          }
        };
      }
      const r = await fetch(endpoint, { method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
      const b = await r.json();
      if (!r.ok) throw new Error(b.error || "Tallennus epäonnistui.");
      setNotice("Sisältö tallennettu.");
      const refreshedItems = await load();
      const refreshed = refreshedItems.find(x => x.id === selected.id);
      if (refreshed) setSelected(refreshed);
    } catch(e) { setError(e instanceof Error ? e.message : "Tallennus epäonnistui."); }
    finally { setBusy(false); }
  }

  function selectMedia(id: string) {
    if (!selected) return;
    const raw = { ...selected.raw };
    const image = media.find(m => m.id === id);
    if (!image) return;
    raw.hero_image_url = image.url;
    raw.selected_media_id = id;
    setSelected({ ...selected, raw });
    setShowMedia(false);
  }

  const tr = selected?.translations[locale];
  const fields = selected?.kind === "destination"
    ? [["name","Nimi"],["shortDescription","Lyhyt kuvaus"],["fullDescription","Kuvaus"],["highlights","Kohokohdat"],["travelInformation","Matkatieto"],["seoTitle","SEO-otsikko"],["seoDescription","SEO-kuvaus"]]
    : selected?.kind === "property"
    ? [["name","Nimi"],["shortDescription","Lyhyt kuvaus"],["description","Kuvaus"],["seoTitle","SEO-otsikko"],["seoDescription","SEO-kuvaus"]]
    : [["name","Otsikko"],["shortDescription","Lyhyt kuvaus"],["fullDescription","Kuvaus"],["whatToBring","Mitä mukaan"],["safetyInformation","Turvallisuus"]];

  return <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-700">CMS / Content Studio</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">Sisältöstudio</h1>
          <p className="mt-2 max-w-3xl text-slate-500">Muokkaa FI-, EN- ja ES-sisältöä samasta näkymästä. Suomi toimii lähdetekstinä ja AI tekee käännösluonnokset.</p>
        </div>
        <Link href="/admin/cms" className="font-semibold text-emerald-700">← CMS</Link>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {([["destination","Matkakohteet"],["property","Majoitukset"],["experience","Elämykset"]] as [Kind,string][]).map(([k,label]) =>
          <button key={k} onClick={()=>setKind(k)} className={kind===k?"rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white":"rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200"}>{label}</button>
        )}
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[330px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Hae sisältöä…" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"/>
          <div className="mt-4 space-y-2">
            {filtered.map(item=><button key={item.id} onClick={()=>{setSelected(item);setLocale("fi");setError("");setNotice("")}} className={"w-full rounded-xl border p-3 text-left "+(selected?.id===item.id?"border-emerald-400 bg-emerald-50":"border-slate-200 hover:border-emerald-200")}>
              <div className="flex items-center justify-between gap-2"><span className="font-semibold text-slate-900">{item.title}</span><span className="text-[10px] uppercase text-slate-400">{item.status}</span></div>
              <p className="mt-1 text-xs text-slate-500">/{item.slug}{item.region ? " · "+item.region : ""}</p>
            </button>)}
            {!filtered.length && <p className="p-4 text-sm text-slate-500">Ei sisältöä.</p>}
          </div>
        </aside>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {!selected ? <div className="flex min-h-[420px] items-center justify-center text-center"><div><div className="text-5xl">✦</div><h2 className="mt-4 text-xl font-semibold">Valitse sisältö</h2><p className="mt-2 text-slate-500">Valitse vasemmalta kohde, majoitus tai elämys.</p></div></div> :
          <>
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{selected.kind} · {selected.slug}</p><h2 className="mt-1 text-2xl font-bold">{selected.title}</h2></div>
              <div className="flex flex-wrap gap-2">
                {(["fi","en","es"] as Locale[]).map(l=><button key={l} onClick={()=>setLocale(l)} className={locale===l?"rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white":"rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"}>{l==="fi"?"🇫🇮 FI":l==="en"?"🇬🇧 EN":"🇪🇸 ES"}</button>)}
                <button disabled={busy} onClick={translateAll} className="rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50">{busy?"Käsitellään…":"✨ Käännä kaikki"}</button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-slate-600">Käännösten tila:</span>
              {(["fi","en","es"] as Locale[]).map(l=>{const count=Object.values(selected.translations[l]).filter(Boolean).length; const total=Object.keys(selected.translations[l]).length; return <span key={l} className={"rounded-full px-3 py-1 text-xs font-semibold "+(count===total?"bg-emerald-100 text-emerald-800":count?"bg-amber-100 text-amber-800":"bg-red-100 text-red-700")}>{l.toUpperCase()} {count}/{total}</span>})}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div><p className="text-sm font-semibold text-slate-900">Pääkuva</p><p className="text-xs text-slate-500">Valitse kuva keskitetystä kuvapankista.</p></div>
                <button type="button" onClick={()=>setShowMedia(!showMedia)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">{showMedia?"Sulje kuvapankki":"Valitse kuva"}</button>
              </div>
              {selected.raw.hero_image_url && <div className="mt-4 overflow-hidden rounded-xl bg-slate-200"><div className="relative h-52 w-full"><Image src={selected.raw.hero_image_url} alt="" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" /></div></div>}
              {showMedia && <><input value={mediaQuery} onChange={e=>setMediaQuery(e.target.value)} placeholder="Hae kuvasta…" className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"/><div className="mt-3 grid max-h-72 grid-cols-2 gap-3 overflow-auto sm:grid-cols-4">{media.filter(m=>(m.filename+" "+(m.alt_fi||"")).toLowerCase().includes(mediaQuery.toLowerCase())).map(m=><button type="button" key={m.id} onClick={()=>selectMedia(m.id)} className="overflow-hidden rounded-xl border border-slate-200 bg-white text-left hover:border-emerald-400"><div className="relative aspect-[4/3] w-full"><Image src={m.url} alt={m.alt_fi || m.filename} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" /></div><span className="block truncate p-2 text-xs font-medium">{m.filename}</span></button>)}</div></>}
            </div>

            <div className="mt-6 grid gap-5">
              {fields.map(([field,label])=><label key={field} className="grid gap-2 text-sm font-semibold text-slate-700">
                {label}{(field==="fullDescription"||field==="description"||field==="travelInformation"||field==="highlights"||field==="safetyInformation"||field==="whatToBring") ?
                  <textarea value={String((tr as any)?.[field]||"")} onChange={e=>updateTranslation(field as keyof Translation,e.target.value)} rows={field==="fullDescription"||field==="description"?8:4} className="rounded-xl border border-slate-200 px-4 py-3 font-normal leading-6 outline-none focus:border-emerald-500"/>
                  : <input value={String((tr as any)?.[field]||"")} onChange={e=>updateTranslation(field as keyof Translation,e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-emerald-500"/>}
              </label>)}
            </div>

            {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
            {notice && <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">{notice}</p>}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
              <label className="flex items-center gap-2 text-sm font-semibold"><span>Tila</span>
                <select value={selected.status} onChange={e=>setSelected({...selected,status:e.target.value})} className="rounded-lg border px-3 py-2">
                  <option value="draft">Luonnos</option><option value="published">Julkaistu</option><option value="archived">Arkistoitu</option>
                </select>
              </label>
              <button disabled={busy} onClick={save} className="rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white disabled:opacity-50">{busy?"Tallennetaan…":"Tallenna sisältö"}</button>
            </div>
          </>}
        </section>
      </div>
    </div>
  </main>;
}
