import { ShowRequestType } from '../../enum/request-type'
import { Store } from '../../store/store'
import { FetchActions } from '../actions/fetch.actions'
import { Dispatch } from '../dispatcher'

export const fetchHandler = (
  action: FetchActions,
  store: Store,
  _: Dispatch
) => {
  switch (action.type) {
    case 'FETCH_PARTIAL_SHOW':
      store.showStore
        .getShow(action.payload.showId)
        .load(ShowRequestType.partial)
      break
    case 'FETCH_FULL_SHOW':
      store.showStore.getShow(action.payload.showId).load(ShowRequestType.full)
      break
    case 'FETCH_SHOW_HISTORY':
      store.history.load(action.payload.showId)
      break
  }
}
