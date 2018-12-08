import { Navigate } from '@vieriksson/the-react-router'
import { inject } from 'mobx-react'
import React from 'react'
import { Routes } from '../../routes'
import { SearchStore } from '../../store/search.store'
import { UserStore } from '../../store/user'
import { NavbarItem } from './navbar-item'
import { NavbarItemWithSubItems } from './navbar-item-with-sub-items'
import { NavbarSubItem } from './navbar-subitem'

type Props = {
  user?: UserStore
  navigate: Navigate
  stateUrl: string
  search?: SearchStore
}

const isPathEqual = (urlPath, statePath) => urlPath === statePath

export const NavbarItemsComponent = ({
  search,
  navigate,
  stateUrl,
  user
}: Props) => {
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
        onClick={() => search!.toggleSearchBar()}
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
            onClick={() => user!.signOut()}
          />
        ]}
      />
    </>
  )
}

export const NavbarItems = inject('search', 'user')(NavbarItemsComponent)
