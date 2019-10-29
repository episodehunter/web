import { init } from '@sentry/browser'
import React from 'react'
import ReactDOM from 'react-dom'
import SearchWorker from 'worker-loader!./web-worker/search'
import { ApolloProvider } from '@apollo/react-hooks'
import OfflinePluginRuntime from 'offline-plugin/runtime'
import { App } from './app'
import { ErrorBoundary } from './components/error-boundary'
import { config } from './config'
import { SearchProvider } from './contexts/search-context'
import { UserProvider } from './contexts/user-context'
import { client } from './apollo-client'

init({
  dsn: config.sentryDsn,
  environment: config.environment,
  enabled: config.environment !== 'development'
})

if (config.environment !== 'development') {
  OfflinePluginRuntime.install()
}

const searchWorker = new SearchWorker()

function RootApp() {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <UserProvider>
          <SearchProvider searchWorker={searchWorker}>
            <App />
          </SearchProvider>
        </UserProvider>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

ReactDOM.render(<RootApp />, document.getElementById('root'))
