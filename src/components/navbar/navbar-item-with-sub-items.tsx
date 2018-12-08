import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { NavItem } from './navbar-item.styles'

type Props = {
  header: string
  subItems: React.ReactNode[]
}

class NavbarItemWithSubItemsComp extends React.Component<Props> {
  @observable
  showSubItems = false

  @action
  setShowSubItems(showSubItems: boolean) {
    this.showSubItems = showSubItems
  }

  render() {
    return (
      <Wrapper
        onMouseEnter={() => this.setShowSubItems(true)}
        onMouseLeave={() => this.setShowSubItems(false)}
      >
        <NavItem selected={false}>{this.props.header}</NavItem>
        <div style={{ position: 'relative' }}>
          {this.showSubItems && (
            <SubItemsWrapper>{this.props.subItems}</SubItemsWrapper>
          )}
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const SubItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`
export const NavbarItemWithSubItems = observer(NavbarItemWithSubItemsComp)
