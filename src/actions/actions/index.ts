import * as navigateActions from './navigation.actions'
import * as fetchActions from './fetch.actions'

export const actions = {
        ...navigateActions,
        ...fetchActions
}
