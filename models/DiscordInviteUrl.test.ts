import { DiscordInviteUrlSchema } from './DiscordInviteUrl'
import { testSamples } from 'libs/utils/jest/testSamples'

testSamples(DiscordInviteUrlSchema, [
  'https://discord.gg/e6GfYCqmF7',
  'https://discord.gg/y45VtKYx',
], [
  'https://www.google.com/',
  'https://discord.com/channels/883486385548435457/335636136708153424',
])
