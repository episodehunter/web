import { Store } from '../../store/store'
import { FetchActions } from '../actions/fetch.actions'
import { Dispatch } from '../dispatcher'

export const fetchHandler = (
  action: FetchActions,
  store: Store,
  _: Dispatch
) => {
  console.warn(action.type)
  // switch (action.type) {
  //   case 'FETCH_PARTIAL_SHOW':
  //     // store.showStore
  //     //   .getShow(action.payload.showId)
  //     //   .load(ShowRequestType.partial)
  //     break
  //   case 'FETCH_FULL_SHOW':
  //     store.showStore.getShow(action.payload.showId).load(ShowRequestType.full)
  //     break
  //   case 'FETCH_SHOW_HISTORY':
  //     store.history.getHistoryForShow(action.payload.showId).load()
  //     break
  //   case 'FETCH_FULL_SHOW_FOR_FOLLOWING':
  //     store.following.followingShowsId.forEach(id => {
  //       store.history.getHistoryForShow(id).load()
  //       store.showStore.getShow(id).load(ShowRequestType.full)
  //     })
  //     break
  // }
}
