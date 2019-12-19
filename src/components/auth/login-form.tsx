import { styled, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useNavigation } from 'the-react-router'
import { Routes } from '../../routes'
import { Button } from '../atoms/button'
import { FormStatusMessage } from '../form-status-message'
import { translateFirebaseError } from './auth.util'

type Props = {
  login: (email: string, password: string) => Promise<any>
  hideForm: () => void
}

export const LoginForm = ({ login, hideForm }: Props) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { navigate } = useNavigation()

  const onLogin = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setLoading(true)
    login(email, password)
      .then(() => {
        hideForm()
        setTimeout(navigate, 500, Routes.upcoming)
      })
      .catch(error => {
        setLoading(false)
        setErrorMsg(translateFirebaseError(error))
      })
  }

  return (
    <>
      <form onSubmit={onLogin as any}>
        <FormStatusMessage message={errorMsg} />
        <TextField
          onChange={e => setEmail(e.target.value)}
          fullWidth
          type="email"
          label="Email"
          margin="normal"
          variant="outlined"
          autoFocus={true}
        />
        <TextField
          onChange={e => setPassword(e.target.value)}
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          variant="outlined"
        />
        <ActionButton progress={loading} onClick={onLogin} actionType="submit">
          Let me in
        </ActionButton>
        <ActionButton
          disabled={loading}
          type="tertiary"
          onClick={() => navigate(Routes.forgotPassword)}
        >
          Forgot your password?
        </ActionButton>
      </form>
    </>
  )
}

const ActionButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100% !important'
}))
