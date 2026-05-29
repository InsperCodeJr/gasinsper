import { type SchemaTypeDefinition } from 'sanity'
import { area } from './area'
import { project } from './project'
import { event } from './event'
import { partner } from './partner'
import { ong } from './ong'
import { teamMember } from './teamMember'
import { homeMetrics } from './homeMetrics'
import { memberRoutine } from './memberRoutine'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [area, project, event, partner, ong, teamMember, homeMetrics, memberRoutine],
}
