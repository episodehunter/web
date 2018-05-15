import * as React from 'react'
import { inject } from 'mobx-react'
import { UserStore } from '../store/user'
import { getTokenFromHash, getExpiresFromHash } from '../utils/http.utils'
import { withNavigation } from '../router/withNavigation'
import { Navigate } from '../router/router.types'

type Props = {
  location: Location
  user: UserStore
  navigate: Navigate
}

export const LoginCompletePageComponent = ({
  location,
  user,
  navigate
}: Props) => {
  const token = getTokenFromHash(location.hash)
  const expires = getExpiresFromHash(location.hash)

  user.setAuthentication(token, expires)

  navigate('/')
  return null
}

export const LoginCompletePage = withNavigation(inject('user')(
  LoginCompletePageComponent
) as any)
