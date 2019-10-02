import React, { useState, useEffect } from 'react'
import { FormButton } from '../../styles/form-button'
import { mountainMeadow } from '../../utils/colors'
import { FloatingLabel } from '../floating-label'
import { FormStatusMessage } from '../form-status-message'
import { H1, P } from '../text'
import { AuthFormWrapper, floatingLabelStyles, Space } from './auth-styles'
import { translateFirebaseError } from './auth.util'
import { useAuth } from '../../contexts/global-context'
import { Spinner } from '../spinner'

type Props = {
  code: string
  resetPassword: (newPassword: string) => Promise<any>
}

enum ResetState {
  validatingCode,
  codeIsInvalid,
  watingForUser,
  updatingPassword,
  updatedPassword
}

export const ResetPassword = ({ resetPassword, code }: Props) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [resetState, setResetState] = useState(ResetState.validatingCode)
  const [newPassword, setNewPassword] = useState()
  const auth = useAuth()

  useEffect(() => {
    setResetState(ResetState.validatingCode)
    auth
      .verifyPasswordResetCode(code)
      .then(() => {
        setErrorMsg('')
        setResetState(ResetState.watingForUser)
      })
      .catch(error => {
        setErrorMsg(translateFirebaseError(error))
        setResetState(ResetState.codeIsInvalid)
      })
  }, [code])

  const onSubmit = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setResetState(ResetState.updatedPassword)
    resetPassword(newPassword)
      .then(() => {
        setErrorMsg('')
        setResetState(ResetState.updatedPassword)
      })
      .catch(error => {
        setErrorMsg(translateFirebaseError(error))
        setResetState(ResetState.watingForUser)
      })
  }

  if (resetState === ResetState.updatedPassword) {
    return (
      <div>
        <H1>The password has now changed 🎉</H1>
        <P>
          You can now <a href="/">login</a>
        </P>
      </div>
    )
  } else if (resetState === ResetState.codeIsInvalid) {
    return (
      <AuthFormWrapper>
        <FormStatusMessage message={errorMsg} />
      </AuthFormWrapper>
    )
  } else if (resetState === ResetState.validatingCode) {
    return <Spinner />
  }

  return (
    <>
      <AuthFormWrapper onSubmit={onSubmit as any}>
        <FormStatusMessage message={errorMsg} />
        <FloatingLabel
          styles={floatingLabelStyles}
          placeholder="password"
          type="password"
          value={newPassword}
          onChange={event => setNewPassword(event.target.value)}
          required
        />
        <Space />
        <FormButton
          color={mountainMeadow}
          disabled={resetState !== ResetState.watingForUser}
          onClick={onSubmit}
        >
          Change password
        </FormButton>
      </AuthFormWrapper>
    </>
  )
}
