import Image from "next/image";
import { getAllONGs, getPageContent } from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";
import HeroBackground from "@/components/HeroBackground";

export default async function ONGs() {
  const [ongs, page] = await Promise.all([getAllONGs(), getPageContent("ongs")]);
  const displayONGs = ongs;

  const allTestimonials = displayONGs
    .filter((o) => o.testimonials && o.testimonials.length > 0)
    .flatMap((o) => (o.testimonials ?? []).map((t) => ({ ...t, ongName: o.name })));

  return (
    <div className="bg-white text-[#1A1A1A]">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#E5E5E5] bg-gradient-to-br from-[#1A060C] via-[#5C1926] to-[#1A060C] py-20 sm:py-24 lg:py-28 text-white">
        <HeroBackground mediaUrl={page.hero.mediaUrl} />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="animate-fade-in text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
            {page.hero.eyebrow}
          </p>
          <h1 className="animate-fade-in-up delay-100 mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            {page.hero.title}
          </h1>
          <p className="animate-fade-in-up delay-200 mt-6 max-w-2xl text-base leading-7 text-white/70">
            {page.hero.text}
          </p>
        </div>
      </section>

      {/* ── COMO FUNCIONAM AS PARCERIAS ──────────────── */}
      <section className="border-b border-[#E5E5E5] py-14 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {page.blocks.map((block, i) => (
            <ScrollReveal key={block.title} direction="up" delay={i * 90}>
              <div className="group h-full rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#BB0A24]/20 hover:shadow-md hover:-translate-y-0.5 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                  {block.eyebrow}
                </p>
                <h2 className="mt-4 text-xl font-black sm:text-2xl">{block.title}</h2>
                <p className="mt-5 text-sm leading-7 text-[#555555]">{block.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── DEPOIMENTOS ──────────────────────────────── */}
      {allTestimonials.length > 0 && (
        <section className="border-b border-[#E5E5E5] bg-gradient-to-br from-[#1A060C] via-[#5C1926] to-[#1A060C] py-14 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="none">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                {page.testimonials.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                {page.testimonials.title}
              </h2>
            </ScrollReveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allTestimonials.map((t, i) => {
                const photoUrl = t.photo ?? null;

                return (
                  <ScrollReveal key={i} direction="up" delay={i * 80}>
                    <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5">
                      <div className="mb-3 text-3xl font-black leading-none text-[#BB0A24] opacity-60">&ldquo;</div>
                      <p className="text-sm leading-7 text-white/75 italic">{t.text}</p>
                      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                        {photoUrl ? (
                          <Image src={photoUrl} alt={t.author} width={40} height={40} className="rounded-full object-cover ring-2 ring-[#BB0A24]/30" />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#BB0A24]/20 text-sm font-black text-[#BB0A24]">
                            {t.author.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-white">{t.author}</p>
                          <p className="text-xs text-white/45">{t.ongName}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── ONGs PARCEIRAS ───────────────────────────── */}
      <section className="border-b border-[#E5E5E5] py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              {page.list.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              {page.list.title}
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayONGs.map((ong, i) => {
              const logoUrl = ong.logo ?? null;

              return (
                <ScrollReveal key={ong._id} direction="up" delay={i * 70}>
                  <div className="group h-full rounded-2xl border border-[#E5E5E5] bg-white p-7 shadow-sm transition-all duration-300 hover:border-[#BB0A24]/20 hover:shadow-md hover:-translate-y-0.5">
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt={ong.name}
                        width={160}
                        height={64}
                        className="h-12 w-auto object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="flex h-12 items-center">
                        <span className="text-lg font-black text-[#1A1A1A]">{ong.name}</span>
                      </div>
                    )}
                    {ong.description && (
                      <p className="mt-4 text-sm leading-6 text-[#555555]">{ong.description}</p>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="bg-[#BB0A24] py-14 sm:py-20 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <ScrollReveal direction="left">
            <h2 className="text-3xl font-black sm:text-4xl">{page.cta.title}</h2>
            <p className="mt-4 text-base leading-7 text-white/80">
              {page.cta.text}
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={120} className="flex lg:justify-end">
            <a
              href="mailto:contato@gas.org.br"
              className="inline-flex items-center gap-2 rounded-xl border border-white bg-white px-7 py-3.5 text-sm font-semibold text-[#BB0A24] transition-all duration-200 hover:bg-white/90 hover:-translate-y-px active:translate-y-0"
            >
              {page.cta.buttonLabel}
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
