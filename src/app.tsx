import firebaseApp from 'firebase/app'
import React, { useEffect, useState } from 'react'
import { createRouter } from 'the-react-router'
import { routes } from './components/router'
import { firebaseAuthConfig } from './config'
import { createLoaders } from './data-loader'
import { GlobalContext, GlobalContextProvider } from './global-context'
import { SpinnerPage } from './pages/spinner.page'
import { RootSore } from './store/root.store'
import { createAuth } from './utils/auth.util'
import { createGqClient } from './utils/gq-client'

firebaseApp.initializeApp(firebaseAuthConfig)

const [Router, Routes] = createRouter(routes)
const auth = createAuth(firebaseApp)
const rootStore = new RootSore()
const loaders = createLoaders(rootStore, auth.getIdToken)
// const rootResolver = createRouteResolver(loaders, auth)
const gqClient = createGqClient(auth.getIdToken)

const globalContext: GlobalContext = {
  rootStore,
  loaders,
  auth,
  pgClient: gqClient
}

// routerEvents.addListener(event => rootResolver(event.url))

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
      <Router>
        <Routes />
      </Router>
    </GlobalContextProvider>
  )
}
