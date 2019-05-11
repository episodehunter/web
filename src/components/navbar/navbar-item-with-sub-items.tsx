import React, { useState } from 'react'
import styled from 'styled-components'
import { NavItem } from './navbar-item.styles'
import { isMobile } from '../../styles/media-queries'

type Props = {
  header: string
  subItems: React.ReactNode[]
}

const didUseMobile = isMobile()

export function NavbarItemWithSubItems({ subItems, header }: Props) {
  const [showSubItems, setShowSubItems] = useState(false)

  if (didUseMobile) {
    return (
      <Wrapper style={{ position: 'relative' }}>
        <SubItemsWrapper>{subItems}</SubItemsWrapper>
      </Wrapper>
    )
  }

  return (
    <Wrapper onMouseEnter={() => setShowSubItems(true)} onMouseLeave={() => setShowSubItems(false)}>
      <NavItem selected={false}>{header}</NavItem>
      <div style={{ position: 'relative' }}>
        {showSubItems && <SubItemsWrapper>{subItems}</SubItemsWrapper>}
      </div>
    </Wrapper>
  )
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
