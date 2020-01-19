import React from 'react'
import { styled } from '@material-ui/core'
import { Body1 } from './atoms/typography'

type Props = {
  message?: string
  success?: true
}

export const FormStatusMessage = ({ message, success }: Props) => {
  if (!message) return null

  const style = {
    backgroundColor: success ? '#6da925' : '#af574e'
  }

  return (
    <Wrapper style={style}>
      <Body1>{message}</Body1>
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  width: '100%',
  padding: '20px 0',
  textAlign: 'center'
})
