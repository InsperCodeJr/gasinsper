import Link from "next/link";
import Image from "next/image";

import { getAllProjects, getHomeImpactNumbers } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";
import ParallaxBackground from "@/components/ParallaxBackground";

const FALLBACK_PROJECTS = [
  { id: "mentoria", name: "Mentoria Social", description: "Capacitação e acompanhamento de jovens para desenvolvimento acadêmico e profissional." },
  { id: "educacao-financeira", name: "Educação Financeira", description: "Workshops e oficinas para fortalecer autonomia financeira de comunidades atendidas." },
  { id: "empreendedorismo", name: "Empreendedorismo Local", description: "Apoio prático para pequenos empreendedores sociais estruturarem suas iniciativas." },
];

export default async function Home() {
  const [projects, impactNumbers] = await Promise.all([
    getAllProjects(),
    getHomeImpactNumbers(),
  ]);
  const featuredProjects = projects.slice(0, 6);
  const hasProjects = featuredProjects.length > 0;

  return (
    <div className="bg-white text-[#1A1A1A]">

      {/* ═══ HERO ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-[#E5E5E5]">
        <ParallaxBackground speed={0.28}>
          <Image src="/insper.jpg" alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#1A1A1A]/65" />
        </ParallaxBackground>

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-20 sm:pb-20 sm:pt-24 sm:px-6 lg:pb-28 lg:pt-32 lg:px-8">
          <p className="animate-fade-in text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
            Grupo de Ação Social · Insper
          </p>
          <h1 className="animate-fade-in-up delay-100 mt-4 max-w-4xl text-3xl font-black leading-[1.08] text-white sm:text-5xl lg:text-7xl">
            Potencial estudantil.<br />
            <span className="text-[#BB0A24]">Impacto real.</span>
          </h1>
          <p className="animate-fade-in-up delay-200 mt-5 max-w-2xl text-base leading-7 text-white/70 sm:mt-7 sm:text-lg">
            O GAS conecta estudantes excepcionais a causas sociais urgentes, construindo projetos de longo prazo com ONGs e parceiros que geram transformação mensurada.
          </p>
          <div className="animate-fade-in-up delay-300 mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
            <Link
              href="/sobre-nos"
              className="inline-flex items-center border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 hover:-translate-y-px active:translate-y-0 sm:px-7 sm:py-3.5"
            >
              Conheça o GAS
            </Link>
            <Link
              href="/projetos"
              className="inline-flex items-center border border-[#BB0A24] bg-[#BB0A24] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#8F071B] hover:border-[#8F071B] hover:-translate-y-px active:translate-y-0 sm:px-7 sm:py-3.5"
            >
              Ver Projetos
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SOBRE O GAS ════════════════════════════════ */}
      <section className="border-b border-[#E5E5E5] py-14 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-0 lg:px-8">
          <ScrollReveal direction="left" className="border-b border-[#E5E5E5] pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Sobre o GAS
            </p>
            <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
              Formação, estratégia e ação para ampliar o impacto social.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#555555]">
              O GAS é uma organização estudantil que desenvolve projetos sociais com foco em impacto consistente. Atuamos lado a lado com ONGs e parceiros para construir soluções que geram valor real para comunidades e aceleram o desenvolvimento de nossos membros.
            </p>
            <Link
              href="/sobre-nos"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#BB0A24] hover:underline"
            >
              Conhecer nossa história
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={120} className="lg:pl-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#555555]">
              Nossa Visão
            </p>
            <div className="mt-4 h-0.5 w-8 bg-[#BB0A24]" />
            <p className="mt-5 text-lg font-light leading-relaxed text-[#1A1A1A] sm:text-xl">
              &ldquo;Ser referência em protagonismo estudantil e transformação social, conectando talento, gestão e propósito em iniciativas de alto impacto.&rdquo;
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { label: "Estrutura", value: "Matriz + 4 Áreas" },
                { label: "Atuação", value: "Semestral" },
                { label: "Foco", value: "Impacto Mensurável" },
                { label: "Origem", value: "Insper, São Paulo" },
              ].map((item) => (
                <div key={item.label} className="group">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#555555]">{item.label}</p>
                  <p className="mt-1 font-bold transition-colors duration-200 group-hover:text-[#BB0A24]">{item.value}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ NOSSOS NÚMEROS ═════════════════════════════ */}
      <section className="border-b border-[#E5E5E5] bg-[#1A1A1A] py-14 text-white sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none" className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Nossos Números
            </p>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">
              Impacto que se mede
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
            {impactNumbers.map((item, i) => (
              <ScrollReveal key={item.label} direction="up" delay={i * 90}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 sm:p-8">
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(187,10,36,0.15) 0%, transparent 70%)" }}
                  />
                  <p className="relative text-3xl font-black text-[#BB0A24] sm:text-5xl">
                    <CountUp value={item.value} />
                  </p>
                  <p className="relative mt-2 text-xs text-white/60 sm:mt-3 sm:text-sm">{item.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NOSSOS PROJETOS ════════════════════════════ */}
      <section className="border-b border-[#E5E5E5] py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none" className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E5E5E5] pb-7 sm:pb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                Nossos Projetos
              </p>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl">
                Iniciativas que geram resultado.
              </h2>
            </div>
            <Link
              href="/projetos"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] underline hover:text-[#BB0A24] transition-colors"
            >
              Ver todos
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {hasProjects
              ? featuredProjects.map((project, i) => {
                  const projectImage = project.logo
                    ? urlFor(project.logo).width(700).height(525).fit("crop").url()
                    : null;
                  return (
                    <ScrollReveal key={project._id} direction="up" delay={i * 75}>
                      <Link
                        href={`/projetos#${project.slug.current}`}
                        className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
                      >
                        <div className="relative aspect-[4/3] bg-[#1A1A1A]">
                          {projectImage ? (
                            <Image src={projectImage} alt={project.name} fill className="object-cover opacity-75 transition-all duration-700 group-hover:scale-110 group-hover:opacity-55" />
                          ) : (
                            <div className="h-full bg-gradient-to-br from-[#1A1A1A] via-[#2A0C12] to-[#BB0A24]/30">
                              <span className="absolute inset-0 flex items-center justify-center text-9xl font-black text-white/5 select-none">{project.name.charAt(0)}</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/45 group-hover:via-black/15" />
                          <div className="absolute inset-x-0 bottom-0 p-4">
                            <div className="rounded-xl border border-white/10 bg-black/40 p-4 shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1">
                              <h3 className="font-bold text-white leading-tight">{project.name}</h3>
                              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                                <div className="overflow-hidden">
                                  <p className="mt-2 text-sm text-white/70 leading-6 line-clamp-3">{project.description}</p>
                                </div>
                              </div>
                              <div className="mt-0 flex items-center gap-1 text-xs font-semibold text-[#BB0A24] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:mt-3">
                                Ver projeto <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </ScrollReveal>
                  );
                })
              : FALLBACK_PROJECTS.map((project, i) => (
                  <ScrollReveal key={project.id} direction="up" delay={i * 75}>
                    <Link href="/projetos" className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500">
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-[#1A1A1A] via-[#2A0C12] to-[#BB0A24]/20">
                        <span className="absolute inset-0 flex items-center justify-center text-9xl font-black text-white/5 select-none">{project.name.charAt(0)}</span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <div className="rounded-xl border border-white/10 bg-black/40 p-4 shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1">
                            <h3 className="font-bold text-white leading-tight">{project.name}</h3>
                            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                              <div className="overflow-hidden">
                                <p className="mt-2 text-sm text-white/70 leading-6">{project.description}</p>
                              </div>
                            </div>
                            <div className="mt-0 flex items-center gap-1 text-xs font-semibold text-[#BB0A24] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:mt-3">
                              Ver projeto <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════ */}
      <section className="border-b border-[#E5E5E5] bg-[#BB0A24] py-14 text-white sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <ScrollReveal direction="left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
              Junte-se a Nós
            </p>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">
              Pronto para fazer parte do GAS?
            </h2>
            <p className="mt-4 text-base leading-7 text-white/80 sm:mt-5">
              Seja como membro da organização ou voluntário em nossos projetos, há um espaço para você contribuir e crescer.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={120} className="flex flex-col gap-3 sm:gap-4 lg:items-end">
            <Link
              href="/como-fazer-parte#membro"
              className="inline-flex items-center justify-center rounded-xl border border-white bg-white px-6 py-3.5 text-sm font-semibold text-[#BB0A24] transition-all duration-200 hover:bg-white/90 hover:-translate-y-px active:translate-y-0 sm:px-7"
            >
              Quero ser Membro
            </Link>
            <Link
              href="/como-fazer-parte#voluntario"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 hover:-translate-y-px active:translate-y-0 sm:px-7"
            >
              Quero ser Voluntário
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ LINKS RÁPIDOS ══════════════════════════════ */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
              {[
                { href: "/sobre-nos", label: "Sobre Nós" },
                { href: "/projetos", label: "Projetos" },
                { href: "/eventos", label: "Eventos" },
                { href: "/parceiros", label: "Parceiros" },
                { href: "/ongs", label: "ONGs" },
                { href: "/como-fazer-parte", label: "Participar" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-center rounded-2xl border border-[#E5E5E5] px-4 py-5 text-sm font-semibold text-[#1A1A1A] transition-all duration-200 hover:bg-[#BB0A24] hover:text-white hover:border-[#BB0A24] hover:-translate-y-0.5 hover:shadow-md sm:px-6 sm:py-7"
                >
                  <span className="transition-transform duration-200 group-hover:scale-105">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
