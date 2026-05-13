import Image from "next/image";
import { getAllAreas, getAllTeamMembers } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import VideoHero from "@/components/VideoHero";
import ScrollReveal from "@/components/ScrollReveal";

const FALLBACK_AREAS = [
  { _id: "a1", name: "Projetos Sociais", description: "Desenvolve e gerencia os projetos que atendem diretamente as ONGs parceiras e comunidades, coordenando equipes multidisciplinares para máximo impacto." },
  { _id: "a2", name: "Parcerias e Relações", description: "Responsável por cultivar e expandir a rede de parceiros corporativos e institucionais que viabilizam as ações do GAS." },
  { _id: "a3", name: "Gestão de Pessoas", description: "Cuida do recrutamento, desenvolvimento e engajamento dos membros, garantindo uma cultura organizacional forte e acolhedora." },
  { _id: "a4", name: "Marketing e Comunicação", description: "Constrói e comunica a identidade do GAS, ampliando o alcance das iniciativas e fortalecendo a presença digital da organização." },
];

const VALUES = [
  { title: "Impacto Real", description: "Cada ação é orientada por resultados concretos e mensuráveis para as comunidades que atendemos." },
  { title: "Protagonismo", description: "Acreditamos no potencial transformador dos estudantes e incentivamos a liderança desde o início." },
  { title: "Colaboração", description: "Construímos pontes entre pessoas, organizações e causas para multiplicar o impacto coletivo." },
  { title: "Excelência", description: "Buscamos o mais alto padrão em tudo o que fazemos, com rigor técnico e comprometimento." },
  { title: "Transparência", description: "Atuamos com honestidade e abertura em nossas relações com membros, parceiros e ONGs." },
  { title: "Inovação Social", description: "Exploramos novos modelos e abordagens para resolver desafios sociais complexos." },
];

export default async function SobreNos() {
  const [areas, teamMembers] = await Promise.all([getAllAreas(), getAllTeamMembers()]);
  const displayAreas = areas.length >= 4 ? areas : FALLBACK_AREAS;
  const matrixMembers = teamMembers.filter((m) => m.isMatrix);
  const areaMembers = teamMembers.filter((m) => !m.isMatrix);

  return (
    <div className="bg-white text-[#1A1A1A]">

      {/* ── HERO — Video ────────────────────────────── */}
      <VideoHero />

      {/* ── SOBRE A ORGANIZAÇÃO ─────────────────────── */}
      <section className="border-b border-[#E5E5E5] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <ScrollReveal direction="left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Sobre a Organização
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              O que é o GAS?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-[#555555]">
              <p>
                O <strong className="text-[#1A1A1A]">GAS — Grupo de Ação Social</strong> é uma organização estudantil do Insper dedicada ao desenvolvimento de projetos de impacto social. Fundado por estudantes, o GAS conecta o rigor acadêmico da formação em negócios e tecnologia com a urgência de causas sociais reais.
              </p>
              <p>
                Atuamos em parceria com ONGs, empresas e comunidades para construir soluções que vão além do voluntariado pontual — criamos programas estruturados, de longo prazo, com metodologia, acompanhamento e métricas de impacto.
              </p>
              <p>
                Cada projeto é uma oportunidade de aprendizado mútuo: nossos membros desenvolvem competências de liderança e gestão enquanto geram valor concreto para as organizações e pessoas que apoiamos.
              </p>
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
      <section className="border-b border-[#E5E5E5] bg-[#1A1A1A] py-14 sm:py-16 lg:py-20 text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none">
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                  Nossa Missão
                </p>
                <div className="mt-4 h-0.5 w-12 bg-[#BB0A24]" />
              </div>
              <div>
                <p className="text-xl font-light leading-relaxed text-white/85 sm:text-2xl lg:text-3xl">
                  &ldquo;Formar líderes comprometidos com o impacto social, conectando talento estudantil a causas reais por meio de projetos estruturados e parcerias de longo prazo.&rdquo;
                </p>
                <p className="mt-8 text-base leading-7 text-white/60">
                  Acreditamos que a universidade é o momento ideal para desenvolver não apenas competências técnicas, mas também a consciência social e a capacidade de gerar mudança positiva no mundo.
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
              Nossos Valores
            </p>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">O que nos guia</h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
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
              Como Funcionamos
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">Estrutura Organizacional</h2>
            <div className="mt-6 max-w-3xl text-base leading-7 text-[#555555]">
              <p>
                O GAS é estruturado em torno de uma <strong className="text-[#1A1A1A]">matriz</strong> — responsável pela governança, estratégia e coordenação geral — e quatro <strong className="text-[#1A1A1A]">áreas principais</strong>, cada uma com autonomia para desenvolver suas iniciativas dentro da missão da organização.
              </p>
              <p className="mt-4">
                Essa estrutura garante agilidade operacional sem abrir mão do alinhamento estratégico, permitindo que o GAS atue em múltiplas frentes simultaneamente com consistência e qualidade.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 4 ÁREAS ─────────────────────────────────── */}
      <section id="areas" className="scroll-mt-20 border-b border-[#E5E5E5] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Nossas Áreas
            </p>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">As 4 Áreas do GAS</h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {displayAreas.slice(0, 4).map((area, i) => (
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
              Gestão 2026
            </p>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">Nossa Equipe</h2>
          </ScrollReveal>

          {teamMembers.length === 0 ? (
            <p className="mt-8 text-[#555555]">
              Os membros da gestão serão cadastrados em breve no Sanity Studio.
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
  const photoUrl = member.photo
    ? urlFor(member.photo).width(400).height(400).fit("crop").url()
    : null;

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
          {member.instagram && (
            <a
              href={`https://instagram.com/${member.instagram}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`Instagram de ${member.name}`}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E5E5E5] text-[#555555] transition-all duration-200 hover:border-[#BB0A24] hover:bg-[#BB0A24] hover:text-white"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
