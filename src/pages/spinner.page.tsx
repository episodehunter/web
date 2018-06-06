import React from 'react'
import styled from 'styled-components'
import { Spinner } from '../components/spinner'

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SpinnerPage = () => (
  <Content>
    <Spinner />
  </Content>
)
