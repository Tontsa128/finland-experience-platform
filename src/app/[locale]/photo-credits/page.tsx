import Link from "next/link";
import { photoCredits } from "@/lib/photo-library";

export default function PhotoCreditsPage() {
  return (
    <main className="bg-snow py-16 sm:py-24">
      <div className="container-narrow">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">Image sources</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-6xl">Photo credits</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Destination imagery is real photography tied to the named location. Photographers,
          licences and original source pages are listed here.
        </p>
        <div className="mt-10 grid gap-4">
          {photoCredits.map((photo) => (
            <article key={photo.sourcePage} className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
              <p className="font-semibold text-brand-950">{photo.credit}</p>
              <p className="mt-1 text-sm text-slate-600">{photo.license}</p>
              <Link href={photo.sourcePage} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold text-brand-700 hover:text-brand-950">
                View original source →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
