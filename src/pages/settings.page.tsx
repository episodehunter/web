import { TextField, styled } from '@material-ui/core'
import React, { useState } from 'react'
import { Button } from '../components/atoms/button'
import { Margin } from '../components/atoms/margin'
import { PageWrapper } from '../components/atoms/page-wrapper'
import { Body1, H2 } from '../components/atoms/typography'
import { FormStatusMessage } from '../components/form-status-message'
import { useUser } from '../contexts/user-context'

enum Status {
  none,
  saving,
  error,
  success,
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

  const save = async () => {
    const passwordEdited = isEdited(newPassword, confirmPassword)

    if (!passwordEdited) {
      return
    }

    if (hasMismatch(newPassword, confirmPassword)) {
      setErrorMessage('The passwords do not match')
      setStatus(Status.error)
      return
    }

    if (!password) {
      setErrorMessage('Enter your current password')
      setStatus(Status.error)
      return
    }

    if (newPassword.length < 6) {
      setErrorMessage('Enter at least 6 characters')
      setStatus(Status.error)
      return
    }

    setStatus(Status.saving)
    try {
      await auth.reauthenticate(password)
    } catch (error) {
      setErrorMessage('Enter the correct current password')
      setStatus(Status.error)
      return
    }
    try {
      await auth.changePassword(newPassword)
      setStatus(Status.success)
      setNewPassword('')
      setConfirmPassword('')
      setPassword('')
    } catch (error) {
      setErrorMessage(error?.message || 'Could not update the password')
      setStatus(Status.error)
    }
  }

  return (
    <PageWrapper>
      <div>
        <H2>Change Password</H2>
        {(errorMessage || status === Status.success) && (
          <StatusWrapper>
            <StatusComponent errorMessage={errorMessage} status={status} />
          </StatusWrapper>
        )}
        <TextField
          autoComplete="new-password"
          label="New password"
          type="password"
          value={newPassword}
          onChange={setInput(setNewPassword)}
          required
        />
        <Margin top={8} />
        <TextField
          autoComplete="confirm-password"
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={setInput(setConfirmPassword)}
          required
        />
        <Margin top={8} />
        <TextField
          label="Current password"
          type="password"
          autoComplete="password"
          value={password}
          onChange={setInput(setPassword)}
          required
        />
        <Margin top={16} />
        <Button progress={status == Status.saving} onClick={save}>
          Save
        </Button>
      </div>
      <Margin bottom={32} />
      <div>
        <H2>Delete you account</H2>
        <Body1>
          Send an email to info@episodehunter.tv and I will remove your account and all your data as
          soon as possible (max 48h). In the meantime, watch this{' '}
          <a style={{ color: 'white' }} href="https://www.youtube.com/watch?v=wVyggTKDcOE">
            video
          </a>
          .
        </Body1>
      </div>
      <Margin bottom={32} />
      <div>
        <H2>Change your email</H2>
        <Body1>
          Send an email to info@episodehunter.tv and I will change your email as soon as possible
          (max 48h).
        </Body1>
      </div>
    </PageWrapper>
  )
}

function StatusComponent({ status, errorMessage }: { status: Status; errorMessage?: string }) {
  switch (status) {
    case Status.error:
      return <FormStatusMessage message={errorMessage} />
    case Status.success:
      return <FormStatusMessage message="Password updated successfully" success />
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

const StatusWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '20%;',
  [theme.breakpoints.down('sm')]: {
    width: '100%;',
  },
  height: '70px',
  justifyContent: 'center',
  alignItems: 'center',
}))
