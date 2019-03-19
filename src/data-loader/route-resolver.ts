import { Routes } from '../routes'
import { Loaders } from './loaders'

export function createRouteResolver(loaders: Loaders) {
  return (route: Routes) => {
    console.log('route: ', route)
    if (route === Routes.upcoming) {
      loaders.upcomingLoader.loadUpcoming()
    } else if (route === Routes.following) {
      loaders.userLoader.loadWhatToWatch()
    } else if (route === Routes.history) {
      loaders.userLoader.loadHistoryPage(0)
    } else if (route.startsWith('/show/') && route.length > 6) {
      loaders.showLoader.loadShowForShowPage(route.split('/show/').pop() || '')
    }
  }
}
