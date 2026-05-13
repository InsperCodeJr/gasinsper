import Image from "next/image";
import { getAllEvents } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const FALLBACK_EVENTS = [
  {
    _id: "e1",
    title: "Semana do Impacto Social",
    description: "Uma semana dedicada a palestras, workshops e networking com líderes do setor social, conectando estudantes a iniciativas de alto impacto em todo o Brasil.",
    date: "2025-09-15",
  },
  {
    _id: "e2",
    title: "GAS Demo Day",
    description: "Apresentação dos resultados dos projetos do semestre para parceiros, ONGs e convidados especiais. Um momento de celebração e prestação de contas.",
    date: "2025-11-20",
  },
  {
    _id: "e3",
    title: "Encontro de Voluntários",
    description: "Evento de integração e capacitação para voluntários de todos os projetos, com treinamentos práticos e troca de experiências entre as equipes.",
    date: "2025-08-05",
  },
];

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function Eventos() {
  const events = await getAllEvents();
  const displayEvents = events.length > 0 ? events : FALLBACK_EVENTS;
  const hasSanityData = events.length > 0;

  return (
    <div className="bg-white text-[#1A1A1A]">
      {/* HERO */}
      <section className="border-b border-[#E5E5E5] py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
            Nossos Eventos
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Onde o impacto se torna experiência
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#555555]">
            Os eventos do GAS são pontos de encontro entre pessoas, ideias e causas. De palestras a demo days, cada iniciativa cria conexões que ampliam o alcance do impacto social.
          </p>
        </div>
      </section>

      {/* EVENTOS */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {!hasSanityData && (
          <p className="mb-8 text-xs text-[#555555] italic">Conteúdo de exemplo — cadastre os eventos reais no Sanity Studio.</p>
        )}
        <div className="space-y-0">
          {displayEvents.map((event, index) => {
            const imageUrl = hasSanityData && "image" in event && event.image
              ? urlFor((event as { image: object }).image).width(800).height(500).fit("crop").url()
              : null;
            const date = "date" in event ? formatDate(event.date as string | undefined) : null;

            return (
              <article key={event._id} className="group border-b border-[#E5E5E5]">
                <div className={`grid lg:grid-cols-2 ${index % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}>
                  {/* Imagem */}
                  <div className="relative aspect-video overflow-hidden bg-[#F7F7F7] lg:[direction:ltr]">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#BB0A24]/30">
                        <span className="text-6xl font-black text-white/10">
                          {event.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    {date && (
                      <div className="absolute bottom-4 left-4 bg-[#BB0A24] px-3 py-1 text-xs font-semibold text-white">
                        {date}
                      </div>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex flex-col justify-center px-8 py-12 lg:[direction:ltr]">
                    <div className="h-0.5 w-8 bg-[#BB0A24]" />
                    <h2 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">
                      {event.title}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-[#555555]">
                      {event.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA PARCEIROS */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                Seja Parceiro
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                Colabore com nossos eventos
              </h2>
              <p className="mt-5 text-base leading-7 text-white/70">
                Buscamos parceiros que compartilhem nosso propósito de ampliar o impacto social. Sua empresa pode apoiar eventos, patrocinar projetos ou co-criar iniciativas que conectam mercado e sociedade.
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <a
                href="https://instagram.com/gas.insper"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Entre em contato
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <p className="text-xs text-white/40">Também disponível por e-mail e Instagram</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
