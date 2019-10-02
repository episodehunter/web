import { ShowId } from '@episodehunter/types'
import { gql } from '@episodehunter/utils'
import { observable } from 'mobx'
import * as React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGqClient } from '../../../contexts/global-context'
import { GetEpisodesForSeasonQuery, GetEpisodesForSeasonQueryVariables } from '../../../dragonstone'
import { SeasonEpisode } from '../../../types/episode'
import { GqClient } from '../../../utils/gq-client'
import { Spinner } from '../../spinner'
import { Episode } from './episode'

interface Props {
  showId: ShowId
  season: number
}

const seasonQuery = gql`
  query GetEpisodesForSeason($showId: Int!, $season: Int!) {
    season(showId: $showId, season: $season) {
      ids {
        showId
        tvdb
      }
      aired
      name
      overview
      episodenumber
      watched {
        time
        type
      }
    }
  }
`

const showSeasons = new Map<string, Promise<SeasonEpisode[]>>()

const getSeasonEpisodes = (
  client: GqClient,
  showId: number,
  season: number
): Promise<SeasonEpisode[]> => {
  const key = `${showId}_${season}`
  const cachedShowSeasons = showSeasons.get(key)
  if (cachedShowSeasons) {
    return cachedShowSeasons
  }

  const fetching = client<GetEpisodesForSeasonQuery, GetEpisodesForSeasonQueryVariables>(
    seasonQuery,
    { showId, season }
  )
    .then(r => r.season)
    .catch(() => {
      return [] as SeasonEpisode[]
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
