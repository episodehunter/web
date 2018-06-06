import * as React from 'react'
import styled from 'styled-components'
import { media } from '../../styles/media-queries'
import { manatee } from '../../utils/colors'

export const MainFooter = () => (
  <FooterWrapper>
    <FooterItem>©EpisodeHunter 2018</FooterItem>
    <FooterItem>Privacy Policy</FooterItem>
    <FooterItem>Terms of Service</FooterItem>
    <FooterItem>Kodi</FooterItem>
    <FooterItem>Plex</FooterItem>
    <FooterItem>Github</FooterItem>
  </FooterWrapper>
)

const FooterWrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
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
