import { Loaders } from './loaders'

export function createRouteResolver(loaders: Loaders) {
  return (route: string) => {
    switch (route) {
      case '/':
        loaders.upcomingLoader.loadUpcoming()
        break
      default:
        break
    }
  }
}
