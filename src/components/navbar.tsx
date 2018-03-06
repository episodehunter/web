import * as React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { manatee, alabaster } from '../utils/colors'

export const Navbar = () => (
  <Nav>
    <Half />
    <Half>
      <Wrapper>
        <NavItem to="/register">Register</NavItem>
      </Wrapper>
      <Wrapper>
        <NavItem to="/login">Login</NavItem>
      </Wrapper>
    </Half>
  </Nav>
)

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 0.8fr 0.2fr;
  padding: 20px 0;
`

const Half = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
`

const activeClassName = 'active-link'
const NavItem = styled(NavLink).attrs({
  activeClassName
})`
  color: ${alabaster};
  font-family: 'Lato', sans-serif;
  font-size: 12px;
  text-decoration: none;
  text-transform: uppercase;
  padding-bottom: 7px;
  letter-spacing: 1.5px;
  font-weight: thin;
  &:hover {
    border-bottom: 2px solid ${alabaster};
  }
  &.${activeClassName} {
    border-bottom: 2px solid ${manatee};
  }
`

const Wrapper = styled.div``
