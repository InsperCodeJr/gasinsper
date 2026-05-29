import { getAllEvents } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ScrollReveal from "@/components/ScrollReveal";
import EventSlideshow from "@/components/EventSlideshow";

const FALLBACK_EVENTS = [
  { _id: "e1", title: "Semana do Impacto Social", description: "Uma semana dedicada a palestras, workshops e networking com líderes do setor social, conectando estudantes a iniciativas de alto impacto em todo o Brasil.", date: "2025-09-15", slug: { current: "semana-impacto" }, cardColor: null, imageUrl: null },
  { _id: "e2", title: "GAS Demo Day", description: "Apresentação dos resultados dos projetos do semestre para parceiros, ONGs e convidados especiais. Um momento de celebração e prestação de contas.", date: "2025-11-20", slug: { current: "demo-day" }, cardColor: null, imageUrl: null },
  { _id: "e3", title: "Encontro de Voluntários", description: "Evento de integração e capacitação para voluntários de todos os projetos, com treinamentos práticos e troca de experiências entre as equipes.", date: "2025-08-05", slug: { current: "encontro-voluntarios" }, cardColor: null, imageUrl: null },
];

export default async function Eventos() {
  const events = await getAllEvents();
  const hasSanityData = events.length > 0;

  const slideshowEvents = hasSanityData
    ? events.map((ev) => ({
        _id: ev._id,
        title: ev.title,
        description: ev.description,
        date: ev.date ?? null,
        slug: ev.slug,
        cardColor: ev.cardColor ?? null,
        imageUrl: ev.image
          ? urlFor(ev.image).width(1600).height(900).fit("crop").url()
          : null,
      }))
    : FALLBACK_EVENTS;

  return (
    <div className="bg-white text-[#1A1A1A]">

      {/* ── SLIDESHOW ────────────────────────────────── */}
      <EventSlideshow events={slideshowEvents} />

      {!hasSanityData && (
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-xs italic text-[#555555]">
            Conteúdo de exemplo — cadastre os eventos reais no Sanity Studio.
          </p>
        </div>
      )}

      {/* ── CTA PARCEIROS ────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1A060C] via-[#5C1926] to-[#1A060C] py-14 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <ScrollReveal direction="left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Seja Parceiro
            </p>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              Colabore com nossos eventos
            </h2>
            <p className="mt-5 text-base leading-7 text-white/70">
              Buscamos parceiros que compartilhem nosso propósito de ampliar o impacto social. Sua empresa pode apoiar eventos, patrocinar projetos ou co-criar iniciativas que conectam mercado e sociedade.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={120} className="flex flex-col gap-3 lg:items-end">
            <a
              href="https://instagram.com/gas.insper"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 hover:-translate-y-px active:translate-y-0"
            >
              Entre em contato
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="text-xs text-white/40">Também disponível por e-mail e Instagram</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
