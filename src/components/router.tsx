import * as React from 'react'
import styled from 'styled-components'
import { Fallback } from '../pages/fallback.page'
import { FollowingPage } from '../pages/following.page'
import { LoginCompletePage } from '../pages/login-complete.page'
import { LoginPage } from '../pages/login.page'
import { PopularPage } from '../pages/popular.page'
import { SearchPage } from '../pages/search.page'
import { ShowPage } from '../pages/show.page'
import { UpcomingPage } from '../pages/upcoming.page'
import { Routes } from '../routes'
import { shark } from '../utils/colors'
import { requireLogin } from '../utils/require-login'
import { Navbar } from './navbar/navbar'

type RouteComponent = any
type RouteOptions = {
  hideNavbar?: boolean
  unauthed?: boolean
}

export const routes = {
  fallback: Fallback,
  routes: [
    {
      path: Routes.upcoming,
      exact: true,
      component: RouteLayout(UpcomingPage)
    },
    {
      path: Routes.following,
      component: RouteLayout(FollowingPage)
    },
    {
      path: Routes.popular,
      component: RouteLayout(PopularPage)
    },
    {
      path: Routes.search,
      component: RouteLayout(SearchPage)
    },
    {
      path: Routes.show,
      component: RouteLayout(ShowPage)
    },
    {
      path: Routes.login,
      component: RouteLayout(LoginPage, {
        hideNavbar: true,
        unauthed: true
      })
    },
    {
      path: Routes.loginComplete,
      component: RouteLayout(LoginCompletePage, {
        hideNavbar: true,
        unauthed: true
      })
    }
  ]
}

function RouteLayout(
  component: RouteComponent,
  { hideNavbar, unauthed }: RouteOptions = {}
) {
  const RenderComponent = unauthed ? component : requireLogin<any>(component)
  return props => (
    <Wrapper>
      {!hideNavbar && <Navbar />}
      {<RenderComponent {...props} />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  background-color: ${shark};
`
