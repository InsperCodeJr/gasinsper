"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface ProjectLink {
  name: string;
  slug: string;
}

interface NavMenuProps {
  projects: ProjectLink[];
}

/* ── Desktop dropdown ─────────────────────────────────── */

function DropdownItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="group/item flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1A1A1A] transition-all duration-150 hover:bg-[#F7F7F7] hover:text-[#BB0A24]"
      >
        <span className="block h-1 w-1 shrink-0 rounded-full bg-[#BB0A24] opacity-0 transition-all duration-150 group-hover/item:opacity-100" />
        {children}
      </Link>
    </li>
  );
}

function NavDropdown({
  label,
  href,
  children,
}: {
  label: string;
  href?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpen(true);
  };
  const closeMenu = () => {
    closeTimerRef.current = setTimeout(() => setOpen(false), 100);
  };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      {href ? (
        <Link
          href={href}
          className="group flex items-center gap-1 py-1 text-sm text-[#1A1A1A] transition-colors duration-200 hover:text-[#BB0A24]"
        >
          <span className="relative after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-[#BB0A24] after:transition-all after:duration-200 group-hover:after:w-full">
            {label}
          </span>
          <svg
            className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
      ) : (
        <button
          className="group flex items-center gap-1 py-1 text-sm text-[#1A1A1A] transition-colors duration-200 hover:text-[#BB0A24]"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-[#BB0A24] after:transition-all after:duration-200 group-hover:after:w-full">
            {label}
          </span>
          <svg
            className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* pt-2 bridges the gap between trigger and panel so mouseleave never fires mid-hover */}
      <div
        className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 ease-out ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
        onMouseEnter={openMenu}
      >
        <div className="w-60 overflow-hidden rounded-xl border border-[#E5E5E5] bg-white shadow-xl shadow-black/10">
          <ul className="py-1.5">{children}</ul>
        </div>
      </div>
    </li>
  );
}

/* ── Main component ───────────────────────────────────── */

export default function NavMenu({ projects }: NavMenuProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProjetosOpen, setMobileProjetosOpen] = useState(false);
  const [mobileFazerParteOpen, setMobileFazerParteOpen] = useState(false);

  // Close on route change (catches Link navigation)
  useEffect(() => {
    if (!mobileOpen) {
      setMobileProjetosOpen(false);
      setMobileFazerParteOpen(false);
    }
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop nav ─────────────────────────── */}
      <nav aria-label="Navegação principal" className="hidden lg:block">
        <ul className="flex items-center gap-7">
          <li>
            <Link
              href="/sobre-nos"
              className="group relative py-1 text-sm text-[#1A1A1A] transition-colors duration-200 hover:text-[#BB0A24]"
            >
              <span className="relative after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-[#BB0A24] after:transition-all after:duration-200 group-hover:after:w-full">
                Sobre Nós
              </span>
            </Link>
          </li>

          <NavDropdown label="Projetos" href="/projetos">
            <DropdownItem href="/projetos">Todos os Projetos</DropdownItem>
            {projects.map((p) => (
              <DropdownItem key={p.slug} href={`/projetos#${p.slug}`}>
                {p.name}
              </DropdownItem>
            ))}
          </NavDropdown>

          <li>
            <Link href="/eventos" className="group relative py-1 text-sm text-[#1A1A1A] transition-colors duration-200 hover:text-[#BB0A24]">
              <span className="relative after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-[#BB0A24] after:transition-all after:duration-200 group-hover:after:w-full">
                Nossos Eventos
              </span>
            </Link>
          </li>
          <li>
            <Link href="/parceiros" className="group relative py-1 text-sm text-[#1A1A1A] transition-colors duration-200 hover:text-[#BB0A24]">
              <span className="relative after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-[#BB0A24] after:transition-all after:duration-200 group-hover:after:w-full">
                Parceiros
              </span>
            </Link>
          </li>
          <li>
            <Link href="/ongs" className="group relative py-1 text-sm text-[#1A1A1A] transition-colors duration-200 hover:text-[#BB0A24]">
              <span className="relative after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-[#BB0A24] after:transition-all after:duration-200 group-hover:after:w-full">
                ONGs
              </span>
            </Link>
          </li>

          <NavDropdown label="Como Fazer Parte">
            <DropdownItem href="/como-fazer-parte#membro">Membro</DropdownItem>
            <DropdownItem href="/como-fazer-parte#voluntario">Voluntário</DropdownItem>
          </NavDropdown>
        </ul>
      </nav>

      {/* ── Mobile hamburger ────────────────────── */}
      <button
        className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl text-[#1A1A1A] transition-colors hover:bg-[#F7F7F7] active:bg-[#F0F0F0]"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={mobileOpen}
      >
        <span className="relative flex h-5 w-5 flex-col justify-center gap-[5px]">
          <span
            className={`block h-0.5 w-5 bg-current origin-center transition-all duration-300 ${
              mobileOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
              mobileOpen ? "scale-x-0 opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current origin-center transition-all duration-300 ${
              mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {/* ── Mobile menu panel ───────────────────── */}
      {/*
        absolute top-full positions below the sticky header.
        opacity + translateY instead of max-height avoids janky layout animations.
      */}
      <div
        aria-hidden={!mobileOpen}
        className={`absolute left-0 right-0 top-full z-50 px-3 pt-2 pb-3 lg:hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <nav
          className="overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white shadow-2xl shadow-black/10"
          aria-label="Menu mobile"
        >
          <ul className="divide-y divide-[#F5F5F5]">

            {/* Sobre Nós */}
            <li>
              <Link
                href="/sobre-nos"
                className="flex min-h-[52px] items-center px-5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:text-[#BB0A24] active:bg-[#F9F9F9]"
                onClick={() => setMobileOpen(false)}
              >
                Sobre Nós
              </Link>
            </li>

            {/* Projetos accordion */}
            <li>
              <button
                className="flex min-h-[52px] w-full items-center justify-between px-5 text-sm font-semibold text-[#1A1A1A] active:bg-[#F9F9F9]"
                onClick={() => setMobileProjetosOpen((v) => !v)}
                aria-expanded={mobileProjetosOpen}
              >
                Projetos
                <svg
                  className={`h-4 w-4 text-[#555555] transition-transform duration-200 ${mobileProjetosOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileProjetosOpen ? "max-h-80" : "max-h-0"
                }`}
              >
                <ul className="border-t border-[#F5F5F5] bg-[#FAFAFA] py-1">
                  <li>
                    <Link
                      href="/projetos"
                      className="flex min-h-[44px] items-center px-7 text-sm text-[#555555] transition-colors hover:text-[#BB0A24]"
                      onClick={() => setMobileOpen(false)}
                    >
                      Todos os Projetos
                    </Link>
                  </li>
                  {projects.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/projetos#${p.slug}`}
                        className="flex min-h-[44px] items-center px-7 text-sm text-[#555555] transition-colors hover:text-[#BB0A24]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Eventos */}
            <li>
              <Link
                href="/eventos"
                className="flex min-h-[52px] items-center px-5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:text-[#BB0A24] active:bg-[#F9F9F9]"
                onClick={() => setMobileOpen(false)}
              >
                Nossos Eventos
              </Link>
            </li>

            {/* Parceiros */}
            <li>
              <Link
                href="/parceiros"
                className="flex min-h-[52px] items-center px-5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:text-[#BB0A24] active:bg-[#F9F9F9]"
                onClick={() => setMobileOpen(false)}
              >
                Parceiros
              </Link>
            </li>

            {/* ONGs */}
            <li>
              <Link
                href="/ongs"
                className="flex min-h-[52px] items-center px-5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:text-[#BB0A24] active:bg-[#F9F9F9]"
                onClick={() => setMobileOpen(false)}
              >
                ONGs
              </Link>
            </li>

            {/* Como Fazer Parte accordion */}
            <li>
              <button
                className="flex min-h-[52px] w-full items-center justify-between px-5 text-sm font-semibold text-[#1A1A1A] active:bg-[#F9F9F9]"
                onClick={() => setMobileFazerParteOpen((v) => !v)}
                aria-expanded={mobileFazerParteOpen}
              >
                Como Fazer Parte
                <svg
                  className={`h-4 w-4 text-[#555555] transition-transform duration-200 ${mobileFazerParteOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileFazerParteOpen ? "max-h-32" : "max-h-0"
                }`}
              >
                <ul className="border-t border-[#F5F5F5] bg-[#FAFAFA] py-1">
                  <li>
                    <Link
                      href="/como-fazer-parte#membro"
                      className="flex min-h-[44px] items-center px-7 text-sm text-[#555555] transition-colors hover:text-[#BB0A24]"
                      onClick={() => setMobileOpen(false)}
                    >
                      Membro
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/como-fazer-parte#voluntario"
                      className="flex min-h-[44px] items-center px-7 text-sm text-[#555555] transition-colors hover:text-[#BB0A24]"
                      onClick={() => setMobileOpen(false)}
                    >
                      Voluntário
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          {/* CTA at bottom — easy thumb reach */}
          <div className="border-t border-[#E5E5E5] p-3">
            <Link
              href="/como-fazer-parte"
              className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#BB0A24] text-sm font-semibold text-white transition-colors hover:bg-[#8F071B] active:bg-[#7A0617]"
              onClick={() => setMobileOpen(false)}
            >
              Participe
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
