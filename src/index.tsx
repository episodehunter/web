import { ApolloProvider } from '@apollo/client'
import { Snackbar } from '@material-ui/core'
import { init } from '@sentry/browser'
import React from 'react'
import ReactDOM from 'react-dom'
import SearchWorker from 'worker-loader!./web-worker/search'
import { client } from './apollo-client'
import { App } from './app'
import { Button } from './components/atoms/button'
import { Margin } from './components/atoms/margin'
import { ErrorBoundary } from './components/error-boundary'
import { Theme } from './components/theme'
import { config } from './config'
import { SearchProvider } from './contexts/search-context'
import { UserProvider } from './contexts/user-context'
import './favicon.ico'
import './logo.png'
import { useServiceWorker } from './utils/use-serviceworker'

init({
  dsn: config.sentryDsn,
  environment: config.environment,
  enabled: config.environment !== 'development',
})

const searchWorker = new SearchWorker()

function RootApp() {
  const [showSnackbar, updateSw, ignore] = useServiceWorker()

  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <UserProvider>
          <SearchProvider searchWorker={searchWorker}>
            <Theme>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={showSnackbar}
                message={<span>There is a new version</span>}
                action={[
                  <Button key="dissmis" type="secondary" size="xsmall" onClick={ignore}>
                    Dissmis
                  </Button>,
                  <Margin key="margin" inline right={8} />,
                  <Button key="update" size="xsmall" onClick={updateSw}>
                    Update to latest version
                  </Button>,
                ]}
              />
              <App />
            </Theme>
          </SearchProvider>
        </UserProvider>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

ReactDOM.render(<RootApp />, document.getElementById('root'))
