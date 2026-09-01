import Image from "next/image";
import { getAllAreas, getAllTeamMembers, getPageContent } from "@/lib/content";
import HeroMedia from "@/components/HeroMedia";
import ScrollReveal from "@/components/ScrollReveal";

export default async function SobreNos() {
  const [areas, teamMembers, page] = await Promise.all([
    getAllAreas(),
    getAllTeamMembers(),
    getPageContent("about"),
  ]);
  const displayAreas = areas;
  const matrixMembers = teamMembers.filter((m) => m.isMatrix);
  const areaMembers = teamMembers.filter((m) => !m.isMatrix);

  return (
    <div className="bg-white text-[#1A1A1A]">

      {/* ── HERO — Video ────────────────────────────── */}
      <HeroMedia hero={page.hero} />

      {/* ── SOBRE A ORGANIZAÇÃO ─────────────────────── */}
      <section className="border-b border-[#E5E5E5] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <ScrollReveal direction="left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              {page.about.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              {page.about.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-[#555555]">
              {page.about.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={120}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F7F7F7] shadow-xl sm:aspect-square">
              <Image
                src="/insper.jpg"
                alt="Membros do GAS em ação"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#BB0A24]/10 to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── MISSÃO ──────────────────────────────────── */}
      <section className="border-b border-[#E5E5E5] bg-gradient-to-br from-[#1A060C] via-[#5C1926] to-[#1A060C] py-14 sm:py-16 lg:py-20 text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none">
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                  {page.mission.eyebrow}
                </p>
                <div className="mt-4 h-0.5 w-12 bg-[#BB0A24]" />
              </div>
              <div>
                <p className="text-xl font-light leading-relaxed text-white/85 sm:text-2xl lg:text-3xl">
                  &ldquo;{page.mission.quote}&rdquo;
                </p>
                <p className="mt-8 text-base leading-7 text-white/60">
                  {page.mission.text}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── VALORES ─────────────────────────────────── */}
      <section className="border-b border-[#E5E5E5] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              {page.values.eyebrow}
            </p>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">{page.values.title}</h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.values.items.map((v, i) => (
              <ScrollReveal key={v.title} direction="up" delay={i * 70}>
                <div className="group h-full rounded-2xl border border-[#E5E5E5] bg-white p-7 shadow-sm transition-all duration-300 hover:border-[#BB0A24]/20 hover:shadow-md hover:-translate-y-0.5">
                  <div className="h-0.5 w-8 bg-[#BB0A24] transition-all duration-300 group-hover:w-12" />
                  <h3 className="mt-5 text-lg font-black">{v.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#555555]">{v.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESTRUTURA ───────────────────────────────── */}
      <section className="border-b border-[#E5E5E5] bg-[#F9F9F9] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              {page.structure.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">{page.structure.title}</h2>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#555555]">{page.structure.text}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ÁREAS ───────────────────────────────────── */}
      <section id="areas" className="scroll-mt-20 border-b border-[#E5E5E5] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              {page.areas.eyebrow}
            </p>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">{page.areas.title}</h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {displayAreas.map((area, i) => (
              <ScrollReveal key={area._id} direction="up" delay={i * 80}>
                <div className="group h-full rounded-2xl border border-[#E5E5E5] bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#BB0A24]/20 hover:shadow-md hover:-translate-y-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#BB0A24] text-sm font-black text-white transition-transform duration-300 group-hover:scale-110">
                    {i + 1}
                  </div>
                  <h3 className="mt-5 text-xl font-black">{area.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#555555]">{area.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EQUIPE ──────────────────────────────────── */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              {page.team.eyebrow}
            </p>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">{page.team.title}</h2>
          </ScrollReveal>

          {teamMembers.length === 0 ? (
            <p className="mt-8 text-[#555555]">
              Nenhum membro da gestão cadastrado ainda. Adicione os membros no painel de administração.
            </p>
          ) : (
            <>
              {matrixMembers.length > 0 && (
                <div className="mt-12">
                  <ScrollReveal direction="none">
                    <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#555555]">Matriz</p>
                  </ScrollReveal>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {matrixMembers.map((member, i) => (
                      <ScrollReveal key={member._id} direction="up" delay={i * 60}>
                        <MemberCard member={member} />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}

              {areaMembers.length > 0 && (
                <div className="mt-14">
                  <ScrollReveal direction="none">
                    <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#555555]">Áreas</p>
                  </ScrollReveal>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {areaMembers.map((member, i) => (
                      <ScrollReveal key={member._id} direction="up" delay={(i % 8) * 60}>
                        <MemberCard member={member} showArea />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function MemberCard({
  member,
  showArea = false,
}: {
  member: Awaited<ReturnType<typeof getAllTeamMembers>>[number];
  showArea?: boolean;
}) {
  const photoUrl = member.photo ?? null;

  return (
    <div className="group h-full overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white shadow-sm transition-all duration-300 hover:border-[#BB0A24]/20 hover:shadow-md hover:-translate-y-0.5">
      <div className="relative aspect-square overflow-hidden bg-[#F7F7F7]">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#F7F7F7] to-[#E5E5E5]">
            <span className="text-5xl font-black text-[#BB0A24]/20">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-black text-[#1A1A1A] leading-tight">{member.name}</h3>
        <p className="mt-0.5 text-sm font-medium text-[#BB0A24]">{member.position}</p>
        {showArea && member.area && (
          <p className="mt-0.5 text-xs text-[#555555]">{member.area.name}</p>
        )}
        <div className="mt-3 flex items-center gap-2">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label="Email"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E5E5E5] text-[#555555] transition-all duration-200 hover:border-[#BB0A24] hover:bg-[#BB0A24] hover:text-white"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`LinkedIn de ${member.name}`}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E5E5E5] text-[#555555] transition-all duration-200 hover:border-[#BB0A24] hover:bg-[#BB0A24] hover:text-white"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
