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
    window.scrollTo(0, document.body.scrollHeight)
  }
  return <Register onClick={onClick}>Register</Register>
}

export const LoginButton = ({ changeFormState }: Props) => {
  const onClick = () => {
    changeFormState(AuthFormState.login)
    window.scrollTo(0, document.body.scrollHeight)
  }
  return <Login onClick={onClick}>Login</Login>
}

const Button = styled.div`
  font-family: 'Lato', sans-serif;
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

const Register = styled(Button)`
  border-color: ${melrose};
  &:hover {
    background-color: ${melrose};
  }
`
