import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { EmptyState } from '../../components/empty-state'
import { ErrorState } from '../../components/error-state'
import { Following } from '../../components/following'
import { shark } from '../../utils/colors'
import { SpinnerPage } from '../spinner.page'
import { useFollowing } from './use-following'

export const FollowingPage = observer(() => {
  const [shows, isLoading, hasError] = useFollowing()

  if (hasError) {
    return <ErrorState />
  }

  if (isLoading) {
    return <SpinnerPage />
  }

  if (shows.length === 0) {
    return <EmptyState />
  }

  return (
    <Wrapper>
      <Following shows={shows} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  background-color: ${shark};
  display: flex;
  justify-content: center;
  padding-top: 70px;
`
