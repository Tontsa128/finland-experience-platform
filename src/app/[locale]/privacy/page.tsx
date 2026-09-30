import type { Metadata } from "next";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const safeLocale: Locale = locale === "es" ? "es" : locale === "en" ? "en" : "fi";
  return buildLocalizedMetadata({
    locale: safeLocale,
    title: safeLocale === "es" ? "Privacidad | Finland Experience" : safeLocale === "en" ? "Privacy | Finland Experience" : "Tietosuoja | Finland Experience",
    description: safeLocale === "es" ? "Resumen de privacidad de Finland Experience." : safeLocale === "en" ? "Finland Experience privacy overview." : "Finland Experience -sivuston tietosuojan yhteenveto.",
    path: "privacy",
  });
}

const copy = {
  fi: {
    eyebrow: "Finland Experience",
    title: "Tietosuoja",
    intro: "Tämä sivu kuvaa Finland Experience -sivuston keskeiset tietojen käsittelytavat. Lopulliseen julkaisuversioon on lisättävä palvelun ylläpitäjän virallinen nimi, yhteystiedot ja muut yrityskohtaiset rekisterinpitäjätiedot.",
    dataTitle: "Mitä tietoja palvelu voi käsitellä?",
    data: "Yhteydenottolomakkeella annettuja tietoja, kuten nimeä, sähköpostiosoitetta ja viestiä voidaan käsitellä yhteydenoton hoitamista varten. Matkasuunnittelun ja concierge-palvelun lomakkeilla voidaan lisäksi käsitellä esimerkiksi matkan pituutta, henkilömäärää, budjettia, kiinnostuksen kohteita ja matkatoivetta.",
    aiTitle: "AI-palvelut",
    ai: "Matka-avustaja ja käännöstoiminnot käyttävät ulkoista AI-palvelua silloin, kun toiminto on ympäristömuuttujilla otettu käyttöön. Henkilötietoja ei pitäisi syöttää AI-kenttiin, ellei sitä ole erikseen tarkoitettu kyseisen toiminnon käyttöön.",
    cookiesTitle: "Evästeet",
    cookies: "Sivusto käyttää tällä hetkellä välttämätöntä asetusevästettä, jolla muistetaan evästevalintasi. Erillisiä analytiikka- tai markkinointievästeitä ei oteta käyttöön ilman, että ne toteutetaan ja kuvataan tässä selosteessa.",
    providerTitle: "Palveluntarjoajien varaukset",
    provider: "Finland Experience ohjaa käyttäjän ulkoisen palveluntarjoajan omalle sivulle. Varaus, maksu ja sopimus tehdään palveluntarjoajan kanssa tämän omien järjestelmien ja ehtojen mukaisesti.",
    note: "Ennen tuotantojulkaisua tähän sivuun on täydennettävä yrityskohtaiset rekisterinpitäjä-, yhteydenotto-, säilytys- ja oikeustiedot asiantuntevan tarkistuksen perusteella.",
  },
  es: {
    eyebrow: "Finland Experience",
    title: "Privacidad",
    intro: "Esta página resume cómo puede tratar datos el sitio Finland Experience. Antes del lanzamiento definitivo deben añadirse el nombre legal del responsable del tratamiento, sus datos de contacto y la información específica de la empresa.",
    dataTitle: "¿Qué datos puede tratar el sitio?",
    data: "Los formularios de contacto pueden tratar datos como nombre, correo electrónico y mensaje para gestionar la solicitud. Los formularios de planificación y concierge pueden incluir además duración del viaje, número de personas, presupuesto, intereses y preferencias de viaje.",
    aiTitle: "Servicios de IA",
    ai: "El asistente de viajes y las funciones de traducción utilizan un servicio externo de IA cuando están habilitados mediante las variables de entorno correspondientes. No deben introducirse datos personales en los campos de IA salvo que la función esté diseñada expresamente para ello.",
    cookiesTitle: "Cookies",
    cookies: "El sitio utiliza actualmente una cookie necesaria para recordar la elección de cookies. No se activan cookies de analítica o marketing hasta que dichas funciones se implementen y se describan en esta política.",
    providerTitle: "Reservas con proveedores",
    provider: "Finland Experience dirige al usuario al sitio del proveedor externo. La reserva, el pago y el contrato se realizan directamente con el proveedor según sus propios sistemas y condiciones.",
    note: "Antes del lanzamiento definitivo, esta página debe completarse con los datos legales del responsable, contacto, conservación y derechos, tras una revisión profesional.",
  },
  en: {
    eyebrow: "Finland Experience",
    title: "Privacy",
    intro: "This page summarises the main ways the Finland Experience site may handle data. Before final production launch, the legal name of the data controller, contact details and company-specific information must be added.",
    dataTitle: "What data may the site handle?",
    data: "Contact forms may handle information such as name, email address and message to manage the enquiry. Planning and concierge forms may also include trip length, number of people, budget, interests and travel preferences.",
    aiTitle: "AI services",
    ai: "The travel advisor and translation features use an external AI service when enabled through the relevant environment variables. Personal data should not be entered into AI fields unless the specific feature is expressly designed for it.",
    cookiesTitle: "Cookies",
    cookies: "The site currently uses one necessary preference cookie to remember the cookie choice. Analytics and marketing cookies are not enabled unless those functions are implemented and described in this policy.",
    providerTitle: "Bookings with providers",
    provider: "Finland Experience directs users to external provider websites. Booking, payment and the contract are completed directly with the provider under the provider's own systems and terms.",
    note: "Before final production launch, this page must be completed with the legal controller details, contact information, retention periods and data-subject rights following a professional review.",
  },
} as const;

export default async function PrivacyPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === "es" ? "es" : params.locale === "en" ? "en" : "fi";
  const t = copy[locale];
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">{t.eyebrow}</p>
      <h1 className="mt-2 text-4xl font-bold text-brand-950">{t.title}</h1>
      <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
        <p>{t.intro}</p>
        <section><h2 className="text-xl font-bold text-brand-950">{t.dataTitle}</h2><p className="mt-2">{t.data}</p></section>
        <section><h2 className="text-xl font-bold text-brand-950">{t.aiTitle}</h2><p className="mt-2">{t.ai}</p></section>
        <section><h2 className="text-xl font-bold text-brand-950">{t.cookiesTitle}</h2><p className="mt-2">{t.cookies}</p></section>
        <section><h2 className="text-xl font-bold text-brand-950">{t.providerTitle}</h2><p className="mt-2">{t.provider}</p></section>
        <p className="rounded-2xl bg-amber-50 p-5 text-sm leading-7 text-amber-900">{t.note}</p>
      </div>
    </main>
  );
}
