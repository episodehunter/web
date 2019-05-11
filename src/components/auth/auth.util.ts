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
    case 'auth/expired-action-code':
      return 'The link has expired. Please try to reset you password again'
    case 'auth/invalid-action-code':
      return 'The link is invalid. Try to copy and visit the link from the mail'
    case 'auth/user-disabled':
      return 'The user account is disabled.'
    default:
      return error.message
  }
}
