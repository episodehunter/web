import { Loaders } from './loaders'

export function createRouteResolver(loaders: Loaders) {
  return (route: string) => {
    console.log('route: ', route)
    switch (route) {
      case '/':
        loaders.upcomingLoader.loadUpcoming()
        break
      case '/following':
        loaders.userLoader.loadWhatToWatch()
        break
      default:
        break
    }
  }
}
