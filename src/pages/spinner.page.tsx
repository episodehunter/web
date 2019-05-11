import React from 'react'
import styled from 'styled-components'
import { Spinner } from '../components/spinner'

const Content = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SpinnerPage = () => (
  <Content>
    <Spinner />
  </Content>
)
