import { Store } from '../store/store'
import { actions } from './actions'
import { handlers } from './handlers'

const baseDispatch = (action, store: Store, dispatch: Dispatch) => {
  console.log('Dispatch', action)
  handlers.navigateHandler(action, store, dispatch)
  handlers.fetchHandler(action, store, dispatch)
}

export function createDispatch(getStore: () => Store) {
  const dispatch: Dispatch = new Proxy(actions, {
    get(target: typeof actions, actionName: string) {
      if (actionName in target) {
        return action =>
          baseDispatch(target[actionName](action), getStore(), dispatch)
      } else {
        console.warn('Unknown action: ', actionName)
      }
    }
  }) as any
  return dispatch
}

export type Dispatch = typeof actions
