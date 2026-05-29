import Image from "next/image";
import { getAllProjects } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Project } from "@/types/sanity";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";

export default async function Projetos() {
  const projects = await getAllProjects();

  const allGalleryImages = projects.flatMap((p) =>
    (p.galleryImages ?? []).slice(0, 2).map((img) => ({ img, project: p.name }))
  );

  return (
    <div className="bg-white text-[#1A1A1A]">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#E5E5E5] bg-gradient-to-br from-[#1A060C] via-[#5C1926] to-[#1A060C] py-20 sm:py-24 lg:py-28 text-white">
        <div />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="animate-fade-in text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
            Nossas Iniciativas
          </p>
          <h1 className="animate-fade-in-up delay-100 mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Projetos que geram impacto real
          </h1>
          <p className="animate-fade-in-up delay-200 mt-6 max-w-2xl text-base leading-7 text-white/70">
            O GAS desenvolve {projects.length > 0 ? projects.length : "múltiplos"} projetos com escopos distintos — de educação financeira a empreendedorismo social — todos orientados por metodologia rigorosa e resultados mensuráveis.
          </p>
          <div className="animate-fade-in-up delay-300 mt-8 flex flex-wrap gap-6 text-sm text-white/50">
            <span>{projects.length || "10"}+ projetos ativos</span>
            <span>·</span>
            <span>Múltiplas ONGs impactadas</span>
            <span>·</span>
            <span>Voluntários em todo o Brasil</span>
          </div>
        </div>
      </section>

      {/* ── MURAL DE FOTOS ───────────────────────────── */}
      {allGalleryImages.length > 0 && (
        <section className="overflow-hidden border-b border-[#E5E5E5]">
          <div className="grid grid-cols-3 gap-1 overflow-hidden sm:grid-cols-4 lg:grid-cols-6 bg-[#1A060C] p-1">
            {allGalleryImages.slice(0, 12).map(({ img, project }, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-[#F7F7F7]">
                <Image
                  src={urlFor(img).width(400).height(400).fit("crop").url()}
                  alt={project}
                  fill
                  className="object-cover transition-all duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── FILTRO / NAVEGAÇÃO RÁPIDA ─────────────────── */}
      <section className="sticky top-16 z-40 border-b border-[#E5E5E5] bg-white/90 py-4 backdrop-blur-md">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* py-2 -my-2 px-2 -mx-2: espaço no padding para o scale não ser clipado pelo overflow-x:auto */}
          <div className="flex flex-wrap gap-2 overflow-x-auto py-2 -my-2 px-2 -mx-2">
            {projects.map((p) => (
              <a
                key={p._id}
                href={`#${p.slug.current}`}
                className="rounded-full border border-[#E5E5E5] bg-white px-4 py-1.5 text-xs font-semibold text-[#555] transition-all duration-200 hover:border-[#BB0A24] hover:text-[#BB0A24] hover:scale-105 hover:shadow-sm"
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJETOS INDIVIDUAIS ─────────────────────── */}
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
  const accent = project.cardColor ?? "#BB0A24";
  const logoUrl = project.logo
    ? urlFor(project.logo).width(900).height(675).fit("crop").url()
    : null;

  return (
    <section id={project.slug.current} className="scroll-mt-28 border-b border-[#E5E5E5]">

      {/* ── Main grid: image + content ── */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:py-14 sm:px-6 lg:py-16 lg:px-8">
        <div className={`grid gap-10 lg:grid-cols-2 lg:gap-16 ${reversed ? "lg:grid-flow-dense" : ""}`}>

          {/* Image card */}
          <ScrollReveal direction={reversed ? "right" : "left"} className={reversed ? "lg:col-start-2" : ""}>
            <div className="group relative min-h-[220px] overflow-hidden rounded-2xl shadow-xl sm:min-h-[340px]"
              style={{ background: `linear-gradient(135deg, #1A060C 0%, ${accent}55 100%)` }}>
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={project.name}
                  fill
                  className="object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-75"
                />
              ) : (
                <div className="flex h-full min-h-[220px] items-center justify-center sm:min-h-[340px]">
                  <span className="text-[9rem] font-black text-white/5 select-none">
                    {project.name.charAt(0)}
                  </span>
                </div>
              )}

              {/* Instagram badge */}
              {project.instagramHandle && (
                <div className="absolute bottom-4 left-4">
                  <a
                    href={`https://instagram.com/${project.instagramHandle}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-black/60 hover:border-white/40"
                  >
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    @{project.instagramHandle}
                  </a>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction={reversed ? "left" : "right"} delay={120} className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-8 shrink-0" style={{ backgroundColor: accent }} />
              {project.targetAudience && (
                <span className="rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-white"
                  style={{ backgroundColor: accent }}>
                  {project.targetAudience}
                </span>
              )}
            </div>
            <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">{project.name}</h2>
            <p className="mt-5 text-base leading-7 text-[#555555]">{project.description}</p>

            {project.objective && (
              <div className="mt-6 rounded-xl border-l-4 bg-[#F7F7F7] py-4 pl-5 pr-4" style={{ borderColor: accent }}>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>Objetivo</p>
                <p className="mt-1.5 text-sm leading-6 text-[#555555]">{project.objective}</p>
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>

      {/* ── Stats ── */}
      {project.stats && project.stats.length > 0 && (
        <div className="border-t border-[#E5E5E5] bg-gradient-to-br from-[#F9F9F9] to-white py-10 sm:py-12">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="none">
              <p className="mb-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                Números do Projeto
              </p>
            </ScrollReveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.stats.map((stat, i) => (
                <ScrollReveal key={i} direction="up" delay={i * 80}>
                  <div className="group rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#BB0A24]/20 hover:shadow-md hover:-translate-y-0.5">
                    <p className="text-4xl font-black text-[#BB0A24]">
                      <CountUp value={stat.value} />
                    </p>
                    <p className="mt-2 text-sm text-[#555555] transition-colors duration-200 group-hover:text-[#1A1A1A]">
                      {stat.label}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Partners ── */}
      {project.partners && project.partners.length > 0 && (
        <div className="border-t border-[#E5E5E5] py-10">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="none">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#555555]">
                Parceiros deste Projeto
              </p>
              <div className="flex flex-wrap items-center gap-8">
                {project.partners.map((partner) => {
                  const pLogo = partner.logo ? urlFor(partner.logo).height(60).url() : null;
                  return (
                    <div key={partner._id} className="flex flex-col items-center gap-1">
                      {pLogo ? (
                        <Image
                          src={pLogo}
                          alt={partner.name}
                          width={120}
                          height={60}
                          className="object-contain grayscale transition-all duration-300 hover:grayscale-0 hover:scale-105"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-[#555555]">{partner.name}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}

      {/* ── Testimonials ── */}
      {project.testimonials && project.testimonials.length > 0 && (
        <div className="border-t border-[#E5E5E5] py-14" style={{ background: `linear-gradient(135deg, #1A060C 0%, ${accent}44 50%, #1A060C 100%)` }}>
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="none">
              <p className="mb-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                Depoimentos
              </p>
            </ScrollReveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.testimonials.map((t, i) => {
                const photoUrl = t.photo
                  ? urlFor(t.photo).width(80).height(80).fit("crop").url()
                  : null;
                return (
                  <ScrollReveal key={i} direction="up" delay={i * 80}>
                    <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5">
                      {/* Quote mark */}
                      <div className="mb-3 text-3xl font-black leading-none text-[#BB0A24] opacity-60">&ldquo;</div>
                      <p className="text-sm leading-7 text-white/75 italic">{t.text}</p>
                      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                        {photoUrl ? (
                          <Image
                            src={photoUrl}
                            alt={t.author}
                            width={40}
                            height={40}
                            className="rounded-full object-cover ring-2 ring-[#BB0A24]/30"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#BB0A24]/20 text-sm font-bold text-[#BB0A24]">
                            {t.author.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-white">{t.author}</p>
                          {t.role && <p className="text-xs text-white/45">{t.role}</p>}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Volunteer info ── */}
      {project.volunteerInfo?.description && (
        <div className="border-t border-[#E5E5E5] py-12">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="none">
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                    Voluntariado
                  </p>
                  <p className="mt-4 text-base leading-7 text-[#555555]">
                    {project.volunteerInfo.description}
                  </p>
                  <div className="mt-5 space-y-4">
                    {project.volunteerInfo.opportunities && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">Tipo de Atuação</p>
                        <p className="mt-1 text-sm leading-6 text-[#555555]">{project.volunteerInfo.opportunities}</p>
                      </div>
                    )}
                    {project.volunteerInfo.process && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">Como Funciona</p>
                        <p className="mt-1 text-sm leading-6 text-[#555555]">{project.volunteerInfo.process}</p>
                      </div>
                    )}
                    {project.volunteerInfo.demand && (
                      <div className="inline-block rounded-full border border-[#BB0A24] px-4 py-1 text-xs font-semibold text-[#BB0A24]">
                        {project.volunteerInfo.demand}
                      </div>
                    )}
                  </div>
                </div>
                {project.instagramHandle && (
                  <div className="flex items-center lg:justify-end">
                    <a
                      href={`https://instagram.com/${project.instagramHandle}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-3 rounded-2xl border border-[#BB0A24] bg-[#BB0A24] px-7 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#8F071B] hover:border-[#8F071B] hover:-translate-y-px hover:shadow-lg active:translate-y-0"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      Saiba mais no Instagram
                    </a>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}
    </section>
  );
}
