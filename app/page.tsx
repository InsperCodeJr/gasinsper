import Link from "next/link";
import Image from "next/image";

import { getAllProjects, getHomeImpactNumbers } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const fallbackProjects = [
  {
    id: "mentoria",
    name: "Mentoria Social",
    description:
      "Capacitação e acompanhamento de jovens para desenvolvimento acadêmico e profissional.",
  },
  {
    id: "educacao-financeira",
    name: "Educação Financeira",
    description:
      "Workshops e oficinas para fortalecer autonomia financeira de comunidades atendidas.",
  },
  {
    id: "empreendedorismo",
    name: "Empreendedorismo Local",
    description:
      "Apoio prático para pequenos empreendedores sociais estruturarem e escalarem suas iniciativas.",
  },
];

export default async function Home() {
  const [projects, impactNumbers] = await Promise.all([
    getAllProjects(),
    getHomeImpactNumbers(),
  ]);
  const featuredProjects = projects.slice(0, 6);
  const hasProjects = featuredProjects.length > 0;

  return (
    <div className="bg-[#FFFFFF] text-[#1A1A1A]">
      <section className="border-b border-[#E5E5E5] bg-[#FFFFFF]">
        <div className="mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <p className="inline-flex rounded-full bg-[#F5A1AA]/40 px-3 py-1 text-sm uppercase tracking-[0.2em] text-[#8F071B]">
            Grupo de Ação Social
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Transformamos potencial em impacto social com projetos que conectam
            pessoas, parceiros e ONGs.
          </h1>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#F5A1AA]">
            <div className="relative h-[260px] w-full sm:h-[360px] lg:h-[460px]">
              <Image
                src="/insper.jpg"
                alt="Campus do Insper"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/35 via-transparent to-transparent" />
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-lg text-[#555555]">
            Conheça como o GAS atua para gerar impacto real, formar lideranças e
            fortalecer o ecossistema social.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/sobre-nos"
              className="rounded-full bg-[#BB0A24] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8F071B]"
            >
              Conheça o GAS
            </Link>
            <Link
              href="/projetos"
              className="rounded-full border border-[#E5E5E5] px-6 py-3 text-sm font-semibold transition hover:border-[#BB0A24] hover:text-[#BB0A24]"
            >
              Ver Projetos
            </Link>
          </div>

          <div className="mt-12 h-1 w-28 rounded-full bg-[#BB0A24]" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8F071B]">
              Sobre o GAS
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Formação, estratégia e ação para ampliar impacto social.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#555555]">
              O GAS é uma organização estudantil que desenvolve projetos sociais
              com foco em impacto consistente. Atuamos lado a lado com ONGs e
              parceiros para construir soluções que geram valor para comunidades
              e aceleram o desenvolvimento de nossos membros.
            </p>
            <Link
              href="/sobre-nos"
              className="mt-8 inline-flex items-center text-sm font-semibold text-[#BB0A24] hover:text-[#8E081C]"
            >
              Ir para Sobre Nós →
            </Link>
          </div>

          <div className="rounded-xl border border-[#F5A1AA] bg-[#F7F7F7] p-8">
            <div className="mb-4 h-1 w-16 rounded-full bg-[#BB0A24]" />
            <h3 className="text-lg font-semibold">Nossa visão</h3>
            <p className="mt-3 text-sm leading-7 text-[#555555]">
              Ser referência em protagonismo estudantil e transformação social,
              conectando talento, gestão e propósito em iniciativas de alto
              impacto.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#F5A1AA] bg-gradient-to-b from-[#F7F7F7] to-[#F5A1AA]/20 py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#8F071B]">
            Nossos Números
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {impactNumbers.map((item) => (
              <article
                key={item.label}
                className="rounded-xl border border-[#F5A1AA] bg-white p-7 text-center shadow-[0_8px_24px_rgba(187,10,36,0.08)]"
              >
                <p className="text-4xl font-semibold text-[#BB0A24]">{item.value}</p>
                <p className="mt-3 text-sm text-[#555555]">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8F071B]">
              Nossos Projetos
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Iniciativas que geram resultado.
            </h2>
          </div>
          <Link
            href="/projetos"
            className="text-sm font-semibold text-[#BB0A24] hover:text-[#8E081C]"
          >
            Ver todos os projetos →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {hasProjects
            ? featuredProjects.map((project) => {
                const projectImage = project.logo
                  ? urlFor(project.logo).width(900).height(900).fit("crop").url()
                  : null;

                return (
                  <article
                    key={project._id}
                    className="group relative min-h-[320px] overflow-hidden rounded-xl border border-[#E03A4F]/60 bg-[#1A1A1A] text-white"
                  >
                    {projectImage ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${projectImage})` }}
                        aria-hidden
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-[#8F071B]/45 to-transparent" />

                    <div className="relative flex h-full flex-col justify-end p-6">
                      <h3 className="text-xl font-semibold">{project.name}</h3>
                      <p className="mt-3 max-h-0 overflow-hidden text-sm leading-6 text-[#E5E5E5] transition-all duration-300 group-hover:max-h-40">
                        {project.description}
                      </p>
                      <Link
                        href={`/projetos#${project.slug.current}`}
                        className="mt-4 w-fit rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#BB0A24] opacity-0 transition group-hover:opacity-100"
                      >
                        Ver detalhes
                      </Link>
                    </div>
                  </article>
                );
              })
            : fallbackProjects.map((project) => (
                <article
                  key={project.id}
                  className="group relative min-h-[320px] overflow-hidden rounded-xl border border-[#E03A4F]/60 bg-gradient-to-br from-[#1A1A1A] via-[#2A0C12] to-[#8F071B] p-6 text-white"
                >
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p className="mt-3 max-h-0 overflow-hidden text-sm leading-6 text-[#E5E5E5] transition-all duration-300 group-hover:max-h-40">
                    {project.description}
                  </p>
                  <Link
                    href="/projetos"
                    className="mt-5 w-fit rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#BB0A24] opacity-0 transition group-hover:opacity-100"
                  >
                    Ver detalhes
                  </Link>
                </article>
              ))}
        </div>
      </section>
    </div>
  );
}
