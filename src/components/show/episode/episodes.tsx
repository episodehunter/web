import * as React from 'react'
import styled from 'styled-components'
import { Spinner } from '../../spinner'
import { Episode } from './episode'
import { Dragonstone } from '@episodehunter/types'

type Props = {
  episodes: Dragonstone.Episode[]
  watchedEpisode: Dragonstone.WatchedEpisode.WatchedEpisode[]
  showId: string
}

export const Episodes = ({ episodes, watchedEpisode, showId }: Props) => {
  if (!episodes || !watchedEpisode) {
    return <Spinner />
  }
  return (
    <Wrapper>
      {episodes.map(episode => {
        const w = watchedEpisode.find(e => e.episodeNumber === episode.episodeNumber)
        return <Episode key={episode.tvdbId} episode={episode} watched={w} showId={showId} />
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
