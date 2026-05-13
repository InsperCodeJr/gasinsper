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
        className="block px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#F7F7F7] hover:text-[#BB0A24] transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

function NavDropdown({ label, href, children }: { label: string; href?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {href ? (
        <Link
          href={href}
          className="flex items-center gap-1 text-sm text-[#1A1A1A] hover:text-[#BB0A24] transition-colors py-1"
        >
          {label}
          <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
      ) : (
        <button
          className="flex items-center gap-1 text-sm text-[#1A1A1A] hover:text-[#BB0A24] transition-colors py-1"
          onClick={() => setOpen((v) => !v)}
        >
          {label}
          <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-lg border border-[#E5E5E5] bg-white shadow-lg">
          <ul className="py-1">{children}</ul>
        </div>
      )}
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
            <Link href="/sobre-nos" className="text-sm text-[#1A1A1A] hover:text-[#BB0A24] transition-colors">
              Sobre Nós
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
            <Link href="/eventos" className="text-sm text-[#1A1A1A] hover:text-[#BB0A24] transition-colors">
              Nossos Eventos
            </Link>
          </li>
          <li>
            <Link href="/parceiros" className="text-sm text-[#1A1A1A] hover:text-[#BB0A24] transition-colors">
              Parceiros
            </Link>
          </li>
          <li>
            <Link href="/ongs" className="text-sm text-[#1A1A1A] hover:text-[#BB0A24] transition-colors">
              ONGs
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
        <span className={`block h-0.5 w-6 bg-[#1A1A1A] transition-all ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block h-0.5 w-6 bg-[#1A1A1A] transition-all ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`block h-0.5 w-6 bg-[#1A1A1A] transition-all ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 border-t border-[#E5E5E5] bg-white shadow-lg z-50">
          <ul className="flex flex-col py-2 px-4">
            <li className="py-2 border-b border-[#F5F5F5]">
              <Link href="/sobre-nos" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Sobre Nós
              </Link>
            </li>
            <li className="py-2 border-b border-[#F5F5F5]">
              <button
                className="flex w-full items-center justify-between text-sm font-medium"
                onClick={() => setMobileProjetosOpen((v) => !v)}
              >
                Projetos
                <svg className={`w-4 h-4 transition-transform ${mobileProjetosOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileProjetosOpen && (
                <ul className="mt-1 ml-2 space-y-1">
                  <li>
                    <Link href="/projetos" className="block py-1 text-sm text-[#555]" onClick={() => setMobileOpen(false)}>
                      Todos os Projetos
                    </Link>
                  </li>
                  {projects.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/projetos#${p.slug}`} className="block py-1 text-sm text-[#555]" onClick={() => setMobileOpen(false)}>
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="py-2 border-b border-[#F5F5F5]">
              <Link href="/eventos" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Nossos Eventos
              </Link>
            </li>
            <li className="py-2 border-b border-[#F5F5F5]">
              <Link href="/parceiros" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>
                Parceiros
              </Link>
            </li>
            <li className="py-2 border-b border-[#F5F5F5]">
              <Link href="/ongs" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>
                ONGs
              </Link>
            </li>
            <li className="py-2">
              <button
                className="flex w-full items-center justify-between text-sm font-medium"
                onClick={() => setMobileFazerParteOpen((v) => !v)}
              >
                Como Fazer Parte
                <svg className={`w-4 h-4 transition-transform ${mobileFazerParteOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileFazerParteOpen && (
                <ul className="mt-1 ml-2 space-y-1">
                  <li>
                    <Link href="/como-fazer-parte#membro" className="block py-1 text-sm text-[#555]" onClick={() => setMobileOpen(false)}>
                      Membro
                    </Link>
                  </li>
                  <li>
                    <Link href="/como-fazer-parte#voluntario" className="block py-1 text-sm text-[#555]" onClick={() => setMobileOpen(false)}>
                      Voluntário
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
