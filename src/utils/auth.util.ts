import { wrap } from 'comlink'
import { ApolloClient } from 'apollo-boost'

type AuthLink = InstanceType<typeof import('../web-worker/auth').Auth>

export const createAuth = (authWorker: Worker, getClient: () => ApolloClient<unknown>) => {
  const authLink = wrap<AuthLink>(authWorker)

  const auth = {
    async signOut() {
      await authLink.signOut()
      getClient().resetStore()
      window.location.reload()
    },

    login: authLink.login,
    register: authLink.register,
    reauthenticate: authLink.reauthenticate,
    changePassword: authLink.changePassword,
    isSigndInUser: authLink.isSigndInUser,
    getIdToken: authLink.getIdToken,
    sendPasswordResetEmail: authLink.sendPasswordResetEmail,
    resetPassword: authLink.resetPassword,
    verifyPasswordResetCode: authLink.verifyPasswordResetCode,

    authStateChange$(
      next: (authenticated: boolean | null) => void,
      error: (error: firebase.auth.Error) => void
    ) {
      const eventHandler = e => {
        if (e.data?.type === 'AuthStateChanged') {
          if (typeof e.data.data === 'boolean') {
            next(e.data.data)
          } else if (e.data.error) {
            error(e.data.error)
          }
        }
      }
      authWorker.addEventListener('message', eventHandler)
      return () => authWorker.removeEventListener('message', eventHandler)
    }
  }
  return auth
}

export type Auth = ReturnType<typeof createAuth>
