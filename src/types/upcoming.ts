import { GetFollowingQuery } from '../dragonstone'

export type UpcomingShow = GetFollowingQuery['following'][0]['show']
