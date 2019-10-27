import { GetUpcomingShowQuery } from '../dragonstone'

export type UpcomingShow = NonNullable<GetUpcomingShowQuery['show']>
