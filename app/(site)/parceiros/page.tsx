import { getAllPartners, getPageContent } from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";
import HeroBackground from "@/components/HeroBackground";
import PartnerLogoCarousel, { type LogoPartner } from "@/components/PartnerLogoCarousel";

const FALLBACK_CURRENT: LogoPartner[] = [
  { _id: "p1", name: "Insper", logoUrl: null, website: null },
  { _id: "p2", name: "McKinsey & Company", logoUrl: null, website: null },
  { _id: "p3", name: "BCorp Brasil", logoUrl: null, website: null },
];

const FALLBACK_HISTORICAL: LogoPartner[] = [
  { _id: "h1", name: "Parceiro Histórico A", logoUrl: null, website: null },
  { _id: "h2", name: "Parceiro Histórico B", logoUrl: null, website: null },
  { _id: "h3", name: "Parceiro Histórico C", logoUrl: null, website: null },
  { _id: "h4", name: "Parceiro Histórico D", logoUrl: null, website: null },
  { _id: "h5", name: "Parceiro Histórico E", logoUrl: null, website: null },
];

export default async function Parceiros() {
  const [allPartners, page] = await Promise.all([getAllPartners(), getPageContent("partners")]);
  const currentPartners = allPartners.filter((p) => !p.isHistorical);
  const historicalPartners = allPartners.filter((p) => p.isHistorical);

  const toLogoPartner = (p: typeof allPartners[number]): LogoPartner => ({
    _id: p._id,
    name: p.name,
    logoUrl: p.logo ?? null,
    website: p.website ?? null,
  });

  const displayCurrent: LogoPartner[] =
    currentPartners.length > 0 ? currentPartners.map(toLogoPartner) : FALLBACK_CURRENT;
  const displayHistorical: LogoPartner[] =
    historicalPartners.length > 0 ? historicalPartners.map(toLogoPartner) : FALLBACK_HISTORICAL;

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

      {/* ── POR QUE, COMO, RETORNO ───────────────────── */}
      <section className="border-b border-[#E5E5E5] py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {page.infoCards.map((item, i) => (
              <ScrollReveal key={item.title} direction="up" delay={i * 80}>
                <div className="group h-full rounded-2xl border border-[#E5E5E5] bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#BB0A24]/20 hover:shadow-md hover:-translate-y-0.5">
                  <div className="h-0.5 w-8 bg-[#BB0A24] transition-all duration-300 group-hover:w-12" />
                  <h3 className="mt-5 text-lg font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#555555]">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARCEIROS ATUAIS — CARROSSEL ─────────────── */}
      <section className="border-b border-[#E5E5E5] py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              {page.current.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">{page.current.title}</h2>
          </ScrollReveal>

          <div className="mt-10">
            <PartnerLogoCarousel partners={displayCurrent} />
          </div>
        </div>
      </section>

      {/* ── HISTÓRICO — CARROSSEL ────────────────────── */}
      <section className="border-b border-[#E5E5E5] bg-[#F9F9F9] py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              {page.history.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">{page.history.title}</h2>
          </ScrollReveal>

          <div className="mt-10">
            <PartnerLogoCarousel partners={displayHistorical} />
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="bg-[#BB0A24] py-14 sm:py-20 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <ScrollReveal direction="left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">{page.cta.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">{page.cta.title}</h2>
            <p className="mt-5 text-base leading-7 text-white/80">
              {page.cta.text}
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={120} className="flex flex-col gap-3 lg:items-end">
            <a
              href="mailto:contato@gas.org.br"
              className="inline-flex items-center gap-2 rounded-xl border border-white bg-white px-7 py-3.5 text-sm font-semibold text-[#BB0A24] transition-all duration-200 hover:bg-white/90 hover:-translate-y-px active:translate-y-0"
            >
              {page.cta.buttonLabel}
            </a>
            <p className="text-xs text-white/50">{page.cta.note}</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
