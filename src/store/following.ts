import { action, observable, computed, onBecomeObserved } from 'mobx'
import { fromPromise } from 'mobx-utils'
import { FollowingResponse } from '../api/responses'
import { api } from '../api/api'
import { ShowStore } from './show.store'

export class Following {
  private showStore: ShowStore
  @observable following: number[] = []
  @observable loading = true

  constructor(showStore: ShowStore) {
    this.showStore = showStore
    onBecomeObserved(this, 'loading', () => this.fetch())
  }

  @computed
  get shows() {
    return fromPromise(
      Promise.all(this.following.map(id => this.showStore.getShow(id)))
    )
  }

  @action
  fetch = () => {
    this.loading = true
    return api
      .fetchFollowing()
      .then(
        action(
          (res: FollowingResponse) =>
            (this.following = res.following.map(result => result.id))
        )
      )
      .then(action(() => (this.loading = false)))
  }
}
