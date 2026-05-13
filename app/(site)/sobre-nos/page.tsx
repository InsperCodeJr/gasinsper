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
      <section className="border-b border-[#E5E5E5] py-20">
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
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F7F7F7] shadow-xl">
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
      <section className="border-b border-[#E5E5E5] bg-[#1A1A1A] py-20 text-white">
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
                <p className="text-2xl font-light leading-relaxed text-white/90 sm:text-3xl">
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
      <section className="border-b border-[#E5E5E5] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Nossos Valores
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">O que nos guia</h2>
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
      <section className="border-b border-[#E5E5E5] bg-[#F9F9F9] py-20">
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
      <section id="areas" className="scroll-mt-20 border-b border-[#E5E5E5] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Nossas Áreas
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">As 4 Áreas do GAS</h2>
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
      <section className="py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Gestão 2026
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">Nossa Equipe</h2>
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
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        <div className="mt-3 flex flex-wrap gap-3">
          {member.email && (
            <a href={`mailto:${member.email}`} className="text-xs text-[#555555] transition-colors hover:text-[#BB0A24]">
              Email
            </a>
          )}
          {member.instagram && (
            <a href={`https://instagram.com/${member.instagram}`} target="_blank" rel="noreferrer" className="text-xs text-[#555555] transition-colors hover:text-[#BB0A24]">
              @{member.instagram}
            </a>
          )}
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-xs text-[#555555] transition-colors hover:text-[#BB0A24]">
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
