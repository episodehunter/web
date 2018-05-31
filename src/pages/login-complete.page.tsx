import { inject } from 'mobx-react'
import { Routes } from '../routes'
import { UserStore } from '../store/user'
import { getExpiresFromHash, getTokenFromHash } from '../utils/http.utils'
import { RouterState, Navigate } from '@vieriksson/the-react-router/dist/types'
import { withNavigation } from '@vieriksson/the-react-router'

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

  return null
}

export const LoginCompletePage = withNavigation(
  inject('user')(LoginCompletePageComponent)
)
