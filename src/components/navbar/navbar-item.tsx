import React from 'react'
import { NavItem } from './navbar-item.styles'

type Props = {
  onClick: () => void
  title: string
  selected: boolean
}
export const NavbarItem = ({ selected, title, onClick }: Props) => (
  <NavItem selected={selected} onClick={onClick}>
    {title}
  </NavItem>
)
