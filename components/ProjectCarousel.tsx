"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export type CarouselProject = {
  _id: string;
  name: string;
  description: string;
  slug: { current: string };
  cardColor?: string | null;
  imageUrl?: string | null;
};

export default function ProjectCarousel({ projects }: { projects: CarouselProject[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(projects.length > 1);

  const updateButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    const ro = new ResizeObserver(updateButtons);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      ro.disconnect();
    };
  }, [updateButtons]);

  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const amount = card ? card.offsetWidth + 20 : el.clientWidth;
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.map((project) => {
          const accent = project.cardColor ?? "#BB0A24";
          return (
            <div
              key={project._id}
              data-card
              className="w-[80vw] max-w-xs sm:w-64 lg:w-80 flex-shrink-0 snap-start"
            >
              <Link
                href={`/projetos#${project.slug.current}`}
                className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
              >
                <div className="relative aspect-[4/3]"
                  style={{ background: `linear-gradient(135deg, #1A060C 0%, ${accent}88 100%)` }}>
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      fill
                      className="object-cover opacity-75 transition-all duration-700 group-hover:scale-110 group-hover:opacity-55"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-9xl font-black text-white/10 select-none">
                      {project.name.charAt(0)}
                    </span>
                  )}

                  {/* Overlay gradiente usando a cor do projeto */}
                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: `linear-gradient(to top, ${accent}CC 0%, ${accent}33 40%, transparent 70%)`,
                    }}
                  />

                  {/* Info box */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="rounded-xl border border-white/10 bg-black/50 p-4 shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1">
                      {/* Linha colorida */}
                      <div className="h-0.5 w-8 mb-3 rounded-full transition-all duration-300 group-hover:w-12"
                        style={{ backgroundColor: accent }} />
                      <h3 className="font-bold text-white leading-tight">{project.name}</h3>
                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="mt-2 text-sm text-white/75 leading-6 line-clamp-3">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      <div
                        className="mt-0 flex items-center gap-1 text-xs font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:mt-3"
                        style={{ color: accent }}
                      >
                        Ver projeto{" "}
                        <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {projects.length > 1 && (
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => scroll("prev")}
            disabled={!canPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] text-[#555555] transition-all duration-200 hover:border-[#BB0A24] hover:text-[#BB0A24] disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Projeto anterior"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("next")}
            disabled={!canNext}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] text-[#555555] transition-all duration-200 hover:border-[#BB0A24] hover:text-[#BB0A24] disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Próximo projeto"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
