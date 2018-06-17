import { createDispatch } from './actions/dispatcher'
import { createApiClient } from './api/api'
import { createRequestClient } from './request'
import { storage } from './storage'
import { Store } from './store/store'
import { getIdToken } from './utils/auth.util'

const apiClient = createApiClient(getIdToken)
const request = createRequestClient(storage, apiClient)
const dispatch = createDispatch(() => store)
const store = new Store(dispatch, request)

export { dispatch, store }
