import * as React from 'react'
import styled from 'styled-components'
import { LoginButton, RegisterButton } from '../auth/login-buttons'

export const FlotingLoginButtons = () => (
  <Wrapper>
    <ButtonWrapper>
      <RegisterButton />
    </ButtonWrapper>
    <ButtonWrapper>
      <LoginButton />
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
