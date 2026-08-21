import { sanityFetch } from './live'
import { Project, Event, Partner, ONG, TeamMember, Area, HomeMetricItem, MemberRoutineStep } from '@/types/sanity'

const IMAGE_FIELDS = `{
  asset->{_id, _ref, url, metadata{dimensions}},
  hotspot,
  crop
}`

// PROJETOS

export async function getAllProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(_createdAt asc) {
    _id, _type, name, slug, description, objective, targetAudience,
    instagramHandle, stats, cardColor,
    logo ${IMAGE_FIELDS},
    galleryImages[] ${IMAGE_FIELDS},
    partners[]->{_id, name, logo ${IMAGE_FIELDS}, description, isHistorical},
    testimonials[]{author, role, text, photo ${IMAGE_FIELDS}},
    volunteerInfo
  }`
  const { data } = await sanityFetch({ query })
  return data as Project[]
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id, _type, name, slug, description, objective, targetAudience,
    instagramHandle, stats,
    logo ${IMAGE_FIELDS},
    galleryImages[] ${IMAGE_FIELDS},
    partners[]->{_id, name, logo ${IMAGE_FIELDS}, description, isHistorical},
    testimonials[]{author, role, text, photo ${IMAGE_FIELDS}},
    volunteerInfo
  }`
  const { data } = await sanityFetch({ query, params: { slug } })
  return data as Project | null
}

// EVENTOS

export async function getAllEvents(): Promise<Event[]> {
  const query = `*[_type == "event"] | order(date desc) {
    _id, _type, title, slug, description, date, cardColor,
    image ${IMAGE_FIELDS},
    galleryImages[] ${IMAGE_FIELDS}
  }`
  const { data } = await sanityFetch({ query })
  return data as Event[]
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const query = `*[_type == "event" && slug.current == $slug][0] {
    _id, _type, title, slug, description, date, cardColor,
    image ${IMAGE_FIELDS},
    galleryImages[] ${IMAGE_FIELDS}
  }`
  const { data } = await sanityFetch({ query, params: { slug } })
  return data as Event | null
}

export async function getVideoUrl(): Promise<string | null> {
  const query = `*[_type == "homeMetrics"][0].videoFile.asset->url`
  const { data } = await sanityFetch({ query })
  return data as string | null
}

// PARCEIROS

export async function getAllPartners(): Promise<Partner[]> {
  const query = `*[_type == "partner"] | order(name asc) {
    _id, _type, name, description, website, isHistorical,
    logo ${IMAGE_FIELDS}
  }`
  const { data } = await sanityFetch({ query })
  return data as Partner[]
}

export async function getCurrentPartners(): Promise<Partner[]> {
  const query = `*[_type == "partner" && isHistorical != true] | order(name asc) {
    _id, _type, name, description, website, isHistorical,
    logo ${IMAGE_FIELDS}
  }`
  const { data } = await sanityFetch({ query })
  return data as Partner[]
}

export async function getHistoricalPartners(): Promise<Partner[]> {
  const query = `*[_type == "partner" && isHistorical == true] | order(name asc) {
    _id, _type, name, description, website, isHistorical,
    logo ${IMAGE_FIELDS}
  }`
  const { data } = await sanityFetch({ query })
  return data as Partner[]
}

// ONGs

export async function getAllONGs(): Promise<ONG[]> {
  const query = `*[_type == "ong"] | order(name asc) {
    _id, _type, name, description, website,
    logo ${IMAGE_FIELDS},
    testimonials[]{author, text, photo ${IMAGE_FIELDS}}
  }`
  const { data } = await sanityFetch({ query })
  return data as ONG[]
}

// MEMBROS DA GESTÃO

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const query = `*[_type == "teamMember"] | order(order asc, name asc) {
    _id, _type, name, position, email, instagram, linkedin, isMatrix, order,
    photo ${IMAGE_FIELDS},
    area->{_id, name, description}
  }`
  const { data } = await sanityFetch({ query })
  return data as TeamMember[]
}

// ÁREAS

export async function getAllAreas(): Promise<Area[]> {
  const query = `*[_type == "area"] | order(order asc, _createdAt asc) {
    _id, _type, name, description, order
  }`
  const { data } = await sanityFetch({ query })
  return data as Area[]
}

// ROTINA DO MEMBRO

export async function getMemberRoutineSteps(): Promise<MemberRoutineStep[]> {
  const query = `*[_type == "memberRoutine"][0].steps[]{_key, title, desc}`
  const { data } = await sanityFetch({ query })
  return (data as MemberRoutineStep[] | null) ?? []
}

export async function getMemberRoutineTitle(): Promise<string | null> {
  const query = `*[_type == "memberRoutine"][0].sectionTitle`
  const { data } = await sanityFetch({ query })
  return (data as string | null) ?? null
}

// CONFIGURAÇÕES GERAIS (CONTATO E REDES SOCIAIS)

export interface SiteSettings {
  instagramHandle: string | null
  linkedinUrl: string | null
  contactEmail: string | null
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const query = `*[_type == "siteSettings"][0]{instagramHandle, linkedinUrl, contactEmail}`
  const { data } = await sanityFetch({ query })
  const result = data as SiteSettings | null
  return {
    instagramHandle: result?.instagramHandle ?? null,
    linkedinUrl: result?.linkedinUrl ?? null,
    contactEmail: result?.contactEmail ?? null,
  }
}

// HOME

export async function getHomeImpactNumbers(): Promise<HomeMetricItem[]> {
  const query = `{
    "projectCount": count(*[_type == "project"]),
    "manualStats": *[_type == "homeMetrics"][0].manualStats
  }`

  const { data } = await sanityFetch({ query })
  const result = data as { projectCount: number; manualStats?: HomeMetricItem[] }

  const manualStats = result.manualStats ?? [
    { label: 'Membros formados', value: '150+' },
    { label: 'ONGs impactadas', value: '40+' },
    { label: 'Voluntários envolvidos', value: '500+' },
  ]

  return [
    { label: 'Projetos realizados', value: `${result.projectCount || '10+'}` },
    ...manualStats,
  ]
}
