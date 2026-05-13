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
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-1">
            <Link href="/" className="group flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Logo do GAS"
                width={32}
                height={32}
                className="h-8 w-8 object-contain brightness-0 invert"
              />
              <span className="text-lg font-black tracking-tight transition-colors duration-200 group-hover:text-[#BB0A24]">GAS</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-white/50">
              Grupo de Ação Social — organização estudantil do Insper dedicada ao impacto social por meio de projetos estruturados.
            </p>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Redes Sociais
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://instagram.com/gas.insper"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
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
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>
                <a href="mailto:contato@gas.org.br" className="hover:text-white transition-colors">
                  contato@gas.org.br
                </a>
              </li>
              <li>@gas.insper</li>
              <li className="text-white/30">São Paulo, SP — Insper</li>
            </ul>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Links Rápidos
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 text-xs text-white/30">
          <span>© {new Date().getFullYear()} GAS — Grupo de Ação Social. Todos os direitos reservados.</span>
          <span>Insper · São Paulo, Brasil</span>
        </div>
      </div>
    </footer>
  );
}
