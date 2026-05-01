import Link from "next/link";
import Image from "next/image";

const navItems = [
  { href: "/sobre-nos", label: "Sobre Nós" },
  { href: "/projetos", label: "Projetos" },
  { href: "/eventos", label: "Nossos Eventos" },
  { href: "/parceiros", label: "Parceiros" },
  { href: "/ongs", label: "ONGs" },
  { href: "/como-fazer-parte", label: "Como Fazer Parte" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E5E5] bg-[#FFFFFF]/95 text-[#1A1A1A] backdrop-blur">
      <div className="h-1 w-full bg-[#BB0A24]" />
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-semibold tracking-tight"
        >
          <Image
            src="/logo.png"
            alt="Logo do GAS"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority
          />
          <span>GAS</span>
        </Link>

        <nav aria-label="Navegacao principal" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#BB0A24]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/como-fazer-parte"
          className="rounded-full bg-[#BB0A24] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#8F071B]"
        >
          Participe
        </Link>
      </div>
    </header>
  );
}
