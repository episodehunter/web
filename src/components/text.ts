import styled, { css } from 'styled-components'
import { alabaster } from '../utils/colors'

const headLine = css`
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  color: ${alabaster};
`

export const H1 = styled.h1`
  ${headLine};
  font-size: 60px;
  margin-top: 0;
  margin-bottom: 10px;
`

export const H3 = styled.h3`
  ${headLine};
  font-size: 20px;
`

export const P = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  color: ${alabaster};
`
