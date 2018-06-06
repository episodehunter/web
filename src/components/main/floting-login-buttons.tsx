import * as React from 'react'
import styled from 'styled-components'
import { AuthFormState } from '../../enum'
import { LoginButton, RegisterButton } from '../auth/login-buttons'

type Props = {
  changeFormState(newState: AuthFormState): void
}

export const FlotingLoginButtons = ({ changeFormState }: Props) => (
  <Wrapper>
    <ButtonWrapper>
      <RegisterButton changeFormState={changeFormState} />
    </ButtonWrapper>
    <ButtonWrapper>
      <LoginButton changeFormState={changeFormState} />
    </ButtonWrapper>
  </Wrapper>
)

const Wrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
`
const ButtonWrapper = styled.div`
  margin-right: 20px;
`
