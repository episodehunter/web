import { styled as miStyled, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigation } from 'the-react-router'
import { Routes } from '../../routes'
import { shark } from '../../utils/colors'
import { Button } from '../atoms/button'
import { FormStatusMessage } from '../form-status-message'
import { translateFirebaseError } from './auth.util'

type Props = {
  login: (email: string, password: string) => Promise<any>
}

export const LoginForm = ({ login }: Props) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showLoginAnimation, setShowLoginAnimation] = useState(false)
  const { navigate } = useNavigation()

  const onLogin = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setLoading(true)
    login(email, password)
      .then(() => {
        setShowLoginAnimation(true)
        setTimeout(navigate, 2000, Routes.upcoming)
      })
      .catch(error => {
        setLoading(false)
        setErrorMsg(translateFirebaseError(error))
      })
  }

  return (
    <>
      {showLoginAnimation && <LoginAnimation />}
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
        <ActionButton progress={loading} onClick={onLogin}>
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

const ActionButton = miStyled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100% !important'
}))

const LoginAnimation = styled.div`
  background: ${shark};
  position: fixed;
  width: ${window.innerWidth}px;
  height: ${window.innerWidth}px;
  margin: auto;
  border-radius: 100%;
  overflow: hidden;
  animation: grow 5s;
  animation-fill-mode: forwards;
  top: 0;
  left: 0;
  z-index: 2;
  @keyframes grow {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(3);
    }
  }
`
