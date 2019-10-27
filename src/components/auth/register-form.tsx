import { captureException } from '@sentry/browser'
import React, { useState } from 'react'
import { useNavigation } from 'the-react-router'
import { useCreateUserMutation } from '../../dragonstone'
import { Routes } from '../../routes'
import { FormButton } from '../../styles/form-button'
import { melrose } from '../../utils/colors'
import { FloatingLabel } from '../floating-label'
import { FormStatusMessage } from '../form-status-message'
import { AuthFormWrapper, floatingLabelStyles, Space } from './auth-styles'
import { translateFirebaseError } from './auth.util'

export const RegisterForm = ({
  register
}: {
  register: (email: string, password: string) => Promise<firebase.auth.UserCredential>
}) => {
  const { navigate } = useNavigation()
  const [createUser] = useCreateUserMutation()
  const [errorMsg, setErrorMsg] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onRegister = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setLoading(true)
    register(email, password)
      .then(() =>
        createUser({ variables: { username: displayName || slugify(email.split('@')[0]) } })
      )
      .then(() => navigate(Routes.upcoming))
      .catch(error => {
        captureException(error)
        setLoading(false)
        setErrorMsg(translateFirebaseError(error))
      })
  }

  return (
    <AuthFormWrapper>
      <FormStatusMessage message={errorMsg} />
      <FloatingLabel
        autoComplete="text"
        styles={floatingLabelStyles}
        placeholder="Display name 😃"
        type="text"
        value={displayName}
        onChange={displayName => setDisplayName(slugify(displayName.target.value))}
        required
      />
      <Space />
      <FloatingLabel
        autoComplete="email"
        styles={floatingLabelStyles}
        placeholder="Email ✉️"
        type="email"
        value={email}
        onChange={email => setEmail(email.target.value)}
        required
      />
      <Space />
      <FloatingLabel
        autoComplete="password"
        styles={floatingLabelStyles}
        placeholder="Password 🙈"
        type="password"
        value={password}
        onChange={password => setPassword(password.target.value)}
        required
      />
      <Space />
      <FormButton color={melrose} disabled={loading} onClick={onRegister}>
        Register ➡️
      </FormButton>
    </AuthFormWrapper>
  )
}

function slugify(str: string): string {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;'
  const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return str
    .toString()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
