import { styled as miStyled, TextField } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import React, { useState } from 'react'
import { Button } from '../components/atoms/button'
import { Body1 } from '../components/atoms/typography'
import { translateFirebaseError } from '../components/auth/auth.util'
import { FormStatusMessage } from '../components/form-status-message'
import { useUser } from '../contexts/user-context'
import logoPath from '../logo96.png'
import { useNavigation } from 'the-react-router'

export function ForgotPassword() {
  const [errorMsg, setErrorMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { auth } = useUser()
  const { navigate } = useNavigation()

  const onSubmit = (event: React.MouseEvent | React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setLoading(true)
    auth
      .sendPasswordResetEmail(email)
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

  return (
    <Container component="main" maxWidth="xs" style={{ marginBottom: '100px' }}>
      <Logo src={logoPath} />
      <FormWrapper>
        {success ? (
          <>
            <Body1>Check your email for a link to reset your password</Body1>
            <ActionButton type="tertiary" onClick={() => navigate('/')}>
              Go Back
            </ActionButton>
          </>
        ) : (
          <form onSubmit={onSubmit}>
            <FormStatusMessage message={errorMsg} />
            <Body1>
              Enter your email address and we will send you an email with a link to reset your
              email.{' '}
            </Body1>
            <TextField
              onChange={e => setEmail(e.target.value)}
              fullWidth
              type="email"
              label="Email"
              margin="normal"
              variant="outlined"
              autoFocus={true}
            />
            <ActionButton progress={loading} onClick={onSubmit}>
              Reset password
            </ActionButton>
          </form>
        )}
      </FormWrapper>
    </Container>
  )
}

const ActionButton = miStyled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100% !important',
}))

const Logo = miStyled('img')(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
}))

const FormWrapper = miStyled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  width: '100%',
}))
