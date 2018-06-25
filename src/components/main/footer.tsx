import * as React from 'react'
import { Navigate, withNavigation } from '@vieriksson/the-react-router'
import styled from 'styled-components'
import { media } from '../../styles/media-queries'
import { manatee } from '../../utils/colors'
import { Routes } from '../../routes'

type Props = {
  navigate: Navigate
}

const FooterComponent = ({ navigate }: Props) => (
  <FooterWrapper>
    <FooterItem onClick={() => navigate(Routes.about)}>
      ©EpisodeHunter 2018
    </FooterItem>
    <FooterItem onClick={() => navigate(Routes.privacy)}>
      Privacy Policy
    </FooterItem>
    <FooterItem onClick={() => navigate(Routes.tos)}>
      Terms of Service
    </FooterItem>
    <FooterItem onClick={() => navigate(Routes.kodi)}>Kodi</FooterItem>
    <FooterItem onClick={() => navigate(Routes.plex)}>Plex</FooterItem>
    <FooterItem onClick={() => goToGithub()}>Github</FooterItem>
  </FooterWrapper>
)

export const Footer = withNavigation(FooterComponent)

function goToGithub() {
  window.location.href = 'https://github.com/episodehunter/web'
}

const FooterWrapper = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
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
