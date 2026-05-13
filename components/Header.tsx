import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import NavMenu from "./NavMenu";

async function getProjectLinks(): Promise<{ name: string; slug: string }[]> {
  try {
    return await client.fetch(
      `*[_type == "project"] | order(_createdAt asc) { name, "slug": slug.current }`
    );
  } catch {
    return [];
  }
}

export default async function Header() {
  const projects = await getProjectLinks();

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E5E5] bg-white/95 backdrop-blur-sm">
      <div className="h-0.5 w-full bg-[#BB0A24]" />
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
        >
          <Image
            src="/logo.png"
            alt="Logo do GAS"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <span className="text-lg font-bold tracking-tight text-[#1A1A1A]">GAS</span>
        </Link>

        <NavMenu projects={projects} />

        <Link
          href="/como-fazer-parte"
          className="hidden lg:inline-flex items-center rounded-none border border-[#BB0A24] bg-[#BB0A24] px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#8F071B] hover:border-[#8F071B] hover:-translate-y-px active:translate-y-0"
        >
          Participe
        </Link>
      </div>
    </header>
  );
}
