import { computed, observable } from 'mobx'
import { BaseStore } from './base-store'

export class ShowPage extends BaseStore {
  @observable showId: string

  @computed
  get show() {
    return this.rootStore.shows.find(this.showId)
  }
}
