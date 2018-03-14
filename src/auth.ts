import Auth0Lock from 'auth0-lock'
import { gossamer } from './utils/colors'

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
      scope: 'openid profile'
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

  getToken() {
    return localStorage.getItem('token')
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
}

export const auth = new Auth()
