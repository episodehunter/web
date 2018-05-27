import pathToRegexp from 'path-to-regexp'
import { MatchedRoute, Route } from './router.types'

export function decodePath(path, exact = false, url) {
  const keys = []
  const re = pathToRegexp(path, keys, { end: exact })
  const match = re.exec(url)
  return { match, keys }
}

export function getParams(keys, values) {
  return keys.reduce((res, key, index) => {
    res[key.name] = values[index]
    return res
  }, {})
}

export function matchRoutes(routes: Route[], url: string): MatchedRoute[] {
  const decode = createDecodeRoute(url)
  return routes
    .map<MatchedRoute>(decode)
    .filter(onlyMatched)
    .map<MatchedRoute>(addParams)
}

function createDecodeRoute(url: string) {
  return (route: Route) => {
    const { component, path, exact } = route
    const { match, keys } = decodePath(path, exact, url)
    return {
      component,
      match,
      keys
    }
  }
}

function onlyMatched(route: MatchedRoute) {
  return route.match
}

function addParams(route: MatchedRoute) {
  const { component, match, keys } = route
  const values = match.slice(1)
  const params = getParams(keys, values)

  return {
    component,
    match,
    params
  }
}
