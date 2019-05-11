import React, { useState } from 'react'
import { FormButton } from '../../styles/form-button'
import { mountainMeadow } from '../../utils/colors'
import { FloatingLabel } from '../floating-label'
import { FormStatusMessage } from '../form-status-message'
import { H1 } from '../text'
import { AuthFormWrapper, floatingLabelStyles, Space } from './auth-styles'
import { translateFirebaseError } from './auth.util'

type Props = {
  sendResetEmail: (email: string) => Promise<any>
}

export const SendResetPasswordEmail = ({ sendResetEmail }: Props) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setLoading(true)
    sendResetEmail(email)
      .then(() => {
        setErrorMsg('')
        setLoading(false)
        setSuccess(true)
      })
      .catch(error => {
        setErrorMsg(translateFirebaseError(error))
        setLoading(false)
        setSuccess(false)
      })
  }

  if (success) {
    return <H1>Check your email for a link to reset your password</H1>
  }

  return (
    <>
      <AuthFormWrapper onSubmit={onSubmit as any}>
        <FormStatusMessage message={errorMsg} />
        <FloatingLabel
          styles={floatingLabelStyles}
          placeholder="email"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
        />
        <Space />
        <FormButton color={mountainMeadow} disabled={loading} onClick={onSubmit}>
          Reset my password
        </FormButton>
      </AuthFormWrapper>
    </>
  )
}
