import * as React from 'react'
import styled, { css } from 'styled-components'
import { alabaster } from '../utils/colors'

type Props = {
  onToggle: () => void
  open: boolean
}

export const Hamburger = ({ onToggle, open }: Props) => (
  <Container onClick={onToggle}>
    <BarOne open={open} />
    <BarTwo open={open} />
    <BarThree open={open} />
  </Container>
)

const Container = styled.div`
  display: inline-block;
  cursor: pointer;
`
const Bar = styled.div`
  width: 35px;
  height: 3px;
  background-color: ${alabaster};
  margin: 6px 0;
  transition: 0.4s;
`
const BarOne = styled(Bar)`
  ${({ open }: { open: boolean }) =>
    open &&
    css`
      transform: translatey(9px) rotate(45deg);
    `};
`
const BarTwo = styled(Bar)`
  ${({ open }: { open: boolean }) =>
    open &&
    css`
      opacity: 0;
    `};
`
const BarThree = styled(Bar)`
  ${({ open }: { open: boolean }) =>
    open &&
    css`
      transform: translatey(-9px) rotate(-45deg);
    `};
`
