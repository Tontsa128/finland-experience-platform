"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/types";
import type { PaidAdCampaign, PaidAdSlide } from "@/lib/public-content";

function track(campaignId: string, event: "impression" | "click", locale: Locale, placement: PaidAdCampaign["placement"], slideIndex: number) {
  void fetch("/api/ads/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ campaignId, event, locale, placement, slideIndex }),
    keepalive: event === "click",
  }).catch(() => undefined);
}

function CampaignSlideshow({ campaign, locale }: { campaign: PaidAdCampaign; locale: Locale }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const articleRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const slide = campaign.slides[index] as PaidAdSlide;
  const labels = {
    fi: { sponsored: "Mainos · Yhteistyökumppani", pause: "Keskeytä diaesitys", play: "Jatka diaesitystä", previous: "Edellinen mainosdia", next: "Seuraava mainosdia", of: " / " },
    es: { sponsored: "Publicidad · Socio", pause: "Pausar presentación", play: "Reanudar presentación", previous: "Diapositiva anterior", next: "Siguiente diapositiva", of: " / " },
    en: { sponsored: "Advertisement · Partner", pause: "Pause slideshow", play: "Resume slideshow", previous: "Previous ad slide", next: "Next ad slide", of: " / " },
  }[locale];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
    const element = articleRef.current;
    if (!element) return;
    const observer = new IntersectionObserver((entries) => setVisible(Boolean(entries[0]?.isIntersecting)), { threshold: 0.5 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible || campaign.slides.length < 2) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % campaign.slides.length), campaign.slideIntervalMs);
    return () => window.clearInterval(timer);
  }, [campaign.id, campaign.slideIntervalMs, campaign.slides.length, paused, visible]);

  useEffect(() => {
    if (visible) track(campaign.id, "impression", locale, campaign.placement, index);
  }, [campaign.id, campaign.placement, index, locale, visible]);

  const move = (direction: -1 | 1) => setIndex((current) => (current + direction + campaign.slides.length) % campaign.slides.length);
  const external = /^https?:\/\//i.test(slide.href);
  return (
    <article ref={articleRef} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <p className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-500">{labels.sponsored}</p>
        <span className="text-xs font-semibold text-slate-500">{campaign.advertiserName}</span>
      </div>
      <a href={slide.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer sponsored" : "sponsored"} onClick={() => track(campaign.id, "click", locale, campaign.placement, index)} className="group relative isolate block touch-pan-y aspect-[16/9] overflow-hidden bg-brand-950 text-white sm:aspect-[21/8]" onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null; }} onTouchEnd={(event) => { const start = touchStartX.current; touchStartX.current = null; const end = event.changedTouches[0]?.clientX; if (start === null || end === undefined) return; const delta = end - start; if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1); }}>
        <Image src={slide.imageUrl} alt={slide.alt[locale] || slide.title[locale]} fill unoptimized sizes="(max-width: 640px) 100vw, 1200px" className="absolute inset-0 -z-20 object-cover transition duration-700 group-hover:scale-[1.02]" />
        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
        <span className="absolute inset-0 flex flex-col items-start justify-center p-5 sm:p-9">
          <strong className="max-w-2xl font-display text-2xl font-bold leading-tight sm:text-4xl">{slide.title[locale]}</strong>
          {slide.text[locale] && <span className="mt-2 max-w-xl text-sm leading-6 text-white/90 sm:text-base">{slide.text[locale]}</span>}
          {slide.ctaLabel[locale] && <span className="mt-4 inline-flex min-h-10 items-center rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-950">{slide.ctaLabel[locale]}</span>}
        </span>
      </a>
      {campaign.slides.length > 1 && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <span className="text-xs tabular-nums text-slate-500">{index + 1}{labels.of}{campaign.slides.length}</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => move(-1)} aria-label={labels.previous} className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50">‹</button>
            <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? labels.play : labels.pause} className="min-h-9 rounded-full border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50">{paused ? "▶" : "Ⅱ"}</button>
            <button type="button" onClick={() => move(1)} aria-label={labels.next} className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50">›</button>
          </div>
        </div>
      )}
    </article>
  );
}

export default function PaidAdSlideshow({ campaigns, locale }: { campaigns: PaidAdCampaign[]; locale: Locale }) {
  if (!campaigns.length) return null;
  const heading = locale === "fi" ? "Tutustu paikallisiin yhteistyökumppaneihin" : locale === "es" ? "Descubre a nuestros colaboradores locales" : "Discover our local partners";
  return (
    <section className="container-narrow py-8 sm:py-10" aria-label={heading}>
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="font-display text-xl font-bold text-brand-950 sm:text-2xl">{heading}</h2>
        <span className="text-[10px] font-semibold uppercase tracking-[.14em] text-slate-400">{locale === "fi" ? "Mainoksia" : locale === "es" ? "Anuncios" : "Sponsored"}</span>
      </div>
      <div className="grid gap-5">{campaigns.map((campaign) => <CampaignSlideshow key={campaign.id} campaign={campaign} locale={locale} />)}</div>
    </section>
  );
}
