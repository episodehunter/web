import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigation } from 'the-react-router'
import InfiniteScroll from 'react-infinite-scroller'
import { EmptyHistory } from '../components/empty-state'
import { BottomTextWrapper } from '../components/episode/bottom-text-wrapper'
import { EpisodeImage } from '../components/episode/episode-image'
import { ErrorState } from '../components/error-state'
import { H1, H3, P2 } from '../components/text'
import { useGetHistoryPageQuery } from '../dragonstone'
import { isMobile, media } from '../styles/media-queries'
import { History } from '../types/history'
import { shark } from '../utils/colors'
import { format, time } from '../utils/date.utils'
import { episodeNumberToString } from '../utils/episode.util'
import { SpinnerPage } from './spinner.page'
import { Spinner } from '../components/spinner'

export const HistoryPage = () => {
  const [hasMore, setHasMore] = useState(true)
  const { data, error, loading, fetchMore } = useGetHistoryPageQuery({
    variables: {
      page: 0
    }
  })
  const { navigate } = useNavigation()
  const loadMore = (page: number) => {
    return fetchMore({
      variables: { page },
      updateQuery(prev, { fetchMoreResult }) {
        if (!fetchMoreResult || fetchMoreResult.history.length === 0) {
          setHasMore(false)
          return prev
        } else {
          return Object.assign({}, prev, { history: [...prev.history, ...fetchMoreResult.history] })
        }
      }
    })
  }

  if (error) {
    return <ErrorState />
  }

  if (loading || !data) {
    return <SpinnerPage />
  }

  const history = groupedHistory(data.history)

  if (history.length === 0) {
    return <EmptyHistory />
  }

  const episodesSections = history.map(([dateString, history]) => (
    <React.Fragment key={dateString}>
      <H3>{dateString}</H3>
      <EpisodeGrid>
        {history.map((h, index) => {
          const show = h.show
          const episode = h.episode
          if (!show || !episode) {
            return null
          }
          return (
            <ImageWarpper
              key={index}
              onClick={() => navigate(`/show/${show.ids.id}/${show.ids.tvdb}`)}
            >
              <EpisodeImage tvdbId={episode.ids.tvdb} width={isMobile() ? '100%' : undefined}>
                <BottomTextWrapper>
                  <P2 margin={0}>{show.name}</P2>
                  <P2 margin={0}>
                    {episodeNumberToString(episode.episodenumber)} {episode.name}
                  </P2>
                  <P2 margin={0}>{time(new Date(h.watchedEpisode.time * 1000))}</P2>
                </BottomTextWrapper>
              </EpisodeImage>
            </ImageWarpper>
          )
        })}
      </EpisodeGrid>
    </React.Fragment>
  ))
  return (
    <Wrapper>
      <InnerWarpper>
        <>
          <H1>History</H1>
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={hasMore}
            loader={<Spinner style={{ margin: 0 }} key="spinner" />}
          >
            {episodesSections}
          </InfiniteScroll>
        </>
      </InnerWarpper>
    </Wrapper>
  )
}

function groupedHistory(historyList: History[]) {
  const historyGroup = new Map<string, History[]>()
  for (const history of historyList) {
    const dateString = format(new Date(history.watchedEpisode.time * 1000), 'eeee, do MMM yyyy')
    const existingGroup = historyGroup.get(dateString)
    if (!existingGroup) {
      historyGroup.set(dateString, [history])
    } else {
      existingGroup.push(history)
    }
  }
  return Array.from(historyGroup.entries())
}

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
