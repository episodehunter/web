import * as React from 'react'
import { RouterParams } from './router.types'

export const routerInitialState = {
  url: window.location.pathname
}

const Context = React.createContext<RouterParams>({
  state: {
    url: window.location.pathname
  }
} as any)

const { Provider, Consumer } = Context

export { Provider as RouterProvider, Consumer as RouterConsumer }
