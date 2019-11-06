import { styled as miStyled, TextField } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import React, { useState, useEffect } from 'react'
import { Button } from '../components/atoms/button'
import { Body1 } from '../components/atoms/Typography'
import { translateFirebaseError } from '../components/auth/auth.util'
import { FormStatusMessage } from '../components/form-status-message'
import { useUser } from '../contexts/user-context'
import logoPath from '../logo96.png'
import { useNavigation } from 'the-react-router'
import { Spinner } from '../components/spinner'
import { captureException } from '@sentry/core'
import { Routes } from '../routes'

enum ResetState {
  validatingCode,
  codeIsInvalid,
  watingForUser,
  updatingPassword,
  updatedPassword
}

export function AuthAction() {
  const [oobCode, setOobCode] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [resetState, setResetState] = useState<ResetState>(ResetState.validatingCode)
  const [newPassword, setNewPassword] = useState()
  const { auth } = useUser()
  const { navigate } = useNavigation()

  useEffect(() => {
    if (!oobCode) {
      return
    }
    setResetState(ResetState.validatingCode)
    auth
      .verifyPasswordResetCode(oobCode)
      .then(() => {
        setErrorMsg('')
        setResetState(ResetState.watingForUser)
      })
      .catch(error => {
        setErrorMsg(translateFirebaseError(error))
        setResetState(ResetState.codeIsInvalid)
        captureException(new Error('The code is not valid: ' + JSON.stringify(error)))
      })
  }, [oobCode])

  useEffect(() => {
    const currentUrl = new URL(document.location.href)
    const searchParams = currentUrl.searchParams
    setOobCode(searchParams.get('oobCode') || '')
  }, [document.location.href])

  const onSubmit = (event: React.MouseEvent | React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setResetState(ResetState.updatingPassword)
    auth
      .resetPassword(oobCode, newPassword)
      .then(() => {
        setErrorMsg('')
        setResetState(ResetState.updatedPassword)
      })
      .catch(error => {
        setErrorMsg(translateFirebaseError(error))
        setResetState(ResetState.watingForUser)
      })
  }

  let content: null | React.ReactNode = null

  if (resetState === ResetState.validatingCode) {
    content = <Spinner />
  } else if (resetState === ResetState.codeIsInvalid) {
    content = (
      <>
        <FormStatusMessage message={errorMsg} />
        <ActionButton type="cta" onClick={() => navigate(Routes.forgotPassword)}>
          Reset your password
        </ActionButton>
      </>
    )
  } else if (resetState === ResetState.updatedPassword) {
    content = (
      <>
        <Body1 style={{ textAlign: 'center' }}>The password has been updated 🎉</Body1>
        <ActionButton type="cta" onClick={() => navigate('/login')}>
          Log in
        </ActionButton>
      </>
    )
  } else if (
    resetState === ResetState.watingForUser ||
    resetState === ResetState.updatingPassword
  ) {
    content = (
      <form onSubmit={onSubmit}>
        <FormStatusMessage message={errorMsg} />
        <Body1>Enter your new password that you want to change to</Body1>
        <TextField
          onChange={e => setNewPassword(e.target.value)}
          fullWidth
          type="password"
          label="New Password"
          margin="normal"
          variant="outlined"
          autoFocus={true}
        />
        <ActionButton progress={resetState === ResetState.updatingPassword} onClick={onSubmit}>
          Update your password
        </ActionButton>
      </form>
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <Logo src={logoPath} />
      <FormWrapper>{content}</FormWrapper>
    </Container>
  )
}

const ActionButton = miStyled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100% !important'
}))

const Logo = miStyled('img')(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block'
}))

const FormWrapper = miStyled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  width: '100%'
}))
