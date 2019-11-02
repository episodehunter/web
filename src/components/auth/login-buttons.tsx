import * as React from 'react'
import styled from 'styled-components'
import { AuthFormState } from '../../enum'
import { alabaster, melrose, mountainMeadow } from '../../utils/colors'

type Props = {
  changeFormState(newState: AuthFormState): void
}

export const RegisterButton = ({ changeFormState }: Props) => {
  const onClick = () => {
    changeFormState(AuthFormState.register)
    window.scrollTo(0, document.body.scrollHeight - document.body.scrollHeight / 2)
  }
  return <Register onClick={onClick}>Register</Register>
}

export const LoginButton = ({ changeFormState }: Props) => {
  const onClick = () => {
    changeFormState(AuthFormState.login)
    window.scrollTo(0, document.body.scrollHeight - document.body.scrollHeight / 2)
  }
  return <Login onClick={onClick}>Login</Login>
}

export const ResetPasswordButton = ({ changeFormState }: Props) => {
  const onClick = () => {
    changeFormState(AuthFormState.forgotPassword)
    window.scrollTo(0, document.body.scrollHeight - document.body.scrollHeight / 2)
  }
  return <Reset onClick={onClick}>Reset password</Reset>
}

const Button = styled.div`
  border-width: 2px;
  border-style: solid;
  padding: 10px 15px;
  font-size: 12px;
  letter-spacing: 1.5px;
  color: ${alabaster};
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
`

const Login = styled(Button)`
  border-color: ${mountainMeadow};
  &:hover {
    background-color: ${mountainMeadow};
  }
`

const Reset = styled(Button)`
  border-color: ${mountainMeadow};
  &:hover {
    background-color: ${mountainMeadow};
  }
`

const Register = styled(Button)`
  border-color: ${melrose};
  &:hover {
    background-color: ${melrose};
  }
`
