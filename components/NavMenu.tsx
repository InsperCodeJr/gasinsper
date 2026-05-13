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

function NavDropdown({ label, href, children }: { label: string; href?: string; children: React.ReactNode }) {
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
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
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

      {/*
        pt-2 bridges the gap between button bottom and dropdown top so the cursor
        never leaves the <li> descendant tree — prevents premature mouseleave.
        The wrapper starts at top-full (no margin) so cursor entering the padding
        area is still "inside" this <li> for event purposes.
      */}
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

export default function NavMenu({ projects }: NavMenuProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProjetosOpen, setMobileProjetosOpen] = useState(false);
  const [mobileFazerParteOpen, setMobileFazerParteOpen] = useState(false);

  return (
    <>
      {/* Desktop Nav */}
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
            <Link
              href="/eventos"
              className="group relative py-1 text-sm text-[#1A1A1A] transition-colors duration-200 hover:text-[#BB0A24]"
            >
              <span className="relative after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-[#BB0A24] after:transition-all after:duration-200 group-hover:after:w-full">
                Nossos Eventos
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/parceiros"
              className="group relative py-1 text-sm text-[#1A1A1A] transition-colors duration-200 hover:text-[#BB0A24]"
            >
              <span className="relative after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-[#BB0A24] after:transition-all after:duration-200 group-hover:after:w-full">
                Parceiros
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/ongs"
              className="group relative py-1 text-sm text-[#1A1A1A] transition-colors duration-200 hover:text-[#BB0A24]"
            >
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

      {/* Mobile hamburger */}
      <button
        className="lg:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Abrir menu"
      >
        <span className={`block h-0.5 w-6 bg-[#1A1A1A] transition-all duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block h-0.5 w-6 bg-[#1A1A1A] transition-all duration-300 ${mobileOpen ? "scale-x-0 opacity-0" : ""}`} />
        <span className={`block h-0.5 w-6 bg-[#1A1A1A] transition-all duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {/* Mobile menu — smooth slide + fade */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 z-50 border-t border-[#E5E5E5] bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col py-2 px-4">
          <li className="py-2 border-b border-[#F5F5F5]">
            <Link
              href="/sobre-nos"
              className="text-sm font-medium hover:text-[#BB0A24] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Sobre Nós
            </Link>
          </li>

          <li className="py-2 border-b border-[#F5F5F5]">
            <button
              className="flex w-full items-center justify-between text-sm font-medium"
              onClick={() => setMobileProjetosOpen((v) => !v)}
            >
              Projetos
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${mobileProjetosOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                mobileProjetosOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="ml-2 space-y-1">
                <li>
                  <Link
                    href="/projetos"
                    className="block py-1 text-sm text-[#555] hover:text-[#BB0A24] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Todos os Projetos
                  </Link>
                </li>
                {projects.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/projetos#${p.slug}`}
                      className="block py-1 text-sm text-[#555] hover:text-[#BB0A24] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li className="py-2 border-b border-[#F5F5F5]">
            <Link
              href="/eventos"
              className="text-sm font-medium hover:text-[#BB0A24] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Nossos Eventos
            </Link>
          </li>
          <li className="py-2 border-b border-[#F5F5F5]">
            <Link
              href="/parceiros"
              className="text-sm font-medium hover:text-[#BB0A24] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Parceiros
            </Link>
          </li>
          <li className="py-2 border-b border-[#F5F5F5]">
            <Link
              href="/ongs"
              className="text-sm font-medium hover:text-[#BB0A24] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              ONGs
            </Link>
          </li>

          <li className="py-2">
            <button
              className="flex w-full items-center justify-between text-sm font-medium"
              onClick={() => setMobileFazerParteOpen((v) => !v)}
            >
              Como Fazer Parte
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${mobileFazerParteOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                mobileFazerParteOpen ? "max-h-32 opacity-100 mt-1" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="ml-2 space-y-1">
                <li>
                  <Link
                    href="/como-fazer-parte#membro"
                    className="block py-1 text-sm text-[#555] hover:text-[#BB0A24] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Membro
                  </Link>
                </li>
                <li>
                  <Link
                    href="/como-fazer-parte#voluntario"
                    className="block py-1 text-sm text-[#555] hover:text-[#BB0A24] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Voluntário
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
