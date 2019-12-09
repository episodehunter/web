import React, { useState } from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { useNavigation } from 'the-react-router'
import { Routes } from '../../routes'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import SearchIcon from '@material-ui/icons/Search'
import MoreVertIcon from '@material-ui/icons/MoreVert'

export const MobileNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { navigate, state } = useNavigation()
  const selectedTab: string =
    ([Routes.upcoming, Routes.following, Routes.search].includes(state.url as any) && state.url) ||
    'more'
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
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="Get started" />
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

const rootStyle: React.CSSProperties = {
  bottom: 0,
  position: 'fixed',
  width: '100%',
  zIndex: 1000
}
