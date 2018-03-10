import * as React from 'react'
import { auth } from '../auth'
import { history } from '../history'

type ComponentType<P> = ((props: P) => JSX.Element) | React.ComponentClass<P>

export const requireLogin = <P>(Component: ComponentType<P>) => {
  return (props: P) => {
    if (!auth.isAuthenticated()) {
      history.replace('/login')
      return null
    }

    return React.createElement(Component, props)
  }
}
