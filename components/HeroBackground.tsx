"use client";

const VIDEO_EXTENSIONS = /\.(mp4|webm|ogv|ogg|mov|m4v)(\?.*)?$/i;

/** O banner aceita vídeo, imagem ou GIF: o formato define a tag usada. */
export function isVideoUrl(url: string): boolean {
  return VIDEO_EXTENSIONS.test(url);
}

/**
 * Camada de fundo do banner de uma página.
 * Sem mídia cadastrada não renderiza nada, e o fundo original da seção aparece.
 */
export default function HeroBackground({
  mediaUrl,
  overlayClassName = "bg-black/60",
}: {
  mediaUrl?: string | null;
  overlayClassName?: string;
}) {
  if (!mediaUrl) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {isVideoUrl(mediaUrl) ? (
        <video
          src={mediaUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        /* GIF animado precisa da tag img: next/image congelaria a animação. */
        // eslint-disable-next-line @next/next/no-img-element
        <img src={mediaUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}
      {/* Escurece a mídia para o texto continuar legível */}
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
