import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Navigate } from '../router/router.types'
import { withNavigation } from '../router/withNavigation'
import { Routes } from '../routes'
import { UserStore } from '../store/user'

type ComponentType<P> = ((props: P) => JSX.Element) | React.ComponentClass<P>
type ExtendedProps<P> = P & { user: UserStore; navigate: Navigate }

export const requireLogin = <P>(Component: ComponentType<P>) => {
  return withNavigation(
    inject('user')(
      observer(
        class extends React.Component<ExtendedProps<P>> {
          componentDidMount() {
            const { user, navigate } = this.props
            if (!user.isAuthenticated) {
              navigate(Routes.login)
            }
          }

          render() {
            const { user, navigate, ...props } = this.props as any
            return React.createElement(Component, props)
          }
        }
      )
    )
  )
}
