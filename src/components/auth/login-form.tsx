import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { FormButton } from '../../styles/form-button'
import { mountainMeadow, silver } from '../../utils/colors'
import { ErrorComponent } from '../error-message'
import { FloatingLabel } from '../floating-label'

type Props = {
  login: (email: string, password: string) => Promise<any>
}

export class LoginFormComponent extends React.Component<Props> {
  @observable
  signingIn = false
  @observable
  errorMsg = ''
  @observable
  email = ''
  @observable
  password = ''

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
        <FormButton disabled={this.signingIn} onClick={() => this.login()}>
          Let me in
        </FormButton>
      </FormWrapper>
    )
  }
}

export const LoginForm = observer(LoginFormComponent)

const FormWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Space = styled.div`
  height: 40px;
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
