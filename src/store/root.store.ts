import { EpisodesStore } from './episodes.store'
import { FollowingStore } from './following.store'
import { HistoryPageStore } from './history-page.store'
import { SearchStore } from './search.store'
import { ShowPageStore } from './show-page.store'
import { Shows } from './shows.store'
import { UpcomingEpisodes } from './upcoming-episodes.store'
import { User } from './user.store'
import { WatchedHistoryStore } from './watched-history.store'
import { WhatToWatchStore } from './what-to-watch.store'

export class RootSore {
  user = new User()
  following = new FollowingStore(this)
  upcomingEpisodes = new UpcomingEpisodes(this)
  shows = new Shows(this)
  showPage = new ShowPageStore(this)
  whatToWatch = new WhatToWatchStore(this)
  historyPage = new HistoryPageStore(this)
  search = new SearchStore(this)
  watchedHistory = new WatchedHistoryStore(this)
  episodes = new EpisodesStore(this)
}
