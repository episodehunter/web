import { Navigate } from '@vieriksson/the-react-router'
import { inject } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Routes } from '../../routes'
import { SearchStore } from '../../store/search.store'
import { UserStore } from '../../store/user'
import { NavbarItem } from './navbar-item'

type Props = {
  user?: UserStore
  navigate: Navigate
  stateUrl: string
  search: SearchStore
}

const isPathEqual = (urlPath, statePath) => urlPath === statePath

export const NavbarItemsComponent = ({
  user,
  search,
  navigate,
  stateUrl
}: Props) => {
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
        path={Routes.popular}
        title="Popular"
        selected={isPathEqual(Routes.popular, stateUrl)}
        onClick={() => navigate(Routes.popular)}
      />
      <NavbarItem
        path={Routes.search}
        title="Search"
        selected={isPathEqual(Routes.search, stateUrl)}
        onClick={() => search.toggleShow()}
      />
      <Image
        onClick={() => user!.signOut()}
        src={'https://episodehunter.tv/img/logga.png'}
      />
    </>
  )
}

export const NavbarItems = inject('search')(NavbarItemsComponent)

const Image = styled.img.attrs({
  src: (props: { src?: string }) => props.src
})`
  margin-top: 16px;
  margin-right: 30px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  cursor: pointer;
`
