import { useNavigation } from '@vieriksson/the-react-router'
import React from 'react'
import styled from 'styled-components'
import { Routes } from '../../routes'
import { media } from '../../styles/media-queries'
import { manatee } from '../../utils/colors'

export const Footer = () => {
  const [navigate] = useNavigation()
  return (
    <FooterWrapper>
      <FooterItem onClick={() => navigate(Routes.about)}>©EpisodeHunter 2019</FooterItem>
      <FooterItem onClick={() => navigate(Routes.privacy)}>Privacy Policy</FooterItem>
      <FooterItem onClick={() => navigate(Routes.tos)}>Terms of Service</FooterItem>
      <FooterItem onClick={() => navigate(Routes.kodi)}>Kodi</FooterItem>
      <FooterItem onClick={() => goToGithub()}>Github</FooterItem>
    </FooterWrapper>
  )
}

function goToGithub() {
  window.location.href = 'https://github.com/episodehunter/web'
}

const FooterWrapper = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`

const FooterItem = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 12px;
  color: ${manatee};
  cursor: pointer;
  ${media.giant`margin: 0 40px;`};
  ${media.desktop`margin: 0 30px;`};
  ${media.tablet`margin: 0 20px;`};
  margin: 0 10px;
`
