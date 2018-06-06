import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { mountainMeadow, silver } from '../../utils/colors'
import { FloatingLabel } from '../floating-label'
import { P } from '../text'

type Props = {
  login: (email: string, password: string) => Promise<any>
}

export class LoginFormComponent extends React.Component<Props> {
  @observable signingIn = false
  @observable errorMsg = ''
  @observable email = ''
  @observable password = ''

  @action
  setEmail(email: string) {
    this.email = email
  }

  @action
  setPassword(password: string) {
    this.password = password
  }

  @action
  setErrorMessage(msg: string) {
    this.errorMsg = msg
  }

  @action
  setSigningIn(signingIn: boolean) {
    this.signingIn = signingIn
  }

  login() {
    this.setSigningIn(true)
    this.props.login(this.email, this.password).catch(error => {
      this.setSigningIn(false)
      console.log(error)
      if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        this.setErrorMessage('Wrong password or email')
      } else {
        this.setErrorMessage(error.message)
      }
    })
  }

  render() {
    return (
      <FormWrapper>
        <ErrorComponent errorMsg={this.errorMsg} />
        <FloatingLabel
          styles={styles}
          placeholder="email"
          type="email"
          onChange={email => this.setEmail(email.target.value)}
          required
        />
        <Space />
        <FloatingLabel
          styles={styles}
          placeholder="password"
          type="password"
          onChange={password => this.setPassword(password.target.value)}
          required
        />
        <Space />
        <LoginButton disabled={this.signingIn} onClick={() => this.login()}>
          Let me in
        </LoginButton>
      </FormWrapper>
    )
  }
}

export const LoginForm = observer(LoginFormComponent)

const ErrorComponent = ({ errorMsg }: { errorMsg?: string }) => {
  if (!errorMsg) {
    return null
  }
  return (
    <ErrorWrapper>
      <P>{errorMsg}</P>
    </ErrorWrapper>
  )
}

const FormWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ErrorWrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
  background-color: #e74c3c;
  text-align: center;
`

const Space = styled.div`
  height: 40px;
`

const LoginButton = styled.button`
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  will-change: opacity, transform;
  transition: all 0.3s ease-out;
  text-decoration: none;
  color: #fff;
  background-color: #26a69a;
  letter-spacing: 1px;
  transition: 0.2s ease-out;
  border: none;
  border-radius: 2px;
  padding: 0 2rem;
  text-transform: uppercase;
  line-height: 2.5rem;
  font-size: 1rem;
  box-shadow: 0 2px 5px 0 rgba(255, 255, 255, 0.16),
    0 2px 10px 0 rgba(255, 255, 255, 0.12);

  &:hover {
    outline: none;
    background-color: #2ab7a9;
  }
`

const styles = {
  label: {
    width: '100%'
  },
  input: {
    fontSize: '2rem',
    borderWidth: '2px',
    color: mountainMeadow,
    borderColor: silver
  },
  focus: {
    borderColor: mountainMeadow
  },
  span: {
    fontSize: '2rem',
    color: silver
  }
}
