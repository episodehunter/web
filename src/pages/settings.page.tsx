import { inject } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { FloatingLabel } from '../components/floating-label'
import { FormStatusMessage } from '../components/form-status-message'
import { Spinner } from '../components/spinner'
import { UserStore } from '../store/user'
import { FormButton } from '../styles/form-button'
import { alabaster, mountainMeadow, shark, silver } from '../utils/colors'

enum Status {
  none,
  saving,
  error,
  success
}

type Props = {
  user: UserStore
}

type State = {
  newPassword: string
  confirmPassword: string
  password: string
  errorMessage: string
  status: Status
}

class SettingsPageComponent extends React.Component<Props, State> {
  state = {
    newPassword: '',
    confirmPassword: '',
    status: Status.none,
    errorMessage: '',
    password: ''
  }

  async save() {
    const { newPassword, confirmPassword } = this.state
    const passwordEdited = isEdited(newPassword, confirmPassword)

    if (!passwordEdited) return

    if (passwordEdited && hasMismatch(newPassword, confirmPassword)) {
      this.setErrorMessage('The passwords do not match')
      return
    }

    if (!this.state.password) {
      this.setErrorMessage('Enter your current password')
      return
    }

    if (this.state.newPassword.length < 6) {
      this.setErrorMessage('Enter at least 6 characters')
      return
    }

    this.setState({ status: Status.saving })
    this.props
      .user!.reauthenticate(this.state.password)
      .then(() => {
        this.props
          .user!.changePassword(newPassword)
          .then(() => {
            this.setState({
              status: Status.success,
              newPassword: '',
              confirmPassword: '',
              password: ''
            })
          })
          .catch(() => {
            this.setErrorMessage('Could not update settings')
            this.setState({ status: Status.error })
          })
      })
      .catch(() => {
        this.setErrorMessage('Enter the correct current password')
        this.setState({ status: Status.error })
      })
  }

  setInput(stateUpdate) {
    if (this.state.errorMessage) {
      this.setState({ status: Status.none, errorMessage: '' })
    }
    this.setState(stateUpdate)
  }

  setErrorMessage(errorMessage: string) {
    this.setState({ status: Status.error, errorMessage })
  }

  render() {
    const status = getStatusComponent(this.state)
    console.log(this.state)
    return (
      <Wrapper>
        <FormWrapper>
          <Header>Settings</Header>
          <StatusWrapper>{status}</StatusWrapper>
          <InputWrapper>
            <LabelWrapper>
              <FloatingLabel
                styles={styles}
                autoComplete="current-password"
                placeholder="New password"
                type="password"
                value={this.state.newPassword}
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
                value={this.state.confirmPassword}
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
                placeholder="Current password"
                type="password"
                value={this.state.password}
                onChange={e => this.setInput({ password: e.target.value })}
                required
              />
            </LabelWrapper>
          </InputWrapper>
          <Space />
          <FormButton
            color={mountainMeadow}
            disabled={this.state.status == Status.saving}
            onClick={() => this.save()}
          >
            Save
          </FormButton>
        </FormWrapper>
      </Wrapper>
    )
  }
}

export const SettingsPage = inject('user')(SettingsPageComponent)

function getStatusComponent(state: State) {
  switch (state.status) {
    case Status.error:
      return <FormStatusMessage message={state.errorMessage} />
    case Status.success:
      return (
        <FormStatusMessage message="Password updated successfully" success />
      )
    case Status.saving:
      return <Spinner />
    default:
      return null
  }
}

function isEdited(inputOne, inputTwo) {
  return inputOne || inputTwo
}

function hasMismatch(inputOne, inputTwo) {
  return inputOne !== inputTwo
}

const StatusWrapper = styled.div`
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
  margin-top: 150px;
  align-items: center;
  flex-direction: column;
`

const Wrapper = styled.div`
  min-height: 1000px;
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
