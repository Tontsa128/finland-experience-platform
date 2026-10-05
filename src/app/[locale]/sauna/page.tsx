import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Flame, HeartPulse, Leaf, Moon, ShieldCheck } from "lucide-react";
import { photoLibrary } from "@/lib/photo-library";
import { buildLocalizedMetadata } from "@/lib/seo";
import type { Locale } from "@/types";

const gallery = [
  {
    image: photoLibrary.saunaWhisking,
    title: { fi: "Vihta ja löyly", es: "Vihta y löyly", en: "Whisking & löyly" },
    text: {
      fi: "Perinteinen vihtominen kuuluu elävään saunakulttuuriin.",
      es: "La vihta forma parte de la cultura viva de la sauna finlandesa.",
      en: "Traditional whisking is part of Finland's living sauna culture.",
    },
    credit: "Ville Kurki",
    source: "https://commons.wikimedia.org/wiki/File:Traditional_Finnish_sauna_whisking_and_l%C3%B6yly.jpg",
  },
  {
    image: photoLibrary.saunaTraditionalSmoke,
    title: { fi: "Perinteinen savusauna", es: "Sauna de humo tradicional", en: "Traditional smoke sauna" },
    text: {
      fi: "Savusauna on suomalaisen saunaperinteen vanha ja tunnistettava muoto.",
      es: "La sauna de humo es una forma antigua y reconocible de la tradición finlandesa.",
      en: "The smoke sauna is an old and distinctive form of Finnish sauna tradition.",
    },
    credit: "JP Korpi-Vartiainen",
    source: "https://commons.wikimedia.org/wiki/File:Traditional_Finnish_smoke_sauna.jpg",
  },
  {
    image: photoLibrary.saunaCottage,
    title: { fi: "Mökki ja järvi", es: "Cabaña junto al lago", en: "Cottage by the lake" },
    text: {
      fi: "Sauna ja mökki kuuluvat suomalaisessa kesässä usein samaan maisemaan.",
      es: "En verano, la sauna y la cabaña suelen formar parte del mismo paisaje.",
      en: "In Finnish summer, sauna and cottage often belong to the same landscape.",
    },
    credit: "Kospo75",
    source: "https://commons.wikimedia.org/wiki/File:Finnish_summer_cottage_and_a_lake_in_Keuruu.jpg",
  },
  {
    image: photoLibrary.sauna,
    title: { fi: "Moderni sauna-spa", es: "Sauna-spa moderna", en: "Modern sauna spa" },
    text: {
      fi: "Löyly Helsingissä näyttää, kuinka saunakulttuuri elää modernissa kaupunkiympäristössä.",
      es: "Löyly en Helsinki muestra cómo la cultura de sauna vive también en un entorno urbano moderno.",
      en: "Löyly in Helsinki shows how sauna culture also lives in a modern urban setting.",
    },
    credit: "Sandun De Silva",
    source: "https://commons.wikimedia.org/wiki/File:L%C3%B6yly_Sauna,_Helsinki_(2022).jpg",
  },
  {
    image: photoLibrary.saunaBoat,
    title: { fi: "Saunalautta", es: "Sauna flotante", en: "Floating sauna" },
    text: {
      fi: "Sauna ja vesi kohtaavat saunalautassa – suomalainen yhdistelmä parhaimmillaan.",
      es: "La sauna y el agua se unen en una sauna flotante.",
      en: "Sauna and water meet in a floating sauna.",
    },
    credit: "Santeri Viinamäki",
    source: "https://commons.wikimedia.org/wiki/File:Sauna_boat_20180802.jpg",
  },
  {
    image: photoLibrary.saunaBucketVasta,
    title: { fi: "Kiulu, kauha ja vihta", es: "Cubo, cucharón y vihta", en: "Bucket, ladle & vihta" },
    text: {
      fi: "Vesi, kivet, löylykauha ja vihta ovat saunan pieniä mutta tärkeitä symboleja.",
      es: "Agua, piedras, cucharón y vihta son pequeños pero importantes símbolos de la sauna.",
      en: "Water, stones, ladle and vihta are small but important sauna symbols.",
    },
    credit: "Santeri Viinamäki",
    source: "https://commons.wikimedia.org/wiki/File:Sauna_bucket_and_vihta_20180814.jpg",
  },
  {
    image: photoLibrary.saunaVasta,
    title: { fi: "Koivuvihta", es: "Vihta de abedul", en: "Birch vihta" },
    text: {
      fi: "Koivuvihdalla ihoa voidaan kevyesti vastoa ja tuoda saunaan metsän tuoksua.",
      es: "La vihta de abedul se usa suavemente para estimular la piel y aportar aroma.",
      en: "A birch vihta can be used gently to stimulate the skin and bring a forest scent.",
    },
    credit: "Michael Niederdorfer",
    source: "https://commons.wikimedia.org/wiki/File:Finnish_Vasta_(Vihta).jpg",
  },
  {
    image: photoLibrary.saunaRajaportti,
    title: { fi: "Rajaportin sauna", es: "Sauna de Rajaportti", en: "Rajaportti sauna" },
    text: {
      fi: "Sauna on myös kaupunkikulttuuria ja yhdessä jaettua arkea.",
      es: "La sauna también es cultura urbana y una experiencia compartida.",
      en: "Sauna is also urban culture and a shared everyday tradition.",
    },
    credit: "Visa580",
    source: "https://commons.wikimedia.org/wiki/File:Rajaportti_sauna1.jpg",
  },
  {
    image: photoLibrary.herrankukkaroSauna,
    title: { fi: "Sauna saaristossa", es: "Sauna en el archipiélago", en: "Sauna in the archipelago" },
    text: {
      fi: "Herrankukkaron saaristoympäristössä sauna, meri ja paikallinen tunnelma kohtaavat.",
      es: "En Herrankukkaro, sauna, mar y archipiélago forman una experiencia.",
      en: "At Herrankukkaro, sauna, sea and archipelago become one experience.",
    },
    credit: "Herrankukkaro",
    source: "https://www.herrankukkaro.fi/kokous/saunat-ja-kylvyt",
  },
];

const copy = {
  fi: {
    eyebrow: "SAUNA · SUOMI",
    title: "Suomalainen sauna ei ole vain kuuma huone.",
    intro: "Se on paikka rauhoittua, peseytyä, kohdata muita ja palata omaan rytmiin. Tällä sivulla sukellamme saunan juuriin, perinteisiin, löylyyn, vihtomiseen ja siihen, mitä tutkimus oikeasti kertoo hyvinvoinnista.",
    heritage: "Elävä kulttuuriperintö",
    heritageText: "Saunakulttuuri Suomessa on merkitty UNESCO:n aineettoman kulttuuriperinnön edustavaan luetteloon. Perinne elää kodeissa, mökeillä, yleisissä saunoissa ja uusissa kaupunkisaunoissa.",
    rootsTitle: "Saunan juuret",
    rootsText: "Suomalainen sauna on osa arkista kulttuuria paljon vanhempaa kuin nykyiset sähkökiukaat. Savusauna on yksi perinteen vanhoista muodoista: puut lämmittävät kiukaan kivet, savu tuulettuu ennen kylpemistä ja lämpö jää pitkäksi aikaa tilaan. Sauna on ollut myös puhtauden, levon, yhteisöllisyyden ja tärkeiden elämänvaiheiden paikka.",
    cinematicTitle: "Hengitä sisään. Jätä kiire ulos.",
    cinematicText: "Sauna ei tarvitse aikataulua. Ota pyyhe, käy lauteille, kuuntele kiuasta ja anna järven, meren tai metsän olla hetken koko maailma.",
    loylyPanelEyebrow: "LÖYLY · SUOMI",
    loylyPanelTitle: "Löyly on tunne, jonka suomalainen oppii tuntemaan.",
    loylyPanelText: "Vesi kohtaa kuumat kivet. Ilma muuttuu kosteammaksi. Lämpö tuntuu iholla eri tavalla. Hyvä löyly on henkilökohtainen – sen ei tarvitse olla kova ollakseen hyvä.",
    loylySteps: [["01", "Vesi"], ["02", "Kivet"], ["03", "Tunne"]] as const,
    löylyTitle: "Löyly – saunan sydän",
    löylyText: "Kun vettä heitetään kuumille kiville, syntyy löyly. Hyvä löyly ei tarkoita maksimaalista kuumuutta, vaan miellyttävää lämpöä, sopivaa kosteutta ja rauhallista rytmiä. Löyly tarkoittaa suomalaisessa saunaperinteessä myös saunan henkeä ja tunnelmaa.",
    ritualTitle: "Saunan perinteinen rytmi",
    ritual: [
      ["1", "Lämmitä rauhassa", "Anna tilan lämmetä kunnolla ja mene saunaan ilman kiirettä."],
      ["2", "Löyly", "Lisää vettä kiville oman maun mukaan ja kuuntele omaa oloa."],
      ["3", "Vihta tai vasta", "Koivuvihdalla voidaan kevyesti vastoa ihoa ja tuoda metsän tuoksu löylyihin."],
      ["4", "Jäähdy", "Käy ulkona, suihkussa tai vedessä. Jäähdyttely on osa rytmiä, ei kilpailu."],
      ["5", "Lepää", "Anna lämmön laskeutua ja palaa löylyihin vain silloin, kun se tuntuu hyvältä."],
    ],
    wellnessTitle: "Sauna ja hyvinvointi",
    wellnessIntro: "Saunan hyvinvointi syntyy ennen kaikkea kokemuksesta: lämpö, hiljaisuus, peseytyminen, sosiaalinen yhteys ja palautuminen. Tutkimuksissa on kiinnostavia havaintoja saunomisen ja terveyden yhteyksistä, mutta niitä ei pidä muuttaa yksittäisen ihmisen terveyslupauksiksi.",
    wellness: [
      [Flame, "Rentoutuminen", "Lämpö ja rauhallinen ympäristö voivat tukea rentoutumista ja palautumista. Suomalainen saunakulttuuri korostaa kiireettömyyttä."],
      [Moon, "Uni ja iltarauha", "Saunan jälkeinen raukeus voi helpottaa iltarauhoittumista joillakin ihmisillä. Näyttö on kuitenkin rajallista."],
      [HeartPulse, "Verenkierto", "Kuumuus lisää hetkellisesti verenvirtausta ja muuttaa verenkiertoelimistön toimintaa. Pitkäaikaisia hyötyjä koskeva tutkimus on edelleen osin ristiriitaista."],
      [ShieldCheck, "Turvallinen sauna", "Nesteytä, kuuntele omaa oloa ja vältä saunomista päihtyneenä. Sairauksien yhteydessä saunomisesta voi olla hyvä keskustella terveydenhuollon ammattilaisen kanssa."],
    ],
    researchTitle: "Mitä tutkimus sanoo?",
    researchText: "Havainnoivissa tutkimuksissa runsas saunominen on yhdistetty joihinkin pienempiin sydän- ja verisuonitautien riskeihin. Vuoden 2025 satunnaistettujen tutkimusten katsauksessa passiivisella lämmöllä ei kuitenkaan löytynyt merkittäviä vaikutuksia useimpiin tutkittuihin sydän- ja verisuoniterveyden mittareihin. Siksi puhumme mahdollisista yhteyksistä, emme hoitovaikutuksista.",
    traditionsTitle: "Perinteet elävät myös tänään",
    traditions: [
      ["Mökkisauna", "Järven tai meren rannalla sauna yhdistyy usein uimiseen, iltateehen, makkaran paistoon ja pitkiin kesäiltoihin."],
      ["Savusauna", "Savusaunassa on oma arominsa ja vahva yhteys vanhempaan saunaperinteeseen."],
      ["Kaupunkisauna", "Yleiset saunat tuovat suomalaisen perinteen keskelle kaupunkia ja yhteen paikalliset sekä matkailijat."],
      ["Sauna-spa", "Kylpylät ja sauna-spat lisäävät mukaan altaita, hoitoja ja ravintoloita, mutta sauna pysyy kokemuksen ytimenä."],
    ],
    galleryTitle: "Sauna kuvina",
    galleryIntro: "Savusaunoja, mökkimaisemia, kaupunkisaunoja, saunalauttoja ja vihtomista. Käytämme mahdollisuuksien mukaan avoimesti lisensoituja kuvia ja kumppanikuvia, joiden lähde on merkitty.",
    ctaTitle: "Etsi paikka, jossa sauna kuuluu lomaan.",
    ctaText: "Tutustu saunallisiin mökkeihin, majoituksiin, saaristoon ja elämyksiin. Varaus ja maksu tehdään aina suoraan palveluntarjoajalla.",
    cta: "Löydä saunallinen majoitus",
    ctaExperience: "Katso saunaelämykset",
    sources: "Lähteet ja tarkistus",
    sourceUnesco: "UNESCO · Sauna culture in Finland",
    sourceResearch: "PubMed · sauna & cardiovascular evidence",
    sourceResearch2025: "PubMed · 2025 systematic review",
    image: "Kuva",
  },
  es: {
    eyebrow: "SAUNA · FINLANDIA",
    title: "La sauna finlandesa es más que una habitación caliente.",
    intro: "Es un lugar para bajar el ritmo, limpiarse, compartir un momento y volver a uno mismo. Aquí exploramos sus raíces, tradiciones, löyly, vihta y lo que realmente dice la investigación sobre bienestar.",
    heritage: "Patrimonio cultural vivo",
    heritageText: "La cultura de la sauna de Finlandia está inscrita en la lista representativa del patrimonio cultural inmaterial de la UNESCO. Vive en hogares, cabañas, saunas públicas y nuevas saunas urbanas.",
    rootsTitle: "Las raíces de la sauna",
    rootsText: "La sauna finlandesa forma parte de la vida cotidiana desde mucho antes de las estufas eléctricas. La sauna de humo es una forma antigua: la leña calienta las piedras, el humo sale antes del baño y el calor permanece en el espacio. Históricamente, la sauna ha sido también un lugar de limpieza, descanso, comunidad y momentos importantes de la vida.",
    cinematicTitle: "Respira. Deja fuera las prisas.",
    cinematicText: "La sauna no necesita un horario. Coge la toalla, siéntate, escucha la estufa y deja que el lago, el mar o el bosque sean el mundo durante un instante.",
    loylyPanelEyebrow: "LÖYLY · FINLANDIA",
    loylyPanelTitle: "El löyly es una sensación que se aprende a reconocer.",
    loylyPanelText: "El agua encuentra las piedras calientes. El aire se vuelve más húmedo. El calor cambia sobre la piel. Un buen löyly es personal: no tiene que ser intenso para ser bueno.",
    loylySteps: [["01", "Agua"], ["02", "Piedras"], ["03", "Sensación"]] as const,
    löylyTitle: "Löyly – el corazón de la sauna",
    löylyText: "Cuando se vierte agua sobre las piedras calientes, nace el löyly. Un buen löyly no significa el máximo calor posible, sino una combinación agradable de temperatura, humedad y calma. En Finlandia, löyly también describe el espíritu y la atmósfera de la sauna.",
    ritualTitle: "El ritmo tradicional",
    ritual: [
      ["1", "Calienta con calma", "Deja que la sauna alcance una temperatura agradable y entra sin prisas."],
      ["2", "Löyly", "Añade agua a las piedras según tu gusto y escucha cómo te sientes."],
      ["3", "Vihta", "Una rama de abedul puede usarse suavemente para estimular la piel y aportar aroma."],
      ["4", "Enfríate", "Sal al aire libre, dúchate o báñate. Enfriarse forma parte del ritmo."],
      ["5", "Descansa", "Deja que el calor se asiente y vuelve a entrar solo cuando te apetezca."],
    ],
    wellnessTitle: "Sauna y bienestar",
    wellnessIntro: "El bienestar de la sauna debe entenderse primero como una experiencia: calor, silencio, higiene, conexión social y recuperación. La investigación muestra asociaciones interesantes, pero no permite prometer beneficios médicos a una persona concreta.",
    wellness: [
      [Flame, "Relajación", "El calor y un entorno tranquilo pueden ayudar a relajarse y recuperarse. La cultura finlandesa de sauna pone el foco en ir sin prisa."],
      [Moon, "Sueño y calma", "La sensación de relajación después de la sauna puede ayudar a algunas personas a prepararse para dormir. La evidencia sigue siendo limitada."],
      [HeartPulse, "Circulación", "El calor aumenta temporalmente el flujo sanguíneo y cambia la respuesta cardiovascular. La evidencia sobre beneficios a largo plazo sigue siendo mixta."],
      [ShieldCheck, "Sauna segura", "Hidrátate, escucha a tu cuerpo y evita la sauna estando ebrio. Si tienes una enfermedad o una medicación relevante, consulta cuando sea necesario."],
    ],
    researchTitle: "¿Qué dice la investigación?",
    researchText: "Los estudios observacionales han relacionado el uso frecuente de la sauna con algunos menores riesgos cardiovasculares. Sin embargo, una revisión de ensayos aleatorizados publicada en 2025 no encontró efectos significativos del calor pasivo en la mayoría de los indicadores cardiovasculares estudiados. Por eso hablamos de posibles asociaciones, no de tratamientos.",
    traditionsTitle: "Tradiciones que siguen vivas",
    traditions: [
      ["Sauna de cabaña", "Junto al lago o al mar, la sauna puede combinarse con un baño, una merienda y una larga tarde de verano."],
      ["Sauna de humo", "La sauna de humo conserva un aroma particular y una conexión fuerte con la tradición antigua."],
      ["Sauna urbana", "Las saunas públicas llevan la tradición al centro de la ciudad y reúnen a locales y visitantes."],
      ["Sauna-spa", "Los spas añaden piscinas, tratamientos y restaurantes, manteniendo la sauna en el centro."],
    ],
    galleryTitle: "Finlandia en imágenes",
    galleryIntro: "Saunas de humo, cabañas, saunas urbanas, saunas flotantes y vihta. Siempre que es posible usamos imágenes con licencia abierta o imágenes de socios con su fuente indicada.",
    ctaTitle: "Encuentra un lugar donde la sauna forme parte del viaje.",
    ctaText: "Descubre cabañas, alojamientos, archipiélago y experiencias. Las reservas y pagos se realizan siempre directamente con el proveedor.",
    cta: "Encontrar alojamiento con sauna",
    ctaExperience: "Ver experiencias de sauna",
    sources: "Fuentes y comprobación",
    sourceUnesco: "UNESCO · Sauna culture in Finland",
    sourceResearch: "PubMed · evidencia sobre sauna y corazón",
    sourceResearch2025: "PubMed · revisión sistemática 2025",
    image: "Imagen",
  },
  en: {
    eyebrow: "SAUNA · FINLAND",
    title: "The Finnish sauna is more than a hot room.",
    intro: "It is a place to slow down, wash, connect and return to your own rhythm. Explore its roots, traditions, löyly, vihta and what the evidence really says about wellbeing.",
    heritage: "Living cultural heritage",
    heritageText: "Sauna culture in Finland is inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity. It lives in homes, cottages, public saunas and new urban sauna spaces.",
    rootsTitle: "The roots of sauna",
    rootsText: "Finnish sauna became part of everyday life long before today's electric heaters. Smoke sauna is an old form: wood heats the stones, smoke is vented before bathing and heat remains in the room. Historically, sauna has been more than washing: it has been a place for cleanliness, rest, community and important moments in life.",
    cinematicTitle: "Breathe in. Leave the rush outside.",
    cinematicText: "A sauna does not need a schedule. Take your towel, settle onto the benches, listen to the stove and let the lake, sea or forest become your whole world for a moment.",
    loylyPanelEyebrow: "LÖYLY · FINLAND",
    loylyPanelTitle: "Löyly is a feeling you learn to recognise.",
    loylyPanelText: "Water meets hot stones. The air becomes more humid. Heat changes on the skin. Good löyly is personal – it does not have to be intense to be good.",
    loylySteps: [["01", "Water"], ["02", "Stones"], ["03", "Feel"]] as const,
    löylyTitle: "Löyly – the heart of sauna",
    löylyText: "When water is thrown onto hot stones, löyly is created. Good löyly is not about maximum heat; it is about a pleasant balance of warmth, humidity and calm. In Finland, löyly also refers to the spirit and atmosphere of the sauna.",
    ritualTitle: "The traditional rhythm",
    ritual: [
      ["1", "Heat slowly", "Let the room reach a comfortable temperature and enter without hurry."],
      ["2", "Löyly", "Add water to the stones according to your preference and listen to how you feel."],
      ["3", "Vihta", "A leafy birch whisk can be used gently to stimulate the skin and bring a forest scent into the sauna."],
      ["4", "Cool down", "Step outside, shower or swim. Cooling is part of the rhythm, not a competition."],
      ["5", "Rest", "Let the heat settle and return only when it feels right."],
    ],
    wellnessTitle: "Sauna and wellbeing",
    wellnessIntro: "Think of sauna wellbeing first as an experience: heat, quiet, washing, social connection and recovery. Research shows interesting associations, but it does not justify promising medical benefits to an individual.",
    wellness: [
      [Flame, "Relaxation", "Heat and a calm environment can support relaxation and recovery. Finnish sauna culture puts emphasis on slowing down."],
      [Moon, "Sleep and calm", "The relaxed feeling after sauna may help some people wind down for sleep. The evidence remains limited."],
      [HeartPulse, "Circulation", "Heat temporarily increases blood flow and changes cardiovascular responses. Evidence for long-term health benefits remains mixed."],
      [ShieldCheck, "Sauna safely", "Stay hydrated, listen to your body and avoid sauna when intoxicated. With relevant health conditions or medication, seek professional advice when appropriate."],
    ],
    researchTitle: "What does the research say?",
    researchText: "Observational studies have linked frequent sauna bathing with some lower cardiovascular risks. However, a 2025 systematic review of randomized trials found no significant pooled effects of passive heating on most cardiovascular and metabolic markers studied. We therefore describe possible associations, not treatment effects.",
    traditionsTitle: "Traditions that still live",
    traditions: [
      ["Cottage sauna", "By a lake or the sea, sauna is often paired with a swim, a snack and a long summer evening."],
      ["Smoke sauna", "Smoke sauna carries a distinct aroma and a strong connection to older Finnish sauna tradition."],
      ["Urban sauna", "Public saunas bring the tradition into the city and create shared spaces for locals and travellers."],
      ["Sauna spa", "Spas add pools, treatments and restaurants while keeping sauna at the heart of the experience."],
    ],
    galleryTitle: "Sauna in pictures",
    galleryIntro: "Smoke saunas, cottages, urban saunas, floating saunas and vihta. Wherever possible we use openly licensed images or partner images with their source credited.",
    ctaTitle: "Find a place where sauna belongs to the journey.",
    ctaText: "Explore cottages, stays, the archipelago and experiences. Booking and payment always take place directly with the provider.",
    cta: "Find a sauna stay",
    ctaExperience: "See sauna experiences",
    sources: "Sources and fact checking",
    sourceUnesco: "UNESCO · Sauna culture in Finland",
    sourceResearch: "PubMed · sauna and cardiovascular evidence",
    sourceResearch2025: "PubMed · 2025 systematic review",
    image: "Image",
  },
} as const;

const sources = {
  unesco: "https://ich.unesco.org/en/RL/sauna-culture-in-finland-01596",
  research: "https://pubmed.ncbi.nlm.nih.gov/30077204/",
  research2025: "https://pubmed.ncbi.nlm.nih.gov/41049507/",
};

function localeOf(value: string): Locale {
  return value === "fi" || value === "es" || value === "en" ? value : "en";
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = localeOf(params.locale);
  const x = copy[locale];
  return buildLocalizedMetadata({
    locale,
    title: x.title,
    description: x.intro,
    path: "sauna",
    image: photoLibrary.saunaWhisking,
  });
}

export default function SaunaPage({ params }: { params: { locale: string } }) {
  const locale = localeOf(params.locale);
  const x = copy[locale];

  return (
    <main className="bg-white text-brand-950">
      <section className="relative isolate min-h-[70svh] overflow-hidden bg-brand-950 text-white">
        <Image src={photoLibrary.saunaWhisking} alt={x.galleryTitle} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
        <div className="relative z-10 flex min-h-[70svh] items-end">
          <div className="container-narrow w-full pb-12 pt-28 sm:pb-20">
            <p className="text-xs font-bold uppercase tracking-[.28em] text-gold-300">{x.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[.96] tracking-[-.03em] sm:text-7xl lg:text-[5.8rem]">{x.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-2xl">{x.intro}</p>
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-14 sm:py-20">
        <div className="container-narrow grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <article className="group relative min-h-[300px] overflow-hidden rounded-[2rem] shadow-card">
            <Image src={photoLibrary.saunaCottage} alt={x.heritage} fill sizes="(max-width:1024px) 100vw, 55vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/55 to-brand-950/10" />
            <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-end p-8 text-white sm:p-10">
              <div className="flex items-center gap-3">
                <Leaf className="h-7 w-7 text-gold-300" />
                <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-200">{x.heritage}</p>
              </div>
              <p className="mt-5 max-w-2xl font-display text-2xl font-semibold leading-snug sm:text-3xl">{x.heritageText}</p>
            </div>
          </article>
          <article className="group relative min-h-[300px] overflow-hidden rounded-[2rem] shadow-card">
            <Image src={photoLibrary.saunaBucketVasta} alt={x.löylyTitle} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/15" />
            <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-end p-8 text-white sm:p-10">
              <Flame className="h-7 w-7 text-gold-300" />
              <p className="mt-5 text-lg leading-8 text-white/90 sm:text-xl">{x.löylyText}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{x.rootsTitle}</p>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{x.rootsTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-slate-700">{x.rootsText}</p>
          </div>
          <div className="overflow-hidden rounded-[2rem] bg-brand-950 shadow-card">
            <div className="relative aspect-[4/3]">
              <Image src={photoLibrary.saunaTraditionalSmoke} alt={x.rootsTitle} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate min-h-[68svh] overflow-hidden bg-brand-950 text-white">
        <Image src={photoLibrary.saunaCottage} alt={x.cinematicTitle} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5" />
        <div className="relative z-10 flex min-h-[68svh] items-end">
          <div className="container-narrow w-full pb-12 pt-24 sm:pb-20">
            <div className="max-w-3xl rounded-[2rem] border border-white/10 bg-black/25 p-7 backdrop-blur-[2px] sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{x.heritage}</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">{x.cinematicTitle}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">{x.cinematicText}</p>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[.14em] text-white/45">Kuva: Kospo75</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-950 py-16 text-white sm:py-24">
        <div className="container-narrow">
          <div className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 shadow-card">
            <div className="grid lg:grid-cols-[1.05fr_.95fr] lg:min-h-[520px]">
              <div className="relative min-h-[360px] lg:min-h-0">
                <Image src={photoLibrary.saunaWhisking} alt={x.loylyPanelTitle} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r" />
                <div className="absolute bottom-0 left-0 p-6 text-xs font-semibold uppercase tracking-[.14em] text-white/55 sm:p-8">Kuva: Ville Kurki</div>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
                <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">{x.loylyPanelEyebrow}</p>
                <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{x.loylyPanelTitle}</h2>
                <p className="mt-5 text-lg leading-8 text-white/80">{x.loylyPanelText}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {x.loylySteps.map(([n, label]) => (
                    <div key={n} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-2xl font-display font-bold text-gold-300">{n}</div>
                      <p className="mt-2 text-sm font-semibold text-white/80">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-16 sm:py-24">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{x.ritualTitle}</p>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{x.ritualTitle}</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {x.ritual.map(([number, title, text], index) => {
              const ritualImages = [
                photoLibrary.saunaTraditionalSmoke,
                photoLibrary.saunaBucketVasta,
                photoLibrary.saunaVasta,
                photoLibrary.saunaCottage,
                photoLibrary.saunaWhisking,
              ];
              return (
                <article key={number} className="group relative min-h-[280px] overflow-hidden rounded-3xl shadow-soft">
                  <Image src={ritualImages[index]} alt={title} fill sizes="(max-width:768px) 100vw, 20vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
                  <div className="relative z-10 flex min-h-[280px] flex-col justify-end p-6 text-white">
                    <div className="text-4xl font-display font-bold text-white/45">{number}</div>
                    <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/80">{text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-24">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{x.wellnessTitle}</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{x.wellnessTitle}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">{x.wellnessIntro}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {x.wellness.map(([Icon, title, text], index) => {
            const wellnessImages = [
              photoLibrary.saunaCottage,
              photoLibrary.saunaWhisking,
              photoLibrary.saunaBoat,
              photoLibrary.herrankukkaroSauna,
            ];
            return (
              <article key={title} className="group relative min-h-[330px] overflow-hidden rounded-[2rem] shadow-soft">
                <Image src={wellnessImages[index]} alt={title} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/60 to-brand-950/15" />
                <div className="relative z-10 flex min-h-[330px] flex-col justify-end p-7 text-white">
                  <Icon className="h-8 w-8 text-gold-300" />
                  <h3 className="mt-5 font-display text-2xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/80">{text}</p>
                </div>
              </article>
            );
          })}
        </div>

        <article className="relative mt-6 overflow-hidden rounded-[2rem] shadow-soft">
          <Image src={photoLibrary.sauna} alt={x.researchTitle} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-brand-950/90" />
          <div className="relative z-10 p-7 text-white sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{x.researchTitle}</p>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-white/85">{x.researchText}</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold text-gold-200">
            <a href={sources.research} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">{x.sourceResearch}<ArrowUpRight className="h-4 w-4" /></a>
            <a href={sources.research2025} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">{x.sourceResearch2025}<ArrowUpRight className="h-4 w-4" /></a>
          </div>
          </div>
        </article>
      </section>

      <section className="bg-brand-950 py-16 text-white sm:py-24">
        <div className="container-narrow">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{x.traditionsTitle}</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{x.traditionsTitle}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {x.traditions.map(([title, text], index) => {
              const traditionImages = [
                photoLibrary.saunaCottage,
                photoLibrary.saunaTraditionalSmoke,
                photoLibrary.saunaRajaportti,
                photoLibrary.sauna,
              ];
              return (
                <article key={title} className="group relative min-h-[280px] overflow-hidden rounded-[2rem] border border-white/10 shadow-card">
                  <Image src={traditionImages[index]} alt={title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/15" />
                  <div className="relative z-10 flex min-h-[280px] flex-col justify-end p-7 text-white">
                    <h3 className="font-display text-2xl font-bold">{title}</h3>
                    <p className="mt-3 leading-7 text-white/80">{text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{x.galleryTitle}</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{x.galleryTitle}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">{x.galleryIntro}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((item, index) => (
            <figure key={item.title.en} className={index === 0 ? "group overflow-hidden rounded-[2rem] bg-brand-950 sm:col-span-2 lg:row-span-2" : "group overflow-hidden rounded-[1.75rem] bg-brand-950"}>
              <div className={index === 0 ? "relative min-h-[360px] aspect-[4/3] h-full" : "relative aspect-[4/3]"}>
                <Image src={item.image} alt={item.title[locale]} fill sizes={index === 0 ? "(max-width:1024px) 100vw, 50vw" : "(max-width:1024px) 50vw, 25vw"} className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="font-display text-xl font-bold">{item.title[locale]}</p>
                  <p className="mt-2 text-sm leading-6 text-white/75">{item.text[locale]}</p>
                  <p className="mt-3 text-[10px] uppercase tracking-[.14em] text-white/50">{x.image}: {item.credit}</p>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
          {gallery.map((item) => (
            <a key={item.source} href={item.source} target="_blank" rel="noreferrer" className="underline decoration-slate-300 underline-offset-2">{item.credit}</a>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-16 sm:py-24">
        <div className="container-narrow">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{x.heritage}</p>
              <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{x.ctaTitle}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{x.ctaText}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={"/" + locale + "/accommodations"} className="btn-gold inline-flex items-center gap-2">{x.cta}<ArrowRight className="h-4 w-4" /></Link>
                <Link href={"/" + locale + "/experiences"} className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3.5 text-sm font-bold text-brand-950">{x.ctaExperience}<ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] bg-brand-950 shadow-card">
              <div className="relative aspect-[4/3]">
                <Image src={photoLibrary.herrankukkaroSauna} alt={x.ctaTitle} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-narrow py-10 sm:py-14">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 text-sm text-slate-500">
          <p className="font-bold text-slate-700">{x.sources}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            <a href={sources.unesco} target="_blank" rel="noreferrer" className="underline underline-offset-2">{x.sourceUnesco}</a>
            <a href={sources.research} target="_blank" rel="noreferrer" className="underline underline-offset-2">{x.sourceResearch}</a>
            <a href={sources.research2025} target="_blank" rel="noreferrer" className="underline underline-offset-2">{x.sourceResearch2025}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
