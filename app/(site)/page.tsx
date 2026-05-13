import Link from "next/link";
import Image from "next/image";

import { getAllProjects, getHomeImpactNumbers } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

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

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden border-b border-[#E5E5E5]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/insper.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/75" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
            Grupo de Ação Social · Insper
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Potencial estudantil.<br />
            <span className="text-[#BB0A24]">Impacto real.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-7 text-white/70">
            O GAS conecta estudantes excepcionais a causas sociais urgentes, construindo projetos de longo prazo com ONGs e parceiros que geram transformação mensurada.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/sobre-nos"
              className="border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Conheça o GAS
            </Link>
            <Link
              href="/projetos"
              className="border border-[#BB0A24] bg-[#BB0A24] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8F071B]"
            >
              Ver Projetos
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ SOBRE O GAS ═══════════════ */}
      <section className="border-b border-[#E5E5E5] py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-0 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="border-r border-[#E5E5E5] pr-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Sobre o GAS
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              Formação, estratégia e ação para ampliar o impacto social.
            </h2>
            <p className="mt-6 text-base leading-7 text-[#555555]">
              O GAS é uma organização estudantil que desenvolve projetos sociais com foco em impacto consistente. Atuamos lado a lado com ONGs e parceiros para construir soluções que geram valor real para comunidades e aceleram o desenvolvimento de nossos membros.
            </p>
            <Link
              href="/sobre-nos"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#BB0A24] hover:underline"
            >
              Conhecer nossa história
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="pl-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#555555]">
              Nossa Visão
            </p>
            <div className="mt-4 h-0.5 w-8 bg-[#BB0A24]" />
            <p className="mt-5 text-xl font-light leading-relaxed text-[#1A1A1A]">
              &ldquo;Ser referência em protagonismo estudantil e transformação social, conectando talento, gestão e propósito em iniciativas de alto impacto.&rdquo;
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                { label: "Estrutura", value: "Matriz + 4 Áreas" },
                { label: "Atuação", value: "Semestral" },
                { label: "Foco", value: "Impacto Mensurável" },
                { label: "Origem", value: "Insper, São Paulo" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#555555]">{item.label}</p>
                  <p className="mt-1 font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ NOSSOS NÚMEROS ═══════════════ */}
      <section className="border-b border-[#E5E5E5] bg-[#1A1A1A] py-20 text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
            Nossos Números
          </p>
          <h2 className="mt-4 text-center text-3xl font-black sm:text-4xl">
            Impacto que se mede
          </h2>
          <div className="mt-12 grid gap-px border border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {impactNumbers.map((item) => (
              <div
                key={item.label}
                className="border border-white/10 p-8 text-center hover:bg-white/5 transition-colors"
              >
                <p className="text-5xl font-black text-[#BB0A24]">{item.value}</p>
                <p className="mt-3 text-sm text-white/60">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ NOSSOS PROJETOS ═══════════════ */}
      <section className="border-b border-[#E5E5E5] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E5E5E5] pb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                Nossos Projetos
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Iniciativas que geram resultado.
              </h2>
            </div>
            <Link
              href="/projetos"
              className="text-sm font-semibold text-[#1A1A1A] underline hover:text-[#BB0A24] transition-colors"
            >
              Ver todos os projetos →
            </Link>
          </div>

          <div className="mt-8 grid gap-0 border border-[#E5E5E5] sm:grid-cols-2 xl:grid-cols-3">
            {hasProjects
              ? featuredProjects.map((project) => {
                  const projectImage = project.logo
                    ? urlFor(project.logo).width(600).height(400).fit("crop").url()
                    : null;

                  return (
                    <Link
                      key={project._id}
                      href={`/projetos#${project.slug.current}`}
                      className="group relative block overflow-hidden border-b border-r border-[#E5E5E5] bg-[#1A1A1A]"
                    >
                      <div className="relative aspect-video">
                        {projectImage ? (
                          <Image
                            src={projectImage}
                            alt={project.name}
                            fill
                            className="object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-40"
                          />
                        ) : (
                          <div className="h-full bg-gradient-to-br from-[#1A1A1A] to-[#BB0A24]/20" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                          <h3 className="text-lg font-bold text-white">{project.name}</h3>
                          <p className="mt-2 max-h-0 overflow-hidden text-sm leading-6 text-white/70 transition-all duration-300 group-hover:max-h-24">
                            {project.description}
                          </p>
                          <span className="mt-3 inline-flex w-fit items-center gap-1 text-xs font-semibold text-[#BB0A24] opacity-0 transition group-hover:opacity-100">
                            Ver detalhes →
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              : FALLBACK_PROJECTS.map((project) => (
                  <Link
                    key={project.id}
                    href="/projetos"
                    className="group relative block overflow-hidden border-b border-r border-[#E5E5E5] bg-[#1A1A1A]"
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-[#1A1A1A] via-[#2A0C12] to-[#BB0A24]/20">
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <h3 className="text-lg font-bold text-white">{project.name}</h3>
                        <p className="mt-2 max-h-0 overflow-hidden text-sm leading-6 text-white/70 transition-all duration-300 group-hover:max-h-24">
                          {project.description}
                        </p>
                        <span className="mt-3 inline-flex w-fit items-center gap-1 text-xs font-semibold text-[#BB0A24] opacity-0 transition group-hover:opacity-100">
                          Ver detalhes →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA — COMO FAZER PARTE ═══════════════ */}
      <section className="border-b border-[#E5E5E5] bg-[#BB0A24] py-20 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
              Junte-se a Nós
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Pronto para fazer parte do GAS?
            </h2>
            <p className="mt-5 text-base leading-7 text-white/80">
              Seja como membro da organização ou voluntário em nossos projetos, há um espaço para você contribuir e crescer.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <Link
              href="/como-fazer-parte#membro"
              className="inline-flex items-center justify-center gap-2 border border-white bg-white px-7 py-3.5 text-sm font-semibold text-[#BB0A24] transition hover:bg-white/90"
            >
              Quero ser Membro
            </Link>
            <Link
              href="/como-fazer-parte#voluntario"
              className="inline-flex items-center justify-center gap-2 border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Quero ser Voluntário
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ LINKS RÁPIDOS ═══════════════ */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-0 border border-[#E5E5E5] sm:grid-cols-3 lg:grid-cols-6">
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
                className="flex items-center justify-center border-b border-r border-[#E5E5E5] px-6 py-8 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#BB0A24] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
