import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { Upcoming } from '../components/upcoming'
import { useUpcomingEpisodes } from '../global-context'
import { media } from '../styles/media-queries'
import { shark } from '../utils/colors'
import { SpinnerPage } from './spinner.page'

export const UpcomingPage = observer(() => {
  const upcomingEpisodesStore = useUpcomingEpisodes()

  if (upcomingEpisodesStore.loadingState.isLoading()) {
    return <SpinnerPage />
  }

  const upcoming = upcomingEpisodesStore.upcoming

  return (
    <Wrapper>
      <UpcomingWrapper>
        <Upcoming title={'Just aired'} showsWithEpisode={upcoming.justAired} />
        <Upcoming title={'Today'} showsWithEpisode={upcoming.today} />
        <Upcoming title={'The week ahead'} showsWithEpisode={upcoming.weekAhead} />
        <Upcoming title={'Upcoming'} showsWithEpisode={upcoming.upcoming} />
        <Upcoming title={'TBA'} showsWithEpisode={upcoming.tba} />
        <Upcoming title={'Ended'} showsWithEpisode={upcoming.ended} />
      </UpcomingWrapper>
    </Wrapper>
  )
})

const UpcomingWrapper = styled.div`
  ${media.giant`width: 80%;`};
  ${media.desktop`width: 80%;`};
  ${media.tablet`width: 90%;`};
  width: 95%;
`

const Wrapper = styled.div`
  padding-top: 70px;
  background-color: ${shark};
  display: flex;
  justify-content: center;
`
