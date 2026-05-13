import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Project } from "@/types/sanity";

export default async function Projetos() {
  const projects = await getAllProjects();

  const allGalleryImages = projects.flatMap((p) =>
    (p.galleryImages ?? []).slice(0, 2).map((img) => ({ img, project: p.name }))
  );

  return (
    <div className="bg-white text-[#1A1A1A]">
      {/* HERO */}
      <section className="border-b border-[#E5E5E5] bg-[#1A1A1A] py-24 text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
            Nossas Iniciativas
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Projetos que geram impacto real
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70">
            O GAS desenvolve {projects.length > 0 ? projects.length : "múltiplos"} projetos com escopos distintos — de educação financeira a empreendedorismo social — todos orientados por metodologia rigorosa e comprometimento com resultados mensuráveis.
          </p>
          <div className="mt-8 flex gap-6 text-sm text-white/50">
            <span>{projects.length || "10"}+ projetos ativos</span>
            <span>·</span>
            <span>Múltiplas ONGs impactadas</span>
            <span>·</span>
            <span>Voluntários em todo o Brasil</span>
          </div>
        </div>
      </section>

      {/* MURAL DE FOTOS */}
      {allGalleryImages.length > 0 && (
        <section className="overflow-hidden border-b border-[#E5E5E5]">
          <div className="grid grid-cols-3 gap-0 sm:grid-cols-4 lg:grid-cols-6">
            {allGalleryImages.slice(0, 12).map(({ img, project }, i) => (
              <div key={i} className="relative aspect-square overflow-hidden bg-[#F7F7F7]">
                <Image
                  src={urlFor(img).width(400).height(400).fit("crop").url()}
                  alt={project}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lista navegável de projetos */}
      <section className="border-b border-[#E5E5E5] bg-[#F7F7F7] py-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#555555]">
            Ir para o projeto
          </p>
          <div className="flex flex-wrap gap-2">
            {projects.map((p) => (
              <a
                key={p._id}
                href={`#${p.slug.current}`}
                className="border border-[#E5E5E5] bg-white px-4 py-1.5 text-sm text-[#1A1A1A] hover:border-[#BB0A24] hover:text-[#BB0A24] transition-colors"
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROJETOS INDIVIDUAIS */}
      {projects.length === 0 ? (
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <p className="text-[#555555]">Os projetos serão cadastrados em breve no Sanity Studio.</p>
        </div>
      ) : (
        projects.map((project, index) => (
          <ProjectSection key={project._id} project={project} reversed={index % 2 !== 0} />
        ))
      )}
    </div>
  );
}

function ProjectSection({ project, reversed }: { project: Project; reversed: boolean }) {
  const logoUrl = project.logo
    ? urlFor(project.logo).width(800).height(600).fit("crop").url()
    : null;

  return (
    <section
      id={project.slug.current}
      className="border-b border-[#E5E5E5] scroll-mt-20"
    >
      {/* Identificação */}
      <div className={`mx-auto grid w-full max-w-7xl gap-0 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 ${reversed ? "lg:flex-row-reverse" : ""}`}>
        <div className={`flex flex-col justify-center ${reversed ? "lg:order-2 lg:pl-16" : "lg:pr-16"}`}>
          <div className="flex items-center gap-4">
            <div className="h-0.5 w-8 bg-[#BB0A24]" />
            {project.instagramHandle && (
              <a
                href={`https://instagram.com/${project.instagramHandle}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#BB0A24] hover:underline"
              >
                @{project.instagramHandle}
              </a>
            )}
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{project.name}</h2>

          {project.targetAudience && (
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#555555]">
              Público: {project.targetAudience}
            </p>
          )}

          {/* Descrição */}
          <p className="mt-6 text-base leading-7 text-[#555555]">{project.description}</p>

          {project.objective && (
            <div className="mt-6 border-l-2 border-[#BB0A24] pl-4">
              <p className="text-sm font-semibold text-[#1A1A1A]">Objetivo</p>
              <p className="mt-1 text-sm leading-6 text-[#555555]">{project.objective}</p>
            </div>
          )}
        </div>

        {/* Imagem */}
        <div className={`relative min-h-[280px] overflow-hidden bg-[#F7F7F7] ${reversed ? "lg:order-1" : ""}`}>
          {logoUrl ? (
            <Image src={logoUrl} alt={project.name} fill className="object-cover" />
          ) : (
            <div className="flex h-full min-h-[280px] items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#BB0A24]/20">
              <span className="text-6xl font-black text-white/10">{project.name.charAt(0)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Números do projeto */}
      {project.stats && project.stats.length > 0 && (
        <div className="border-t border-[#E5E5E5] bg-[#F7F7F7]">
          <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Números do Projeto
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {project.stats.map((stat, i) => (
                <div key={i} className="border-l-2 border-[#BB0A24] pl-4">
                  <p className="text-3xl font-bold text-[#BB0A24]">{stat.value}</p>
                  <p className="mt-1 text-sm text-[#555555]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Parcerias */}
      {project.partners && project.partners.length > 0 && (
        <div className="border-t border-[#E5E5E5]">
          <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#555555]">
              Parceiros deste Projeto
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {project.partners.map((partner) => {
                const pLogo = partner.logo ? urlFor(partner.logo).height(60).url() : null;
                return (
                  <div key={partner._id} className="flex flex-col items-center gap-1">
                    {pLogo ? (
                      <Image src={pLogo} alt={partner.name} width={120} height={60} className="object-contain grayscale hover:grayscale-0 transition" />
                    ) : (
                      <span className="text-sm font-semibold text-[#555555]">{partner.name}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Depoimentos */}
      {project.testimonials && project.testimonials.length > 0 && (
        <div className="border-t border-[#E5E5E5] bg-[#1A1A1A]">
          <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Depoimentos
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.testimonials.map((t, i) => {
                const photoUrl = t.photo ? urlFor(t.photo).width(80).height(80).fit("crop").url() : null;
                return (
                  <div key={i} className="border border-white/10 p-6">
                    <p className="text-sm leading-7 text-white/70 italic">&ldquo;{t.text}&rdquo;</p>
                    <div className="mt-4 flex items-center gap-3">
                      {photoUrl && (
                        <Image src={photoUrl} alt={t.author} width={40} height={40} className="rounded-full object-cover" />
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">{t.author}</p>
                        {t.role && <p className="text-xs text-white/50">{t.role}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Voluntariado */}
      {project.volunteerInfo?.description && (
        <div className="border-t border-[#E5E5E5]">
          <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                  Voluntariado
                </p>
                <p className="mt-4 text-base leading-7 text-[#555555]">
                  {project.volunteerInfo.description}
                </p>
                {project.volunteerInfo.opportunities && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-[#1A1A1A]">Tipo de Atuação</p>
                    <p className="mt-1 text-sm leading-6 text-[#555555]">{project.volunteerInfo.opportunities}</p>
                  </div>
                )}
                {project.volunteerInfo.process && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-[#1A1A1A]">Como Funciona</p>
                    <p className="mt-1 text-sm leading-6 text-[#555555]">{project.volunteerInfo.process}</p>
                  </div>
                )}
                {project.volunteerInfo.demand && (
                  <div className="mt-4 inline-block border border-[#BB0A24] px-3 py-1 text-xs font-semibold text-[#BB0A24]">
                    {project.volunteerInfo.demand}
                  </div>
                )}
              </div>
              {project.instagramHandle && (
                <div className="flex items-center">
                  <a
                    href={`https://instagram.com/${project.instagramHandle}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-[#BB0A24] bg-[#BB0A24] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8F071B]"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Saiba mais no Instagram
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
