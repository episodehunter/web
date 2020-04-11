import { lazy } from 'react'
import { AuthAction } from '../pages/auth-action.page'
import { Fallback } from '../pages/fallback.page'
import { FollowingPage } from '../pages/following.page'
import { ForgotPassword } from '../pages/forgot-password.page'
import { HistoryPage } from '../pages/history.page'
import { LandingPage } from '../pages/landing-page'
import { LoginPage } from '../pages/login.page'
import { PopularPage } from '../pages/popular.page'
import { SearchPage } from '../pages/search.page'
import { SettingsPage } from '../pages/settings.page'
import { ShowPage } from '../pages/show.page'
import { UpcomingPage } from '../pages/upcoming.page'
import { Routes } from '../routes'
import { lazyloadComponent } from '../utils/lazyload-page'
import { requireLogin } from '../utils/require-login'

export const routes = {
  fallback: Fallback,
  routes: [
    {
      path: Routes.upcoming,
      exact: true,
      component: requireLogin(UpcomingPage),
    },
    {
      path: Routes.following,
      component: requireLogin(FollowingPage),
    },
    {
      path: Routes.popular,
      component: requireLogin(PopularPage),
    },
    {
      path: Routes.history,
      component: requireLogin(HistoryPage),
    },
    {
      path: Routes.settings,
      component: requireLogin(SettingsPage),
    },
    {
      path: Routes.show,
      component: requireLogin(ShowPage),
    },
    {
      path: Routes.search,
      component: requireLogin(SearchPage),
    },
    {
      path: Routes.login,
      component: LoginPage,
    },
    {
      path: Routes.forgotPassword,
      component: ForgotPassword,
    },
    {
      path: Routes.landingPage,
      component: LandingPage,
    },
    {
      path: Routes.authAction,
      component: AuthAction,
    },
    {
      path: Routes.about,
      component: lazyloadComponent(lazy(() => import('../pages/static/about.page'))),
    },
    {
      path: Routes.privacy,
      component: lazyloadComponent(lazy(() => import('../pages/static/privacy.page'))),
    },
    {
      path: Routes.tos,
      component: lazyloadComponent(lazy(() => import('../pages/static/tos.page'))),
    },
    {
      path: Routes.kodi,
      component: lazyloadComponent(lazy(() => import('../pages/static/kodi.page'))),
    },
    {
      path: Routes.plex,
      component: lazyloadComponent(lazy(() => import('../pages/static/plex.page'))),
    },
    {
      path: Routes.googlehome,
      component: lazyloadComponent(lazy(() => import('../pages/static/googlehome.page'))),
    },
    {
      path: Routes.faq,
      component: lazyloadComponent(lazy(() => import('../pages/static/faq.page'))),
    },
    {
      path: Routes.contact,
      component: lazyloadComponent(lazy(() => import('../pages/static/contact.page'))),
    },
  ],
}
