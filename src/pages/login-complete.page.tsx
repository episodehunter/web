import {
  Navigate,
  RouterState,
  withNavigation
} from '@vieriksson/the-react-router'
import { inject } from 'mobx-react'
import React from 'react'
import { Routes } from '../routes'
import { UserStore } from '../store/user'
import { getExpiresFromHash, getTokenFromHash } from '../utils/http.utils'

type Props = {
  state: RouterState
  user: UserStore
  navigate: Navigate
}

export const LoginCompletePageComponent = ({
  state,
  user,
  navigate
}: Props) => {
  const { hash } = state

  if (!hash) {
    navigate(Routes.login)
  } else {
    const token = getTokenFromHash(hash)
    const expires = getExpiresFromHash(hash)
    user.setAuthentication(token, expires)

    navigate(Routes.upcoming)
  }

  return <div />
}

export const LoginCompletePage = withNavigation(
  inject('user')(LoginCompletePageComponent)
)
