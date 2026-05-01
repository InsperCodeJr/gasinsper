import Link from "next/link";

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
    <footer className="border-t border-[#E5E5E5] bg-[#F7F7F7] text-[#1A1A1A]">
      <div className="h-1 w-full bg-[#BB0A24]" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <section>
          <h3 className="text-xl font-semibold text-[#BB0A24]">GAS</h3>
          <p className="mt-3 text-sm leading-6 text-[#555555]">
            Grupo de Ação Social focado em impacto, formação e transformação por
            meio de projetos sociais.
          </p>
        </section>

        <section>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[#555555]">
            Redes Sociais
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#555555] hover:text-[#BB0A24]"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#555555] hover:text-[#BB0A24]"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[#555555]">
            Contato
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-[#555555]">
            <li>contato@gas.org.br</li>
            <li>Instagram: @gas.insper</li>
          </ul>
        </section>

        <section>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[#555555]">
            Links Rápidos
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[#555555] transition hover:text-[#BB0A24]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="border-t border-[#E5E5E5] px-4 py-5 text-center text-xs text-[#555555] sm:px-6 lg:px-8">
        © {new Date().getFullYear()} GAS. Todos os direitos reservados.
      </div>
    </footer>
  );
}
