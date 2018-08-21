import React from 'react'
import styled from 'styled-components'
import { P } from './text'

export const ErrorComponent = ({ errorMsg }: { errorMsg?: string }) => {
  if (!errorMsg) {
    return null
  }
  return (
    <ErrorWrapper>
      <P>{errorMsg}</P>
    </ErrorWrapper>
  )
}

const ErrorWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  background-color: #af574e;
  text-align: center;
`
