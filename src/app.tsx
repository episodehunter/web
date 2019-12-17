import React, { memo } from 'react'
import { createRouter } from 'the-react-router'
import { routes } from './components/router'
import { useUser } from './contexts/user-context'
import { SpinnerPage } from './pages/spinner.page'
import styled from 'styled-components'
import { shark } from './utils/colors'
import { Navbar } from './components/navbar/navbar'

const [Router, Routes] = createRouter(routes)

export const App = memo(() => {
  const { loadingCurrentUser, currentUser } = useUser()

  if (loadingCurrentUser) {
    return <SpinnerPage />
  }
  return (
    <Router>
      <Wrapper>
        {currentUser && (
          <>
            <Navbar />
          </>
        )}
        <Routes />
      </Wrapper>
    </Router>
  )
})

const Wrapper = styled.div`
  height: 100%;
  background-color: ${shark};
  min-height: 100%;
`
