import { Navigate, withNavigation } from '@vieriksson/the-react-router'
import { action, observable, reaction } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { LoginForm } from '../components/auth/login-form'
import { FlotingLoginButtons } from '../components/main/floting-login-buttons'
import { MainAbout } from '../components/main/main-about'
import { AuthFormState } from '../enum'
import { images } from '../images.config'
import { Routes } from '../routes'
import { UserStore } from '../store/user'
import { shark } from '../utils/colors'

type Props = {
  user: UserStore
  navigate: Navigate
}

export class LoginPageComponent extends React.Component<Props> {
  disposeReaction: () => void
  @observable authFormState = AuthFormState.login

  constructor(props, context) {
    super(props, context)
    this.disposeReaction = reaction(
      () => props.user.isAuthenticated,
      isAuthenticated => isAuthenticated && props.navigate(Routes.upcoming),
      { fireImmediately: true }
    )
  }

  componentWillUnmount() {
    this.disposeReaction()
  }

  @action
  changeFormState(newState: AuthFormState) {
    this.authFormState = newState
  }

  renderAuthForm() {
    if (this.authFormState === AuthFormState.login) {
      return <LoginForm login={(e, p) => this.props.user.login(e, p)} />
    }
    return null
  }

  render() {
    return (
      <>
        <Wrapper>
          <FlotingLoginButtons
            changeFormState={state => this.changeFormState(state)}
          />
          <TopImage>
            <MainAbout />
          </TopImage>
        </Wrapper>
        <BottomSection>
          <FormWrapper>{this.renderAuthForm()}</FormWrapper>
        </BottomSection>
      </>
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
