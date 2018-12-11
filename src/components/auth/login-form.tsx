import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import { FormButton } from '../../styles/form-button'
import { mountainMeadow } from '../../utils/colors'
import { FloatingLabel } from '../floating-label'
import { FormStatusMessage } from '../form-status-message'
import { AuthFormWrapper, floatingLabelStyles, Space } from './auth-styles'
import { translateFirebaseError } from './auth.util'

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
      this.setErrorMessage(translateFirebaseError(error))
    })
  }

  render() {
    return (
      <AuthFormWrapper>
        <FormStatusMessage message={this.errorMsg} />
        <FloatingLabel
          styles={floatingLabelStyles}
          placeholder="email"
          type="email"
          onChange={email => this.setEmail(email.target.value)}
          required
        />
        <Space />
        <FloatingLabel
          styles={floatingLabelStyles}
          placeholder="password"
          type="password"
          onChange={password => this.setPassword(password.target.value)}
          required
        />
        <Space />
        <FormButton
          color={mountainMeadow}
          disabled={this.signingIn}
          onClick={() => this.login()}
        >
          Let me in
        </FormButton>
      </AuthFormWrapper>
    )
  }
}

export const LoginForm = observer(LoginFormComponent)
