import * as React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { requireLogin } from '../utils/require-login'
import { shark, alabaster, gossamer, melrose } from '../utils/colors'
import { NavLink } from 'react-router-dom'
import { User } from '../store/user.store'
import { Following } from '../components/following'
import { Spinner } from '../components/spinner'

type Props = {
  user?: User
}

export class HomePageComponent extends React.Component<Props> {
  componentWillMount() {
    this.props.user!.fetchFollowing()
  }

  render() {
    return (
      <Wrapper>
        <Navbar>
          <NavbarItem to="/">Following</NavbarItem>
          <NavbarItem to="/upcoming">Upcoming</NavbarItem>
          <NavbarItem to="/popular">Popular</NavbarItem>
          <NavbarItem to="/search">Search</NavbarItem>
          <Image src="https://episodehunter.tv/img/logga.png" />
        </Navbar>
        {this.props.user!.loading ? (
          <Loading>
            <Spinner />
          </Loading>
        ) : (
          <Following following={this.props.user!.following} />
        )}
      </Wrapper>
    )
  }
}

export const HomePage = requireLogin<Props>(
  inject('user')(observer(HomePageComponent))
)

const Loading = styled.div`
  text-align: center;
  margin-top: 100px;
`

const Image = styled.img.attrs({
  src: (props: { src?: string }) => props.src
})`
  margin-top: 16px;
  margin-right: 30px;
  width: 26px;
  height: 26px;
  cursor: pointer;
`

const activeClassName = 'active-link'
const NavbarItem = styled(NavLink).attrs({
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

const Navbar = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Wrapper = styled.div`
  height: 100%;
  background-color: ${shark};
`
