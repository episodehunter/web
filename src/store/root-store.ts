import { EpisodesStore } from './episodes.store'
import { Following } from './following.store'
import { HistoryPage } from './history-page.store'
import { Search } from './search.store'
import { ShowPage } from './show-page'
import { Shows } from './shows.store'
import { UpcomingEpisodes } from './upcoming-episodes.store'
import { User } from './user.store'
import { WatchedHistory } from './watched-history.store'
import { WhatToWatch } from './what-to-watch.store'

export class RootSore {
  user = new User()
  following = new Following(this)
  upcomingEpisodes = new UpcomingEpisodes(this)
  shows = new Shows(this)
  showPage = new ShowPage(this)
  whatToWatch = new WhatToWatch(this)
  historyPage = new HistoryPage(this)
  search = new Search(this)
  watchedHistory = new WatchedHistory(this)
  episodes = new EpisodesStore(this)
}
