import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * O conteúdo é editável pelo painel a qualquer momento, então as páginas não
 * podem ser geradas uma vez no build: precisam ser renderizadas a cada
 * requisição. Sem isso, uma edição só apareceria no próximo deploy.
 */
export const dynamic = "force-dynamic";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
