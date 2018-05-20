import styled, { css } from 'styled-components'
import { alabaster, melrose } from '../utils/colors'

const headLine = css`
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  color: ${alabaster};
`

const addMargin = ({ margin }: { margin?: number | string }) =>
  margin != null ? `margin: ${margin}` : ''
const addCenter = ({ center }: { center?: boolean }) =>
  center ? `text-align: center` : ''

export const H1 = styled.h1`
  ${headLine};
  font-size: 60px;
  margin-top: 0;
  margin-bottom: 10px;
`

export const H3 = styled.h3`
  ${headLine};
  font-size: 20px;
  ${addMargin};
`

export const H4 = styled(H3)`
  text-transform: none;
`

export const P = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  color: ${alabaster};
  ${addMargin};
`

export const P2 = styled<{
  center?: boolean
  margin?: number | string
  style?: any
}>(P)`
  font-size: 14px;
  ${addMargin};
  ${addCenter};
`

export const SmallText = styled(P)`
  font-size: 12px;
  margin: 0;
  ${addCenter};
`

export const HighlightSpan = styled.span`
  color: ${melrose};
`
