import Link from "next/link";
import { getAllProjects, getMemberRoutineSteps } from "@/sanity/lib/queries";
import ScrollReveal from "@/components/ScrollReveal";

const FALLBACK_ROUTINE = [
  { title: "Onboarding", desc: "Integração com a cultura e estrutura do GAS, conhecendo membros e metodologias." },
  { title: "Alocação em Projeto", desc: "Cada membro é alocado em um ou mais projetos conforme perfil e interesse." },
  { title: "Execução", desc: "Trabalho semanal com reuniões, entregas e acompanhamento junto à ONG parceira." },
  { title: "Review e Feedback", desc: "Ciclos regulares de revisão para garantir qualidade e desenvolvimento pessoal." },
  { title: "Demo Day", desc: "Apresentação dos resultados do semestre para parceiros e toda a comunidade GAS." },
];

const SELECTION_STEPS = [
  { num: "1", title: "Inscrição", desc: "Formulário disponível no Instagram do GAS durante o período de seleção." },
  { num: "2", title: "Dinâmica em Grupo", desc: "Atividade coletiva para avaliar colaboração, raciocínio e alinhamento de valores." },
  { num: "3", title: "Entrevista Individual", desc: "Conversa com membros da gestão sobre motivações, experiências e expectativas." },
  { num: "4", title: "Resultado e Onboarding", desc: "Comunicação do resultado e início da jornada como membro do GAS." },
];

const MEMBER_BENEFITS = [
  { icon: "🎯", title: "Projetos reais", desc: "Trabalhe em projetos com ONGs parceiras e impacto mensurável desde o primeiro semestre." },
  { icon: "🤝", title: "Rede poderosa", desc: "Conecte-se com parceiros corporativos, líderes sociais e estudantes excepcionais." },
  { icon: "📈", title: "Desenvolvimento", desc: "Desenvolva competências de liderança, gestão de projetos e comunicação de alto nível." },
  { icon: "🏆", title: "Reconhecimento", desc: "Sua atuação no GAS é reconhecida por empresas e organizações do ecossistema de impacto." },
];

const VOLUNTEER_METRICS = [
  { n: "3–5h", label: "por semana", desc: "Dedicação média esperada" },
  { n: "Semestral", label: "comprometimento", desc: "Projetos têm duração definida" },
  { n: "Remoto", label: "ou presencial", desc: "Flexibilidade de atuação" },
];

const FALLBACK_PROJECTS = [
  { _id: "fp1", name: "Mentoria Social", description: "Capacitação e acompanhamento de jovens em desenvolvimento acadêmico e profissional.", slug: { current: "mentoria-social" }, instagramHandle: "gas.mentoria", volunteerInfo: { description: "Buscamos voluntários com interesse em educação e mentoria.", demand: "Vagas abertas" } },
  { _id: "fp2", name: "Educação Financeira", description: "Workshops e oficinas para fortalecer autonomia financeira de comunidades.", slug: { current: "educacao-financeira" }, instagramHandle: "gas.educacaofinanceira", volunteerInfo: { description: "Voluntários ajudam a facilitar oficinas e produzir materiais.", demand: "Vagas abertas" } },
  { _id: "fp3", name: "Empreendedorismo Local", description: "Apoio prático para pequenos empreendedores sociais estruturarem suas iniciativas.", slug: { current: "empreendedorismo-local" }, instagramHandle: "gas.empreendedorismo", volunteerInfo: { description: "Voluntários apoiam sessões de consultoria e desenvolvimento de planos de negócio.", demand: "Vagas abertas" } },
];

export default async function ComoFazerParte() {
  const [projects, sanityRoutineSteps] = await Promise.all([
    getAllProjects(),
    getMemberRoutineSteps(),
  ]);
  const displayProjects = projects.length > 0 ? projects : FALLBACK_PROJECTS;
  const hasSanityData = projects.length > 0;
  const projectsWithVolunteer = displayProjects.filter((p) => p.volunteerInfo?.description || p.instagramHandle);
  const routineSteps = sanityRoutineSteps.length > 0 ? sanityRoutineSteps : FALLBACK_ROUTINE;
  const hasRoutineSanityData = sanityRoutineSteps.length > 0;

  return (
    <div className="bg-white text-[#1A1A1A]">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#E5E5E5] bg-[#1A1A1A] py-20 sm:py-24 lg:py-28 text-white">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 opacity-20"
          style={{ background: "radial-gradient(ellipse at 50% 0%, #BB0A24 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="animate-fade-in text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
            Como Fazer Parte
          </p>
          <h1 className="animate-fade-in-up delay-100 mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Faça parte de algo maior
          </h1>
          <p className="animate-fade-in-up delay-200 mt-6 max-w-2xl text-base leading-7 text-white/70">
            Há duas formas de contribuir com o GAS: como membro da organização ou como voluntário em nossos projetos. Ambos os caminhos levam ao mesmo lugar — impacto real.
          </p>
          <div className="animate-fade-in-up delay-300 mt-10 flex flex-wrap gap-4">
            <a
              href="#membro"
              className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:-translate-y-px"
            >
              Quero ser Membro
            </a>
            <a
              href="#voluntario"
              className="rounded-xl border border-[#BB0A24] bg-[#BB0A24] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#8F071B] hover:-translate-y-px"
            >
              Quero ser Voluntário
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════ MEMBROS ═══════════════════════ */}
      <section id="membro" className="scroll-mt-16">
        {/* Tab bar */}
        <div className="border-b border-[#E5E5E5] bg-[#BB0A24]">
          <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 lg:px-8">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/90">
              Seção 01 — Membros
            </span>
          </div>
        </div>

        {/* O que é ser membro */}
        <div className="border-b border-[#E5E5E5] py-14 sm:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <ScrollReveal direction="left">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                O que é ser membro
              </p>
              <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
                Mais do que um estudante voluntário
              </h2>
              <p className="mt-5 text-base leading-7 text-[#555555]">
                Ser membro do GAS é assumir um papel de liderança e comprometimento. Você integra uma equipe multidisciplinar, trabalha com metodologias de gestão reais e entrega resultados concretos para ONGs parceiras.
              </p>
              <p className="mt-4 text-base leading-7 text-[#555555]">
                A estrutura do GAS é composta por uma <strong className="text-[#1A1A1A]">Matriz</strong> — que coordena a estratégia e governança — e quatro <strong className="text-[#1A1A1A]">Áreas</strong> especializadas, cada uma gerenciando projetos e iniciativas próprias.
              </p>
              <Link
                href="/sobre-nos#areas"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#BB0A24] hover:underline"
              >
                Conhecer as áreas
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {MEMBER_BENEFITS.map((item, i) => (
                <ScrollReveal key={item.title} direction="up" delay={i * 80}>
                  <div className="group h-full rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#BB0A24]/20 hover:shadow-md hover:-translate-y-0.5">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="mt-3 font-black">{item.title}</p>
                    <p className="mt-1.5 text-sm leading-5 text-[#555555]">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Rotina de um membro */}
        <div className="border-b border-[#E5E5E5] bg-[#F9F9F9] py-14 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="none">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">Sua Jornada</p>
              <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">Rotina de um Membro</h2>
              {!hasRoutineSanityData && (
                <p className="mt-2 text-xs italic text-[#555555]">
                  Conteúdo de exemplo — cadastre as etapas reais em <strong>Rotina do Membro</strong> no Sanity Studio.
                </p>
              )}
            </ScrollReveal>

            {routineSteps.length === 0 ? (
              <div className="mt-10 rounded-2xl border border-dashed border-[#E5E5E5] bg-white p-10 text-center">
                <p className="text-sm text-[#555555]">Nenhuma etapa cadastrada ainda.</p>
                <p className="mt-1 text-xs text-[#AAAAAA]">Adicione etapas em <strong>Rotina do Membro</strong> no Sanity Studio.</p>
              </div>
            ) : (
              <div className="relative mt-10">
                <div className="absolute left-5 top-5 bottom-5 hidden w-0.5 bg-[#E5E5E5] sm:block" />
                <div className="space-y-4">
                  {routineSteps.map((item, i) => (
                    <ScrollReveal key={"_key" in item ? item._key : i} direction="left" delay={i * 70}>
                      <div className="flex items-start gap-5">
                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#BB0A24] bg-white text-xs font-black text-[#BB0A24] shadow-sm">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="flex-1 rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm">
                          <p className="font-black">{item.title}</p>
                          <p className="mt-1 text-sm leading-6 text-[#555555]">{item.desc}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Processo Seletivo */}
        <div className="border-b border-[#E5E5E5] py-14 sm:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <ScrollReveal direction="left">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                Como Entrar
              </p>
              <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">Processo Seletivo</h2>
              <p className="mt-5 text-base leading-7 text-[#555555]">
                Abrimos seleção todo semestre. O processo é desenhado para identificar candidatos com potencial, engajamento e alinhamento aos valores do GAS — não apenas currículo.
              </p>
              <div className="mt-8 space-y-4">
                {SELECTION_STEPS.map((step) => (
                  <div key={step.num} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#BB0A24] text-sm font-black text-white shadow-sm">
                      {step.num}
                    </div>
                    <div>
                      <p className="font-black">{step.title}</p>
                      <p className="mt-0.5 text-sm text-[#555555]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={120} className="flex flex-col justify-center gap-5">
              <div className="rounded-2xl border border-[#E5E5E5] bg-[#F9F9F9] p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#555555]">Quando?</p>
                <p className="mt-2 text-2xl font-black">Todo semestre</p>
                <p className="mt-2 text-sm text-[#555555]">
                  As inscrições são anunciadas no Instagram do GAS. Fique de olho para não perder as próximas datas!
                </p>
              </div>
              <a
                href="https://instagram.com/gas.insper"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#BB0A24] px-6 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#8F071B] hover:-translate-y-px active:translate-y-0"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Acompanhe o @gas.insper
              </a>
              <p className="text-center text-xs text-[#555555]">Inscrições abertas exclusivamente pelo Instagram</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════ VOLUNTÁRIOS ══════════════════ */}
      <section id="voluntario" className="scroll-mt-16">
        {/* Tab bar */}
        <div className="border-b border-[#E5E5E5] bg-[#1A1A1A]">
          <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 lg:px-8">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#BB0A24]">
              Seção 02 — Voluntários
            </span>
          </div>
        </div>

        {/* Intro */}
        <div className="border-b border-[#E5E5E5] py-14 sm:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
            <ScrollReveal direction="left">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                Voluntariado
              </p>
              <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
                O voluntariado que gera impacto real
              </h2>
              <p className="mt-5 text-base leading-7 text-[#555555]">
                Diferente do voluntariado tradicional, as oportunidades do GAS são estruturadas, com papéis claros e entregas definidas. Cada voluntário é parte essencial da execução de um projeto social.
              </p>
              <p className="mt-4 text-base leading-7 text-[#555555]">
                Você não precisa ser estudante do Insper — qualquer pessoa com vontade de contribuir e aprender pode se envolver. O que importa é o comprometimento com o impacto.
              </p>
            </ScrollReveal>

            <div className="space-y-4">
              {VOLUNTEER_METRICS.map((item, i) => (
                <ScrollReveal key={item.label} direction="right" delay={i * 80}>
                  <div className="rounded-2xl border border-[#E5E5E5] bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#BB0A24]/20 hover:shadow-md sm:p-5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-[#BB0A24]">{item.n}</span>
                      <span className="text-sm text-[#555555]">{item.label}</span>
                    </div>
                    <p className="mt-1 text-xs text-[#555555]">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Voluntariado por Projeto */}
        <div className="py-14 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="none">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
                Oportunidades
              </p>
              <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">Voluntariado por Projeto</h2>
              {!hasSanityData && (
                <p className="mt-2 text-xs italic text-[#555555]">
                  Conteúdo de exemplo — os projetos reais aparecerão automaticamente quando cadastrados no Sanity Studio.
                </p>
              )}
            </ScrollReveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(projectsWithVolunteer.length > 0 ? projectsWithVolunteer : displayProjects).map((project, i) => (
                <ScrollReveal key={project._id} direction="up" delay={i * 70}>
                  <div className="group h-full rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#BB0A24]/20 hover:shadow-md hover:-translate-y-0.5 sm:p-7">
                    <div className="h-0.5 w-6 bg-[#BB0A24] transition-all duration-300 group-hover:w-10" />
                    <h3 className="mt-5 text-lg font-black">{project.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#555555]">
                      {project.volunteerInfo?.description ?? project.description}
                    </p>
                    {project.volunteerInfo?.demand && (
                      <div className="mt-4 inline-block rounded-full border border-[#BB0A24]/30 bg-[#BB0A24]/5 px-3 py-1 text-xs font-semibold text-[#BB0A24]">
                        {project.volunteerInfo.demand}
                      </div>
                    )}
                    <div className="mt-4 flex flex-col gap-2">
                      {project.instagramHandle && (
                        <a
                          href={`https://instagram.com/${project.instagramHandle}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:text-[#BB0A24]"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                          @{project.instagramHandle}
                        </a>
                      )}
                      <Link
                        href={`/projetos#${project.slug?.current ?? ""}`}
                        className="inline-flex items-center gap-1 text-xs text-[#555555] transition-colors hover:text-[#BB0A24]"
                      >
                        Ver o projeto completo →
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
