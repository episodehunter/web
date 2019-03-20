import { Navigate, withNavigation } from '@vieriksson/the-react-router'
import React from 'react'
import { useUser } from '../global-context'
import { Routes } from '../routes'

type ComponentType<P> = (props: P) => JSX.Element
type ExtendedProps<P> = P & { navigate: Navigate }

export const requireLogin = <P>(Component: ComponentType<P>) => {
  return withNavigation(((props: ExtendedProps<P>) => {
    const user = useUser()
    if (!user.getUser()) {
      props.navigate(Routes.login)
      return null
    }
    return React.createElement(Component, props as any)
  }) as any)
}
