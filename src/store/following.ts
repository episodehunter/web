import { action, observable, computed, flow } from 'mobx'
import { api } from '../api/api'
import { ModelStatus } from '../enum/model-status'
import { ShowStore } from './show.store'

export class Following {
  private showStore: ShowStore
  @observable followingShowsId: number[] = []
  @observable status = ModelStatus.notLoaded

  constructor(showStore: ShowStore) {
    this.showStore = showStore
  }

  @computed
  get shows() {
    return this.followingShowsId.map(id => this.showStore.getShow(id))
  }

  @computed
  get isLoading() {
    return this.status === ModelStatus.loading
  }

  updateFollwing = flow(function*(this: Following) {
    this.status = ModelStatus.loading
    try {
      this.followingShowsId = yield api.fetchFollowing()
      yield Promise.all(
        this.followingShowsId.map(id => this.showStore.addShow(id))
      )
      this.status = ModelStatus.loaded
    } catch (error) {
      console.error(error)
      this.status = ModelStatus.error
    }
  })

  @action
  follow = (id: number) => {
    this.followingShowsId.push(id)
  }

  @action
  unfollowing = (id: number) => {
    this.followingShowsId = this.followingShowsId.filter(fid => fid !== id)
  }
}
