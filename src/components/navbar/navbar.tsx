import { useNavigation } from '@vieriksson/the-react-router'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { media } from '../../styles/media-queries'
import { Hamburger } from '../hamburger'
import { NavbarItems } from './navbar-items'

export function Navbar() {
  const [isOpen, setOpen] = useState(false)
  const toggle = () => setOpen(!isOpen)
  const [navigate, routeState] = useNavigation()

  return (
    <>
      <Wide>
        <NavbarItems navigate={navigate} stateUrl={routeState.url} />
      </Wide>
      <Narrow open={isOpen}>
        <NarrowWrapper>
          <Hamburger open={isOpen} onToggle={toggle} />
          {isOpen && <NavbarItems navigate={navigate} stateUrl={routeState.url} />}
        </NarrowWrapper>
      </Narrow>
    </>
  )
}

const Wide = styled.div`
  justify-content: flex-end;
  ${media.giant`display: flex;`};
  ${media.desktop`display: flex;`};
  ${media.tablet`display: flex;`};
  background: linear-gradient(rgba(26, 28, 33, 0.3), rgba(0, 0, 0, 0));
  transition: background 1000ms linear;
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 3;
`

const NarrowWrapper = styled.div`
  margin: 10px;
`

const Narrow = styled.div`
  ${media.giant`display: none;`};
  ${media.desktop`display: none;`};
  ${media.tablet`display: none;`};
  display: block;

  position: fixed;
  z-index: 3;
  width: 100%;

  ${({ open }: { open: boolean }) =>
    open &&
    css`
      background-color: #1a1c21;
      -webkit-transition: background-color 150ms linear;
      -ms-transition: background-color 150ms linear;
      transition: background-color 150ms linear;
      opacity: 0.95;
    `};
`
