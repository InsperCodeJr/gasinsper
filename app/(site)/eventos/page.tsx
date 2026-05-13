import Image from "next/image";
import { getAllEvents } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ScrollReveal from "@/components/ScrollReveal";

const FALLBACK_EVENTS = [
  { _id: "e1", title: "Semana do Impacto Social", description: "Uma semana dedicada a palestras, workshops e networking com líderes do setor social, conectando estudantes a iniciativas de alto impacto em todo o Brasil.", date: "2025-09-15" },
  { _id: "e2", title: "GAS Demo Day", description: "Apresentação dos resultados dos projetos do semestre para parceiros, ONGs e convidados especiais. Um momento de celebração e prestação de contas.", date: "2025-11-20" },
  { _id: "e3", title: "Encontro de Voluntários", description: "Evento de integração e capacitação para voluntários de todos os projetos, com treinamentos práticos e troca de experiências entre as equipes.", date: "2025-08-05" },
];

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function Eventos() {
  const events = await getAllEvents();
  const displayEvents = events.length > 0 ? events : FALLBACK_EVENTS;
  const hasSanityData = events.length > 0;

  return (
    <div className="bg-white text-[#1A1A1A]">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#E5E5E5] bg-[#1A1A1A] py-20 sm:py-24 lg:py-28 text-white">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 opacity-20"
          style={{ background: "radial-gradient(ellipse at 50% 0%, #BB0A24 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="animate-fade-in text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
            Nossos Eventos
          </p>
          <h1 className="animate-fade-in-up delay-100 mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Onde o impacto se torna experiência
          </h1>
          <p className="animate-fade-in-up delay-200 mt-6 max-w-2xl text-base leading-7 text-white/70">
            Os eventos do GAS são pontos de encontro entre pessoas, ideias e causas. De palestras a demo days, cada iniciativa cria conexões que ampliam o alcance do impacto social.
          </p>
        </div>
      </section>

      {/* ── LISTA DE EVENTOS ─────────────────────────── */}
      <section className="border-b border-[#E5E5E5] py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {!hasSanityData && (
            <p className="mb-8 text-xs italic text-[#555555]">Conteúdo de exemplo — cadastre os eventos reais no Sanity Studio.</p>
          )}

          <div className="space-y-5">
            {displayEvents.map((event, index) => {
              const imageUrl =
                hasSanityData && "image" in event && event.image
                  ? urlFor((event as { image: object }).image).width(900).height(560).fit("crop").url()
                  : null;
              const date = "date" in event ? formatDate(event.date as string | undefined) : null;

              return (
                <ScrollReveal key={event._id} direction="up" delay={index * 80}>
                  <article className="group overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 lg:grid lg:grid-cols-2">
                    {/* Image */}
                    <div className={`relative aspect-video overflow-hidden bg-[#1A1A1A] ${index % 2 !== 0 ? "lg:order-2" : ""}`}>
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-75"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#1A1A1A] via-[#2A0C12] to-[#BB0A24]/30">
                          <span className="text-7xl font-black text-white/5 select-none">
                            {event.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      {date && (
                        <div className="absolute bottom-4 left-4 rounded-xl bg-[#BB0A24] px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                          {date}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={`flex flex-col justify-center px-5 py-7 sm:px-8 sm:py-10 ${index % 2 !== 0 ? "lg:order-1" : ""}`}>
                      <div className="h-0.5 w-8 bg-[#BB0A24]" />
                      <h2 className="mt-5 text-2xl font-black leading-tight sm:text-3xl">
                        {event.title}
                      </h2>
                      <p className="mt-4 text-base leading-7 text-[#555555]">
                        {event.description}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA PARCEIROS ────────────────────────────── */}
      <section className="bg-[#1A1A1A] py-14 sm:py-20">
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
