"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

export type LogoPartner = {
  _id: string;
  name: string;
  logoUrl?: string | null;
  website?: string | null;
};

function LogoItem({ partner }: { partner: LogoPartner }) {
  const inner = partner.logoUrl ? (
    <Image
      src={partner.logoUrl}
      alt={partner.name}
      width={128}
      height={48}
      className="h-10 w-auto max-w-[128px] object-contain grayscale transition-all duration-300 hover:grayscale-0"
    />
  ) : (
    <span className="text-center text-xs font-semibold text-[#999]">{partner.name}</span>
  );

  if (partner.website) {
    return (
      <a
        href={partner.website}
        target="_blank"
        rel="noreferrer"
        className="flex h-16 w-36 shrink-0 items-center justify-center rounded-xl border border-[#E5E5E5] bg-white px-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-px"
        aria-label={partner.name}
      >
        {inner}
      </a>
    );
  }
  return (
    <div className="flex h-16 w-36 shrink-0 items-center justify-center rounded-xl border border-[#E5E5E5] bg-white px-4 shadow-sm">
      {inner}
    </div>
  );
}

export default function PartnerLogoCarousel({ partners }: { partners: LogoPartner[] }) {
  const [manual, setManual] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    if (!manual) return;
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    return () => el.removeEventListener("scroll", updateButtons);
  }, [manual, updateButtons]);

  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-logo]") as HTMLElement | null;
    const amount = (card ? card.offsetWidth + 16 : 152) * 3;
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  if (partners.length === 0) return null;

  const doubled = [...partners, ...partners];

  return (
    <div className="relative">
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setManual((v) => !v)}
          className="text-xs font-semibold text-[#555555] transition-colors hover:text-[#BB0A24]"
        >
          {manual ? "Rotação automática" : "Navegação manual"}
        </button>
      </div>

      {manual ? (
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll("prev")}
            disabled={!canPrev}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5E5E5] text-[#555555] transition-all hover:border-[#BB0A24] hover:text-[#BB0A24] disabled:opacity-30"
            aria-label="Anterior"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div
            ref={trackRef}
            className="flex flex-1 gap-4 overflow-x-auto scroll-smooth snap-x"
            style={{ scrollbarWidth: "none" }}
          >
            {partners.map((p) => (
              <div key={p._id} data-logo className="snap-start">
                <LogoItem partner={p} />
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll("next")}
            disabled={!canNext}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5E5E5] text-[#555555] transition-all hover:border-[#BB0A24] hover:text-[#BB0A24] disabled:opacity-30"
            aria-label="Próximo"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-marquee" style={{ width: `${doubled.length * 160}px` }}>
            {doubled.map((p, i) => (
              <div key={`${p._id}-${i}`}>
                <LogoItem partner={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
