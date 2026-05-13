import Image from "next/image";
import { getAllAreas, getAllTeamMembers } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import VideoHero from "@/components/VideoHero";

const FALLBACK_AREAS = [
  {
    _id: "a1",
    name: "Projetos Sociais",
    description:
      "Desenvolve e gerencia os projetos que atendem diretamente as ONGs parceiras e comunidades, coordenando equipes multidisciplinares para máximo impacto.",
  },
  {
    _id: "a2",
    name: "Parcerias e Relações",
    description:
      "Responsável por cultivar e expandir a rede de parceiros corporativos e institucionais que viabilizam as ações do GAS.",
  },
  {
    _id: "a3",
    name: "Gestão de Pessoas",
    description:
      "Cuida do recrutamento, desenvolvimento e engajamento dos membros, garantindo uma cultura organizacional forte e acolhedora.",
  },
  {
    _id: "a4",
    name: "Marketing e Comunicação",
    description:
      "Constrói e comunica a identidade do GAS, ampliando o alcance das iniciativas e fortalecendo a presença digital da organização.",
  },
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
      {/* HERO — Video Background */}
      <VideoHero />

      {/* SOBRE A ORGANIZAÇÃO */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Sobre a Organização
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
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
          </div>
          <div className="relative aspect-square overflow-hidden rounded-sm bg-[#F7F7F7]">
            <Image
              src="/insper.jpg"
              alt="Membros do GAS em ação"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#BB0A24]/10 to-transparent" />
          </div>
        </div>
      </section>

      <div className="border-t border-[#E5E5E5]" />

      {/* MISSÃO */}
      <section className="bg-[#1A1A1A] py-20 text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* VALORES */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
          Nossos Valores
        </p>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">O que nos guia</h2>
        <div className="mt-12 grid gap-px border border-[#E5E5E5] sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="border border-[#E5E5E5] p-8 bg-white hover:bg-[#F7F7F7] transition-colors">
              <div className="h-0.5 w-8 bg-[#BB0A24]" />
              <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#555555]">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-[#E5E5E5]" />

      {/* FUNCIONAMENTO */}
      <section className="bg-[#F7F7F7] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
            Como Funcionamos
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Estrutura Organizacional</h2>
          <div className="mt-8 max-w-3xl text-base leading-7 text-[#555555]">
            <p>
              O GAS é estruturado em torno de uma <strong className="text-[#1A1A1A]">matriz</strong> — responsável pela governança, estratégia e coordenação geral — e quatro <strong className="text-[#1A1A1A]">áreas principais</strong>, cada uma com autonomia para desenvolver suas iniciativas dentro da missão da organização.
            </p>
            <p className="mt-4">
              Essa estrutura garante agilidade operacional sem abrir mão do alinhamento estratégico, permitindo que o GAS atue em múltiplas frentes simultaneamente com consistência e qualidade.
            </p>
          </div>
        </div>
      </section>

      {/* 4 ÁREAS — 2x2 Grid */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
          Nossas Áreas
        </p>
        <h2 className="mt-4 mb-10 text-3xl font-bold sm:text-4xl">As 4 Áreas do GAS</h2>
        <div className="grid gap-0 border border-[#E5E5E5] sm:grid-cols-2">
          {displayAreas.slice(0, 4).map((area, i) => (
            <div
              key={area._id}
              className={`p-10 border-[#E5E5E5] ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""}`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BB0A24] text-white font-bold text-sm">
                {i + 1}
              </div>
              <h3 className="mt-4 text-xl font-bold">{area.name}</h3>
              <p className="mt-3 text-sm leading-6 text-[#555555]">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-[#E5E5E5]" />

      {/* GESTÃO ATUAL */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
          Gestão 2026
        </p>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Nossa Equipe</h2>

        {teamMembers.length === 0 ? (
          <p className="mt-8 text-[#555555]">
            Os membros da gestão serão cadastrados em breve no Sanity Studio.
          </p>
        ) : (
          <>
            {/* Matrix members */}
            {matrixMembers.length > 0 && (
              <div className="mt-10">
                <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[#555555]">Matriz</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {matrixMembers.map((member) => (
                    <MemberCard key={member._id} member={member} />
                  ))}
                </div>
              </div>
            )}

            {/* Area members grouped */}
            {areaMembers.length > 0 && (
              <div className="mt-12">
                <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[#555555]">Áreas</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {areaMembers.map((member) => (
                    <MemberCard key={member._id} member={member} showArea />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function MemberCard({ member, showArea = false }: { member: Awaited<ReturnType<typeof getAllTeamMembers>>[number]; showArea?: boolean }) {
  const photoUrl = member.photo ? urlFor(member.photo).width(400).height(400).fit("crop").url() : null;

  return (
    <div className="group border border-[#E5E5E5] bg-white hover:border-[#BB0A24] transition-colors">
      <div className="relative aspect-square overflow-hidden bg-[#F7F7F7]">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={member.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#F7F7F7] to-[#E5E5E5]">
            <span className="text-4xl font-bold text-[#BB0A24]/30">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-[#1A1A1A]">{member.name}</h3>
        <p className="mt-0.5 text-sm text-[#BB0A24]">{member.position}</p>
        {showArea && member.area && (
          <p className="mt-0.5 text-xs text-[#555555]">{member.area.name}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-xs text-[#555555] hover:text-[#BB0A24] transition-colors"
            >
              Email
            </a>
          )}
          {member.instagram && (
            <a
              href={`https://instagram.com/${member.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#555555] hover:text-[#BB0A24] transition-colors"
            >
              @{member.instagram}
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#555555] hover:text-[#BB0A24] transition-colors"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
