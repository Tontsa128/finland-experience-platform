import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Käyttöehdot | Finland Experience",
  description: "Finland Experience -sivuston käyttöehdot ja palvelumalli.",
};

const copy = {
  fi: {
    eyebrow: "Finland Experience",
    title: "Käyttöehdot",
    purposeTitle: "Palvelun tarkoitus",
    purpose: "Finland Experience on inspiraatio-, kohde- ja palveluhakemisto. Sivusto esittelee matkakohteita, majoituksia ja elämyksiä sekä ohjaa käyttäjän tarvittaessa ulkoisen palveluntarjoajan omalle sivulle.",
    bookingTitle: "Varaukset ja maksut",
    booking: "Sivusto ei myy tässä palvelussa valmiita matkapaketteja eikä käsittele palveluntarjoajan varauksen maksua omassa checkout-järjestelmässä. Kun käyttäjä siirtyy palveluntarjoajalle, varaus, maksu, peruutukset ja sopimusasiat määräytyvät palveluntarjoajan omien järjestelmien ja ehtojen mukaan.",
    infoTitle: "Tiedot ja hinnat",
    info: "Kohteiden kuvaukset, hinnat, aukioloajat ja saatavuustiedot voivat muuttua. Käyttäjän tulee tarkistaa ajantasaiset tiedot palveluntarjoajalta ennen varausta.",
    linksTitle: "Ulkoiset linkit",
    links: "Sivustolla voi olla linkkejä kolmansien osapuolten verkkosivuille. Näiden sivujen sisältö, saatavuus ja ehdot kuuluvat kyseisten palveluntarjoajien vastuulle.",
    contentTitle: "Sisältö",
    content: "Sivuston tekstejä, kuvia, tunnuksia ja muuta sisältöä saa käyttää vain voimassa olevien oikeuksien ja käyttöehtojen mukaisesti. Kuvien ja palveluntarjoajien materiaalien oikeudet kuuluvat niiden oikeudenhaltijoille.",
    note: "Nämä ovat sivuston yleiset käyttöperiaatteet. Yrityskohtaiset yhteys- ja vastuuehdot on tarkistettava ja täydennettävä ennen lopullista tuotantojulkaisua.",
  },
  es: {
    eyebrow: "Finland Experience",
    title: "Términos de uso",
    purposeTitle: "Finalidad del servicio",
    purpose: "Finland Experience es una plataforma de inspiración, destinos y servicios. Presenta destinos, alojamientos y experiencias y, cuando corresponde, dirige al usuario al sitio del proveedor externo.",
    bookingTitle: "Reservas y pagos",
    booking: "El sitio no vende paquetes turísticos ni procesa el pago de una reserva del proveedor mediante un checkout propio. Al pasar al proveedor, la reserva, el pago, las cancelaciones y el contrato se rigen por los sistemas y condiciones del propio proveedor.",
    infoTitle: "Información y precios",
    info: "Las descripciones, precios, horarios y disponibilidad pueden cambiar. El usuario debe comprobar la información actual directamente con el proveedor antes de reservar.",
    linksTitle: "Enlaces externos",
    links: "El sitio puede enlazar con páginas de terceros. El contenido, la disponibilidad y las condiciones de esas páginas corresponden a sus respectivos proveedores.",
    contentTitle: "Contenido",
    content: "Los textos, imágenes, marcas y demás contenidos del sitio solo pueden utilizarse de acuerdo con los derechos y condiciones aplicables. Los derechos sobre imágenes y materiales de proveedores pertenecen a sus respectivos titulares.",
    note: "Estos son los principios generales de uso del sitio. Los datos de contacto y condiciones específicas de la empresa deben revisarse y completarse antes del lanzamiento definitivo.",
  },
  en: {
    eyebrow: "Finland Experience",
    title: "Terms of Use",
    purposeTitle: "Purpose of the service",
    purpose: "Finland Experience is an inspiration, destination and services platform. It presents destinations, accommodation and experiences and, where applicable, directs users to an external provider website.",
    bookingTitle: "Bookings and payments",
    booking: "The site does not sell package tours or process payment for a provider booking through its own checkout. Once a user moves to the provider, booking, payment, cancellations and contractual matters are governed by the provider's own systems and terms.",
    infoTitle: "Information and prices",
    info: "Descriptions, prices, opening hours and availability may change. Users should confirm current information directly with the provider before booking.",
    linksTitle: "External links",
    links: "The site may link to third-party websites. The content, availability and terms of those websites are the responsibility of their respective providers.",
    contentTitle: "Content",
    content: "Site text, images, branding and other content may only be used in accordance with applicable rights and terms. Rights in images and provider materials remain with their respective rights holders.",
    note: "These are the site's general use principles. Company-specific contact and liability terms must be reviewed and completed before final production launch.",
  },
} as const;

export default async function TermsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === "es" ? "es" : params.locale === "en" ? "en" : "fi";
  const t = copy[locale];
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">{t.eyebrow}</p>
      <h1 className="mt-2 text-4xl font-bold text-brand-950">{t.title}</h1>
      <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
        <section><h2 className="text-xl font-bold text-brand-950">{t.purposeTitle}</h2><p className="mt-2">{t.purpose}</p></section>
        <section><h2 className="text-xl font-bold text-brand-950">{t.bookingTitle}</h2><p className="mt-2">{t.booking}</p></section>
        <section><h2 className="text-xl font-bold text-brand-950">{t.infoTitle}</h2><p className="mt-2">{t.info}</p></section>
        <section><h2 className="text-xl font-bold text-brand-950">{t.linksTitle}</h2><p className="mt-2">{t.links}</p></section>
        <section><h2 className="text-xl font-bold text-brand-950">{t.contentTitle}</h2><p className="mt-2">{t.content}</p></section>
        <p className="rounded-2xl bg-amber-50 p-5 text-sm leading-7 text-amber-900">{t.note}</p>
      </div>
    </main>
  );
}
