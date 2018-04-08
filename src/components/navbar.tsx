import * as React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { alabaster, gossamer, melrose } from '../utils/colors'
import { inject, observer } from 'mobx-react'
import { UserStore } from '../store/user'

type Props = {
  user?: UserStore
}

const NavbarComponent = ({ user }: Props) => (
  <Wrapper>
    <Item exact to="/">
      Upcoming
    </Item>
    <Item to="/following">Following</Item>
    <Item to="/popular">Popular</Item>
    <Item to="/search">Search</Item>
    <Image
      onClick={() => user!.logout()}
      src={user!.picture || 'https://episodehunter.tv/img/logga.png'}
    />
  </Wrapper>
)

export const Navbar = inject('user')(observer(NavbarComponent))

const Image = styled.img.attrs({
  src: (props: { src?: string }) => props.src
})`
  margin-top: 16px;
  margin-right: 30px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  cursor: pointer;
`

const activeClassName = 'active-link'
const Item = styled(NavLink).attrs({
  activeClassName
})`
  display: flex;
  color: ${alabaster};
  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 14px;
  margin-right: 30px;
  cursor: pointer;
  letter-spacing: 1.5px;
  &:hover {
    border-bottom: 2px solid ${melrose};
  }
  &.${activeClassName} {
    border-bottom: 2px solid ${gossamer};
  }
  margin-top: 20px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`
