import { captureException, showReportDialog, withScope } from '@sentry/browser'
import { Component } from 'react'

export class ErrorBoundary extends Component<{}, { error: Error | null }> {
  state = {
    error: null,
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
    if (process.env.NODE_ENV === 'development') {
      alert('☠️')
    }
  }

  render() {
    if (this.state.error) {
      return null
    } else {
      return this.props.children
    }
  }
}
