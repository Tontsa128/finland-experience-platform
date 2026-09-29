import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Moon, Sparkles, Sun, Waves } from "lucide-react";
import { blogPosts as fallbackPosts, getLocalized } from "@/lib/data";
import { getPublishedBlogPosts } from "@/lib/public-content";
import type { Locale } from "@/types";
import { allowDemoFallback } from "@/lib/utils";
import { photoLibrary } from "@/lib/photo-library";

const editorialImages = [
  photoLibrary.mathildedalHarbour,
  photoLibrary.naantaliOldTown,
  photoLibrary.aland,
];

export default async function BlogPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const cmsPosts = await getPublishedBlogPosts();
  const posts = cmsPosts.length || !allowDemoFallback ? cmsPosts : fallbackPosts;

  const copy =
    locale === "fi"
      ? {
          eyebrow: "Suomen kesä alkaa tästä",
          title: "Matkatarinoita, jotka saavat sinut pakkaamaan laukun.",
          intro: "Mökkipäiviä, saunailtoja, saaristoteitä ja öitä, jolloin aurinko unohtaa laskea. Löydä oma tapasi kokea Suomi.",
          latest: "Inspiraatiota tulevaan matkaan",
          latestIntro: "Älä suunnittele jokaista tuntia. Löydä ensin tunne, jonka haluat viedä kotiin.",
          dream: "Entä jos tänä kesänä et vain matkustaisi Suomeen — vaan eläisit hetken suomalaisena?",
          dreamText: "Aamu järven rannalla. Kahvi laiturilla. Sauna ennen uintia. Illalla valo, joka jatkuu lähes aamuun.",
          dreamCta: "Aloita kesämatka",
          read: "Lue tarina",
        }
      : locale === "es"
        ? {
            eyebrow: "El verano finlandés empieza aquí",
            title: "Historias que harán que quieras hacer la maleta.",
            intro: "Cabañas, saunas, carreteras del archipiélago y noches en las que el sol casi no se pone. Encuentra tu manera de vivir Finlandia.",
            latest: "Inspiración para tu próximo viaje",
            latestIntro: "No planifiques cada hora. Empieza por la sensación que quieres llevarte a casa.",
            dream: "¿Y si este verano no solo viajaras a Finlandia, sino que vivieras como un finlandés por unos días?",
            dreamText: "Una mañana junto al lago. Café en el embarcadero. Sauna antes de nadar. Y una luz que parece no terminar nunca.",
            dreamCta: "Empieza tu verano",
            read: "Leer historia",
          }
        : {
            eyebrow: "Finnish summer starts here",
            title: "Stories that make you want to pack your bag.",
            intro: "Cottages, sauna evenings, archipelago roads and nights when the sun almost forgets to set. Find your way to experience Finland.",
            latest: "Inspiration for your next journey",
            latestIntro: "Do not plan every hour. Start with the feeling you want to bring home.",
            dream: "What if this summer you did not just travel to Finland — but lived like a Finn for a few days?",
            dreamText: "A morning by the lake. Coffee on the pier. Sauna before a swim. And light that seems to go on forever.",
            dreamCta: "Start your summer",
            read: "Read the story",
          };

  const icons = [Sun, Waves, Moon];
  return (
    <div className="bg-white">
      <section className="relative min-h-[68vh] overflow-hidden bg-brand-950 text-white">
        <Image
          src={posts[0]?.image || editorialImages[0]}
          alt={posts[0] ? getLocalized(posts[0].title, locale) : copy.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/45 to-brand-950/10" />
        <div className="container-narrow relative flex min-h-[68vh] items-end py-16 sm:py-24">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-300">{copy.eyebrow}</p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[0.98] sm:text-7xl lg:text-8xl">{copy.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">{copy.intro}</p>
            <Link href={`/${locale}/destinations`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950 transition hover:-translate-y-0.5">
              {copy.dreamCta}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta">{copy.latest}</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{copy.latestIntro}</h2>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          {posts.map((post, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article key={post.id} className={index === 0 ? "group overflow-hidden rounded-[2rem] bg-brand-950 text-white lg:row-span-2" : "group overflow-hidden rounded-[2rem] bg-brand-50"}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image || editorialImages[index % editorialImages.length]}
                    alt={getLocalized(post.title, locale)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                  <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-gold-300 backdrop-blur">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-7 sm:p-8">
                  <p className={index === 0 ? "text-xs font-semibold uppercase tracking-[0.16em] text-gold-300" : "text-xs font-semibold uppercase tracking-[0.16em] text-brand-600"}>
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(locale === "fi" ? "fi-FI" : locale === "es" ? "es-ES" : "en-IE") : ""}
                  </p>
                  <h2 className={index === 0 ? "mt-3 font-display text-3xl font-bold sm:text-4xl" : "mt-3 font-display text-2xl font-bold text-brand-950"}>
                    {getLocalized(post.title, locale)}
                  </h2>
                  <p className={index === 0 ? "mt-4 leading-7 text-white/75" : "mt-4 leading-7 text-slate-600"}>
                    {getLocalized(post.excerpt, locale)}
                  </p>
                  <Link href={`/${locale}/destinations`} className={index === 0 ? "mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold-300" : "mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-800"}>
                    {copy.read}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-brand-50 py-16 sm:py-24">
        <div className="container-narrow grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem]">
            <Image src={editorialImages[1]} alt={copy.dream} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
              <Compass className="h-5 w-5 text-gold-300" />
              <span className="text-sm font-semibold">Finland · Summer · Slow travel</span>
            </div>
          </div>
          <div>
            <Sparkles className="h-7 w-7 text-gold-500" />
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-brand-950 sm:text-5xl">{copy.dream}</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{copy.dreamText}</p>
            <Link href={`/${locale}/accommodations`} className="btn-gold mt-8 inline-flex items-center gap-2">
              {copy.dreamCta}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
