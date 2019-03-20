type FirebaseError = {
  code: string
  message: string
}

export const translateFirebaseError = (error: FirebaseError) => {
  switch (error.code) {
    case 'auth/wrong-password':
      return 'Wrong password'
    case 'auth/user-not-found':
      return 'Could not find user. Do you have an account?'
    case 'auth/invalid-credential':
      return 'Invalid credentials'
    default:
      return error.message
  }
}
