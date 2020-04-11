import React from 'react'
import { PageWrapper } from '../components/atoms/page-wrapper'
import { ShowListWrapper } from '../components/atoms/show-list-wrapper'
import { H1 } from '../components/atoms/typography'
import { ErrorState } from '../components/error-state'
import { ShowCard } from '../components/show-card/show-card'
import { usePopularShowsQuery } from '../dragonstone'
import { SpinnerPage } from './spinner.page'

export const PopularPage = () => {
  const { loading, error, data } = usePopularShowsQuery()

  if (error) {
    return <ErrorState />
  }

  if (loading || !data) {
    return <SpinnerPage />
  }

  return (
    <PageWrapper>
      <H1>Popular shows</H1>
      <ShowListWrapper>
        {data.popularShows.map(show => (
          <ShowCard
            key={show.ids.id}
            showId={show.ids.id}
            tvdbId={show.ids.tvdb}
            showName={show.name}
            bottomText={episodeLeftText(show.nextToWatch.numberOfEpisodesToWatch)}
          />
        ))}
      </ShowListWrapper>
    </PageWrapper>
  )
}

const episodeLeftText = (n: number) => {
  if (n === 0) {
    return `You're all caught up!`
  } else if (n === 1) {
    return `You can watch one episode`
  }
  return `You can watch ${n} episodes`
}
