import * as React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { alabaster, gossamer, melrose } from '../utils/colors'
import { inject, observer } from 'mobx-react'
import { UserStore } from '../store/user'
import { media } from '../styles/media-queries'
import { observable, action } from 'mobx'
import { Hamburger } from './hamburger'

type Props = {
  user?: UserStore
}

const NavItems = ({ user }: Props) => (
  <>
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
  </>
)

class NavbarComponent extends React.Component<Props> {
  @observable open: boolean = false

  @action
  toggle = () => {
    this.open = !this.open
  }

  render() {
    const { user } = this.props
    return (
      <>
        <Wide className="wide">
          <NavItems user={user} />
        </Wide>
        <Narrow className="narrow">
          <Hamburger open={this.open} onToggle={this.toggle} />
          {this.open && <NavItems user={user} />}
        </Narrow>
      </>
    )
  }
}

export const Navbar = inject('user')(observer(NavbarComponent))

const Wide = styled.div`
  justify-content: flex-end;
  ${media.giant`display: flex;`};
  ${media.desktop`display: flex;`};
  ${media.tablet`display: flex;`};
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`

const Narrow = styled.div`
  ${media.giant`display: none;`};
  ${media.desktop`display: none;`};
  ${media.tablet`display: none;`};
  display: block;
  margin: 20px;
`

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
  margin-right: 30px;
  height: 25px;
  cursor: pointer;
  letter-spacing: 1.5px;
  box-sizing: border-box;
  &:hover {
    border-bottom: 2px solid ${melrose};
  }
  &.${activeClassName} {
    border-bottom: 2px solid ${gossamer};
  }
  margin-top: 20px;
  ${media.giant`font-size: 14px;`};
  ${media.desktop`font-size: 13px;`};
  ${media.tablet`font-size: 12px;`};
  font-size: 11px;
`
