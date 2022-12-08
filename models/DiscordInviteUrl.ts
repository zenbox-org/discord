import { escapeRegExp } from 'lodash-es'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { UrlSchema } from '../../generic/models/Url'

const startsWithGG = escapeRegExp('https://discord.gg')
const startsWithCom = escapeRegExp('https://discord.com')

const DiscordInviteUrlRegExp = new RegExp(`^(?:${startsWithGG}|${startsWithCom})(\\/invite)?\\/[\\d\\w]+$`)

export const DiscordInviteIdRegExp = new RegExp('^[\\d\\w]+$', 'g')

export const isDiscordInviteId = (s: string) => s.match(DiscordInviteIdRegExp) !== null

export const DiscordInviteUrlSchema = UrlSchema.regex(DiscordInviteUrlRegExp)

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
