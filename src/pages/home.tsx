import * as React from 'react'
import styled from 'styled-components'
import { inject } from 'mobx-react'
import { ShowStore } from '../store/show.store'
import { auth } from '../auth'
import { requireLogin } from '../utils/require-login'
import { shark, alabaster, manatee, gossamer } from '../utils/colors'
import { NavLink } from 'react-router-dom'

type Props = {
  showStore?: ShowStore
}

export class HomePageComponent extends React.Component<Props> {
  componentWillMount() {
    if (auth.isAuthenticated()) {
      // this.props.showStore!.shows[0].fetchEpisodes()
    }
  }

  render() {
    return (
      <Wrapper>
        <Navbar>
          <NavbarItem to="/upcoming">Upcoming</NavbarItem>
          <NavbarItem to="/popular">Popular</NavbarItem>
          <NavbarItem to="/search">Search</NavbarItem>
          <Image src="https://episodehunter.tv/img/logga.png" />
        </Navbar>
        {this.props.showStore!.shows[0].episodes.length}
      </Wrapper>
    )
  }
}

export const HomePage = requireLogin<Props>(
  inject('showStore')(HomePageComponent)
)

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
    border-bottom: 2px solid ${gossamer};
  }
  &.${activeClassName} {
    border-bottom: 2px solid ${manatee};
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
