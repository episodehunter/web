import { createRouter } from '@vieriksson/the-react-router'
import React from 'react'
import { of } from 'rxjs'
import { mapTo, switchMap } from 'rxjs/operators'
import { routes } from './components/router'
import { AuthenticatedState } from './enum'
import { SpinnerPage } from './pages/spinner.page'
import { setUser, UserProvider } from './store'
import { authenticated$, authStateChange$ } from './utils/auth.util'
import { followingIds$ } from './utils/firebase/selectors'
import { updateLocalUserMetadata } from './utils/firebase/util'

const Router = createRouter(routes)

export class App extends React.Component {
  state = {
    showSpinner: true
  }

  constructor(props: any, context: any) {
    super(props, context)

    // Hide spinner when the user is authenticated and we have fetched the
    // following show list or the user is not authenticated (and we will
    // redirect her to login)
    authenticated$
      .pipe(
        switchMap(authenticatedState => {
          if (authenticatedState === AuthenticatedState.authenticated) {
            return followingIds$.pipe(mapTo(false))
          }
          return of(false)
        })
      )
      .subscribe(showSpinner => {
        this.setState({ showSpinner })
      })

    authStateChange$.subscribe(currentUser => setUser({ currentUser }))

    // Load the data when the user is authenticated
    authenticated$.subscribe(state => {
      if (state === AuthenticatedState.authenticated) {
        updateLocalUserMetadata()
      }
    })
  }

  render() {
    if (this.state.showSpinner) {
      return <SpinnerPage />
    }
    return (
      <UserProvider>
        <Router />
      </UserProvider>
    )
  }
}
