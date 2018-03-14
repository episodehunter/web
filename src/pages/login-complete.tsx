import * as React from 'react'
import { Redirect } from 'react-router'
import { inject } from 'mobx-react'
import { User } from '../store/user'

type Props = {
  location: Location
  user: User
}

const getTokenFromHash = (hash: string) =>
  (hash.match(/#access_token=(.*?)&/) || [])[1]

const getExpiresFromHash = (hash: string) =>
  (
    Number((hash.match(/&expires_in=(.*?)&/) || [])[1]) * 1000 +
    new Date().getTime()
  ).toString()

export const LoginCompletePageComponent = ({ location, user }: Props) => {
  const token = getTokenFromHash(location.hash)
  const expires = getExpiresFromHash(location.hash)

  localStorage.setItem('token', token)
  localStorage.setItem('expires', expires)

  user.setAuthentication(token, expires)

  return <Redirect to="/" />
}

export const LoginCompletePage = inject('user')(LoginCompletePageComponent)
