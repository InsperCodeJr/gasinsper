import Image from "next/image";
import { getAllPartners } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ScrollReveal from "@/components/ScrollReveal";

const FALLBACK_CURRENT = [
  { _id: "p1", name: "Insper", description: "Parceiro fundador e principal apoiador institucional do GAS, provendo infraestrutura, mentoria e visibilidade para as iniciativas da organização.", isHistorical: false },
  { _id: "p2", name: "McKinsey & Company", description: "Parceiro estratégico que apoia projetos de consultoria social, oferecendo mentores e metodologias de alto impacto para nossos membros.", isHistorical: false },
  { _id: "p3", name: "BCorp Brasil", description: "Parceria focada na integração de métricas de impacto nos projetos do GAS, alinhando as iniciativas aos padrões internacionais de negócios de impacto.", isHistorical: false },
];

const FALLBACK_HISTORICAL = [
  { _id: "h1", name: "Parceiro Histórico A", isHistorical: true },
  { _id: "h2", name: "Parceiro Histórico B", isHistorical: true },
  { _id: "h3", name: "Parceiro Histórico C", isHistorical: true },
  { _id: "h4", name: "Parceiro Histórico D", isHistorical: true },
  { _id: "h5", name: "Parceiro Histórico E", isHistorical: true },
];

const INFO_CARDS = [
  { title: "Por que Parceiro?", text: "As parcerias viabilizam recursos, metodologias e redes que potencializam cada projeto do GAS, aumentando o alcance e a qualidade das nossas ações." },
  { title: "Como Colaboramos", text: "Trabalhamos com mentoria especializada, apoio financeiro, co-criação de projetos e acesso a redes de impacto — cada parceiro contribui de forma única." },
  { title: "O Retorno", text: "Parceiros ganham acesso a talentos excepcionais, visibilidade no ecossistema de impacto e a satisfação de contribuir com iniciativas que realmente funcionam." },
];

export default async function Parceiros() {
  const allPartners = await getAllPartners();
  const currentPartners = allPartners.filter((p) => !p.isHistorical);
  const historicalPartners = allPartners.filter((p) => p.isHistorical);

  const displayCurrent = currentPartners.length > 0 ? currentPartners : FALLBACK_CURRENT;
  const displayHistorical = historicalPartners.length > 0 ? historicalPartners : FALLBACK_HISTORICAL;
  const hasSanityData = allPartners.length > 0;

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
            Parceiros
          </p>
          <h1 className="animate-fade-in-up delay-100 mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
            Juntos, ampliamos o impacto
          </h1>
          <p className="animate-fade-in-up delay-200 mt-6 max-w-2xl text-base leading-7 text-white/70">
            As parcerias são o coração do modelo do GAS. Cada colaboração — seja com empresas, fundações ou organizações acadêmicas — fortalece nossa capacidade de gerar transformação social consistente e de longo prazo.
          </p>
        </div>
      </section>

      {/* ── POR QUE, COMO, RETORNO ───────────────────── */}
      <section className="border-b border-[#E5E5E5] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {INFO_CARDS.map((item, i) => (
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

      {/* ── PARCEIROS ATUAIS ─────────────────────────── */}
      <section className="border-b border-[#E5E5E5] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Parceiros Atuais
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">Quem nos apoia hoje</h2>
            {!hasSanityData && (
              <p className="mt-2 text-xs italic text-[#555555]">Conteúdo de exemplo — cadastre os parceiros reais no Sanity Studio.</p>
            )}
          </ScrollReveal>

          <div className="mt-10 space-y-4">
            {displayCurrent.map((partner, i) => {
              const logoUrl =
                "logo" in partner && partner.logo
                  ? urlFor((partner as { logo: object }).logo).width(200).height(80).fit("max").url()
                  : null;

              return (
                <ScrollReveal key={partner._id} direction="left" delay={i * 60}>
                  <div className="grid gap-8 rounded-2xl border border-[#E5E5E5] bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#BB0A24]/20 hover:shadow-md lg:grid-cols-[180px_1fr] lg:items-center">
                    <div className="flex h-16 items-center">
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt={partner.name}
                          width={160}
                          height={64}
                          className="object-contain"
                        />
                      ) : (
                        <div className="flex h-14 w-40 items-center justify-center rounded-xl border border-[#E5E5E5] bg-[#F9F9F9]">
                          <span className="text-sm font-black text-[#555555]">{partner.name}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-black">{partner.name}</h3>
                      {"description" in partner && partner.description && (
                        <p className="mt-2 text-sm leading-6 text-[#555555]">{partner.description as string}</p>
                      )}
                      {"website" in partner && partner.website && (
                        <a
                          href={partner.website as string}
                          target="_blank"
                          rel="noreferrer"
                          className="group/link mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#BB0A24] hover:underline"
                        >
                          Visitar site
                          <svg className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HISTÓRICO ────────────────────────────────── */}
      <section className="border-b border-[#E5E5E5] bg-[#F9F9F9] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Histórico
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">Quem já caminhou conosco</h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100} className="mt-10 flex flex-wrap gap-3">
            {displayHistorical.map((partner) => {
              const logoUrl =
                "logo" in partner && partner.logo
                  ? urlFor((partner as { logo: object }).logo).width(160).height(60).fit("max").url()
                  : null;

              return (
                <div
                  key={partner._id}
                  className="flex h-16 w-36 items-center justify-center rounded-xl border border-[#E5E5E5] bg-white px-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-px"
                >
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={partner.name}
                      width={128}
                      height={48}
                      className="object-contain grayscale transition-all duration-300 hover:grayscale-0"
                    />
                  ) : (
                    <span className="text-center text-xs font-semibold text-[#999]">{partner.name}</span>
                  )}
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="bg-[#BB0A24] py-20 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <ScrollReveal direction="left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Faça Parte</p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">Torne-se um parceiro do GAS</h2>
            <p className="mt-5 text-base leading-7 text-white/80">
              Se sua empresa ou organização compartilha do propósito de transformação social, há muitas formas de colaborar. Entre em contato e vamos construir algo juntos.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={120} className="flex flex-col gap-3 lg:items-end">
            <a
              href="mailto:contato@gas.org.br"
              className="inline-flex items-center gap-2 rounded-xl border border-white bg-white px-7 py-3.5 text-sm font-semibold text-[#BB0A24] transition-all duration-200 hover:bg-white/90 hover:-translate-y-px active:translate-y-0"
            >
              Entrar em Contato
            </a>
            <p className="text-xs text-white/50">Respondemos em até 48h</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
