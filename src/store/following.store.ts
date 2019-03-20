import { action, observable } from 'mobx'
import { BaseStore } from './base-store'

export class Following extends BaseStore {
  @observable private folloingShowsIds: Set<string> = new Set()

  @action
  setFollowing(folloingShowsIds: string[]) {
    folloingShowsIds.forEach(id => this.folloingShowsIds.add(id))
  }

  @action
  startFollowing(showsId: string) {
    this.folloingShowsIds.add(showsId)
  }

  @action
  stopFollowing(showsId: string) {
    this.folloingShowsIds.delete(showsId)
  }

  isFollowingShow(showId: string) {
    return this.folloingShowsIds.has(showId)
  }

  getFolloingShowsIdList() {
    return Array.from(this.folloingShowsIds)
  }
}
