import { createDispatch } from './actions/dispatcher'
import { createHistory } from './history'
import { Store } from './store/store'

const dispatch = createDispatch(() => store)
const store = new Store(dispatch)
const history = createHistory(dispatch.navigate)

export { dispatch, store, history }
