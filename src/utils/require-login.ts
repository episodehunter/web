import { Navigate, withNavigation } from '@vieriksson/the-react-router'
import React from 'react'
import { Routes } from '../routes'
import { userUser } from '../store/user.store'

type ComponentType<P> = ((props: P) => JSX.Element) | React.ComponentClass<P>
type ExtendedProps<P> = P & { navigate: Navigate }

export const requireLogin = <P>(Component: ComponentType<P>) => {
  return withNavigation(((props: ExtendedProps<P>) => {
    const [user] = userUser()
    if (!user.currentUser) {
      props.navigate(Routes.login)
      return null
    }
    return React.createElement(Component, props as any)
  }) as any)
}
