import { observable } from 'mobx'
import { PublicTypes } from '../data-loader/public-types'
import { BaseStore } from './base-store'

export class Show extends BaseStore {
  @observable data: PublicTypes.Show
}
