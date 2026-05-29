"use client";

function extractYoutubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  return m ? m[1] : null;
}

function extractVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? m[1] : null;
}

function getBackgroundEmbedUrl(url: string): string | null {
  const ytId = extractYoutubeId(url);
  if (ytId) {
    return `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`;
  }
  const vimeoId = extractVimeoId(url);
  if (vimeoId) {
    return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1&autopause=0`;
  }
  return null;
}

export default function VideoHero({ videoUrl }: { videoUrl?: string | null }) {
  const embedUrl = videoUrl ? getBackgroundEmbedUrl(videoUrl) : null;

  return (
    <div className="relative flex min-h-[55vh] items-end overflow-hidden sm:min-h-[65vh] lg:min-h-[75vh]">

      {/* ── Fundo vinho estático (sempre visível como base) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A060C] via-[#5C1926] to-[#1A060C]" />
      <div className="absolute inset-0 bg-[url('/insper.jpg')] bg-cover bg-center opacity-10" />

      {/* ── Vídeo de fundo (YouTube / Vimeo) */}
      {embedUrl && (
        <div className="absolute inset-0 overflow-hidden">
          {/* iframe ocupa mais do que o container para cobrir a proporção 16:9 */}
          <iframe
            src={embedUrl}
            allow="autoplay; fullscreen"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
            style={{
              /* Garante cobertura full em qualquer proporção de tela */
              width: "100vw",
              height: "56.25vw",  /* 9/16 de 100vw  */
              minHeight: "100%",
              minWidth: "177.78vh", /* 16/9 de 100vh */
              pointerEvents: "none",
            }}
            title="Vídeo institucional GAS"
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
