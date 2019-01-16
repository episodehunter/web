import { Navigate, withNavigation } from '@vieriksson/the-react-router'
import React from 'react'
import { connect } from 'unistore/react'
import { Routes } from '../routes'
import { UserStore } from '../store2/user'

type ComponentType<P> = ((props: P) => JSX.Element) | React.ComponentClass<P>
type ExtendedProps<P> = P & { user: UserStore; navigate: Navigate }

export const requireLogin = <P>(Component: ComponentType<P>) => {
  return withNavigation(
    connect<any, any, any, any>('user')((props: ExtendedProps<P>) => {
      if (!props.user.currentUser) {
        props.navigate(Routes.login)
        return null
      }
      return React.createElement(Component, props as any)
    })
  )
}
