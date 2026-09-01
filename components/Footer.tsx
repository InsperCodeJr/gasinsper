import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/lib/content";

const quickLinks = [
  { href: "/sobre-nos", label: "Sobre Nós" },
  { href: "/projetos", label: "Projetos" },
  { href: "/eventos", label: "Nossos Eventos" },
  { href: "/parceiros", label: "Parceiros" },
  { href: "/ongs", label: "ONGs" },
  { href: "/como-fazer-parte", label: "Como Fazer Parte" },
];

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

export default async function Footer() {
  const siteSettings = await getSiteSettings();
  const instagramHandle = siteSettings.instagramHandle ?? "gasinsper";
  const linkedinUrl = siteSettings.linkedinUrl ?? "https://linkedin.com";
  const contactEmail = siteSettings.contactEmail ?? "contato@gas.org.br";

  return (
    <footer className="bg-[#111111] text-white">
      <div className="h-0.5 w-full bg-[#BB0A24]" />

      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">

          {/* Marca — ocupa mais espaço */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Logo do GAS"
                width={36}
                height={36}
                className="h-9 w-9 object-contain brightness-0 invert"
              />
              <span className="text-xl font-black tracking-tight transition-colors duration-200 group-hover:text-[#BB0A24]">
                GAS
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/50">
              Grupo de Ação Social, organização estudantil do Insper dedicada ao impacto social por meio de projetos estruturados e parcerias de longo prazo.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2">
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram do GAS"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/50 transition-all duration-200 hover:border-[#BB0A24] hover:bg-[#BB0A24] hover:text-white"
              >
                <IconInstagram className="h-4 w-4" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn do GAS"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/50 transition-all duration-200 hover:border-[#BB0A24] hover:bg-[#BB0A24] hover:text-white"
              >
                <IconLinkedIn className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${contactEmail}`}
                aria-label="E-mail do GAS"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/50 transition-all duration-200 hover:border-[#BB0A24] hover:bg-[#BB0A24] hover:text-white"
              >
                <IconMail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Contato */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
              Contato
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-2.5 text-sm text-white/55 transition-colors hover:text-white"
                >
                  <IconMail className="h-4 w-4 shrink-0" />
                  {contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${instagramHandle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/55 transition-colors hover:text-white"
                >
                  <IconInstagram className="h-4 w-4 shrink-0" />
                  @{instagramHandle}
                </a>
              </li>
              <li className="pt-1 text-xs text-white/25">
                Insper, São Paulo, SP
              </li>
            </ul>
          </div>

          {/* Links Rápidos */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
              Páginas
            </h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 text-xs text-white/25">
          <span>© {new Date().getFullYear()} GAS, Grupo de Ação Social. Todos os direitos reservados.</span>
          <span>Insper · São Paulo, Brasil</span>
        </div>
      </div>
    </footer>
  );
}
