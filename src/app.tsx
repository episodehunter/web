import React, { memo } from 'react'
import { createRouter } from 'the-react-router'
import { routes } from './components/router'
import { useUser } from './contexts/user-context'
import { SpinnerPage } from './pages/spinner.page'

const [Router, Routes] = createRouter(routes)

export const App = memo(() => {
  const { loadingCurrentUser } = useUser()

  if (loadingCurrentUser) {
    return <SpinnerPage />
  }
  return (
    <Router>
      <Routes />
    </Router>
  )
})
