import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { Following } from '../components/following'
import { useWhatToWatch } from '../global-context'
import { shark } from '../utils/colors'
import { SpinnerPage } from './spinner.page'

export const FollowingPage = observer(() => {
  const whatToWatch = useWhatToWatch()

  if (whatToWatch.loadingState.isLoading()) {
    return <SpinnerPage />
  }
  return (
    <Wrapper>
      <Following following={whatToWatch.whatToWatch} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  background-color: ${shark};
  display: flex;
  justify-content: center;
  padding-top: 70px;
`
