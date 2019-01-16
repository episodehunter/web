import React, { useState } from 'react'
import styled from 'styled-components'
import { NavItem } from './navbar-item.styles'

type Props = {
  header: string
  subItems: React.ReactNode[]
}

export function NavbarItemWithSubItems({ subItems, header }: Props) {
  const [showSubItems, setShowSubItems] = useState(false)

  return (
    <Wrapper
      onMouseEnter={() => setShowSubItems(true)}
      onMouseLeave={() => setShowSubItems(false)}
    >
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
