export const discordUrlPrefix = 'https://discord.com'

export function dsc(username: string) {
  return `${discordUrlPrefix}/users/${encodeURIComponent(username)}`
}
