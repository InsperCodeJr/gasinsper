"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export type SlideshowEvent = {
  _id: string;
  title: string;
  description: string;
  date?: string | null;
  slug: string;
  cardColor?: string | null;
  imageUrl?: string | null;
};

function formatDate(dateStr?: string | null) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function EventSlideshow({
  events,
  hero,
}: {
  events: SlideshowEvent[];
  hero: { eyebrow: string; title: string };
}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const n = events.length;
  const go = useCallback(
    (i: number) => setIdx(((i % n) + n) % n),
    [n]
  );

  useEffect(() => {
    if (paused || n <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 5000);
    return () => clearInterval(t);
  }, [paused, n]);

  if (n === 0) return null;

  return (
    <section
      className="relative min-h-[80vh] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background slides — crossfade */}
      {events.map((ev, i) => (
        <div
          key={ev._id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        >
          {ev.imageUrl ? (
            <Image
              src={ev.imageUrl}
              alt={ev.title}
              fill
              className="object-cover"
              priority={i === 0}
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background: `linear-gradient(135deg, #1A060C 0%, ${ev.cardColor ?? "#7A1F30"} 50%, #1A060C 100%)`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
        </div>
      ))}

      {/* Page header (static) */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
        <p className="animate-fade-in text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
          {hero.eyebrow}
        </p>
        <h1 className="animate-fade-in-up delay-100 mt-4 max-w-2xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
          {hero.title}
        </h1>
      </div>

      {/* Slide content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
        <div className="relative min-h-[260px]">
          {events.map((ev, i) => {
            const accent = ev.cardColor ?? "#BB0A24";
            const date = formatDate(ev.date);
            return (
              <div
                key={ev._id}
                className={`transition-all duration-500 ${
                  i === idx
                    ? "relative opacity-100 translate-y-0"
                    : "absolute inset-0 opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                {i === idx && (
                  <div className="max-w-2xl">
                    {date && (
                      <span
                        className="mb-4 inline-block rounded-xl px-3 py-1.5 text-xs font-semibold text-white"
                        style={{ backgroundColor: accent }}
                      >
                        {date}
                      </span>
                    )}
                    <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl leading-tight">
                      {ev.title}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-white/70 line-clamp-3">
                      {ev.description}
                    </p>
                    <Link
                      href={`/eventos/${ev.slug}`}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 hover:-translate-y-px active:translate-y-0"
                    >
                      Ver evento
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        {n > 1 && (
          <div className="mt-8 flex items-center gap-4">
            <div className="flex gap-2">
              {events.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === idx ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Evento ${i + 1}`}
                />
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => { setPaused(true); go(idx - 1); }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-200 hover:border-white hover:bg-white/10"
                aria-label="Evento anterior"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => { setPaused(true); go(idx + 1); }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-200 hover:border-white hover:bg-white/10"
                aria-label="Próximo evento"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
