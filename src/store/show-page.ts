import { computed, observable } from 'mobx'
import { IsFollowing } from '../enum/is-following'
import { BaseStore } from './base-store'

export class ShowPage extends BaseStore {
  @observable private showId: string
  @observable selectedSeason = 1

  setShowId(showId: string) {
    if (showId === this.showId) {
      return
    }
    this.showId = showId
  }

  setSelectedSeason(season: number) {
    this.selectedSeason = season
  }

  @computed
  get show() {
    return this.rootStore.shows.find(this.showId)
  }

  @computed
  get isFollowing(): IsFollowing {
    if (this.rootStore.following.loadingState.isLoading()) {
      return IsFollowing.unknwon
    } else if (this.rootStore.following.isFollowingShow(this.showId)) {
      return IsFollowing.yes
    } else {
      return IsFollowing.no
    }
  }

  @computed
  get seasons(): number[] {
    return this.rootStore.episodes.getSeasons(this.showId)
  }
}
