import { Store } from '../../store/store'
import { NavigateAction } from '../actions/navigation.actions'
import { Dispatch } from '../dispatcher'

export const navigateHandler = (
  action: NavigateAction,
  _: Store,
  dispatch: Dispatch
) => {
  switch (action.type) {
    case 'NAVIGATE_SHOW':
      dispatch.fetchFullShow(action.payload.showId)
      break
  }
}
