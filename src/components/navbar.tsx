import * as React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { mirage, manatee } from '../utils/colors'

export const Navbar = () => (
  <Nav>
    <Half />
    <Half>
      <Wrapper>
        <NavItem exact to="/">
          Popular
        </NavItem>
      </Wrapper>
      <Wrapper>
        <NavItem to="/upcoming">Upcoming</NavItem>
      </Wrapper>
      <Wrapper>
        <NavItem to="/search">Search</NavItem>
      </Wrapper>

      <Wrapper>
        <NavItem to="/login">Login</NavItem>
      </Wrapper>
    </Half>
  </Nav>
)

const Nav = styled.nav`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 20px 0;
`

const Half = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
`

const activeClassName = 'active-link'
const NavItem = styled(NavLink).attrs({
  activeClassName
})`
  color: ${mirage};
  font-family: 'Lato', sans-serif;
  font-size: 12px;
  text-decoration: none;
  text-transform: uppercase;
  padding-bottom: 7px;
  letter-spacing: 1.5px;
  &:hover {
    border-bottom: 2px solid ${manatee};
  }
  &.${activeClassName} {
    border-bottom: 2px solid ${mirage};
  }
`

const Wrapper = styled.div``
