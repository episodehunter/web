import { createDispatch } from './actions/dispatcher'
import { Store } from './store/store'

const dispatch = createDispatch(() => store)
const store = new Store(dispatch)

export { dispatch, store }
