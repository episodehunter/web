import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { UserStore } from '../../store/user'
import { media } from '../../styles/media-queries'
import { shark } from '../../utils/colors'
import { Hamburger } from '../hamburger'
import { NavbarItems } from './navbar-items'
import { Navigate, RouterState } from '@vieriksson/the-react-router/dist/types'
import { withNavigation } from '@vieriksson/the-react-router'

type Props = {
  user?: UserStore
  navigate: Navigate
  state: RouterState
}

class NavbarComponent extends React.Component<Props> {
  @observable open: boolean = false

  @action
  toggle = () => {
    this.open = !this.open
  }

  render() {
    const {
      user,
      navigate,
      state: { url }
    } = this.props
    return (
      <>
        <Wide>
          <NavbarItems navigate={navigate} stateUrl={url} user={user} />
        </Wide>
        <Narrow>
          <InnerNarrow>
            <Hamburger open={this.open} onToggle={this.toggle} />
            {this.open && (
              <NavbarItems navigate={navigate} user={user} stateUrl={url} />
            )}
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
