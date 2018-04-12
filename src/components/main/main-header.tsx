import * as React from 'react'
import styled from 'styled-components'
import { RegisterButton, LoginButton } from '../login-buttons'

export const MainHeader = () => (
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
  display: flex;
  align-self: flex-end;
  margin-top: 20px;
`
const ButtonWrapper = styled.div`
  margin-right: 20px;
`
