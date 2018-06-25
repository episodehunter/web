import * as React from 'react'
import styled from 'styled-components'
import { alabaster, shark } from '../../utils/colors'

export const TosPage = () => <Wrapper>Terms of Service</Wrapper>

const Wrapper = styled.div`
  padding-top: 70px;
  height: 100%;
  color: ${alabaster};
  background-color: ${shark};
  display: flex;
  justify-content: center;
`
