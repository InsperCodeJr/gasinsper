import { client } from './client'
import { Project, Event, Partner, ONG, TeamMember, Area, HomeMetricItem } from '@/types/sanity'

const IMAGE_FIELDS = `{
  asset->{_id, _ref, url, metadata{dimensions}},
  hotspot,
  crop
}`

// PROJETOS

export async function getAllProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(_createdAt asc) {
    _id, _type, name, slug, description, objective, targetAudience,
    instagramHandle, stats,
    logo ${IMAGE_FIELDS},
    galleryImages[] ${IMAGE_FIELDS},
    partners[]->{_id, name, logo ${IMAGE_FIELDS}, description, isHistorical},
    testimonials[]{author, role, text, photo ${IMAGE_FIELDS}},
    volunteerInfo
  }`
  return client.fetch(query)
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
  return client.fetch(query, { slug })
}

// EVENTOS

export async function getAllEvents(): Promise<Event[]> {
  const query = `*[_type == "event"] | order(date desc) {
    _id, _type, title, slug, description, date,
    image ${IMAGE_FIELDS}
  }`
  return client.fetch(query)
}

// PARCEIROS

export async function getAllPartners(): Promise<Partner[]> {
  const query = `*[_type == "partner"] | order(name asc) {
    _id, _type, name, description, website, isHistorical,
    logo ${IMAGE_FIELDS}
  }`
  return client.fetch(query)
}

export async function getCurrentPartners(): Promise<Partner[]> {
  const query = `*[_type == "partner" && isHistorical != true] | order(name asc) {
    _id, _type, name, description, website, isHistorical,
    logo ${IMAGE_FIELDS}
  }`
  return client.fetch(query)
}

export async function getHistoricalPartners(): Promise<Partner[]> {
  const query = `*[_type == "partner" && isHistorical == true] | order(name asc) {
    _id, _type, name, description, website, isHistorical,
    logo ${IMAGE_FIELDS}
  }`
  return client.fetch(query)
}

// ONGs

export async function getAllONGs(): Promise<ONG[]> {
  const query = `*[_type == "ong"] | order(name asc) {
    _id, _type, name, description, website,
    logo ${IMAGE_FIELDS},
    testimonials[]{author, text, photo ${IMAGE_FIELDS}}
  }`
  return client.fetch(query)
}

// MEMBROS DA GESTÃO

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const query = `*[_type == "teamMember"] | order(order asc, name asc) {
    _id, _type, name, position, email, instagram, linkedin, isMatrix, order,
    photo ${IMAGE_FIELDS},
    area->{_id, name, description}
  }`
  return client.fetch(query)
}

// ÁREAS

export async function getAllAreas(): Promise<Area[]> {
  const query = `*[_type == "area"] | order(order asc, _createdAt asc) {
    _id, _type, name, description, order
  }`
  return client.fetch(query)
}

// HOME

export async function getHomeImpactNumbers(): Promise<HomeMetricItem[]> {
  const query = `{
    "projectCount": count(*[_type == "project"]),
    "manualStats": *[_type == "homeMetrics"][0].manualStats
  }`

  const data = await client.fetch<{
    projectCount: number
    manualStats?: HomeMetricItem[]
  }>(query)

  const manualStats = data.manualStats ?? [
    { label: 'Membros formados', value: '150+' },
    { label: 'ONGs impactadas', value: '40+' },
    { label: 'Voluntários envolvidos', value: '500+' },
  ]

  return [
    { label: 'Projetos realizados', value: `${data.projectCount || '10+'}` },
    ...manualStats,
  ]
}
