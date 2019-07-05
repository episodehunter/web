import { ShowId } from '@episodehunter/types'
import { observable } from 'mobx'
import * as React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGqClient } from '../../../global-context'
import { PgClient } from '../../../utils/gq-client'
import { Spinner } from '../../spinner'
import { Episode } from './episode'
import { SeasonEpisode } from '../../../types/episode'

interface Props {
  showId: ShowId
  season: number
}

const seasonQuery = `
query season($showId: Int!, $season: Int!) {
  season(showId: $showId, season, $season) {
    ids {
      showId
      tvdb
    }
    aired
    name
    episodenumber
    watched	{
      time
      type
    }
  }
}
`

const showSeasons = new Map<string, Promise<SeasonEpisode[]>>()

const getSeasonEpisodes = (
  client: PgClient,
  showId: number,
  season: number
): Promise<SeasonEpisode[]> => {
  const key = `${showId}_${season}`
  const cachedShowSeasons = showSeasons.get(key)
  if (cachedShowSeasons) {
    return cachedShowSeasons
  }

  const fetching = client<{ season: SeasonEpisode[] }>(seasonQuery, { showId, season })
    .then(r => r.season)
    .catch(() => {
      // Do extra report here
      return []
    })
  showSeasons.set(key, fetching)
  return fetching
}

function useFetchEpisodes(showId: number, selectedSeasonNumber: number) {
  const [loading, setLoading] = useState(false)
  const [season, setSeason] = useState<SeasonEpisode[]>([])
  const client = useGqClient()
  useEffect(() => {
    let canceled = false
    setLoading(true)
    getSeasonEpisodes(client, showId, selectedSeasonNumber).then(season => {
      if (!canceled) {
        setLoading(false)
        setSeason(observable(season))
      }
    })

    return () => {
      canceled = true
    }
  }, [showId, selectedSeasonNumber])

  return [loading, season] as const
}

export const Episodes = ({ showId, season }: Props) => {
  const [loading, episodes] = useFetchEpisodes(showId, season)

  if (loading) {
    return <Spinner />
  }

  return (
    <Wrapper>
      {episodes.map(episode => {
        return <Episode key={episode.episodenumber} episode={episode} />
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
