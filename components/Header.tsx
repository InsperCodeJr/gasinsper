import { client } from "@/sanity/lib/client";
import HeaderClient from "./HeaderClient";

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
  return <HeaderClient projects={projects} />;
}
