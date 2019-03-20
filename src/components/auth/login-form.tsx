import { useNavigation } from '@vieriksson/the-react-router'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Routes } from '../../routes'
import { FormButton } from '../../styles/form-button'
import { mountainMeadow, shark } from '../../utils/colors'
import { FloatingLabel } from '../floating-label'
import { FormStatusMessage } from '../form-status-message'
import { AuthFormWrapper, floatingLabelStyles, Space } from './auth-styles'
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
  const [navigate] = useNavigation()

  const onLogin = () => {
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
      <AuthFormWrapper onSubmit={onLogin}>
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
        <FloatingLabel
          styles={floatingLabelStyles}
          placeholder="password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
        />
        <Space />
        <FormButton color={mountainMeadow} disabled={loading} onClick={onLogin}>
          Let me in
        </FormButton>
      </AuthFormWrapper>
    </>
  )
}

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
