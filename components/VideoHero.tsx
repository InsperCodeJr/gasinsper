"use client";

export default function VideoHero({ videoUrl }: { videoUrl?: string | null }) {
  return (
    <div className="relative flex min-h-[55vh] items-end overflow-hidden sm:min-h-[65vh] lg:min-h-[75vh]">

      {/* ── Fundo vinho estático (sempre visível como base) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A060C] via-[#5C1926] to-[#1A060C]" />
      <div className="absolute inset-0 bg-[url('/insper.jpg')] bg-cover bg-center opacity-10" />

      {/* ── Vídeo de fundo */}
      {videoUrl && (
        <div className="absolute inset-0 overflow-hidden">
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Overlay escuro sobre o vídeo para manter legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/15" />
        </div>
      )}

      {/* ── Conteúdo sobreposto */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-16 sm:pb-14 sm:pt-20 sm:px-6 lg:pb-16 lg:pt-24 lg:px-8">
        <p className="animate-fade-in text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
          Sobre Nós
        </p>
        <h1 className="animate-fade-in-up delay-100 mt-4 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-6xl">
          Conheça o GAS
        </h1>
        <p className="animate-fade-in-up delay-200 mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
          Uma organização estudantil que transforma potencial em impacto social real.
        </p>
      </div>
    </div>
  );
}
