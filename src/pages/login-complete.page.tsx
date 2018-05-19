import { inject } from 'mobx-react'
import { UserStore } from '../store/user'
import { getTokenFromHash, getExpiresFromHash } from '../utils/http.utils'
import { withNavigation } from '../router/withNavigation'
import { Navigate, RouterState } from '../router/router.types'

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
    navigate('/login')
  } else {
    const token = getTokenFromHash(hash)
    const expires = getExpiresFromHash(hash)
    user.setAuthentication(token, expires)

    navigate('/')
  }

  return null
}

export const LoginCompletePage = withNavigation(
  inject('user')(LoginCompletePageComponent)
)
