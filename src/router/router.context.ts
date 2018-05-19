import * as React from 'react'
import { RouterParams } from './router.types'

export const routerInitialState = {
  url: window.location.pathname,
  hash: window.location.hash
}

const Context = React.createContext<RouterParams>({
  state: routerInitialState
} as any)

const { Provider, Consumer } = Context

export { Provider as RouterProvider, Consumer as RouterConsumer }
