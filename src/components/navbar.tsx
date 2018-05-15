import * as React from 'react'
import styled from 'styled-components'
import { alabaster, gossamer, melrose, shark } from '../utils/colors'
import { inject, observer } from 'mobx-react'
import { UserStore } from '../store/user'
import { media } from '../styles/media-queries'
import { observable, action } from 'mobx'
import { Hamburger } from './hamburger'
import { withNavigation } from '../router/withNavigation'
import { Navigate } from '../router/router.types'

type Props = {
  user?: UserStore
  navigate: Navigate
}

const NavItems = ({ user, navigate }: Props) => (
  <>
    <Item onClick={() => navigate('/')}>Upcoming</Item>
    <Item onClick={() => navigate('/following')}>Following</Item>
    <Item onClick={() => navigate('/popular')}>Popular</Item>
    <Item onClick={() => navigate('/search')}>Search</Item>
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
    const { user, navigate } = this.props
    return (
      <>
        <Wide>
          <NavItems navigate={navigate} user={user} />
        </Wide>
        <Narrow>
          <InnerNarrow>
            <Hamburger open={this.open} onToggle={this.toggle} />
            {this.open && <NavItems navigate={navigate} user={user} />}
          </InnerNarrow>
        </Narrow>
      </>
    )
  }
}

export const Navbar = withNavigation(inject('user')(observer(NavbarComponent)))

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

  position: fixed;
  z-index: 1;
  background-color: ${shark};
  width: 100%;
`

const InnerNarrow = styled.div`
  padding: 20px;
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
