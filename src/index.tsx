import { ApolloProvider } from '@apollo/react-hooks'
import { init } from '@sentry/browser'
import React from 'react'
import ReactDOM from 'react-dom'
import SearchWorker from 'worker-loader!./web-worker/search'
import { Theme } from './components/theme'
import { client } from './apollo-client'
import { App } from './app'
import { ErrorBoundary } from './components/error-boundary'
import { config } from './config'
import { SearchProvider } from './contexts/search-context'
import { UserProvider } from './contexts/user-context'
import './favicon.ico'
import './logo.png'

init({
  dsn: config.sentryDsn,
  environment: config.environment,
  enabled: config.environment !== 'development'
})

if (config.environment !== 'development') {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

const searchWorker = new SearchWorker()

function RootApp() {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <UserProvider>
          <SearchProvider searchWorker={searchWorker}>
            <Theme>
              <App />
            </Theme>
          </SearchProvider>
        </UserProvider>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

ReactDOM.render(<RootApp />, document.getElementById('root'))
