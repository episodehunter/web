import * as React from 'react'
import { Redirect } from 'react-router'
import { inject } from 'mobx-react'
import { UserStore } from '../store/user'
import { getTokenFromHash, getExpiresFromHash } from '../utils/http.utils'

type Props = {
  location: Location
  user: UserStore
}

export const LoginCompletePageComponent = ({ location, user }: Props) => {
  const token = getTokenFromHash(location.hash)
  const expires = getExpiresFromHash(location.hash)

  user.setAuthentication(token, expires)

  return <Redirect to="/" />
}

export const LoginCompletePage = inject('user')(LoginCompletePageComponent)
