import { Navigate } from '@vieriksson/the-react-router'
import React from 'react'
import styled from 'styled-components'
import { Routes } from '../../routes'
import { UserStore } from '../../store/user'
import { NavbarItem } from './navbar-item'

type Props = {
  user?: UserStore
  navigate: Navigate
  stateUrl: string
}

const items = [
  {
    path: Routes.upcoming,
    title: 'Upcoming'
  },
  {
    path: Routes.following,
    title: 'Following'
  },
  {
    path: Routes.popular,
    title: 'Popular'
  },
  {
    path: Routes.search,
    title: 'Search'
  }
]

const isPathEqual = (urlPath, statePath) => urlPath === statePath

export const NavbarItems = ({ user, navigate, stateUrl }: Props) => {
  return (
    <>
      {items.map(item => (
        <NavbarItem
          key={item.path}
          navigate={navigate}
          path={item.path}
          title={item.title}
          selected={isPathEqual(item.path, stateUrl)}
        />
      ))}
      <Image
        onClick={() => user!.logout()}
        src={user!.picture || 'https://episodehunter.tv/img/logga.png'}
      />
    </>
  )
}

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
