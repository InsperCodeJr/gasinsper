import Image from "next/image";
import { getAllONGs } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ScrollReveal from "@/components/ScrollReveal";

const FALLBACK_ONGS = [
  { _id: "o1", name: "Instituto Fazendo História", description: "Organização que atua na garantia de direitos de crianças e adolescentes em situação de vulnerabilidade social.", testimonials: [{ author: "Ana Paula Silveira", text: "A parceria com o GAS transformou nossa capacidade de gestão. Os estudantes trouxeram uma visão fresca e metodologias que nunca teríamos acesso de outra forma." }] },
  { _id: "o2", name: "Ação Comunitária do Brasil", description: "Promove o desenvolvimento humano de pessoas em situação de vulnerabilidade por meio de educação, saúde e geração de renda.", testimonials: [{ author: "Roberto Menezes", text: "O projeto desenvolvido pelo GAS nos ajudou a estruturar nosso planejamento estratégico. Hoje somos uma organização muito mais eficiente e focada em impacto." }] },
  { _id: "o3", name: "CEJIL Brasil", description: "Organização de direitos humanos que defende os direitos de pessoas e grupos vulneráveis perante o sistema interamericano." },
  { _id: "o4", name: "SOS Mata Atlântica", description: "Fundação que atua na preservação dos remanescentes da Mata Atlântica e na promoção de políticas públicas ambientais." },
];

const BENEFITS = [
  "Acesso gratuito a estudantes altamente capacitados",
  "Projetos desenvolvidos com rigor metodológico",
  "Relatórios de impacto e acompanhamento contínuo",
  "Conexão com rede de parceiros corporativos do GAS",
];

export default async function ONGs() {
  const ongs = await getAllONGs();
  const displayONGs = ongs.length > 0 ? ongs : FALLBACK_ONGS;
  const hasSanityData = ongs.length > 0;

  const allTestimonials = displayONGs
    .filter((o) => o.testimonials && o.testimonials.length > 0)
    .flatMap((o) => (o.testimonials ?? []).map((t) => ({ ...t, ongName: o.name })));

  return (
    <div className="bg-white text-[#1A1A1A]">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#E5E5E5] bg-[#1A1A1A] py-28 text-white">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 opacity-20"
          style={{ background: "radial-gradient(ellipse at 50% 0%, #BB0A24 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="animate-fade-in text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
            ONGs
          </p>
          <h1 className="animate-fade-in-up delay-100 mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
            As organizações que dão sentido ao nosso trabalho
          </h1>
          <p className="animate-fade-in-up delay-200 mt-6 max-w-2xl text-base leading-7 text-white/70">
            O GAS existe para servir. Cada projeto nasce de uma demanda real de uma ONG parceira, e é para elas que direcionamos toda a nossa energia, competência e comprometimento.
          </p>
        </div>
      </section>

      {/* ── NOSSO PAPEL + O QUE AS ONGS GANHAM ─────── */}
      <section className="border-b border-[#E5E5E5] py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <ScrollReveal direction="left">
            <div className="h-full rounded-2xl border border-[#E5E5E5] bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                Nosso Papel
              </p>
              <h2 className="mt-4 text-2xl font-black sm:text-3xl">
                ONGs como centro do ecossistema GAS
              </h2>
              <p className="mt-5 text-base leading-7 text-[#555555]">
                Cada ONG parceira traz um desafio único que se torna a base de um projeto estruturado. Trabalhamos como consultores internos — com prazo, metodologia e entregáveis claros — para garantir que o impacto seja real e duradouro.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={100}>
            <div className="h-full rounded-2xl border border-[#E5E5E5] bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                O Impacto da Colaboração
              </p>
              <h2 className="mt-4 text-2xl font-black sm:text-3xl">
                O que as ONGs ganham
              </h2>
              <ul className="mt-5 space-y-3">
                {BENEFITS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#BB0A24]" />
                    <p className="text-sm leading-6 text-[#555555]">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── DEPOIMENTOS ──────────────────────────────── */}
      {allTestimonials.length > 0 && (
        <section className="border-b border-[#E5E5E5] bg-[#1A1A1A] py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="none">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                O que dizem sobre nós
              </p>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                Depoimentos
              </h2>
              {!hasSanityData && (
                <p className="mt-2 text-xs italic text-white/30">Depoimentos de exemplo — cadastre os reais no Sanity Studio.</p>
              )}
            </ScrollReveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allTestimonials.map((t, i) => {
                const photoUrl =
                  "photo" in t && t.photo
                    ? urlFor((t as { photo: object }).photo).width(80).height(80).fit("crop").url()
                    : null;

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
      <section className="border-b border-[#E5E5E5] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              ONGs Parceiras
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Organizações com quem trabalhamos
            </h2>
            {!hasSanityData && (
              <p className="mt-2 text-xs italic text-[#555555]">Conteúdo de exemplo — cadastre as ONGs reais no Sanity Studio.</p>
            )}
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayONGs.map((ong, i) => {
              const logoUrl =
                "logo" in ong && ong.logo
                  ? urlFor((ong as { logo: object }).logo).width(200).height(100).fit("max").url()
                  : null;

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
      <section className="bg-[#BB0A24] py-20 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <ScrollReveal direction="left">
            <h2 className="text-3xl font-black sm:text-4xl">Sua ONG pode ser a próxima</h2>
            <p className="mt-4 text-base leading-7 text-white/80">
              Se você representa uma organização social e acredita que poderíamos fazer grandes coisas juntos, entre em contato. Estamos sempre abertos a novas parcerias de impacto.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={120} className="flex lg:justify-end">
            <a
              href="mailto:contato@gas.org.br"
              className="inline-flex items-center gap-2 rounded-xl border border-white bg-white px-7 py-3.5 text-sm font-semibold text-[#BB0A24] transition-all duration-200 hover:bg-white/90 hover:-translate-y-px active:translate-y-0"
            >
              Entrar em contato
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
