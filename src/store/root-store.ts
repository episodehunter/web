import { Following } from './following.store'
import { Shows } from './shows.store'
import { UpcomingEpisodes } from './upcoming-episodes.store'
import { User } from './user.store'

export class RootSore {
  user = new User()
  following = new Following(this)
  upcomingEpisodes = new UpcomingEpisodes(this)
  shows = new Shows(this)
}
