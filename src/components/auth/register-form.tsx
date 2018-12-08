import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import { FormButton } from '../../styles/form-button'
import { melrose } from '../../utils/colors'
import { ErrorComponent } from '../error-message'
import { FloatingLabel } from '../floating-label'
import { AuthFormWrapper, floatingLabelStyles, Space } from './auth-styles'
import { translateFirebaseError } from './auth.util'

type Props = {
  register: (email: string, password: string) => Promise<any>
}

export class RegisterFormComponent extends React.Component<Props> {
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

  register() {
    this.setSigningIn(true)
    this.props
      .register(this.email, this.password)
      .then(resp => console.log(resp))
      .catch(error => {
        this.setSigningIn(false)
        this.setErrorMessage(translateFirebaseError(error))
      })
  }

  render() {
    return (
      <AuthFormWrapper>
        <ErrorComponent errorMsg={this.errorMsg} />
        <FloatingLabel
          autoComplete="new-password"
          styles={floatingLabelStyles}
          placeholder="email"
          type="email"
          onChange={email => this.setEmail(email.target.value)}
          required
        />
        <Space />
        <FloatingLabel
          autoComplete="new-password"
          styles={floatingLabelStyles}
          placeholder="password"
          type="password"
          onChange={password => this.setPassword(password.target.value)}
          required
        />
        <Space />
        <FormButton
          color={melrose}
          disabled={this.signingIn}
          onClick={() => this.register()}
        >
          Register
        </FormButton>
      </AuthFormWrapper>
    )
  }
}

export const RegisterForm = observer(RegisterFormComponent)
