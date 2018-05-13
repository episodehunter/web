import { action, computed, flow, observable } from 'mobx'
import { Dispatch } from '../actions/dispatcher'
import { api } from '../api/api'
import { ModelStatus } from '../enum/model-status'
import { ShowStore } from './show.store'

export class Following {
  private showStore: ShowStore
  private dispatch: Dispatch
  @observable followingShowsId: number[] = []
  @observable status = ModelStatus.notLoaded

  constructor(showStore: ShowStore, dispatch: Dispatch) {
    this.showStore = showStore
    this.dispatch = dispatch
  }

  @computed
  get shows() {
    return this.followingShowsId.map(id => this.showStore.getShow(id))
  }

  @computed
  get isLoading() {
    return (
      this.status === ModelStatus.loading ||
      this.shows.some(show => show.loader.isLoading)
    )
  }

  updateFollwing = flow(function*(this: Following) {
    this.status = ModelStatus.loading
    try {
      this.followingShowsId = yield api.fetchFollowing()
      this.followingShowsId.forEach(id => {
        this.showStore.addShow(id)
        this.dispatch.fetchShow(id)
      })
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
