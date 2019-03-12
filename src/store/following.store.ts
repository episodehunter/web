import { action, observable } from 'mobx'
import { BaseStore } from './base-store'

export class Following extends BaseStore {
  @observable folloingShowsIds: string[] = []

  @action
  setFollowing(folloingShowsIds: string[]) {
    this.folloingShowsIds = folloingShowsIds
  }
}
