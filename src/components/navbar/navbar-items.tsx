import React, { useState, useEffect } from 'react'
import { Navigate } from 'the-react-router'
import { useAuth, useSearch, useUser } from '../../global-context'
import { Routes } from '../../routes'
import { NavbarItem } from './navbar-item'
import { NavbarItemWithSubItems } from './navbar-item-with-sub-items'
import { NavbarSubItem } from './navbar-subitem'

type Props = {
  navigate: Navigate
  stateUrl: string
}

export const NavbarItems = ({ navigate, stateUrl }: Props) => {
  const searchStore = useSearch()
  const auth = useAuth()
  const user = useUser()
  const [username, setUsername] = useState('')
  useEffect(() => {
    user.getMetadata().then(metadata => setUsername(metadata.username))
  }, [])

  return (
    <>
      <NavbarItem
        title="Upcoming"
        selected={isPathEqual(Routes.upcoming, stateUrl)}
        onClick={() => navigate(Routes.upcoming)}
      />
      <NavbarItem
        title="Following"
        selected={isPathEqual(Routes.following, stateUrl)}
        onClick={() => navigate(Routes.following)}
      />
      <NavbarItem
        title="History"
        selected={isPathEqual(Routes.history, stateUrl)}
        onClick={() => navigate(Routes.history)}
      />
      <NavbarItem
        title="Search"
        selected={isPathEqual(Routes.search, stateUrl)}
        onClick={() => searchStore.openSearchBar()}
      />
      <NavbarItemWithSubItems
        header={username}
        subItems={[
          <NavbarSubItem
            key={'settings'}
            title="Settings"
            selected={isPathEqual(Routes.settings, stateUrl)}
            onClick={() => navigate(Routes.settings)}
          />,
          <NavbarSubItem
            key={'logout'}
            title="Logout"
            selected={false}
            onClick={() => auth.signOut()}
          />
        ]}
      />
    </>
  )
}

const isPathEqual = (urlPath: string, statePath: string) => urlPath === statePath
