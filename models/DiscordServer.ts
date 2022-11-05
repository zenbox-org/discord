import { z } from 'zod'
import { getDuplicatesRefinement } from 'zenbox-util/zod'
import { IdSchema } from '../../generic/models/Id'

export const DiscordServerSchema = z.object({
  id: IdSchema, // Discord gives the id in the URL
})

export const DiscordServersSchema = z.array(DiscordServerSchema)
  .superRefine(getDuplicatesRefinement('DiscordServer', parseDiscordServerUid))

export const DiscordServerUidSchema = DiscordServerSchema.pick({
  id: true,
})

export type DiscordServer = z.infer<typeof DiscordServerSchema>

export type DiscordServerUid = z.infer<typeof DiscordServerUidSchema>

export function parseDiscordServer(server: DiscordServer): DiscordServer {
  return DiscordServerSchema.parse(server)
}

export function parseDiscordServers(servers: DiscordServer[]): DiscordServer[] {
  return DiscordServersSchema.parse(servers)
}

export function parseDiscordServerUid(serverUid: DiscordServerUid): DiscordServerUid {
  return DiscordServerUidSchema.parse(serverUid)
}
