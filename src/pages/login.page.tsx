import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigation } from 'the-react-router'
import { LoginForm } from '../components/auth/login-form'
import { RegisterForm } from '../components/auth/register-form'
import { SendResetPasswordEmail } from '../components/auth/send-reset-password-email'
import { FlotingLoginButtons } from '../components/main/floting-login-buttons'
import { MainAbout } from '../components/main/main-about'
import { AuthFormState } from '../enum'
import { useAuth } from '../global-context'
import { images } from '../images.config'
import { Routes } from '../routes'
import { shark } from '../utils/colors'

export function LoginPage() {
  const [authFormState, setAuthFormState] = useState(AuthFormState.login)
  const auth = useAuth()
  const { navigate } = useNavigation()
  useEffect(() => {
    if (auth.isSigndInUser()) {
      navigate(Routes.upcoming)
    }
  }, [])

  return (
    <div>
      <Wrapper>
        <FlotingLoginButtons changeFormState={state => setAuthFormState(state)} />
        <TopImage>
          <MainAbout />
        </TopImage>
      </Wrapper>
      <BottomSection>
        <FormWrapper>
          <AuthForm authFormState={authFormState} />
        </FormWrapper>
      </BottomSection>
    </div>
  )
}

function AuthForm({ authFormState }: { authFormState: AuthFormState }) {
  const auth = useAuth()
  switch (authFormState) {
    case AuthFormState.login:
      return <LoginForm login={(e, p) => auth.login(e, p)} />
    case AuthFormState.register:
      return <RegisterForm register={(e, p) => auth.register(e, p)} />
    case AuthFormState.forgotPassword:
      return <SendResetPasswordEmail sendResetEmail={e => auth.sendPasswordResetEmail(e)} />
    default:
      return null
  }
}

const CoverImage = styled.div`
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const TopImage = styled(CoverImage)`
  background-image: url(${images.fanart.big(270915)});
  display: flex;
`

const FormWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 80%;
`

const BottomSection = styled.div`
  height: 100vh;
  background-color: ${shark};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Wrapper = styled.div`
  height: 100vh;
`
