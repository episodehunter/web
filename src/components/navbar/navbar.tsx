import React from 'react'
import { isMobile } from '../../styles/media-queries'
import { MobileNavbar } from './mobile-navbar'
import { DesktopNavbar } from './desktop-navbar'

export const Navbar = () => {
  if (isMobile()) {
    return <MobileNavbar />
  } else {
    return <DesktopNavbar />
  }
}
