export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface Area {
  _id: string
  _type: 'area'
  name: string
  description: string
}

export interface Project {
  _id: string
  _type: 'project'
  name: string
  slug: { current: string }
  logo?: SanityImage
  description: string
  objective?: string
  targetAudience?: string
  stats?: Array<{
    label: string
    value: string
  }>
  instagramHandle?: string
  partners?: Array<{ _ref: string }>
  testimonials?: Array<{
    author: string
    text: string
    photo?: SanityImage
  }>
  volunteerInfo?: {
    description?: string
    opportunities?: string
    process?: string
  }
}

export interface Event {
  _id: string
  _type: 'event'
  title: string
  slug: { current: string }
  image: SanityImage
  description: string
  date?: string
}

export interface Partner {
  _id: string
  _type: 'partner'
  name: string
  logo: SanityImage
  description?: string
  website?: string
  isHistorical: boolean
}

export interface ONG {
  _id: string
  _type: 'ong'
  name: string
  logo?: SanityImage
  description?: string
  testimonials?: Array<{
    author: string
    text: string
    photo?: SanityImage
  }>
  website?: string
}

export interface TeamMember {
  _id: string
  _type: 'teamMember'
  name: string
  position: string
  photo?: SanityImage
  email?: string
  phone?: string
  instagram?: string
  area?: { _ref: string }
}

export interface HomeMetricItem {
  label: string
  value: string
}

export interface HomeMetrics {
  _id: string
  _type: 'homeMetrics'
  manualStats?: HomeMetricItem[]
}
