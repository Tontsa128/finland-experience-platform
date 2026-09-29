import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

type Rec = {
  type: "destination" | "accommodation" | "experience";
  slug: string;
  reason: string;
};
type Item = {
  slug: string;
  name: Record<string, string>;
  description: Record<string, string>;
  images?: string[];
  verified?: boolean;
};
type Day = { day: number; title: string; items: Rec[] };
type Props = {
  language: "fi" | "en" | "es";
  days: Day[];
  recommendations: Rec[];
  catalog: {
    destinations: Item[];
    accommodations: Item[];
    experiences: Item[];
  };
  verifiedLabel: string;
  togetherLabel: string;
};

export default function ConciergeItinerary({
  language,
  days,
  recommendations,
  catalog,
  verifiedLabel,
  togetherLabel,
}: Props) {
  const resolve = (recommendation: Rec) => {
    const list =
      recommendation.type === "destination"
        ? catalog.destinations
        : recommendation.type === "accommodation"
          ? catalog.accommodations
          : catalog.experiences;

    return list.find(
      (item) =>
        item.slug === recommendation.slug && item.verified !== false,
    );
  };

  const path = (recommendation: Rec) =>
    recommendation.type === "destination"
      ? "destinations"
      : recommendation.type === "accommodation"
        ? "accommodations"
        : "experiences";

  return (
    <div className="mt-6 space-y-5">
      {days.map((day) => (
        <article
          key={day.day}
          className="relative overflow-hidden rounded-[1.5rem] border border-brand-100 bg-white shadow-soft"
        >
          <div className="grid lg:grid-cols-[92px_1fr]">
            <div className="bg-brand-950 p-5 text-white lg:p-6">
              <div className="text-xs font-bold uppercase tracking-[.16em] text-gold-300">
                Day
              </div>
              <div className="mt-1 font-display text-4xl font-bold">{day.day}</div>
            </div>

            <div className="p-5 sm:p-6">
              <h2 className="font-display text-2xl font-bold text-brand-950">{day.title}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {day.items.map((recommendation, index) => {
                  const item = resolve(recommendation);
                  if (!item) return null;
                  const image = item.images?.[0];

                  return (
                    <Link
                      key={recommendation.type + recommendation.slug + index}
                      href={"/" + language + "/" + path(recommendation) + "/" + recommendation.slug}
                      className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-card"
                    >
                      {image ? (
                        <Image
                          src={image}
                          alt={item.name[language] || item.name.en || ""}
                          width={900}
                          height={520}
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                      ) : null}
                      <div className="p-4">
                        <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                          <Check className="h-3.5 w-3.5" />
                          {verifiedLabel}
                        </div>
                        <h3 className="mt-2 font-bold text-brand-950">
                          {item.name[language] || item.name.en}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{recommendation.reason}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-700">
                          Tutustu <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </article>
      ))}

      {recommendations.length > 0 && (
        <div className="pt-4">
          <h2 className="font-display text-2xl font-bold text-brand-950">{togetherLabel}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {recommendations.map((recommendation, index) => {
              const item = resolve(recommendation);
              if (!item) return null;

              return (
                <Link
                  key={recommendation.type + recommendation.slug + index}
                  href={"/" + language + "/" + path(recommendation) + "/" + recommendation.slug}
                  className="rounded-2xl border bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-card"
                >
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                    <Check className="h-3.5 w-3.5" />
                    {verifiedLabel}
                  </div>
                  <div className="mt-2 font-bold text-brand-950">
                    {item.name[language] || item.name.en}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{recommendation.reason}</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
