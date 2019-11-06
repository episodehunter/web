import React from 'react'
import styled from 'styled-components'
import { useNavigation } from 'the-react-router'
import { useUser } from '../../contexts/user-context'
import { Routes } from '../../routes'
import { media } from '../../styles/media-queries'
import { manatee } from '../../utils/colors'

interface Props {
  hideOn?: string
  style?: React.CSSProperties
}

export const Footer = (props: Props) => {
  const { currentUser } = useUser()
  const { navigate, state } = useNavigation()

  if (props.hideOn && props.hideOn === state.url) {
    return null
  }

  let unauthedComponents: JSX.Element | null = null
  if (!currentUser) {
    unauthedComponents = (
      <>
        <FooterItem onClick={() => navigate(Routes.login)}>Login</FooterItem>
      </>
    )
  }
  return (
    <FooterWrapper style={props.style}>
      {unauthedComponents}
      <FooterItem onClick={() => navigate(Routes.about)}>©EpisodeHunter 2019</FooterItem>
      <FooterItem onClick={() => navigate(Routes.privacy)}>Privacy Policy</FooterItem>
      <FooterItem onClick={() => navigate(Routes.tos)}>Terms of Service</FooterItem>
      <FooterItem onClick={() => navigate(Routes.kodi)}>Kodi</FooterItem>
      <FooterItem onClick={() => navigate(Routes.plex)}>Plex</FooterItem>
      <FooterItem onClick={() => navigate(Routes.googlehome)}>Google Home</FooterItem>
      <FooterItem onClick={() => navigate(Routes.faq)}>FAQ</FooterItem>
      <FooterItem onClick={() => goToGithub()}>Github</FooterItem>
    </FooterWrapper>
  )
}

function goToGithub() {
  window.location.href = 'https://github.com/episodehunter/web'
}

const FooterWrapper = styled.div`
  ${media.tabletAndUp`
    display: flex;
    justify-content: space-between;
    margin: 50px;
  `}
  ${media.mobile`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 15px;
    justify-items: center;
  `}
  padding-bottom: 50px;
  z-index: 3;
  align-self: end;
`

const FooterItem = styled.div`
  font-size: 12px;
  color: ${manatee};
  cursor: pointer;
`
