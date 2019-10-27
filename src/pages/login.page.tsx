import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigation } from 'the-react-router'
import { FlotingLoginButtons } from '../components/auth/floting-login-buttons'
import { LoginForm } from '../components/auth/login-form'
import { MainAbout } from '../components/auth/main-about'
import { RegisterForm } from '../components/auth/register-form'
import { SendResetPasswordEmail } from '../components/auth/send-reset-password-email'
import { useUser } from '../contexts/user-context'
import { AuthFormState } from '../enum'
import { images } from '../images.config'
import { Routes } from '../routes'
import { media } from '../styles/media-queries'
import { shark } from '../utils/colors'

export function LoginPage() {
  const [authFormState, setAuthFormState] = useState(AuthFormState.login)
  const { auth } = useUser()
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
  const { auth } = useUser()
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
  ${media.tabletAndUp`
    width: 40%;
  `}
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
