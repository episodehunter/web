import React, { useState } from 'react'
import styled from 'styled-components'
import { FloatingLabel } from '../components/floating-label'
import { FormStatusMessage } from '../components/form-status-message'
import { Spinner } from '../components/spinner'
import { useUser } from '../contexts/user-context'
import { FormButton } from '../styles/form-button'
import { media } from '../styles/media-queries'
import { alabaster, mountainMeadow, shark, silver } from '../utils/colors'

enum Status {
  none,
  saving,
  error,
  success
}

export const SettingsPage = () => {
  const { auth } = useUser()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState(Status.none)
  const [errorMessage, setErrorMessage] = useState('')
  const [password, setPassword] = useState('')

  const setInput = (setValue: (value: string) => void) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (errorMessage) {
      setErrorMessage('')
      setStatus(Status.none)
    }
    setValue(event.target.value)
  }

  const save = () => {
    const passwordEdited = isEdited(newPassword, confirmPassword)

    if (!passwordEdited) {
      return
    }

    if (hasMismatch(newPassword, confirmPassword)) {
      setErrorMessage('The passwords do not match')
      return
    }

    if (!password) {
      setErrorMessage('Enter your current password')
      return
    }

    if (newPassword.length < 6) {
      setErrorMessage('Enter at least 6 characters')
      return
    }

    setStatus(Status.saving)
    auth
      .reauthenticate(password)
      .then(() => {
        auth
          .changePassword(newPassword)
          .then(() => {
            setStatus(Status.success)
            setNewPassword('')
            setConfirmPassword('')
            setPassword('')
          })
          .catch(() => {
            setErrorMessage('Could not update settings')
            setStatus(Status.error)
          })
      })
      .catch(() => {
        setErrorMessage('Enter the correct current password')
        setStatus(Status.error)
      })
  }

  return (
    <Wrapper>
      <FormWrapper>
        <Header>Change Password</Header>
        <StatusWrapper>
          <StatusComponent errorMessage={errorMessage} status={status} />
        </StatusWrapper>
        <InputWrapper>
          <LabelWrapper>
            <FloatingLabel
              styles={styles}
              autoComplete="new-password"
              placeholder="New password"
              type="password"
              value={newPassword}
              onChange={setInput(setNewPassword)}
              required
            />
          </LabelWrapper>
          <LabelWrapper>
            <FloatingLabel
              styles={styles}
              autoComplete="confirm-password"
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={setInput(setConfirmPassword)}
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
              autoComplete="password"
              value={password}
              onChange={setInput(setPassword)}
              required
            />
          </LabelWrapper>
        </InputWrapper>
        <Space />
        <FormButton color={mountainMeadow} disabled={status == Status.saving} onClick={save}>
          Save
        </FormButton>
      </FormWrapper>
      <FormWrapper>
        <Header>Delete you account</Header>
        <Text>
          Send an email to info@episodehunter.tv and I will remove your account and all your data as
          soon as possible (max 48h). In the meantime, watch this{' '}
          <a style={{ color: 'white' }} href="https://www.youtube.com/watch?v=wVyggTKDcOE">
            video
          </a>
          .
        </Text>
      </FormWrapper>
      <FormWrapper>
        <Header>Change your email</Header>
        <Text>
          Send an email to info@episodehunter.tv and I will change your email as soon as possible
          (max 48h).
        </Text>
      </FormWrapper>
    </Wrapper>
  )
}

function StatusComponent({ status, errorMessage }: { status: Status; errorMessage: string }) {
  switch (status) {
    case Status.error:
      return <FormStatusMessage message={errorMessage} />
    case Status.success:
      return <FormStatusMessage message="Password updated successfully" success />
    case Status.saving:
      return <Spinner />
    default:
      return null
  }
}

function isEdited(inputOne: string, inputTwo: string) {
  return Boolean(inputOne || inputTwo)
}

function hasMismatch(inputOne: string, inputTwo: string) {
  return inputOne !== inputTwo
}

const StatusWrapper = styled.div`
  display: flex;
  width: 20%;
  ${media.mobile`
    width: 100%;
  `}
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
  margin-top: 100px;
  align-items: center;
  flex-direction: column;
`

const Wrapper = styled.div`
  color: ${alabaster};
  background-color: ${shark};
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: start;
`

const Header = styled.h1`
  color: white;
  text-transform: uppercase;
  font-weight: lighter;
  font-size: 32px;
`

const Text = styled.p`
  color: white;
  font-size: 18px;
  margin: 10px;
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
