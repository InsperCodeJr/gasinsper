import Image from "next/image";
import { getAllONGs } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const FALLBACK_ONGS = [
  {
    _id: "o1",
    name: "Instituto Fazendo História",
    description: "Organização que atua na garantia de direitos de crianças e adolescentes em situação de vulnerabilidade social.",
    testimonials: [
      {
        author: "Ana Paula Silveira",
        text: "A parceria com o GAS transformou nossa capacidade de gestão. Os estudantes trouxeram uma visão fresca e metodologias que nunca teríamos acesso de outra forma.",
      },
    ],
  },
  {
    _id: "o2",
    name: "Ação Comunitária do Brasil",
    description: "Promove o desenvolvimento humano de pessoas em situação de vulnerabilidade por meio de educação, saúde e geração de renda.",
    testimonials: [
      {
        author: "Roberto Menezes",
        text: "O projeto desenvolvido pelo GAS nos ajudou a estruturar nosso planejamento estratégico. Hoje somos uma organização muito mais eficiente e focada em impacto.",
      },
    ],
  },
  {
    _id: "o3",
    name: "CEJIL Brasil",
    description: "Organização de direitos humanos que defende os direitos de pessoas e grupos vulneráveis perante o sistema interamericano.",
  },
  {
    _id: "o4",
    name: "SOS Mata Atlântica",
    description: "Fundação que atua na preservação dos remanescentes da Mata Atlântica e na promoção de políticas públicas ambientais.",
  },
];

export default async function ONGs() {
  const ongs = await getAllONGs();
  const displayONGs = ongs.length > 0 ? ongs : FALLBACK_ONGS;
  const hasSanityData = ongs.length > 0;

  const ongsWithTestimonials = displayONGs.filter(
    (o) => o.testimonials && o.testimonials.length > 0
  );
  const allTestimonials = ongsWithTestimonials.flatMap((o) =>
    (o.testimonials ?? []).map((t) => ({ ...t, ongName: o.name }))
  );

  return (
    <div className="bg-white text-[#1A1A1A]">
      {/* HERO */}
      <section className="border-b border-[#E5E5E5] py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
            ONGs
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            As organizações que dão sentido ao nosso trabalho
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#555555]">
            O GAS existe para servir. Cada projeto nasce de uma demanda real de uma ONG parceira, e é para elas que direcionamos toda a nossa energia, competência e comprometimento.
          </p>
        </div>
      </section>

      {/* SOBRE O ECOSSISTEMA */}
      <section className="border-b border-[#E5E5E5] bg-[#F7F7F7] py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Nosso Papel
            </p>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              ONGs como centro do ecossistema GAS
            </h2>
            <p className="mt-5 text-base leading-7 text-[#555555]">
              Cada ONG parceira traz um desafio único que se torna a base de um projeto estruturado. Trabalhamos como consultores internos — com prazo, metodologia e entregáveis claros — para garantir que o impacto seja real e duradouro.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              O Impacto da Colaboração
            </p>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              O que as ONGs ganham
            </h2>
            <div className="mt-5 space-y-3">
              {[
                "Acesso gratuito a estudantes altamente capacitados",
                "Projetos desenvolvidos com rigor metodológico",
                "Relatórios de impacto e acompanhamento contínuo",
                "Conexão com rede de parceiros corporativos do GAS",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#BB0A24]" />
                  <p className="text-sm text-[#555555]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      {allTestimonials.length > 0 && (
        <section className="border-b border-[#E5E5E5] bg-[#1A1A1A] py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              O que dizem sobre nós
            </p>
            <h2 className="mt-4 mb-12 text-3xl font-bold text-white sm:text-4xl">
              Depoimentos
            </h2>
            {!hasSanityData && (
              <p className="mb-6 text-xs text-white/30 italic">Depoimentos de exemplo — cadastre os reais no Sanity Studio.</p>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allTestimonials.map((t, i) => {
                const photoUrl = "photo" in t && t.photo
                  ? urlFor((t as { photo: object }).photo).width(80).height(80).fit("crop").url()
                  : null;

                return (
                  <div key={i} className="border border-white/10 p-8 hover:border-[#BB0A24]/50 transition-colors">
                    <div className="h-0.5 w-8 bg-[#BB0A24]" />
                    <p className="mt-6 text-sm leading-7 text-white/70 italic">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={t.author}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BB0A24]/20">
                          <span className="text-sm font-bold text-[#BB0A24]">
                            {t.author.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">{t.author}</p>
                        <p className="text-xs text-white/40">{t.ongName}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ONGs PARCEIRAS — logos */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
            ONGs Parceiras
          </p>
          <h2 className="mt-4 mb-12 text-3xl font-bold sm:text-4xl">
            Organizações que já trabalhamos
          </h2>
          {!hasSanityData && (
            <p className="mb-6 text-xs text-[#555555] italic">Conteúdo de exemplo — cadastre as ONGs reais no Sanity Studio.</p>
          )}
          <div className="grid gap-0 border border-[#E5E5E5] sm:grid-cols-2 lg:grid-cols-3">
            {displayONGs.map((ong, i) => {
              const logoUrl = "logo" in ong && ong.logo
                ? urlFor((ong as { logo: object }).logo).width(200).height(100).fit("max").url()
                : null;

              const totalCols = 3;
              const isLastRow = i >= displayONGs.length - (displayONGs.length % totalCols || totalCols);

              return (
                <div
                  key={ong._id}
                  className={`group border-b border-r border-[#E5E5E5] p-8 transition-colors hover:bg-[#F7F7F7] ${isLastRow ? "border-b-0" : ""}`}
                >
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={ong.name}
                      width={160}
                      height={64}
                      className="h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition"
                    />
                  ) : (
                    <div className="h-12 flex items-center">
                      <span className="text-lg font-bold text-[#1A1A1A]">{ong.name}</span>
                    </div>
                  )}
                  {ong.description && (
                    <p className="mt-3 text-sm leading-6 text-[#555555]">{ong.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA — Seja uma ONG Parceira */}
      <section className="border-t border-[#E5E5E5] bg-[#BB0A24] py-16 text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Sua ONG pode ser a próxima
              </h2>
              <p className="mt-4 text-base leading-7 text-white/80">
                Se você representa uma organização social e acredita que poderíamos fazer grandes coisas juntos, entre em contato. Estamos sempre abertos a novas parcerias de impacto.
              </p>
            </div>
            <div className="flex lg:justify-end">
              <a
                href="mailto:contato@gas.org.br"
                className="inline-flex items-center gap-2 border border-white/40 bg-white px-6 py-3 text-sm font-semibold text-[#BB0A24] transition hover:bg-white/90"
              >
                Entrar em contato
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
