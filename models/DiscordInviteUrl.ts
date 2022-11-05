import { z } from 'zod'
import { getDuplicatesRefinement } from 'zenbox-util/zod'
import { UrlSchema } from '../../generic/models/Url'
import { escapeRegExp } from 'lodash-es'

const startsWithGG = escapeRegExp('https://discord.gg')
const startsWithCom = escapeRegExp('https://discord.com')

export const DiscordInviteUrlSchema = UrlSchema.regex(new RegExp(`^(?:${startsWithGG}|${startsWithCom})\\/[\\d\\w]+$`))

export const DiscordInviteUrlsSchema = z.array(DiscordInviteUrlSchema)
  .superRefine(getDuplicatesRefinement('DiscordInviteUrl', parseDiscordInviteUrlUid))

export const DiscordInviteUrlUidSchema = DiscordInviteUrlSchema

export type DiscordInviteUrl = z.infer<typeof DiscordInviteUrlSchema>

export type DiscordInviteUrlUid = z.infer<typeof DiscordInviteUrlUidSchema>

export function parseDiscordInviteUrl(url: DiscordInviteUrl): DiscordInviteUrl {
  return DiscordInviteUrlSchema.parse(url)
}

export function parseDiscordInviteUrls(urls: DiscordInviteUrl[]): DiscordInviteUrl[] {
  return DiscordInviteUrlsSchema.parse(urls)
}

export function parseDiscordInviteUrlUid(urlUid: DiscordInviteUrlUid): DiscordInviteUrlUid {
  return DiscordInviteUrlUidSchema.parse(urlUid)
}
