import { AppBar, Divider, styled, Tab, Tabs, Toolbar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import React, { useState } from 'react'
import { useNavigation } from 'the-react-router'
import { useUser } from '../../contexts/user-context'
import logoPath from '../../logo96.png'
import { Routes } from '../../routes'
import { colors } from '../../utils/colors'
import { SearchBar } from './search-bar'

export const DesktopNavbar = () => {
  const { navigate, state } = useNavigation()
  const { auth } = useUser()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const isMenuOpen = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const closeAndNavigate = (url: string) => () => {
    closeMenu()
    navigate(url)
  }

  const selectedTab: string | false =
    [Routes.upcoming, Routes.following].includes(state.url as any) && state.url

  return (
    <>
      <StyledAppBar>
        <StyledToolbar>
          <Logo src={logoPath} onClick={() => navigate(Routes.upcoming)} />
          <SearchWrapper>
            <StyledSearchIcon />
            <SearchBar />
          </SearchWrapper>
          <StyledTabs value={selectedTab}>
            <Tab
              value={Routes.upcoming}
              label="Upcoming"
              onClick={() => navigate(Routes.upcoming)}
            />
            <Tab
              value={Routes.following}
              label="What to watch"
              onClick={() => navigate(Routes.following)}
            />
          </StyledTabs>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} keepMounted open={isMenuOpen} onClose={closeMenu}>
            <MenuItem key={Routes.history} onClick={closeAndNavigate(Routes.history)}>
              History
            </MenuItem>
            <MenuItem key={Routes.settings} onClick={closeAndNavigate(Routes.settings)}>
              Settings
            </MenuItem>
            <MenuItem key="logout" onClick={() => auth.signOut()}>
              Logout
            </MenuItem>
            <Divider />
            <MenuItem key="contact" onClick={closeAndNavigate(Routes.contact)}>
              Contact
            </MenuItem>
            <MenuItem key="plex" onClick={closeAndNavigate(Routes.plex)}>
              Plex
            </MenuItem>
            <MenuItem key="kodi" onClick={closeAndNavigate(Routes.kodi)}>
              Kodi
            </MenuItem>
            <MenuItem key="googlehome" onClick={closeAndNavigate(Routes.googlehome)}>
              Google Home
            </MenuItem>
            <MenuItem key="faq" onClick={closeAndNavigate(Routes.faq)}>
              FAQ
            </MenuItem>
            <MenuItem key="about" onClick={closeAndNavigate(Routes.about)}>
              About
            </MenuItem>
            <MenuItem
              key="github"
              onClick={() => (window.location.href = 'https://github.com/episodehunter/web')}
            >
              Github ♥️
            </MenuItem>
          </Menu>
        </StyledToolbar>
      </StyledAppBar>
    </>
  )
}

const Logo = styled('img')({
  height: '50px',
  cursor: 'pointer'
})

const StyledToolbar = styled(Toolbar)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 50px'
})
const StyledTabs = styled(Tabs)({
  justifySelf: 'end'
})

const StyledAppBar = styled(AppBar)({
  backgroundColor: colors.backgroundColor,
  zIndex: 100
})

const SearchWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: '34px 1fr',
  backgroundColor: '#424242',
  borderRadius: '4px'
})

const StyledSearchIcon = styled(SearchIcon)({
  padding: '0 5px',
  marginTop: '3px'
})
