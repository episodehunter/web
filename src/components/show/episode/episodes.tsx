import { ShowId } from '@episodehunter/types'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGetEpisodesForSeasonLazyQuery } from '../../../dragonstone'
import { Spinner } from '../../spinner'
import { Episode } from './episode'

interface Props {
  showId: ShowId
  season: number
}

export const Episodes = ({ showId, season }: Props) => {
  const [getSeason, { loading, data }] = useGetEpisodesForSeasonLazyQuery()
  useEffect(() => {
    getSeason({
      variables: { season, showId }
    })
  }, [season, showId])

  if (loading || !data) {
    return <Spinner />
  }

  return (
    <Wrapper>
      {data.season.map(episode => {
        return <Episode key={episode.episodenumber} episode={episode} />
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
