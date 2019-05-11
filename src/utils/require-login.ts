import React, { memo } from 'react'
import { Navigate, useNavigation } from 'the-react-router'
import { useUser } from '../global-context'
import { Routes } from '../routes'

type ComponentType<P> = (props: P) => JSX.Element
type ExtendedProps<P> = P & { navigate: Navigate }

export const requireLogin = <P>(Component: ComponentType<P>) => {
  return memo((props: ExtendedProps<P>) => {
    const { navigate } = useNavigation()
    const user = useUser()
    if (!user.getUser()) {
      navigate(Routes.login)
      return null
    }
    return React.createElement(Component, props as any)
  })
}
