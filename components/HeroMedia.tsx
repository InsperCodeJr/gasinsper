import HeroBackground from "./HeroBackground";

interface Hero {
  eyebrow: string;
  title: string;
  subtitle: string;
  mediaUrl?: string | null;
}

/** Banner do topo de Sobre Nós: mais alto que os demais e com vídeo, imagem ou GIF de fundo. */
export default function HeroMedia({ hero }: { hero: Hero }) {
  return (
    <div className="relative flex min-h-[55vh] items-end overflow-hidden sm:min-h-[65vh] lg:min-h-[75vh]">

      {/* ── Fundo vinho estático (sempre visível como base) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A060C] via-[#5C1926] to-[#1A060C]" />
      <div className="absolute inset-0 bg-[url('/insper.jpg')] bg-cover bg-center opacity-10" />

      <HeroBackground
        mediaUrl={hero.mediaUrl}
        overlayClassName="bg-gradient-to-t from-black/75 via-black/35 to-black/15"
      />

      {/* ── Conteúdo sobreposto */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-16 sm:pb-14 sm:pt-20 sm:px-6 lg:pb-16 lg:pt-24 lg:px-8">
        <p className="animate-fade-in text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
          {hero.eyebrow}
        </p>
        <h1 className="animate-fade-in-up delay-100 mt-4 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-6xl">
          {hero.title}
        </h1>
        <p className="animate-fade-in-up delay-200 mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
          {hero.subtitle}
        </p>
      </div>
    </div>
  );
}
