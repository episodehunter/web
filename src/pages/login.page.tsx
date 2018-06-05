import { Navigate, withNavigation } from '@vieriksson/the-react-router'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { LoginFormComponent } from '../components/auth/login-form'
import { FlotingLoginButtons } from '../components/main/floting-login-buttons'
import { MainAbout } from '../components/main/main-about'
import { MainFooter } from '../components/main/main-footer'
import { images } from '../images.config'
import { Routes } from '../routes'
import { UserStore } from '../store/user'
import { shark } from '../utils/colors'

type Props = {
  user: UserStore
  navigate: Navigate
}

export class LoginPageComponent extends React.Component<Props> {
  componentDidMount() {
    const { user, navigate } = this.props
    if (user.isAuthenticated) {
      navigate(Routes.upcoming)
    }
  }

  render() {
    return (
      <Wrapper>
        <FlotingLoginButtons />
        <TopImage>
          <MainAbout />
        </TopImage>
        <BottomSection>
          <FormWrapper>
            <LoginFormComponent />
          </FormWrapper>
          <MainFooter />
        </BottomSection>
      </Wrapper>
    )
  }
}

export const LoginPage = withNavigation(
  inject('user')(observer(LoginPageComponent))
)

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
