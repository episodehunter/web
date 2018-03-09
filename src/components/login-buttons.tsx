import * as React from 'react'
import styled from 'styled-components'
import { alabaster, mountainMeadow, melrose } from '../utils/colors'

export const RegisterButton = () => <Register>Register</Register>
export const LoginButton = () => <Login>Login</Login>

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
