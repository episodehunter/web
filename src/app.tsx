import React, { memo } from 'react'
import { createRouter } from 'the-react-router'
import { routes } from './components/router'
import { useUser } from './contexts/user-context'
import { SpinnerPage } from './pages/spinner.page'
import { Navbar } from './components/navbar/navbar'

const [Router, Routes] = createRouter(routes)

export const App = memo(() => {
  const { loadingCurrentUser, currentUser } = useUser()

  if (loadingCurrentUser) {
    return <SpinnerPage />
  }
  return (
    <Router>
      {currentUser && (
        <>
          <Navbar />
        </>
      )}
      <Routes />
    </Router>
  )
})
