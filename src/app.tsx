import { toStream } from '@tjoskar/mobx-react-util'
import { createRouter, routerEvents } from '@vieriksson/the-react-router'
import { observable, runInAction } from 'mobx'
import { observer, Provider } from 'mobx-react'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { dispatch, store } from './app-state'
import { routes } from './components/router'
import { AuthenticatedState } from './enum'
import { SpinnerPage } from './pages/spinner.page'
import { authenticated$ } from './utils/auth.util'
import { today } from './utils/date.utils'
import { composeHOC } from './utils/function.util'

routerEvents.addListener(state => dispatch.navigate(state.url))

const Router = createRouter(routes)

class AppComponent extends React.Component {
  @observable
  showSpinner = true

  constructor(props, context) {
    super(props, context)

    // Hide spinner when the user is authenticated and we have fetched the
    // following show list or the user is not authenticated (and we will
    // redirect her to login)
    authenticated$
      .pipe(
        switchMap(authenticatedState => {
          if (authenticatedState === AuthenticatedState.authenticated) {
            return toStream(() => store.following.loader.hasLoaded)
          }
          return of(true)
        })
      )
      .subscribe(hideSpinner => {
        runInAction(() => (this.showSpinner = !hideSpinner))
      })

    // Load the data when the user is authenticated
    authenticated$.subscribe(state => {
      if (state === AuthenticatedState.authenticated) {
        store.following.loadFollowingShows()
        store.titles.fetchTitles()
      }
    })
  }

  render() {
    if (this.showSpinner) {
      return <SpinnerPage />
    }
    return (
      <Provider {...store} today={today}>
        <Router />
      </Provider>
    )
  }
}

export const App = composeHOC(hot(module), observer)(AppComponent)
