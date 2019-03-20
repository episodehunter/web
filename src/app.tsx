import { createRouter, routerEvents } from '@vieriksson/the-react-router'
import firebaseApp from 'firebase/app'
import React, { useEffect, useState } from 'react'
import { routes } from './components/router'
import { firebaseAuthConfig } from './config'
import { createLoaders, createRouteResolver } from './data-loader'
import { GlobalContext, GlobalContextProvider } from './global-context'
import { SpinnerPage } from './pages/spinner.page'
import { Routes } from './routes'
import { RootSore } from './store/root.store'
import { createAuth } from './utils/auth.util'

firebaseApp.initializeApp(firebaseAuthConfig)

const Router = createRouter(routes)
const auth = createAuth(firebaseApp)
const rootStore = new RootSore()
const loaders = createLoaders(rootStore, auth.getIdToken)
const rootResolver = createRouteResolver(loaders, auth)

const globalContext: GlobalContext = {
  rootStore,
  loaders,
  auth
}

routerEvents.addListener((event: { url: Routes }) => rootResolver(event.url))

export function App() {
  const [showSpinner, setShowSpinner] = useState(true)
  useEffect(() => {
    const searchDispose = loaders.searchLoader.subscribe()
    const authDispose = auth.authStateChange$(currentUser => {
      globalContext.rootStore.user.setUser(currentUser)
      setShowSpinner(false)
    }, console.error)
    return () => {
      authDispose()
      searchDispose()
    }
  }, [])

  if (showSpinner) {
    return <SpinnerPage />
  }
  return (
    <GlobalContextProvider value={globalContext}>
      <Router />
    </GlobalContextProvider>
  )
}
