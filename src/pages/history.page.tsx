import React, { useState } from 'react'
import { styled } from '@material-ui/core'
import { useNavigation } from 'the-react-router'
import { PageWrapper } from '../components/atoms/page-wrapper'
import { EmptyHistory } from '../components/empty-state'
import { BottomContentOnImage } from '../components/episode/bottom-content-on-image'
import { EpisodeImage } from '../components/episode/episode-image'
import { ErrorState } from '../components/error-state'
import { H1, H3, Body2 } from '../components/atoms/typography'
import { Button } from '../components/atoms/button'
import { Margin } from '../components/atoms/margin'
import { useGetHistoryPageQuery } from '../dragonstone'
import { isMobile } from '../styles/media-queries'
import { History } from '../types/history'
import { format, time } from '../utils/date.utils'
import { episodeNumberToString } from '../utils/episode.util'
import { SpinnerPage } from './spinner.page'

export const HistoryPage = () => {
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const { data, error, loading, fetchMore } = useGetHistoryPageQuery({
    variables: {
      page: 0
    }
  })
  const { navigate } = useNavigation()
  const loadMore = () => {
    setLoadingMore(true)
    return fetchMore({
      variables: { page },
      updateQuery(prev, { fetchMoreResult }) {
        if (!fetchMoreResult || fetchMoreResult.history.length === 0) {
          setHasMore(false)
          return prev
        } else {
          setPage(page + 1)
          return Object.assign({}, prev, { history: [...prev.history, ...fetchMoreResult.history] })
        }
      }
    }).finally(() => setLoadingMore(false))
  }

  console.log(loadingMore)

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
              onClick={() => navigate(`/show/${show.ids.id}/${show.ids.tvdb}`, null)}
            >
              <EpisodeImage
                theTvDbShowId={show.ids.tvdb}
                tvdbId={episode.ids.tvdb}
                width={isMobile() ? '100%' : undefined}
              >
                <BottomContentOnImage>
                  <Body2>
                    {show.name}
                    <br />
                    {episodeNumberToString(episode.episodenumber)} {episode.name}
                    <br />
                    {time(new Date(h.watchedEpisode.time * 1000))}
                  </Body2>
                </BottomContentOnImage>
              </EpisodeImage>
            </ImageWarpper>
          )
        })}
      </EpisodeGrid>
    </React.Fragment>
  ))
  return (
    <PageWrapper>
      <H1>History</H1>
      {episodesSections}
      {hasMore && (
        <Margin bottom={20} top={20} style={{ textAlign: 'center' }}>
          <Button size="big" progress={loadingMore} onClick={loadMore}>
            Load more
          </Button>
        </Margin>
      )}
    </PageWrapper>
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

const EpisodeGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gridGap: '20px',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(4, 1fr)'
  }
}))

const ImageWarpper = styled('div')({
  cursor: 'pointer'
})
