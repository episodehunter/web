type FirebaseError = {
  code: string
  message: string
}

export const translateFirebaseError = (error: FirebaseError) => {
  switch (error.code) {
    case 'auth/wrong-password':
      return 'Wrong password'
    case 'auth/user-not-found':
      return 'No user found with username'
    case 'auth/invalid-credential':
      return 'Invalid credentials'
    default:
      return error.message
  }
}
