import { useNavigation } from '@vieriksson/the-react-router'
import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { EmptyHistory } from '../components/empty-state'
import { BottomTextWrapper } from '../components/episode/bottom-text-wrapper'
import { EpisodeImage } from '../components/episode/episode-image'
import { H1, H3, P2 } from '../components/text'
import { useHistoryPage } from '../global-context'
import { isMobile, media } from '../styles/media-queries'
import { shark } from '../utils/colors'
import { time } from '../utils/date.utils'
import { composeSeasonAndEpisodeNumber } from '../utils/episode.util'
import { SpinnerPage } from './spinner.page'

export const HistoryPage = observer(() => {
  const historyPageStore = useHistoryPage()
  const [navigate] = useNavigation()

  if (historyPageStore.loadingState.isLoading()) {
    return <SpinnerPage />
  }

  if (!historyPageStore.hasHistory) {
    return <EmptyHistory />
  }

  const episodesSections = historyPageStore.groupedHistory.map(([dateString, history]) => (
    <React.Fragment key={dateString}>
      <H3>{dateString}</H3>
      <EpisodeGrid>
        {history.map((h, index) => (
          <ImageWarpper key={index} onClick={() => navigate('/show/' + h.show.ids.id)}>
            <EpisodeImage tvdbId={h.episode.tvdbId} width={isMobile() ? '100%' : undefined}>
              <BottomTextWrapper>
                <P2 margin={0}>
                  {composeSeasonAndEpisodeNumber(h.watchedEpisode.season, h.watchedEpisode.episode)}{' '}
                  {h.episode.name}
                </P2>
                <P2 margin={0}>{time(h.watchedEpisode.time)}</P2>
              </BottomTextWrapper>
            </EpisodeImage>
          </ImageWarpper>
        ))}
      </EpisodeGrid>
    </React.Fragment>
  ))
  return (
    <Wrapper>
      <InnerWarpper>
        <>
          <H1>History</H1>
          {episodesSections}
        </>
      </InnerWarpper>
    </Wrapper>
  )
})

const EpisodeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  ${media.tabletAndUp`grid-template-columns: repeat(4, 1fr);`};
  grid-gap: 20px;
`

const Wrapper = styled.div`
  padding-top: 70px;
  background-color: ${shark};
  display: flex;
  justify-content: center;
`

const InnerWarpper = styled.div`
  width: 95%;
  ${media.giant`width: 80%;`};
  ${media.desktop`width: 80%;`};
  ${media.tablet`width: 90%;`};
`

const ImageWarpper = styled.div`
  cursor: pointer;
`