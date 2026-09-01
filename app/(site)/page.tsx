import Link from "next/link";
import Image from "next/image";

import { getAllProjects, getHomeImpactNumbers, getPageContent } from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";
import ParallaxBackground from "@/components/ParallaxBackground";
import ProjectCarousel from "@/components/ProjectCarousel";
import HeroBackground from "@/components/HeroBackground";

export default async function Home() {
  const [projects, impactNumbers, page] = await Promise.all([
    getAllProjects(),
    getHomeImpactNumbers(),
    getPageContent("home"),
  ]);
  const carouselProjects = projects.slice(0, 6).map((p) => ({
    _id: p._id,
    name: p.name,
    description: p.description,
    slug: p.slug,
    cardColor: p.cardColor ?? null,
    imageUrl: p.logo ?? null,
  }));

  return (
    <div className="bg-white text-[#1A1A1A]">

      {/* ═══ HERO ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-[#E5E5E5]">
        <ParallaxBackground speed={0.28}>
          {page.hero.mediaUrl ? (
            <HeroBackground mediaUrl={page.hero.mediaUrl} overlayClassName="bg-[#1A1A1A]/65" />
          ) : (
            <>
              <Image src="/insper.jpg" alt="" fill priority className="object-cover" />
              <div className="absolute inset-0 bg-[#1A1A1A]/65" />
            </>
          )}
        </ParallaxBackground>

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-20 sm:pb-20 sm:pt-24 sm:px-6 lg:pb-28 lg:pt-32 lg:px-8">
          <p className="animate-fade-in text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
            {page.hero.eyebrow}
          </p>
          <h1 className="animate-fade-in-up delay-100 mt-4 max-w-4xl text-3xl font-black leading-[1.08] text-white sm:text-5xl lg:text-7xl">
            {page.hero.titleTop}<br />
            <span className="text-[#BB0A24]">{page.hero.titleHighlight}</span>
          </h1>
          <p className="animate-fade-in-up delay-200 mt-5 max-w-2xl text-base leading-7 text-white/70 sm:mt-7 sm:text-lg">
            {page.hero.subtitle}
          </p>
          <div className="animate-fade-in-up delay-300 mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
            <Link
              href="/sobre-nos"
              className="inline-flex items-center border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 hover:-translate-y-px active:translate-y-0 sm:px-7 sm:py-3.5"
            >
              {page.hero.ctaAbout}
            </Link>
            <Link
              href="/projetos"
              className="inline-flex items-center border border-[#BB0A24] bg-[#BB0A24] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#8F071B] hover:border-[#8F071B] hover:-translate-y-px active:translate-y-0 sm:px-7 sm:py-3.5"
            >
              {page.hero.ctaProjects}
            </Link>
            <Link
              href="/parceiros"
              className="inline-flex items-center border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 hover:-translate-y-px active:translate-y-0 sm:px-7 sm:py-3.5"
            >
              {page.hero.ctaPartners}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SOBRE O GAS ════════════════════════════════ */}
      <section className="border-b border-[#E5E5E5] py-14 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-0 lg:px-8">
          <ScrollReveal direction="left" className="border-b border-[#E5E5E5] pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              {page.about.eyebrow}
            </p>
            <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
              {page.about.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#555555]">
              {page.about.text}
            </p>
            <Link
              href="/sobre-nos"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#BB0A24] hover:underline"
            >
              {page.about.linkLabel}
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={120} className="lg:pl-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#555555]">
              {page.vision.eyebrow}
            </p>
            <div className="mt-4 h-0.5 w-8 bg-[#BB0A24]" />
            <p className="mt-5 text-lg font-light leading-relaxed text-[#1A1A1A] sm:text-xl">
              &ldquo;{page.vision.quote}&rdquo;
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
              {page.vision.facts.map((item) => (
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
      <section className="border-b border-[#E5E5E5] bg-gradient-to-br from-[#1A060C] via-[#5C1926] to-[#1A060C] py-14 text-white sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="none" className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              {page.numbers.eyebrow}
            </p>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">
              {page.numbers.title}
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
                {page.projects.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl">
                {page.projects.title}
              </h2>
            </div>
            <Link
              href="/projetos"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] underline hover:text-[#BB0A24] transition-colors"
            >
              {page.projects.linkLabel}
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>

          <div className="mt-6 sm:mt-8">
            <ProjectCarousel projects={carouselProjects} />
          </div>
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════ */}
      <section className="border-b border-[#E5E5E5] bg-[#BB0A24] py-14 text-white sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <ScrollReveal direction="left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
              {page.cta.eyebrow}
            </p>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">
              {page.cta.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-white/80 sm:mt-5">
              {page.cta.text}
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={120} className="flex flex-col gap-3 sm:gap-4 lg:items-end">
            <Link
              href="/como-fazer-parte#membro"
              className="inline-flex items-center justify-center rounded-xl border border-white bg-white px-6 py-3.5 text-sm font-semibold text-[#BB0A24] transition-all duration-200 hover:bg-white/90 hover:-translate-y-px active:translate-y-0 sm:px-7"
            >
              {page.cta.memberLabel}
            </Link>
            <Link
              href="/como-fazer-parte#voluntario"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 hover:-translate-y-px active:translate-y-0 sm:px-7"
            >
              {page.cta.volunteerLabel}
            </Link>
            <Link
              href="/parceiros"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 hover:-translate-y-px active:translate-y-0 sm:px-7"
            >
              {page.cta.partnerLabel}
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
