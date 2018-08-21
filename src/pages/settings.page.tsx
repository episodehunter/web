import { inject } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { ErrorComponent } from '../components/error-message'
import { FloatingLabel } from '../components/floating-label'
import { Spinner } from '../components/spinner'
import { UserStore } from '../store/user'
import { FormButton } from '../styles/form-button'
import { alabaster, mountainMeadow, shark, silver } from '../utils/colors'

type Props = {
  user: UserStore
}
type State = {
  newPassword: string
  confirmPassword: string
  newEmail: string
  confirmEmail: string
  error: string
  saving: boolean
}

class SettingsPageComponent extends React.Component<Props, State> {
  state = {
    newPassword: '',
    confirmPassword: '',
    newEmail: '',
    confirmEmail: '',
    error: '',
    password: '',
    saving: false
  }

  async save() {
    const { newPassword, confirmPassword, newEmail, confirmEmail } = this.state
    const passwordEdited = isEdited(newPassword, confirmPassword)
    const emailEdited = isEdited(newEmail, confirmEmail)

    if (!passwordEdited && !emailEdited) {
      return
    }

    if (passwordEdited && hasMismatch(newPassword, confirmPassword)) {
      this.setErrorMessage('The passwords do not match')
      return
    }

    if (emailEdited && hasMismatch(newEmail, confirmEmail)) {
      this.setErrorMessage('The emails do not match')
      return
    }

    if (!this.state.password) {
      this.setErrorMessage('Enter your current password')
      return
    }

    this.setState({ saving: true })
    console.log('currentPassword', this.state.password)
    this.props.user!.reauthenticate(this.state.password).catch(() => {
      this.setErrorMessage('Enter the correct current password')
      this.setState({ saving: false })
      return
    })
    console.log('newPassword', newPassword)
    console.log('newPassword', newEmail)
    if (passwordEdited) {
      this.props.user!.changePassword(newPassword).catch(error => {
        console.log(error)
        this.setErrorMessage('Could not update settings')
        this.setState({ saving: false })
        return
      })
    }
    if (emailEdited) {
      this.props.user!.changeEmail(newEmail).catch(error => {
        console.log(error)
        this.setErrorMessage('Could not update email')
        this.setState({ saving: false })
        return
      })
    }

    this.setState({ saving: false })
  }

  setInput(stateUpdate) {
    if (this.state.error) {
      this.setErrorMessage('')
    }
    this.setState(stateUpdate)
  }

  setErrorMessage(error: string) {
    this.setState({ error })
  }

  render() {
    return (
      <Wrapper>
        <FormWrapper>
          <Header>Settings</Header>
          <ErrorWrapper>
            <ErrorComponent errorMsg={this.state.error} />
            {this.state.saving && <Spinner />}
          </ErrorWrapper>
          <InputWrapper>
            <LabelWrapper>
              <FloatingLabel
                styles={styles}
                autoComplete="current-password"
                placeholder="New password"
                type="password"
                onChange={e => this.setInput({ newPassword: e.target.value })}
                required
              />
            </LabelWrapper>
            <LabelWrapper>
              <FloatingLabel
                styles={styles}
                autoComplete="current-password"
                placeholder="Confirm password"
                type="password"
                onChange={e =>
                  this.setInput({ confirmPassword: e.target.value })
                }
                required
              />
            </LabelWrapper>
          </InputWrapper>
          <Space />
          <InputWrapper>
            <LabelWrapper>
              <FloatingLabel
                styles={styles}
                placeholder="New email"
                type="email"
                onChange={e => this.setInput({ newEmail: e.target.value })}
                required
              />
            </LabelWrapper>
            <LabelWrapper>
              <FloatingLabel
                styles={styles}
                placeholder="Confirm email"
                type="email"
                onChange={e => this.setInput({ confirmEmail: e.target.value })}
                required
              />
            </LabelWrapper>
          </InputWrapper>
          <Space />
          <InputWrapper>
            <LabelWrapper>
              <FloatingLabel
                styles={styles}
                placeholder="Current password"
                type="password"
                onChange={e => this.setInput({ password: e.target.value })}
                required
              />
            </LabelWrapper>
          </InputWrapper>
          <Space />
          <FormButton disabled={this.state.saving} onClick={() => this.save()}>
            Save
          </FormButton>
        </FormWrapper>
      </Wrapper>
    )
  }
}

export const SettingsPage = inject('user')(SettingsPageComponent)

function isEdited(inputOne, inputTwo) {
  return inputOne || inputTwo
}

function hasMismatch(inputOne, inputTwo) {
  return inputOne !== inputTwo
}

const ErrorWrapper = styled.div`
  display: flex;
  width: 20%;
  height: 70px;
  justify-content: center;
  align-items: center;
`

const LabelWrapper = styled.div`
  flex: 1;
  margin: 10px;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
const Space = styled.div`
  height: 40px;
`

const FormWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Wrapper = styled.div`
  height: 85%;
  color: ${alabaster};
  background-color: ${shark};
  display: flex;
  justify-content: center;
`

const Header = styled.h1`
  font-family: 'Lato', sans-serif;
  color: white;
  text-transform: uppercase;
  font-weight: lighter;
  font-size: 32px;
`

const styles = {
  label: {
    width: '100%'
  },
  input: {
    fontSize: '1rem',
    borderWidth: '2px',
    color: mountainMeadow,
    borderColor: silver
  },
  focus: {
    borderColor: mountainMeadow
  },
  span: {
    fontSize: '1rem',
    color: silver
  }
}
