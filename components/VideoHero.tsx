"use client";

import { useState } from "react";

export default function VideoHero() {
  const [watching, setWatching] = useState(false);

  if (watching) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90">
        <button
          onClick={() => setWatching(false)}
          className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          aria-label="Fechar vídeo"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-full max-w-4xl px-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
            <div className="flex h-full items-center justify-center text-white/40 text-sm">
              Vídeo institucional — adicione a URL no Sanity Studio
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[55vh] items-end overflow-hidden bg-[#1A1A1A] sm:min-h-[65vh] lg:min-h-[70vh]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#2D0A12] to-[#BB0A24]/30" />
      <div className="absolute inset-0 bg-[url('/insper.jpg')] bg-cover bg-center opacity-20" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-16 sm:pb-14 sm:pt-20 sm:px-6 lg:pb-16 lg:pt-24 lg:px-8">
        <p className="animate-fade-in text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
          Sobre Nós
        </p>
        <h1 className="animate-fade-in-up delay-100 mt-4 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-6xl">
          Conheça o GAS
        </h1>
        <p className="animate-fade-in-up delay-200 mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
          Uma organização estudantil que transforma potencial em impacto social real.
        </p>
        <button
          onClick={() => setWatching(true)}
          className="animate-fade-in-up delay-300 mt-7 inline-flex min-h-[48px] items-center gap-3 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 active:bg-white/5 sm:mt-8 sm:px-6"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/50 transition-all duration-200 group-hover:border-white">
            <svg className="h-3 w-3 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          Assistir Vídeo Institucional
        </button>
      </div>
    </div>
  );
}
