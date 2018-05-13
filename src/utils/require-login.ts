import { History } from 'history'
import { inject } from 'mobx-react'
import * as React from 'react'
import { UserStore } from '../store/user'

type ComponentType<P> = ((props: P) => JSX.Element) | React.ComponentClass<P>
type ExtendedProps<P> = P & { user: UserStore; history: History }

export const requireLogin = <P>(Component: ComponentType<P>) => {
  class RequireLogin extends React.Component<ExtendedProps<P>> {
    componentDidMount() {
      if (!this.props.user.isAuthenticated) {
        this.props.history.push('/login')
        this.props.history.go(0)
      }
    }

    shouldComponentUpdate() {
      return false
    }

    render() {
      if (!this.props.user.isAuthenticated) {
        return null
      }

      return React.createElement(Component, this.props as any)
    }
  }
  return inject('user', 'history')(RequireLogin)
}
