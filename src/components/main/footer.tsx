import React from 'react'
import { useNavigation } from 'the-react-router'
import { Routes } from '../../routes'
import { manatee } from '../../utils/colors'
import { styled } from '@material-ui/core'

export const Footer = () => {
  const { navigate } = useNavigation()

  return (
    <FooterWrapper>
      <FooterItem onClick={() => navigate(Routes.login)}>Login</FooterItem>
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

const FooterWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 50
  },
  [theme.breakpoints.down('sm')]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    rowGap: '15px',
    justifyItems: 'center',
    marginBottom: '40px'
  },
  padding: 0,
  alignSelf: 'end',
  zIndex: 3
}))

const FooterItem = styled('div')({
  fontSize: 12,
  color: manatee,
  cursor: 'pointer'
})
