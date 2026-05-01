import { client } from './client'
import { Project, Event, Partner, ONG, TeamMember, Area } from '@/types/sanity'

// PROJETOS

export async function getAllProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(_createdAt desc)`
  return client.fetch(query)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0]`
  return client.fetch(query, { slug })
}

export async function getProjectStats(): Promise<{ total: number; recent: number }> {
  const query = `{
    "total": count(*[_type == "project"]),
    "recent": count(*[_type == "project" && dateTime(_createdAt) > dateTime(now()) - 86400*30])
  }`
  return client.fetch(query)
}

// EVENTOS

export async function getAllEvents(): Promise<Event[]> {
  const query = `*[_type == "event"] | order(date desc)`
  return client.fetch(query)
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const query = `*[_type == "event" && slug.current == $slug][0]`
  return client.fetch(query, { slug })
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const query = `*[_type == "event" && date > now()] | order(date asc) | [0...5]`
  return client.fetch(query)
}

// PARCEIROS

export async function getAllPartners(): Promise<Partner[]> {
  const query = `*[_type == "partner"] | order(name asc)`
  return client.fetch(query)
}

export async function getCurrentPartners(): Promise<Partner[]> {
  const query = `*[_type == "partner" && isHistorical != true] | order(name asc)`
  return client.fetch(query)
}

export async function getHistoricalPartners(): Promise<Partner[]> {
  const query = `*[_type == "partner" && isHistorical == true] | order(name asc)`
  return client.fetch(query)
}

// ONGs

export async function getAllONGs(): Promise<ONG[]> {
  const query = `*[_type == "ong"] | order(name asc)`
  return client.fetch(query)
}

export async function getONGCount(): Promise<number> {
  const query = `count(*[_type == "ong"])`
  return client.fetch(query)
}

// MEMBROS DA GESTÃO

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const query = `*[_type == "teamMember"] | order(name asc){
    ...,
    area->{...}
  }`
  return client.fetch(query)
}

export async function getTeamMembersByArea(areaId: string): Promise<TeamMember[]> {
  const query = `*[_type == "teamMember" && area._ref == $areaId] | order(name asc)`
  return client.fetch(query, { areaId })
}

// ÁREAS

export async function getAllAreas(): Promise<Area[]> {
  const query = `*[_type == "area"] | order(_createdAt asc)`
  return client.fetch(query)
}

export async function getAreaById(id: string): Promise<Area | null> {
  const query = `*[_type == "area" && _id == $id][0]`
  return client.fetch(query, { id })
}

// ESTATÍSTICAS GERAIS

export async function getGeneralStats(): Promise<{
  totalProjects: number
  totalPartners: number
  totalONGs: number
  totalMembers: number
}> {
  const query = `{
    "totalProjects": count(*[_type == "project"]),
    "totalPartners": count(*[_type == "partner"]),
    "totalONGs": count(*[_type == "ong"]),
    "totalMembers": count(*[_type == "teamMember"])
  }`
  return client.fetch(query)
}

// BUSCA GERAL

export async function searchContent(searchTerm: string): Promise<
  Array<Project | Event | Partner | ONG>
> {
  const query = `[
    *[_type == "project" && (name match $search || description match $search)],
    *[_type == "event" && (title match $search || description match $search)],
    *[_type == "partner" && (name match $search || description match $search)],
    *[_type == "ong" && (name match $search || description match $search)]
  ] | order(_createdAt desc)`
  return client.fetch(query, { search: `*${searchTerm}*` })
}
