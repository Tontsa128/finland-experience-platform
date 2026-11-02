import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Coffee, Compass, Leaf, MapPinned } from "lucide-react";
import type { Locale } from "@/types";
import { saloProviders, type SaloProvider } from "@/lib/salo";
import { areaProviderIds, type SaloArea } from "@/lib/salo-areas";

const categoryOrder: SaloProvider["category"][] = ["food", "stay", "experience", "nature", "tourism"];

const categoryCopy = {
  fi: {
    food: { title: "Ruoka ja kahvilat", description: "Ravintolat, kahvilat, paikalliset herkut ja lähiruoan tuottajat." },
    stay: { title: "Majoitus", description: "Hotellit, mökit, huvilat ja muut alueen yöpymispaikat." },
    experience: { title: "Tekemistä ja aktiviteetit", description: "Retket, elämykset, kulttuuri ja aktiivinen tekeminen." },
    nature: { title: "Luonto ja ulkoilu", description: "Luontokohteet, retkeily, vesillä liikkuminen ja ulkoilupalvelut." },
    tourism: { title: "Palvelut ja matkailuinfo", description: "Paikallinen matkailuneuvonta, oppaat ja kävijää auttavat palvelut." },
  },
  en: {
    food: { title: "Food and cafés", description: "Restaurants, cafés, local flavours and nearby food producers." },
    stay: { title: "Accommodation", description: "Hotels, cottages, villas and other places to stay." },
    experience: { title: "Things to do and activities", description: "Guided outings, experiences, culture and active days." },
    nature: { title: "Nature and outdoors", description: "Nature sites, hiking, water activities and outdoor services." },
    tourism: { title: "Local services and visitor information", description: "Local tourism information, guides and helpful visitor services." },
  },
  es: {
    food: { title: "Gastronomía y cafeterías", description: "Restaurantes, cafeterías, sabores locales y productores de la zona." },
    stay: { title: "Alojamiento", description: "Hoteles, cabañas, villas y otros alojamientos." },
    experience: { title: "Qué hacer y actividades", description: "Excursiones, experiencias, cultura y actividades." },
    nature: { title: "Naturaleza y aire libre", description: "Espacios naturales, senderismo, actividades acuáticas y servicios al aire libre." },
    tourism: { title: "Servicios e información turística", description: "Información turística local, guías y servicios útiles para visitantes." },
  },
} as const;

const categoryIcons = {
  food: Coffee,
  stay: BedDouble,
  experience: Compass,
  nature: Leaf,
  tourism: MapPinned,
} as const;

export function SaloAreaCategoryGrid({ locale, area }: { locale: Locale; area: SaloArea }) {
  const areaIds = areaProviderIds[area];
  const areaProviders = saloProviders.filter((provider) => areaIds.includes(provider.id));
  const cards = categoryOrder.flatMap((category) => {
    const providers = areaProviders.filter((provider) => provider.category === category);
    if (!providers.length) return [];
    const item = categoryCopy[locale][category];
    const featuredImage = providers.find((provider) => provider.image);
    return [{ category, providers, item, image: featuredImage?.image, imageCredit: featuredImage?.imageCredit, imageSource: featuredImage?.imageSource || featuredImage?.url }];
  });

  return (
    <section className="bg-brand-50 py-14 sm:py-20">
      <div className="container-narrow">
        <div className="mb-9 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta">
            {locale === "fi" ? "Tutustu palveluihin" : locale === "es" ? "Explora los servicios" : "Explore local services"}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">
            {locale === "fi" ? "Valitse mitä haluat löytää" : locale === "es" ? "Elige lo que quieres descubrir" : "Choose what you want to discover"}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {locale === "fi" ? "Palvelut on jaettu omille sivuilleen. Avaa kategoria nähdäksesi alueen palveluntarjoajat, esittelyt ja yhteydet." : locale === "es" ? "Los servicios tienen páginas organizadas por categoría. Abre una categoría para ver proveedores, descripciones y enlaces." : "Services are organised on their own category pages. Open a category to see local providers, descriptions and links."}
          </p>
        </div>
        {cards.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map(({ category, providers, item, image, imageCredit, imageSource }) => {
              const Icon = categoryIcons[category];
              return (
                <Link key={category} href={`/${locale}/salo/${area}/${category}`} className="group overflow-hidden rounded-[1.75rem] border border-brand-100 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand-100">
                    {image ? <Image src={image} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center bg-brand-950"><Icon className="h-12 w-12 text-gold-300" /></div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/65 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-brand-950">
                      {providers.length} {locale === "fi" ? "kohdetta" : locale === "es" ? "lugares" : "listings"}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-brand-700" />
                      <h3 className="font-display text-2xl font-bold text-brand-950">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                    {imageCredit && imageSource ? <p className="mt-3 text-[11px] text-slate-400">{locale === "fi" ? "Kuvan lähde:" : locale === "es" ? "Fuente de imagen:" : "Image source:"} <a href={imageSource} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand-800">{imageCredit}</a></p> : null}
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">
                      {locale === "fi" ? "Katso palvelut" : locale === "es" ? "Ver los servicios" : "View listings"}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-brand-200 bg-white p-6 text-sm leading-7 text-slate-600">
            {locale === "fi" ? "Tämän alueen palveluntarjoajia lisätään parhaillaan. Tarkista alueen viralliset matkailutiedot." : locale === "es" ? "Estamos incorporando proveedores de esta zona. Consulta también la información turística oficial." : "Local providers for this area are being added. Please also check the official visitor information."}
          </p>
        )}
      </div>
    </section>
  );
}
