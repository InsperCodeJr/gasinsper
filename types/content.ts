/**
 * Modelo de conteudo do site.
 *
 * Imagens e videos sao URLs simples: os arquivos vivem no Vercel Blob em
 * producao e em public/uploads no ambiente local.
 */
import type { PageContent } from '@/content/pages'

export type MediaUrl = string | null

export interface Area {
  _id: string
  name: string
  description: string
  order?: number
}

export interface Stat {
  label?: string
  value?: string
}

export interface Testimonial {
  author: string
  role?: string
  text: string
  photo?: MediaUrl
}

export interface Project {
  _id: string
  name: string
  slug: string
  logo?: MediaUrl
  galleryImages?: string[]
  description: string
  objective?: string
  targetAudience?: string
  stats?: Stat[]
  cardColor?: string
  instagramHandle?: string
  /** ids de parceiros; resolvidos na leitura. */
  partnerIds?: string[]
  testimonials?: Testimonial[]
  volunteerInfo?: {
    description?: string
    opportunities?: string
    process?: string
    demand?: string
  }
}

/** Projeto com os parceiros ja resolvidos, como as paginas consomem. */
export interface ProjectWithPartners extends Project {
  partners: Partner[]
}

export interface Event {
  _id: string
  title: string
  slug: string
  image?: MediaUrl
  galleryImages?: string[]
  description: string
  date?: string
  cardColor?: string
  order?: number
}

export interface Partner {
  _id: string
  name: string
  logo?: MediaUrl
  description?: string
  website?: string
  isHistorical: boolean
}

export interface ONG {
  _id: string
  name: string
  logo?: MediaUrl
  description?: string
  testimonials?: Testimonial[]
  website?: string
}

export interface TeamMember {
  _id: string
  name: string
  position: string
  photo?: MediaUrl
  email?: string
  instagram?: string
  linkedin?: string
  isMatrix?: boolean
  order?: number
  area?: Area
}

export interface HomeMetricItem {
  label: string
  value: string
}

export interface RoutineStep {
  _key: string
  title: string
  desc: string
}

export interface SiteSettings {
  instagramHandle: string
  linkedinUrl: string
  contactEmail: string
}

/** O documento inteiro, gravado como um unico JSON. */
export interface SiteContent {
  pages: Partial<PageContent>
  home: { stats: HomeMetricItem[] }
  areas: Area[]
  projects: Project[]
  events: Event[]
  partners: Partner[]
  ongs: ONG[]
  teamMembers: TeamMember[]
  memberRoutine: { title: string; steps: RoutineStep[] }
  siteSettings: SiteSettings
}

/* ── Acesso ao painel ─────────────────────────────────── */

export interface AdminUser {
  email: string
  name?: string
  /** hash scrypt no formato "salt:hash". */
  passwordHash: string
  createdAt: string
}

export interface AdminUsers {
  users: AdminUser[]
}
