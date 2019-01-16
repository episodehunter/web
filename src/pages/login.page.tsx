import React, { useState } from 'react'
import styled from 'styled-components'
import { LoginForm } from '../components/auth/login-form'
import { RegisterForm } from '../components/auth/register-form'
import { FlotingLoginButtons } from '../components/main/floting-login-buttons'
import { MainAbout } from '../components/main/main-about'
import { AuthFormState } from '../enum'
import { images } from '../images.config'
import { auth } from '../utils/auth.util'
import { shark } from '../utils/colors'

export function LoginPage() {
  const [authFormState, setAuthFormState] = useState(AuthFormState.login)

  return (
    <>
      <Wrapper>
        <FlotingLoginButtons
          changeFormState={state => setAuthFormState(state)}
        />
        <TopImage>
          <MainAbout />
        </TopImage>
      </Wrapper>
      <BottomSection>
        <FormWrapper>
          <AuthForm authFormState={authFormState} />
        </FormWrapper>
      </BottomSection>
    </>
  )
}

function AuthForm({ authFormState }: { authFormState: AuthFormState }) {
  switch (authFormState) {
    case AuthFormState.login:
      return <LoginForm login={(e, p) => auth.login(e, p)} />
    case AuthFormState.register:
      return <RegisterForm register={(e, p) => auth.register(e, p)} />
    case AuthFormState.forgotPassword:
      return null
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
  height: 100%;
  background-color: ${shark};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Wrapper = styled.div`
  height: 100%;
`
