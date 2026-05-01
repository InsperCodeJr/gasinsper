'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl">
          GAS
        </Link>

        {/* Navigation Menu */}
        <ul className="flex gap-6 items-center">
          <li>
            <Link href="/sobre-nos">Sobre Nós</Link>
          </li>
          <li>
            <Link href="/projetos">Projetos</Link>
          </li>
          <li>
            <Link href="/eventos">Nossos Eventos</Link>
          </li>
          <li>
            <Link href="/parceiros">Parceiros</Link>
          </li>
          <li>
            <Link href="/ongs">ONGs</Link>
          </li>
          <li>
            <Link href="/como-fazer-parte">Como Fazer Parte</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
