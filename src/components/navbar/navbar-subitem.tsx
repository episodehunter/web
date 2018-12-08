import React from 'react'
import { NavSubItem } from './navbar-item.styles'

type Props = {
  onClick: () => void
  title: string
  selected: boolean
}
export const NavbarSubItem = ({ selected, title, onClick }: Props) => (
  <NavSubItem selected={selected} onClick={onClick}>
    {title}
  </NavSubItem>
)
