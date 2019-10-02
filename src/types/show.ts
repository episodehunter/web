import { GetShowQuery } from '../dragonstone'

export type Show = NonNullable<GetShowQuery['show']>
export type NextToWatch = NonNullable<Show['nextToWatch']>
export type NextEpisodeToWatch = NonNullable<NextToWatch['episode']>
