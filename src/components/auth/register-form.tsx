import { useNavigation } from '@vieriksson/the-react-router'
import React, { useState } from 'react'
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
  register: (email: string, password: string) => Promise<any>
}) => {
  const [navigate] = useNavigation()
  const [errorMsg, setErrorMsg] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onRegister = () => {
    setLoading(true)
    register(email, password)
      .then(() => {
        navigate(Routes.upcoming)
      })
      .catch(error => {
        setLoading(false)
        setErrorMsg(translateFirebaseError(error))
      })
  }

  return (
    <AuthFormWrapper>
      <FormStatusMessage message={errorMsg} />
      <FloatingLabel
        autoComplete="email"
        styles={floatingLabelStyles}
        placeholder="email"
        type="email"
        value={email}
        onChange={email => setEmail(email.target.value)}
        required
      />
      <Space />
      <FloatingLabel
        autoComplete="password"
        styles={floatingLabelStyles}
        placeholder="password"
        type="password"
        value={password}
        onChange={password => setPassword(password.target.value)}
        required
      />
      <Space />
      <FormButton color={melrose} disabled={loading} onClick={onRegister}>
        Register
      </FormButton>
    </AuthFormWrapper>
  )
}
