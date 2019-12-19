import React from 'react'
import { styled } from '@material-ui/core'
import { Body1 } from './atoms/typography'

type Props = {
  message?: string
}

export const FormStatusMessage = ({ message }: Props) => {
  if (!message) return null

  return (
    <Wrapper>
      <Body1>{message}</Body1>
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  width: '100%',
  margin: '20px 0',
  backgroundColor: '#af574e',
  textAlign: 'center',
  padding: '1px 0'
})
