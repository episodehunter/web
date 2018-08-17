import styled from 'styled-components'
import { alabaster, capeCod, melrose } from '../utils/colors'

const backgroundColor = ({ active }: { active?: boolean }) =>
  active ? melrose : capeCod

export const Button = styled.button`
  -webkit-appearance: none;
  border: 0;
  display: inline-block;
  background: ${backgroundColor};
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${alabaster};
  cursor: pointer;
  font-size: 14px;
  padding: 10px;
  transition: all 0.2s ease-out;
  margin: 0 10px 10px 0;
  outline: 0;
  &:hover {
    background: ${melrose};
  }
`

export const TextButton = styled.p`
  color: ${melrose};
  margin: 0;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 14px;
  align-self: flex-end;
  border-bottom: 1px solid;
  cursor: pointer;
`
