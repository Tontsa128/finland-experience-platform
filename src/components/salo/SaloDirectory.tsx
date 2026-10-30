import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Tag } from "lucide-react";
import type { Locale } from "@/types";
import { getSaloProviderCategories, getSaloProviderImage, saloProviders, type SaloProvider } from "@/lib/salo";

const labels = {
  fi: { tourism: "Matkailuinfo", stay: "Majoitus", experience: "Elämykset", nature: "Luonto", food: "Ruoka ja kahvilat", localFood: "Lähiruoka ja maatilapuodit", shopping: "Ostokset ja käsityö", wellbeing: "Hyvinvointi ja sauna", culture: "Kulttuuri ja historia", events: "Tapahtumat ja juhlatilat", archipelago: "Meri ja saaristo", price: "Hinta", visit: "Siirry palveluntarjoajalle", guide: "Avaa virallinen opas", details: "Katso kohdesivu" },
  es: { tourism: "Información turística", stay: "Alojamiento", experience: "Experiencias", nature: "Naturaleza", food: "Gastronomía y cafeterías", localFood: "Productores locales y tiendas de granja", shopping: "Compras y artesanía", wellbeing: "Bienestar y sauna", culture: "Cultura e historia", events: "Eventos y espacios para celebraciones", archipelago: "Mar y archipiélago", price: "Precio", visit: "Ir al proveedor", guide: "Abrir guía oficial", details: "Ver ficha del lugar" },
  en: { tourism: "Tourism", stay: "Accommodation", experience: "Experiences", nature: "Nature", food: "Food & cafés", localFood: "Local food & farm shops", shopping: "Shopping & crafts", wellbeing: "Wellbeing & sauna", culture: "Culture & history", events: "Events & venues", archipelago: "Sea & archipelago", price: "Price", visit: "Visit provider", guide: "Open official guide", details: "View provider page" },
} as const;

export function SaloDirectory({ locale, category, area }: { locale: Locale; category?: SaloProvider["category"]; area?: "mathildedal" | "teijo" | "kirjakkala" }) {
  const l = labels[locale];
  const photoCreditLabel = locale === "fi" ? "Kuva:" : locale === "es" ? "Foto:" : "Photo:";
  const mathildedalIds = new Set(["visit-mathildedal", "hotel-mathildedal", "mathildan-marina", "matilda-villas", "matri-house", "majoitus-mathildedal", "mathildedal-brewery", "ravintola-terho", "kaarnalaiva", "matildan-kesakauppa", "piironki-dock-helsinki", "ruukin-kehraamo", "second-chance-mathildedal", "vinttipuoti", "mathildedal-keskuspuisto", "mathildedal-meriuimapaikka", "chill-out-fishing", "meri-ruukin-lomakyla", "matildankartano", "lahiruokapuoti-puhti", "matilda-talo", "matildanjarven-sauna", "matildanjarven-kampat", "teijo-tentsile", "vicksbackinlahden-kota", "kylatalo-punaportti", "vuorovetten-jaatelo", "oyrilan-isontalon-lammastila"]);
  const teijoIds = new Set(["teijon-masuuni", "teijo-action-park", "teijo-national-park", "meri-teijo-golf", "matildanjarven-sauna", "matildanjarven-kampat", "teijo-tentsile", "teijon-kammari", "teijon-kirkko", "teijon-arkki", "teijon-juhlatila", "teijon-kylasauna", "vicksbackinlahden-kota", "kylatalo-punaportti"]);
  const kirjakkalaIds = new Set(["kirjakkalan-ruukkikyla", "valla-outdoors"]);
  const areaProviders = area === "mathildedal"
    ? saloProviders.filter((provider) => mathildedalIds.has(provider.id))
    : area === "teijo"
      ? saloProviders.filter((provider) => teijoIds.has(provider.id))
      : area === "kirjakkala"
        ? saloProviders.filter((provider) => kirjakkalaIds.has(provider.id))
        : saloProviders;
  const providers = category ? areaProviders.filter((provider) => getSaloProviderCategories(provider).includes(category)) : areaProviders;
  return (
    <section className="bg-brand-50 py-16 sm:py-24">
      <div className="container-narrow">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta">{area === "mathildedal" ? "Mathildedal · Salo" : area === "teijo" ? "Teijo · Salo" : area === "kirjakkala" ? "Kirjakkala · Teijo" : "Salo · Mathildedal · Teijo"}</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">
            {area === "mathildedal" ? (locale === "fi" ? "Mathildedalin paikat ja palvelut" : locale === "es" ? "Lugares y servicios de Mathildedal" : "Places and services in Mathildedal") : area === "teijo" ? (locale === "fi" ? "Teijon palvelut ja elämykset" : locale === "es" ? "Servicios y experiencias en Teijo" : "Services and experiences in Teijo") : area === "kirjakkala" ? (locale === "fi" ? "Kirjakkalan palvelut ja elämykset" : locale === "es" ? "Servicios y experiencias en Kirjakkala" : "Services and experiences in Kirjakkala") : (locale === "fi" ? "Löydä paikalliset palvelut" : locale === "es" ? "Descubre los proveedores locales" : "Discover local providers")}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {area === "mathildedal"
              ? (locale === "fi" ? "Tutustu majoitukseen, kylän palveluihin ja paikallisiin elämyksiin. Avaa jokaisen kohteen oma alasivu ja siirry sieltä suoraan palveluntarjoajan sivustolle." : locale === "es" ? "Descubre alojamientos, servicios del pueblo y experiencias locales. Abre la ficha de cada lugar y continúa directamente a la web del proveedor." : "Explore accommodation, village services and local experiences. Open each place’s own detail page and continue directly to the provider’s website.")
              : area === "teijo"
                ? (locale === "fi" ? "Tutustu ruukkikylän kulttuuriin, luontoon ja paikallisiin palveluihin. Varaus, maksaminen ja palvelun sopiminen hoidetaan suoraan palveluntarjoajan kanssa." : locale === "es" ? "Descubre la cultura del pueblo siderúrgico, la naturaleza y los servicios locales. Las reservas, los pagos y los acuerdos se gestionan directamente con cada proveedor." : "Explore the ironworks village's culture, nature and local services. Bookings, payments and service agreements are handled directly with each provider.")
                : area === "kirjakkala"
                ? (locale === "fi" ? "Kirjakkalan ruukkikylän majoitus-, sauna- ja ulkoilupalvelut sijaitsevat Hamarinjärven rannalla kansallispuiston reittien yhteydessä. Tarkista palvelut suoraan järjestäjältä." : locale === "es" ? "Los servicios de alojamiento, sauna y actividades al aire libre del pueblo siderúrgico de Kirjakkala están junto al lago Hamarinjärvi y las rutas del parque nacional. Confirma los detalles con el proveedor." : "Kirjakkala's accommodation, sauna and outdoor services sit beside Lake Hamarinjärvi and the national park trails. Confirm details directly with the provider.")
                : (locale === "fi" ? "Näe paikka ensin. Kun löydät kiinnostavan kohteen, siirryt suoraan palveluntarjoajan omalle sivulle. Emme ota varausta tai maksua vastaan täällä." : locale === "es" ? "Primero descubre el lugar. Cuando encuentres algo que te interese, continúa directamente al sitio del proveedor. No gestionamos la reserva ni el pago aquí." : "Discover the place first. When you find something you like, continue directly to the provider. We do not take the booking or payment here.")}
          </p>
        </div>

        <div className="space-y-12">
          {(category ? [category] : ["stay", "food", "localFood", "experience", "nature", "wellbeing", "culture", "events", "archipelago", "shopping", "tourism"] as const)
            .map((groupCategory) => ({
              category: groupCategory,
              items: providers.filter((provider) => getSaloProviderCategories(provider).includes(groupCategory)),
            }))
            .filter((group) => group.items.length > 0)
            .map((group) => (
              <section key={group.category} id={`salo-category-${group.category}`}>
                {!category ? (
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <h3 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">{l[group.category]}</h3>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">{group.items.length}</span>
                  </div>
                ) : null}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((provider) => (
                    <article key={provider.id} className="group overflow-hidden rounded-[1.75rem] bg-white shadow-soft">
                      {getSaloProviderImage(provider) ? (
                        <Link href={`/${locale}/providers/salo-${provider.id}`} aria-label={`${provider.nameByLocale?.[locale] || provider.name} — ${l.details}`} className="relative block aspect-[16/10] overflow-hidden bg-brand-100">
                          <Image src={getSaloProviderImage(provider)!} alt={provider.nameByLocale?.[locale] || provider.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                        </Link>
                      ) : (
                        <Link
                          href={`/${locale}/providers/salo-${provider.id}`}
                          aria-label={`${provider.nameByLocale?.[locale] || provider.name} — ${l.details}`}
                          className="flex aspect-[16/10] flex-col items-center justify-center gap-3 bg-brand-50 p-8 text-center text-brand-900 transition-colors hover:bg-brand-100"
                        >
                          <ExternalLink className="h-8 w-8 text-amber-700" />
                          <span className="text-sm font-semibold">{l.details}</span>
                        </Link>
                      )}
                      <div className="p-6">
                        <div className="text-xs font-bold uppercase tracking-[.16em] text-brand-600">{l[group.category]}</div>
                        <h3 className="mt-2 font-display text-2xl font-bold text-brand-950">{provider.nameByLocale?.[locale] || provider.name}</h3>
                        <p className="mt-3 leading-7 text-slate-600">{provider.description[locale]}</p>
                        {(provider.priceByLocale?.[locale] || (locale === "fi" ? provider.price : undefined)) ? (
                          <div className="mt-4 flex gap-2 rounded-2xl bg-brand-50 p-3 text-sm text-brand-900">
                            <Tag className="mt-0.5 h-4 w-4 shrink-0" />
                            <span><strong>{l.price}:</strong> {provider.priceByLocale?.[locale] || provider.price}</span>
                          </div>
                        ) : null}
                        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                          <Link href={`/${locale}/providers/salo-${provider.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-950 underline underline-offset-4">{l.details}</Link>
                          <a href={provider.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-brand-800">
                            {(provider.url.includes("visitsalo.fi") || provider.url.includes("visitmathildedal.fi") || provider.url.includes("luontoon.fi")) ? l.guide : l.visit}<ArrowUpRight className="h-4 w-4" />
                          </a>
                        </div>
                        {provider.imageCredit ? <p className="mt-4 text-[11px] text-slate-400">{photoCreditLabel} {provider.imageCredit}</p> : null}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
        </div>
      </div>
    </section>
  );
}
