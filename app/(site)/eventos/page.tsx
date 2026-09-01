import { getAllEvents, getPageContent } from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";
import EventSlideshow from "@/components/EventSlideshow";

export default async function Eventos() {
  const [events, page] = await Promise.all([getAllEvents(), getPageContent("events")]);

  const slideshowEvents = events.map((ev) => ({
    _id: ev._id,
    title: ev.title,
    description: ev.description,
    date: ev.date ?? null,
    slug: ev.slug,
    cardColor: ev.cardColor ?? null,
    imageUrl: ev.image ?? null,
  }));

  return (
    <div className="bg-white text-[#1A1A1A]">

      {/* ── SLIDESHOW ────────────────────────────────── */}
      <EventSlideshow events={slideshowEvents} hero={page.hero} />


      {/* ── CTA PARCEIROS ────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1A060C] via-[#5C1926] to-[#1A060C] py-14 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <ScrollReveal direction="left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              {page.cta.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              {page.cta.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-white/70">
              {page.cta.text}
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={120} className="flex flex-col gap-3 lg:items-end">
            <a
              href="https://instagram.com/gasinsper"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 hover:-translate-y-px active:translate-y-0"
            >
              {page.cta.buttonLabel}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="text-xs text-white/40">{page.cta.note}</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
