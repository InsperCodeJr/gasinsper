import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEvents, getEventBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((ev) => ({ slug: ev.slug }));
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function EventoDetalhe({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const accent = event.cardColor ?? "#BB0A24";
  const date = formatDate(event.date);

  const heroUrl = event.image ?? null;

  const galleryImages = event.galleryImages ?? [];

  return (
    <div className="bg-white text-[#1A1A1A]">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[55vh] overflow-hidden sm:min-h-[65vh]">
        {heroUrl ? (
          <Image
            src={heroUrl}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, #0D0005 0%, ${accent}44 50%, #0D0005 100%)`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        <div className="relative flex min-h-[55vh] flex-col justify-end sm:min-h-[65vh]">
          <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
            <Link
              href="/eventos"
              className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-white/60 transition-colors hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar a Eventos
            </Link>
            {date && (
              <span
                className="mb-4 inline-block rounded-xl px-3 py-1.5 text-xs font-semibold text-white"
                style={{ backgroundColor: accent }}
              >
                {date}
              </span>
            )}
            <h1 className="max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      {/* ── DESCRIÇÃO ────────────────────────────────── */}
      <section className="border-b border-[#E5E5E5] py-14 sm:py-20">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="h-0.5 w-12 mb-8" style={{ backgroundColor: accent }} />
          <p className="text-lg leading-8 text-[#555555] sm:text-xl sm:leading-9">
            {event.description}
          </p>
        </div>
      </section>

      {/* ── GALERIA ──────────────────────────────────── */}
      {galleryImages.length > 0 && (
        <section className="border-b border-[#E5E5E5] py-14 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Galeria
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {galleryImages.map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={img}
                    alt={`${event.title}, foto ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1A060C] via-[#5C1926] to-[#1A060C] py-14 sm:py-20 text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#BB0A24]">
              Mais Eventos
            </p>
            <h2 className="text-2xl font-black sm:text-3xl">Veja todos os nossos eventos</h2>
            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 hover:-translate-y-px"
            >
              Ver Eventos
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
