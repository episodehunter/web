import * as React from 'react'
import styled from 'styled-components'
import { capeCod, alabaster } from '../../utils/colors'

export const ShowCardTitle = () => (
  <TitleWrapper>
    <Title>A DARK SONG</Title>
  </TitleWrapper>
)

const Title = styled.div`
  font-size: 10px;
  text-align: center;
`

const TitleWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px 0;
  z-index: 1;

  font-family: 'Lato', sans-serif;
  background-color: ${capeCod};
  color: ${alabaster};
  opacity: 0.8;
`
