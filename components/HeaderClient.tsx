"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NavMenu from "./NavMenu";

interface ProjectLink {
  name: string;
  slug: string;
}

export default function HeaderClient({ projects }: { projects: ProjectLink[] }) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    // pageYOffset = scrollY with wider browser support
    // || fallbacks cover layouts where scrolling happens on html/body element
    const scrollY = () =>
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    let isCompact = false;
    let anchor = scrollY();

    const handler = () => {
      const y = scrollY();

      // Always full near top
      if (y < 60) {
        if (isCompact) { isCompact = false; setCompact(false); }
        anchor = y;
        return;
      }

      const delta = y - anchor;

      // 50px down → compact, 20px up → full
      if (!isCompact && delta >= 50) {
        isCompact = true;
        setCompact(true);
        anchor = y;
      } else if (isCompact && delta <= -20) {
        isCompact = false;
        setCompact(false);
        anchor = y;
      }
    };

    window.addEventListener("scroll", handler, { passive: true });
    document.addEventListener("scroll", handler, { passive: true });
    handler(); // check on mount in case page is already scrolled

    return () => {
      window.removeEventListener("scroll", handler);
      document.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        compact
          ? "mx-[18%] mt-2 rounded-2xl border border-[#E5E5E5] shadow-xl shadow-black/10"
          : "mx-0 border-b border-[#E5E5E5]"
      }`}
    >
      {/* Red accent bar */}
      <div
        className={`w-full bg-[#BB0A24] transition-all duration-500 ${
          compact ? "h-0" : "h-0.5"
        }`}
      />

      {/* Content row */}
      <div
        className={`relative mx-auto flex w-full max-w-7xl items-center justify-between transition-all duration-500 ${
          compact ? "h-11 px-4 sm:px-5" : "h-16 px-4 sm:px-6 lg:px-8"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo do GAS"
            width={32}
            height={32}
            className={`object-contain transition-all duration-500 ${
              compact ? "h-6 w-6" : "h-8 w-8"
            }`}
            priority
          />
          <span
            className={`font-black tracking-tight text-[#1A1A1A] transition-all duration-500 ${
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
            compact ? "px-3 py-1.5 text-xs" : "px-5 py-2 text-sm"
          }`}
        >
          Participe
        </Link>
      </div>
    </header>
  );
}
