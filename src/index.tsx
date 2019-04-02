import { captureException, init, showReportDialog, withScope } from '@sentry/browser'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'

init({
  dsn: 'https://3e0fa9a3f331416fbeb4058e3447e90b@sentry.io/1429500',
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV !== 'development'
})

class ErrorBoundary extends Component<{}, { error: Error | null }> {
  state = {
    error: null
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({ error })
    withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      captureException(error)
    })
    showReportDialog()
  }

  render() {
    if (this.state.error) {
      return null
    } else {
      return this.props.children
    }
  }
}

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
)
