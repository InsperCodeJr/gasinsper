/**
 * Normaliza o conteudo lido do armazenamento.
 *
 * Aceita os formatos antigos (da epoca do Sanity) e devolve sempre o formato
 * atual, com todas as chaves preenchidas. Assim nenhuma edicao ja feita se
 * perde e as paginas nunca recebem um campo faltando.
 */
import { DEFAULT_CONTENT } from '@/content/defaults'
import type {
  Area,
  Event,
  HomeMetricItem,
  ONG,
  Partner,
  Project,
  RoutineStep,
  SiteContent,
  TeamMember,
  Testimonial,
} from '@/types/content'
import type { PageContent } from '@/content/pages'

type Raw = Record<string, unknown>

function isObject(value: unknown): value is Raw {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

/** Imagem antiga: { asset: { url } }. Hoje e so a URL. */
function mediaUrl(value: unknown): string | null {
  if (typeof value === 'string') return value || null
  if (isObject(value)) {
    const asset = value.asset
    if (isObject(asset) && typeof asset.url === 'string') return asset.url || null
  }
  return null
}

function mediaList(value: unknown): string[] {
  return asArray<unknown>(value)
    .map(mediaUrl)
    .filter((url): url is string => Boolean(url))
}

/** Slug antigo: { current }. Hoje e so a string. */
function slug(value: unknown, fallback: string): string {
  if (typeof value === 'string' && value.trim()) return value.trim()
  if (isObject(value) && typeof value.current === 'string' && value.current.trim()) {
    return value.current.trim()
  }
  return fallback
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function testimonials(value: unknown): Testimonial[] {
  return asArray<Raw>(value)
    .filter((item) => isObject(item) && text(item.text) && text(item.author))
    .map((item) => ({
      author: text(item.author),
      role: text(item.role) || undefined,
      text: text(item.text),
      photo: mediaUrl(item.photo),
    }))
}

function areas(value: unknown): Area[] {
  return asArray<Raw>(value)
    .filter((item) => isObject(item) && text(item.name))
    .map((item, i) => ({
      _id: text(item._id) || `area-${i + 1}`,
      name: text(item.name),
      description: text(item.description),
      order: typeof item.order === 'number' ? item.order : undefined,
    }))
}

function projects(value: unknown): Project[] {
  return asArray<Raw>(value)
    .filter(isObject)
    .map((item, i) => {
      const name = text(item.name).trim() || `Projeto ${i + 1}`
      // Antes os parceiros vinham como [{ _ref }]; hoje e uma lista de ids.
      const partnerIds = asArray<unknown>(item.partnerIds ?? item.partners)
        .map((entry) =>
          typeof entry === 'string'
            ? entry
            : isObject(entry)
              ? text(entry._ref) || text(entry._id)
              : ''
        )
        .filter(Boolean)

      return {
        _id: text(item._id) || `proj-${i + 1}`,
        name,
        slug: slug(item.slug, slugify(name) || `projeto-${i + 1}`),
        logo: mediaUrl(item.logo),
        galleryImages: mediaList(item.galleryImages),
        description: text(item.description),
        objective: text(item.objective) || undefined,
        targetAudience: text(item.targetAudience) || undefined,
        stats: asArray<Raw>(item.stats)
          .filter((stat) => isObject(stat) && (text(stat.value) || text(stat.label)))
          .map((stat) => ({ label: text(stat.label), value: text(stat.value) })),
        cardColor: text(item.cardColor) || undefined,
        instagramHandle: text(item.instagramHandle) || undefined,
        partnerIds,
        testimonials: testimonials(item.testimonials),
        volunteerInfo: isObject(item.volunteerInfo)
          ? {
              description: text(item.volunteerInfo.description) || undefined,
              opportunities: text(item.volunteerInfo.opportunities) || undefined,
              process: text(item.volunteerInfo.process) || undefined,
              demand: text(item.volunteerInfo.demand) || undefined,
            }
          : undefined,
      }
    })
}

function events(value: unknown): Event[] {
  return asArray<Raw>(value)
    .filter(isObject)
    .map((item, i) => {
      const title = text(item.title).trim() || `Evento ${i + 1}`
      return {
        _id: text(item._id) || `event-${i + 1}`,
        title,
        slug: slug(item.slug, slugify(title) || `evento-${i + 1}`),
        image: mediaUrl(item.image),
        galleryImages: mediaList(item.galleryImages),
        description: text(item.description),
        date: text(item.date) || undefined,
        cardColor: text(item.cardColor) || undefined,
        order: typeof item.order === 'number' ? item.order : undefined,
      }
    })
}

function partners(value: unknown): Partner[] {
  return asArray<Raw>(value)
    .filter((item) => isObject(item) && text(item.name))
    .map((item, i) => ({
      _id: text(item._id) || `partner-${i + 1}`,
      name: text(item.name),
      logo: mediaUrl(item.logo),
      description: text(item.description) || undefined,
      website: text(item.website) || undefined,
      isHistorical: Boolean(item.isHistorical),
    }))
}

function ongs(value: unknown): ONG[] {
  return asArray<Raw>(value)
    .filter((item) => isObject(item) && text(item.name))
    .map((item, i) => ({
      _id: text(item._id) || `ong-${i + 1}`,
      name: text(item.name),
      logo: mediaUrl(item.logo),
      description: text(item.description) || undefined,
      website: text(item.website) || undefined,
      testimonials: testimonials(item.testimonials),
    }))
}

function teamMembers(value: unknown, allAreas: Area[]): TeamMember[] {
  return asArray<Raw>(value)
    .filter((item) => isObject(item) && text(item.name))
    .map((item, i) => {
      const rawArea = item.area
      const areaId = isObject(rawArea) ? text(rawArea._id) : text(rawArea)
      return {
        _id: text(item._id) || `member-${i + 1}`,
        name: text(item.name),
        position: text(item.position),
        photo: mediaUrl(item.photo),
        email: text(item.email) || undefined,
        instagram: text(item.instagram) || undefined,
        linkedin: text(item.linkedin) || undefined,
        isMatrix: Boolean(item.isMatrix),
        order: typeof item.order === 'number' ? item.order : undefined,
        area: allAreas.find((area) => area._id === areaId),
      }
    })
}

function stats(value: unknown): HomeMetricItem[] {
  return asArray<Raw>(value)
    .filter((item) => isObject(item) && text(item.label) && text(item.value))
    .map((item) => ({ label: text(item.label), value: text(item.value) }))
}

function routineSteps(value: unknown): RoutineStep[] {
  return asArray<Raw>(value)
    .filter((item) => isObject(item) && text(item.title))
    .map((item, i) => ({
      _key: text(item._key) || `step-${i + 1}`,
      title: text(item.title),
      desc: text(item.desc),
    }))
}

/**
 * A midia de fundo de Sobre Nos ja morou em home.videoUrl e home.mediaUrl.
 * Hoje pertence ao topo daquela pagina.
 */
function pages(raw: Raw): Partial<PageContent> {
  const current = isObject(raw.pages) ? (raw.pages as Partial<PageContent>) : {}
  const home = isObject(raw.home) ? raw.home : {}
  const legacyMedia =
    mediaUrl(home.mediaUrl) ?? mediaUrl(home.videoUrl) ?? mediaUrl(raw.videoUrl)

  if (!legacyMedia || current.about?.hero?.mediaUrl) return current

  return {
    ...current,
    about: {
      ...(current.about ?? {}),
      hero: { ...(current.about?.hero ?? {}), mediaUrl: legacyMedia },
    } as PageContent['about'],
  }
}

export function migrateContent(input: unknown): SiteContent {
  const raw = isObject(input) ? input : {}
  const home = isObject(raw.home) ? raw.home : {}
  const routine = raw.memberRoutine

  const migratedAreas = areas(raw.areas)
  const finalAreas = migratedAreas.length > 0 ? migratedAreas : DEFAULT_CONTENT.areas

  const migratedStats = stats(home.stats ?? raw.homeStats)
  const migratedProjects = projects(raw.projects)
  const migratedEvents = events(raw.events)
  const migratedPartners = partners(raw.partners)
  const migratedOngs = ongs(raw.ongs)
  const migratedTeam = teamMembers(raw.teamMembers, finalAreas)
  const migratedRoutine = Array.isArray(routine)
    ? { title: DEFAULT_CONTENT.memberRoutine.title, steps: routineSteps(routine) }
    : isObject(routine)
      ? {
          title: text(routine.title, DEFAULT_CONTENT.memberRoutine.title),
          steps: routineSteps(routine.steps),
        }
      : DEFAULT_CONTENT.memberRoutine

  const settings = isObject(raw.siteSettings) ? raw.siteSettings : {}

  return {
    pages: pages(raw),
    home: { stats: migratedStats.length > 0 ? migratedStats : DEFAULT_CONTENT.home.stats },
    areas: finalAreas,
    projects: migratedProjects.length > 0 ? migratedProjects : DEFAULT_CONTENT.projects,
    events: migratedEvents.length > 0 ? migratedEvents : DEFAULT_CONTENT.events,
    partners: migratedPartners.length > 0 ? migratedPartners : DEFAULT_CONTENT.partners,
    ongs: migratedOngs.length > 0 ? migratedOngs : DEFAULT_CONTENT.ongs,
    teamMembers: migratedTeam.length > 0 ? migratedTeam : DEFAULT_CONTENT.teamMembers,
    memberRoutine: migratedRoutine,
    siteSettings: {
      instagramHandle: text(settings.instagramHandle, DEFAULT_CONTENT.siteSettings.instagramHandle),
      linkedinUrl: text(settings.linkedinUrl, DEFAULT_CONTENT.siteSettings.linkedinUrl),
      contactEmail: text(settings.contactEmail, DEFAULT_CONTENT.siteSettings.contactEmail),
    },
  }
}
