import { createRouter, routerEvents } from '@vieriksson/the-react-router'
import React, { useEffect, useState } from 'react'
import { routes } from './components/router'
import { createLoaders, createRouteResolver } from './data-loader'
import { GlobalContext, GlobalContextProvider } from './global-context'
import { SpinnerPage } from './pages/spinner.page'
import { UserProvider } from './store'
import { RootSore } from './store/root-store'
import { auth, authStateChange$ } from './utils/auth.util'

const Router = createRouter(routes)

const rootStore = new RootSore()
const loaders = createLoaders(rootStore, auth.getIdToken)
const rootResolver = createRouteResolver(loaders)

const globalContext: GlobalContext = {
  rootStore,
  loaders
}

;(window as any).oskar = rootStore

routerEvents.addListener(event => rootResolver(event.url))

export function App() {
  const [showSpinner, setShowSpinner] = useState(true)
  useEffect(() => {
    const searchDispose = loaders.searchLoader.subscribe()
    const authSubscription = authStateChange$.subscribe(currentUser => {
      globalContext.rootStore.user.setUser(currentUser)
      setShowSpinner(false)
    })
    return () => {
      authSubscription.unsubscribe()
      searchDispose()
    }
  }, [])

  if (showSpinner) {
    return <SpinnerPage />
  }
  return (
    <GlobalContextProvider value={globalContext}>
      <UserProvider>
        <Router />
      </UserProvider>
    </GlobalContextProvider>
  )
}
