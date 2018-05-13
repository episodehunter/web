import { Location } from 'history'
import createBrowserHistory from 'history/createBrowserHistory'

export function createHistory(navigateCallback: (location: Location) => any) {
  const history = createBrowserHistory({})
  navigateCallback({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: window.history.state,
    key: ''
  })
  history.listen(navigateCallback)
  return history
}
