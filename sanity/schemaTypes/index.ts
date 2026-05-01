import { type SchemaTypeDefinition } from 'sanity'
import { area } from './area'
import { project } from './project'
import { event } from './event'
import { partner } from './partner'
import { ong } from './ong'
import { teamMember } from './teamMember'
import { homeMetrics } from './homeMetrics'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [area, project, event, partner, ong, teamMember, homeMetrics],
}
