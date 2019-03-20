import { Navigate } from '@vieriksson/the-react-router'
import React from 'react'
import { useAuth, useSearch } from '../../global-context'
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
        header={'Settings'}
        subItems={[
          <NavbarSubItem
            key={'change-password'}
            title="Change password"
            selected={isPathEqual(Routes.changePassword, stateUrl)}
            onClick={() => navigate(Routes.changePassword)}
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
