import { Store } from '../../store/store'
import { FetchActions } from '../actions/fetch.actions'
import { Dispatch } from '../dispatcher'

export const fetchHandler = (action: FetchActions, _: Store, __: Dispatch) => {
  console.warn(action.type)
}
