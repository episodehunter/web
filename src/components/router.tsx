import { AuthAction } from '../pages/auth-action.page'
import { Fallback } from '../pages/fallback.page'
import { FollowingPage } from '../pages/following.page'
import { HistoryPage } from '../pages/history.page'
import { LoginPage } from '../pages/login.page'
import { SettingsPage } from '../pages/settings.page'
import { ShowPage } from '../pages/show.page'
import { AboutPage } from '../pages/static/about.page'
import { FaqPage } from '../pages/static/faq.page'
import { GoogleHome } from '../pages/static/googlehome.page'
import { KodiPage } from '../pages/static/kodi.page'
import { PlexPage } from '../pages/static/plex.page'
import { PrivacyPage } from '../pages/static/privacy.page'
import { TosPage } from '../pages/static/tos.page'
import { UpcomingPage } from '../pages/upcoming.page'
import { LandingPage } from '../pages/landing-page'
import { ForgotPassword } from '../pages/forgot-password.page'
import { Routes } from '../routes'
import { requireLogin } from '../utils/require-login'

export const routes = {
  fallback: Fallback,
  routes: [
    {
      path: Routes.upcoming,
      exact: true,
      component: requireLogin(UpcomingPage)
    },
    {
      path: Routes.following,
      component: requireLogin(FollowingPage)
    },
    {
      path: Routes.history,
      component: requireLogin(HistoryPage)
    },
    {
      path: Routes.settings,
      component: requireLogin(SettingsPage)
    },
    {
      path: Routes.show,
      component: requireLogin(ShowPage)
    },
    {
      path: Routes.login,
      component: LoginPage
    },
    {
      path: Routes.forgotPassword,
      component: ForgotPassword
    },
    {
      path: Routes.landingPage,
      component: LandingPage
    },
    {
      path: Routes.authAction,
      component: AuthAction
    },
    {
      path: Routes.about,
      component: AboutPage
    },
    {
      path: Routes.privacy,
      component: PrivacyPage
    },
    {
      path: Routes.tos,
      component: TosPage
    },
    {
      path: Routes.kodi,
      component: requireLogin(KodiPage)
    },
    {
      path: Routes.plex,
      component: requireLogin(PlexPage)
    },
    {
      path: Routes.googlehome,
      component: GoogleHome
    },
    {
      path: Routes.faq,
      component: FaqPage
    }
  ]
}
