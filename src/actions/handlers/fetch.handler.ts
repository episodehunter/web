import { Store } from '../../store/store'
import { FetchActions } from '../actions/fetch.actions'
import { Dispatch } from '../dispatcher'

export const fetchHandler = (
  action: FetchActions,
  store: Store,
  dispatch: Dispatch
) => {
  switch (action.type) {
    case 'FETCH_SHOW':
      store.showStore.getShow(action.payload.showId).load()
      break
  }
}
