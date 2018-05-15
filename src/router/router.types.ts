export type RouterState = {
  url: string
}

export type Navigate = (url: string) => void

export type RouterParams = {
  state: RouterState
  navigate: Navigate
  params?: any
}

export type Route = {
  path: string
  component: ComponentType<RouterParams>
  exact?: boolean
}

export type RouteSettings = {
  fallback: ComponentType<{}>
  routes: Route[]
}

export type MatchedRoute = {
  component: ComponentType<any>
  match: any
  keys?: any
  params?: any
}

export type ComponentType<P> =
  | React.ComponentClass<P>
  | ((props: P) => JSX.Element)
