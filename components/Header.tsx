import { getProjectLinks } from "@/lib/content";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const projects = await getProjectLinks();
  return <HeaderClient projects={projects} />;
}
