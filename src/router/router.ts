import * as React from 'react'
import { RouterProvider, routerInitialState } from './router.context'
import { matchRoutes } from './router.utils'
import { MatchedRoute, RouteSettings, RouterParams } from './router.types'
import { RouterEvents } from './router.events'

export const routerEvents = new RouterEvents()

export const createRouter = (settings: RouteSettings) => {
  return class extends React.Component {
    state = routerInitialState

    componentDidMount() {
      window.addEventListener('popstate', () =>
        this.updateState(state => ({
          ...state,
          url: window.location.pathname,
          hash: window.location.hash
        }))
      )
    }

    navigate = (url: string) =>
      this.updateState(
        state => ({ ...state, url }),
        () => window.history.pushState(null, '', url)
      )

    updateState = (updateFn, callback?) => {
      this.setState(updateFn, () => {
        callback && callback()
        routerEvents.dispatch('navigation', {
          state: this.state
        })
      })
    }

    render() {
      const { fallback, routes } = settings
      const { url } = this.state

      const matchedRoutes = matchRoutes(routes, url)
      const HAS_MATCHES = matchedRoutes.length > 0

      const childrenToRender = HAS_MATCHES
        ? createElements(matchedRoutes, {
            state: this.state,
            navigate: this.navigate
          })
        : React.createElement(fallback)

      return React.createElement(
        RouterProvider,
        {
          value: {
            state: this.state,
            navigate: this.navigate
          }
        },
        childrenToRender
      )
    }
  }
}

function createElements(matchedRoutes: MatchedRoute[], props: RouterParams) {
  return matchedRoutes.map((route, idx) =>
    React.createElement(route.component, {
      key: idx,
      params: route.params,
      ...props
    })
  )
}
