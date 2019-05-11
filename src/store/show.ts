import { Dragonstone } from '@episodehunter/types'
import { observable } from 'mobx'
import { BaseStore } from './base-store'

export class Show extends BaseStore {
  @observable data: Dragonstone.Show
}
