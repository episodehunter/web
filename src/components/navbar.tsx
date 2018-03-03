import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Navbar = () => (
  <Nav>
    <Item>
      <Link to="/">Home</Link>
    </Item>
    <Item>
      <Link to="/shows">Shows</Link>
    </Item>
  </Nav>
)

const Nav = styled.nav`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
  padding: 20px 0;
`

const Item = styled.div``
