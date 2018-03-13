import Auth0Lock from 'auth0-lock'
import { gossamer } from './utils/colors'
import { Auth0Error, Auth0UserProfile } from 'auth0-js'
import { history } from './history'

const AUTH_CONFIG = {
  clientId: 'VsaZiNxg8B4eK2mxmcjOI4y1v0A9ZGPL',
  domain: 'episodehunter.auth0.com',
  audience: 'https://api.episodehunter.tv',
  callbackUrl: 'http://localhost:1337/login_complete'
}

const AUTH_OPTIONS = {
  autoclose: true,
  auth: {
    redirectUrl: AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    audience: AUTH_CONFIG.audience,
    params: {
      scope: 'openid'
    }
  },
  theme: {
    logo: 'https://episodehunter.tv/img/logga.png',
    primaryColor: gossamer,
    socialButtonStyle: 'small'
  },
  languageDictionary: {
    title: 'Episodehunter'
  }
}

export class Auth {
  lock: Auth0LockStatic = new Auth0Lock(
    AUTH_CONFIG.clientId,
    AUTH_CONFIG.domain,
    AUTH_OPTIONS
  )

  constructor() {
    // this.lock.on('authenticated', this.setSession)
    // this.lock.on('authorization_error', (err: Auth0Error) => {
    //   console.log(err)
    // })
  }

  isAuthenticated() {
    let expiresAt = localStorage.getItem('expires_at')
    return expiresAt && new Date().getTime() < Number(expiresAt)
  }

  getToken() {
    return localStorage.getItem('access_token')
  }

  login = () => {
    this.lock.show({
      allowSignUp: false
    })
  }

  register = () => {
    this.lock.show({
      allowLogin: false
    })
  }

  logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
  }

  setSession = (authResult: AuthResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      let expiresAt = JSON.stringify(
        authResult.idTokenPayload.exp * 1000 + new Date().getTime()
      )
      localStorage.setItem('access_token', authResult.accessToken)
      localStorage.setItem('id_token', authResult.idToken)
      localStorage.setItem('expires_at', expiresAt)

      this.setUser(authResult.accessToken)

      history.replace('/')
    }
  }

  setUser = (token: string) => {
    this.lock.getUserInfo(
      token,
      (err: Auth0Error, profile: Auth0UserProfile) => {
        if (err) {
          console.log(err)
          return
        }
        localStorage.setItem('user_profile', JSON.stringify(profile))
      }
    )
  }
}

export const auth = new Auth()
