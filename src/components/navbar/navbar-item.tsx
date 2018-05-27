import React from 'react'
import styled from 'styled-components'
import { Navigate } from '../../router/router.types'
import { media } from '../../styles/media-queries'
import { alabaster, gossamer, melrose } from '../../utils/colors'

type Props = {
  navigate: Navigate
  path: string
  title: string
  selected: boolean
}
export const NavbarItem = ({ navigate, path, selected, title }: Props) => (
  <Item selected={selected} onClick={() => navigate(path)}>
    {title}
  </Item>
)

const Item = styled.a`
  display: flex;
  color: ${alabaster};
  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  text-decoration: none;
  margin-right: 30px;
  height: 25px;
  cursor: pointer;
  letter-spacing: 1.5px;
  box-sizing: border-box;
  border-bottom: ${(props: { selected: boolean }) =>
    !props.selected ? '' : `2px solid ${gossamer}`}};
  &:hover {
    border-bottom: ${(props: { selected: boolean }) =>
      !props.selected ? `2px solid ${melrose}` : `2px solid ${gossamer}`}};
  }
  margin-top: 20px;
  ${media.giant`font-size: 14px;`};
  ${media.desktop`font-size: 13px;`};
  ${media.tablet`font-size: 12px;`};
  font-size: 11px;
`
