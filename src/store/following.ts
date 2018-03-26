import { action, observable } from 'mobx'
import { FollowingResponse } from '../api/responses'
import { api } from '../api/api'
import { ShowsStore } from './show.store'
import { ShowStore } from './show'

export class FollowingStore {
  showStore: ShowsStore
  @observable following: number[] = []
  @observable shows: ShowStore[] = []
  @observable isLoading = false

  constructor(showStore: ShowsStore) {
    this.showStore = showStore
  }

  @action
  fetch = () => {
    this.isLoading = true
    return api
      .fetchFollowing()
      .then(
        action((res: FollowingResponse) => {
          this.following = res.following.map(result => result.id)
          this.following.forEach(id =>
            this.showStore.getShow(id).then((show: ShowStore) => {
              this.addShow(show)
            })
          )
        })
      )
      .then(action(() => (this.isLoading = false)))
  }

  @action
  addShow = (newShow: ShowStore) => {
    if (this.shows.some(show => show.id === newShow.id)) {
      this.shows = this.shows.map(
        show => (show.id === newShow.id ? newShow : show)
      )
    } else {
      this.shows.push(newShow)
    }
  }

  removeShow = (id: number) => {
    this.shows = this.shows.filter(show => show.id !== id)
  }

  follow = (id: number) => {
    this.following.push(id)
    this.showStore.getShow(id).then((show: ShowStore) => {
      this.addShow(show)
    })
  }

  stopFollowing = (id: number) => {
    this.following = this.following.filter(fid => fid !== id)
    this.removeShow(id)
  }
}
