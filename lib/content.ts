/**
 * Leitura do conteudo pelas paginas.
 *
 * Aqui ficam a ordenacao, a resolucao de referencias e a mistura dos textos
 * de cada pagina com os padroes de content/pages.ts.
 */
import { PAGE_DEFAULTS, type PageContent } from '@/content/pages'
import { readContent } from './contentStore'
import type {
  Area,
  Event,
  HomeMetricItem,
  ONG,
  Partner,
  ProjectWithPartners,
  RoutineStep,
  SiteSettings,
  TeamMember,
} from '@/types/content'

/* ── ordenacao ───────────────────────────────────────── */

function byText(a?: string, b?: string) {
  return (a ?? '').localeCompare(b ?? '', 'pt-BR')
}

function byOrderThenName<T extends { order?: number; name?: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) =>
      (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) ||
      byText(a.name, b.name)
  )
}

/* ── colecoes ────────────────────────────────────────── */

export async function getAllProjects(): Promise<ProjectWithPartners[]> {
  const content = await readContent()
  return content.projects.map((project) => ({
    ...project,
    partners: (project.partnerIds ?? [])
      .map((id) => content.partners.find((partner) => partner._id === id))
      .filter((partner): partner is Partner => Boolean(partner)),
  }))
}

export async function getProjectLinks(): Promise<{ name: string; slug: string }[]> {
  const content = await readContent()
  return content.projects.map((project) => ({ name: project.name, slug: project.slug }))
}

export async function getAllEvents(): Promise<Event[]> {
  const content = await readContent()
  // "order" define quem aparece primeiro; sem ordem, do mais recente ao mais antigo.
  return [...content.events].sort(
    (a, b) => (a.order ?? 9999) - (b.order ?? 9999) || byText(b.date, a.date)
  )
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const events = await getAllEvents()
  return events.find((event) => event.slug === slug) ?? null
}

export async function getAllPartners(): Promise<Partner[]> {
  const content = await readContent()
  return [...content.partners].sort((a, b) => byText(a.name, b.name))
}

export async function getAllONGs(): Promise<ONG[]> {
  const content = await readContent()
  return [...content.ongs].sort((a, b) => byText(a.name, b.name))
}

export async function getAllAreas(): Promise<Area[]> {
  const content = await readContent()
  return byOrderThenName(content.areas)
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const content = await readContent()
  return byOrderThenName(content.teamMembers)
}

export async function getMemberRoutineSteps(): Promise<RoutineStep[]> {
  return (await readContent()).memberRoutine.steps
}

export async function getMemberRoutineTitle(): Promise<string> {
  return (await readContent()).memberRoutine.title
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const { siteSettings } = await readContent()
  return {
    ...siteSettings,
    instagramHandle: normalizeInstagramHandle(siteSettings.instagramHandle),
  }
}

function normalizeInstagramHandle(value: string): string {
  const trimmed = value.trim()
  const fromUrl = trimmed.match(/instagram\.com\/([^/?#]+)/i)
  return (fromUrl ? fromUrl[1] : trimmed).replace(/^@/, '')
}

export async function getHomeImpactNumbers(): Promise<HomeMetricItem[]> {
  return (await readContent()).home.stats
}

/* ── textos das paginas ──────────────────────────────── */

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

/**
 * Junta o que foi editado com os textos padrao.
 * Campo vazio ou lista sem itens continua mostrando o padrao, para uma pagina
 * nunca ficar em branco por causa de um campo nao preenchido.
 */
export function mergeWithDefaults<T>(defaults: T, override: unknown): T {
  if (override === undefined || override === null) return defaults

  if (Array.isArray(defaults)) {
    if (!Array.isArray(override) || override.length === 0) return defaults
    return override as T
  }

  if (isPlainObject(defaults)) {
    if (!isPlainObject(override)) return defaults
    const result: Record<string, unknown> = { ...defaults }
    for (const key of Object.keys(defaults)) {
      result[key] = mergeWithDefaults((defaults as Record<string, unknown>)[key], override[key])
    }
    return result as T
  }

  if (typeof defaults === 'string') {
    const value = typeof override === 'string' ? override.trim() : ''
    return (value || defaults) as T
  }

  return override as T
}

export async function getPageContent<K extends keyof PageContent>(page: K): Promise<PageContent[K]> {
  const content = await readContent()
  return mergeWithDefaults(PAGE_DEFAULTS[page], content.pages?.[page])
}
