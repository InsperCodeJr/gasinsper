"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NavMenu from "./NavMenu";

interface ProjectLink {
  name: string;
  slug: string;
}

/*
  Asymmetric hysteresis — eliminates pulsing near the threshold:
  - FULL_ZONE   : below this y, always show full header
  - DOWN_DELTA  : px of downward scroll needed to enter compact (large)
  - UP_DELTA    : px of upward scroll needed to exit compact (small)

  anchorY is only updated on a committed state change, so small jitter
  (< DOWN_DELTA when full, < UP_DELTA when compact) never triggers a toggle.
  compactRef mirrors the React state so the rAF closure is never stale.
*/
const FULL_ZONE  = 36;
const DOWN_DELTA = 60;
const UP_DELTA   = 20;

export default function HeaderClient({ projects }: { projects: ProjectLink[] }) {
  const [compact, setCompact] = useState(false);
  const anchorY    = useRef(0);
  const compactRef = useRef(false); // stale-closure-safe mirror of compact state

  const commit = (next: boolean, y: number) => {
    if (compactRef.current !== next) {
      compactRef.current = next;
      setCompact(next);
    }
    anchorY.current = y;
  };

  useEffect(() => {
    anchorY.current = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;

      if (y < FULL_ZONE) {
        commit(false, y);
        ticking = false;
        return;
      }

      const delta = y - anchorY.current;

      if (!compactRef.current && delta >= DOWN_DELTA) {
        commit(true, y);
      } else if (compactRef.current && delta <= -UP_DELTA) {
        commit(false, y);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        compact
          ? "mx-[18%] mt-2 rounded-2xl border border-[#E5E5E5] shadow-lg shadow-black/8"
          : "mx-0 border-b border-[#E5E5E5]"
      }`}
    >
      {/* Red accent bar — collapses when compact */}
      <div
        className={`w-full bg-[#BB0A24] transition-all duration-700 ${
          compact ? "h-0" : "h-0.5"
        }`}
      />

      {/* Content row */}
      <div
        className={`relative mx-auto flex w-full max-w-7xl items-center justify-between transition-all duration-700 ${
          compact ? "h-10 px-4 sm:px-5" : "h-16 px-4 sm:px-6 lg:px-8"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo do GAS"
            width={32}
            height={32}
            className={`object-contain transition-all duration-700 ${
              compact ? "h-5 w-5" : "h-8 w-8"
            }`}
            priority
          />
          <span
            className={`font-black tracking-tight text-[#1A1A1A] transition-all duration-700 ${
              compact ? "text-sm" : "text-lg"
            }`}
          >
            GAS
          </span>
        </Link>

        <NavMenu projects={projects} />

        <Link
          href="/como-fazer-parte"
          className={`hidden lg:inline-flex items-center rounded-xl border border-[#BB0A24] bg-[#BB0A24] font-semibold text-white transition-all duration-300 hover:bg-[#8F071B] hover:border-[#8F071B] hover:-translate-y-px active:translate-y-0 ${
            compact ? "px-3 py-1 text-xs" : "px-5 py-2 text-sm"
          }`}
        >
          Participe
        </Link>
      </div>
    </header>
  );
}
