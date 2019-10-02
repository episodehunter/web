import { init } from '@sentry/browser'
import ReactDOM from 'react-dom'
import SearchWorker from 'worker-loader!./web-worker/search'
import firebaseApp from 'firebase/app'
import React from 'react'
import mitt from 'mitt'
import { App } from './app'
import { firebaseAuthConfig } from './config'
import { GlobalContext, GlobalContextProvider } from './contexts/global-context'
import { UserProvider } from './contexts/user-context'
import { createAuth } from './utils/auth.util'
import { createGqClient } from './utils/gq-client'
import { ErrorBoundary } from './components/error-boundary'
import { SearchProvider } from './contexts/search-context'

init({
  dsn: 'https://3e0fa9a3f331416fbeb4058e3447e90b@sentry.io/1429500',
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV !== 'development'
})

firebaseApp.initializeApp(firebaseAuthConfig)

const auth = createAuth(firebaseApp)
const gqClient = createGqClient(auth.getIdToken)

const globalContext: GlobalContext = {
  auth,
  gqClient,
  emitter: new mitt()
}

const searchWorker = new SearchWorker()

function RootApp() {
  return (
    <ErrorBoundary>
      <GlobalContextProvider value={globalContext}>
        <UserProvider>
          <SearchProvider searchWorker={searchWorker}>
            <App />
          </SearchProvider>
        </UserProvider>
      </GlobalContextProvider>
    </ErrorBoundary>
  )
}

ReactDOM.render(<RootApp />, document.getElementById('root'))
