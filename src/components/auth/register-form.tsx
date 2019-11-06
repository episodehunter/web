import { styled as miStyled, TextField } from '@material-ui/core'
import { captureException } from '@sentry/browser'
import React, { useState } from 'react'
import { useNavigation } from 'the-react-router'
import { useCreateUserMutation } from '../../dragonstone'
import { Routes } from '../../routes'
import { Button } from '../atoms/button'
import { FormStatusMessage } from '../form-status-message'
import { translateFirebaseError } from './auth.util'

export const RegisterForm = ({
  register
}: {
  register: (email: string, password: string) => Promise<firebase.auth.UserCredential>
}) => {
  const { navigate } = useNavigation()
  const [createUser] = useCreateUserMutation()
  const [errorMsg, setErrorMsg] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onRegister = (event: React.MouseEvent | React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setLoading(true)
    register(email, password)
      .then(() =>
        createUser({ variables: { username: displayName || slugify(email.split('@')[0]) } })
      )
      .then(() => navigate(Routes.upcoming))
      .catch(error => {
        captureException(error)
        setLoading(false)
        setErrorMsg(translateFirebaseError(error))
      })
  }

  return (
    <form onSubmit={onRegister}>
      <FormStatusMessage message={errorMsg} />

      <TextField
        autoComplete="text"
        fullWidth
        type="text"
        label="Username"
        margin="normal"
        variant="outlined"
        autoFocus={true}
        onChange={e => setDisplayName(e.target.value)}
      />
      <TextField
        fullWidth
        type="email"
        label="Email"
        margin="normal"
        variant="outlined"
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        margin="normal"
        variant="outlined"
        onChange={e => setPassword(e.target.value)}
      />
      <ActionButton progress={loading} onClick={onRegister}>
        Register
      </ActionButton>
    </form>
  )
}

const ActionButton = miStyled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100% !important'
}))

function slugify(str: string): string {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;'
  const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return str
    .toString()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
