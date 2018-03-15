import * as React from 'react'
import { history } from '../history'
import { inject, observer } from 'mobx-react'
import { User } from '../store/user'

type ComponentType<P> = ((props: P) => JSX.Element) | React.ComponentClass<P>
type ExtendedProps<P> = P & { user: User }

export const requireLogin = <P>(Component: ComponentType<P>) => {
  return inject('user')(
    observer((props: ExtendedProps<P>) => {
      if (!props.user.isAuthenticated) {
        history.push('/login')
        history.go(0)
        return null
      }

      return React.createElement(Component, props)
    })
  )
}
