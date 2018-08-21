import { action, computed, observable } from 'mobx'
import { Dispatch } from '../actions/dispatcher'
import { Request } from '../request'
import { ModelLoader } from '../utils/model-loader.util'
import { ShowStore } from './show.store'

export class Following {
  private showStore: ShowStore
  private dispatch: Dispatch
  loader = new ModelLoader()
  @observable followingShowsId: number[] = []

  constructor(showStore: ShowStore, request: Request, dispatch: Dispatch) {
    this.showStore = showStore
    this.dispatch = dispatch
    this.loader.register(() => request.following())(showIds =>
      this.updateFollwing(showIds)
    )
  }

  @computed
  get shows() {
    return this.followingShowsId.map(id => this.showStore.getShow(id))
  }

  @computed
  get isLoading() {
    return (
      this.loader.isLoading || this.shows.some(show => show.loader.isLoading)
    )
  }

  loadFollowingShows() {
    this.loader.load(1)
  }

  @action
  updateFollwing(showIds: number[]) {
    this.followingShowsId = showIds
    showIds.forEach(id => {
      this.showStore.addShow(id)
      this.dispatch.fetchParialShow(id)
    })
  }

  @action
  follow = (id: number) => {
    this.followingShowsId.push(id)
  }

  @action
  unfollowing = (id: number) => {
    this.followingShowsId = this.followingShowsId.filter(fid => fid !== id)
  }
}
