import { inject } from 'mobx-react'
import { Navigate, RouterState } from '../router/router.types'
import { withNavigation } from '../router/withNavigation'
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

  return null
}

export const LoginCompletePage = withNavigation(
  inject('user')(LoginCompletePageComponent)
)
