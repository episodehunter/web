import { Navigate } from '@vieriksson/the-react-router'
import { inject } from 'mobx-react'
import React from 'react'
import { Routes } from '../../routes'
import { SearchStore } from '../../store/search.store'
import { UserStore } from '../../store/user'
import { NavbarItem } from './navbar-item'

type Props = {
  user?: UserStore
  navigate: Navigate
  stateUrl: string
  search?: SearchStore
}

const isPathEqual = (urlPath, statePath) => urlPath === statePath

export const NavbarItemsComponent = ({ search, navigate, stateUrl }: Props) => {
  return (
    <>
      <NavbarItem
        path={Routes.upcoming}
        title="Upcoming"
        selected={isPathEqual(Routes.upcoming, stateUrl)}
        onClick={() => navigate(Routes.upcoming)}
      />
      <NavbarItem
        path={Routes.following}
        title="Following"
        selected={isPathEqual(Routes.following, stateUrl)}
        onClick={() => navigate(Routes.following)}
      />
      <NavbarItem
        path={Routes.history}
        title="History"
        selected={isPathEqual(Routes.history, stateUrl)}
        onClick={() => navigate(Routes.history)}
      />
      <NavbarItem
        path={Routes.search}
        title="Search"
        selected={isPathEqual(Routes.search, stateUrl)}
        onClick={() => search!.toggleSearchBar()}
      />
      <NavbarItem
        path={Routes.settings}
        title="Settings"
        selected={isPathEqual(Routes.settings, stateUrl)}
        onClick={() => navigate(Routes.settings)}
      />
    </>
  )
}

export const NavbarItems = inject('search')(NavbarItemsComponent)
