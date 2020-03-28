import { styled } from '@material-ui/core'
import React from 'react'
import { Spinner } from '../components/spinner'

export const SpinnerPage = () => (
  <Content>
    <Spinner />
  </Content>
)

const Content = styled('div')({
  width: '100%',
  height: 'calc(100vh - 50px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
