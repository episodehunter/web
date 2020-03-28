import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import RestoreIcon from '@material-ui/icons/Restore'
import SearchIcon from '@material-ui/icons/Search'
import React, { useState } from 'react'
import { useNavigation } from 'the-react-router'
import { useUser } from '../../contexts/user-context'
import { Routes } from '../../routes'

export const MobileNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { auth } = useUser()
  const { navigate, state } = useNavigation()
  const selectedTab: string | false = getSelectedTab(state.url)
  const onClick = (route: string) => () => {
    setDrawerOpen(false)
    navigate(route)
  }

  return (
    <>
      <BottomNavigation value={selectedTab} showLabels style={rootStyle}>
        <BottomNavigationAction
          value={Routes.upcoming}
          label="Upcoming"
          icon={<RestoreIcon />}
          onClick={onClick(Routes.upcoming)}
        />
        <BottomNavigationAction
          value={Routes.following}
          label="Favorites"
          icon={<FavoriteIcon />}
          onClick={onClick(Routes.following)}
        />
        <BottomNavigationAction
          value={Routes.search}
          label="Search"
          icon={<SearchIcon />}
          onClick={onClick(Routes.search)}
        />
        <BottomNavigationAction
          value="more"
          label="More"
          icon={<MoreVertIcon />}
          onClick={() => setDrawerOpen(true)}
        />
      </BottomNavigation>
      <Drawer anchor="bottom" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          <ListItem button>
            <ListItemText primary="History" onClick={onClick(Routes.history)} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Settings" onClick={onClick(Routes.settings)} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Logout" onClick={() => auth.signOut()} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="Contact" onClick={onClick(Routes.contact)} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Plex" onClick={onClick(Routes.plex)} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Kodi" onClick={onClick(Routes.kodi)} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Google Home" onClick={onClick(Routes.googlehome)} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="FAQ" onClick={onClick(Routes.faq)} />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="Github ♥️"
              onClick={() => (window.location.href = 'https://github.com/episodehunter/web')}
            />
          </ListItem>
          <ListItem button>
            <ListItemText primary="About" onClick={onClick(Routes.about)} />
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

const getSelectedTab = (currentUrl: string): string | false => {
  if ([Routes.upcoming, Routes.following, Routes.search].includes(currentUrl as any)) {
    return currentUrl
  } else if (currentUrl.includes('/show/')) {
    return false
  } else {
    return 'more'
  }
}

const rootStyle: React.CSSProperties = {
  bottom: 0,
  position: 'fixed',
  width: '100%',
  zIndex: 1000,
}
