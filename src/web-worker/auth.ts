import { expose } from 'comlink'
import firebaseApp from 'firebase/app'
import 'firebase/auth'
import { config } from '../config'

firebaseApp.initializeApp(config.firebaseAuth)

const postMessage = (data: any) => {
  ;(self.postMessage as any)(data)
}

export class Auth {
  private auth = firebaseApp.auth()

  constructor() {
    this.auth.onAuthStateChanged(
      data => {
        postMessage({
          type: 'AuthStateChanged',
          data: Boolean(data),
        })
      },
      error => {
        postMessage({
          type: 'AuthStateChanged',
          error,
        })
      }
    )
  }

  private getUser() {
    return this.auth.currentUser
  }

  async signOut(): Promise<void> {
    await this.auth.signOut()
  }

  async login(email: string, password: string): Promise<void> {
    await this.auth.signInWithEmailAndPassword(email, password)
  }

  async register(email: string, password: string): Promise<void> {
    await this.auth.createUserWithEmailAndPassword(email, password)
  }

  async reauthenticate(password: string): Promise<void> {
    const user = this.getUser()
    if (!user) {
      throw new Error('User unknown')
    } else if (!user.email) {
      throw new Error('User email unknown')
    }
    await user.reauthenticateAndRetrieveDataWithCredential(
      firebaseApp.auth.EmailAuthProvider.credential(user.email, password)
    )
  }

  async changePassword(password: string): Promise<void> {
    const user = this.getUser()
    if (!user) {
      throw new Error('User unknown')
    }
    await user.updatePassword(password)
  }

  isSigndInUser(): boolean {
    return Boolean(this.getUser())
  }

  getIdToken(): Promise<string> {
    const user = this.getUser()
    if (user) {
      return user.getIdToken(/* forceRefresh */ false)
    }
    return Promise.reject(new Error('User not signed in'))
  }

  sendPasswordResetEmail(email: string) {
    return this.auth.sendPasswordResetEmail(email)
  }

  async resetPassword(code: string, password: string): Promise<void> {
    await this.auth.confirmPasswordReset(code, password)
  }

  async verifyPasswordResetCode(code: string): Promise<void> {
    await this.auth.verifyPasswordResetCode(code)
  }
}

expose(new Auth())
