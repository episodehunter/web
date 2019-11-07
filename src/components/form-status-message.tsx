import React from 'react'
import styled from 'styled-components'
import { P } from './text'

type Props = {
  message?: string
  success?: boolean
}

export const FormStatusMessage = ({ message, success }: Props) => {
  if (!message) return null

  return (
    <Wrapper success={success}>
      <P>{message}</P>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: 20px 0;
  background-color: ${({ success }: { success?: boolean }) => (success ? '#43ba73' : '#af574e')};
  text-align: center;
  padding: 1px 0;
`
