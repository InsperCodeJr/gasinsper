export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-4 gap-8 mb-8">
          {/* Logo Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">GAS</h3>
            <p className="text-gray-400 text-sm">
              Organização Estudantil
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/sobre-nos" className="hover:text-white">Sobre Nós</a></li>
              <li><a href="/projetos" className="hover:text-white">Projetos</a></li>
              <li><a href="/eventos" className="hover:text-white">Eventos</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <p className="text-sm text-gray-400">
              Email: contact@gas.org.br
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <p className="text-sm text-gray-400">
              @gasorganizacao
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-500">
            © 2026 GAS - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
