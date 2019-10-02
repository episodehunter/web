import { GetFollowingShowsQuery } from '../dragonstone'

export type FollowingShow = GetFollowingShowsQuery['following'][0]['show']
