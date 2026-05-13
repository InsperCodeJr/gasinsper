import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { href: "/sobre-nos", label: "Sobre Nós" },
  { href: "/projetos", label: "Projetos" },
  { href: "/eventos", label: "Nossos Eventos" },
  { href: "/parceiros", label: "Parceiros" },
  { href: "/ongs", label: "ONGs" },
  { href: "/como-fazer-parte", label: "Como Fazer Parte" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="h-0.5 w-full bg-[#BB0A24]" />

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">

          {/* Marca */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Logo do GAS"
                width={32}
                height={32}
                className="h-8 w-8 object-contain brightness-0 invert"
              />
              <span className="text-lg font-black tracking-tight transition-colors duration-200 group-hover:text-[#BB0A24]">
                GAS
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/50">
              Grupo de Ação Social — organização estudantil do Insper dedicada ao impacto social por meio de projetos estruturados.
            </p>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Redes Sociais
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="https://instagram.com/gas.insper"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[36px] items-center text-white/60 transition-colors hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[36px] items-center text-white/60 transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Contato
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>
                <a
                  href="mailto:contato@gas.org.br"
                  className="inline-flex min-h-[36px] items-center transition-colors hover:text-white"
                >
                  contato@gas.org.br
                </a>
              </li>
              <li className="flex min-h-[36px] items-center">@gas.insper</li>
              <li className="flex min-h-[36px] items-center text-white/30">
                São Paulo, SP — Insper
              </li>
            </ul>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Links Rápidos
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[36px] items-center text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 text-xs text-white/30">
          <span>© {new Date().getFullYear()} GAS — Grupo de Ação Social. Todos os direitos reservados.</span>
          <span>Insper · São Paulo, Brasil</span>
        </div>
      </div>
    </footer>
  );
}
