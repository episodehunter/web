import React from 'react';
import { FormButton } from '../../styles/form-button';
import { mountainMeadow } from '../../utils/colors';
import { FloatingLabel } from '../floating-label';
import { FormStatusMessage } from '../form-status-message';
import { AuthFormWrapper, floatingLabelStyles, Space } from './auth-styles';
import { translateFirebaseError } from './auth.util';

type Props = {
  login: (email: string, password: string) => Promise<any>
}

type State = {
  signingIn: boolean
  errorMsg: string
  email: string
  password: string
}

export class LoginForm extends React.Component<Props, State> {
  state = {
    signingIn: false,
    errorMsg: '',
    email: '',
    password: ''
  } as State

  setEmail(email: string) {
    this.setState({ email });
  }

  setPassword(password: string) {
    this.setState({ password });
  }

  setErrorMessage(errorMsg: string) {
    this.setState({ errorMsg });
  }

  setSigningIn(signingIn: boolean) {
    this.setState({ signingIn });
  }

  login() {
    this.setSigningIn(true)
    this.props.login(this.state.email, this.state.password).catch(error => {
      this.setSigningIn(false)
      this.setErrorMessage(translateFirebaseError(error))
    })
  }

  render() {
    return (
      <AuthFormWrapper>
        <FormStatusMessage message={this.state.errorMsg} />
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
          disabled={this.state.signingIn}
          onClick={() => this.login()}
        >
          Let me in
        </FormButton>
      </AuthFormWrapper>
    )
  }
}
