import { ShowId } from '@episodehunter/types'
import { LinearProgress } from '@material-ui/core'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useGetEpisodesForSeasonLazyQuery } from '../../../dragonstone'
import { Episode } from './episode'
import { AnimatedListItem } from '../../atoms/animated-list-item'

interface Props {
  showId: ShowId
  theTvDbShowId: number
  season: number
}

export const Episodes = ({ showId, theTvDbShowId, season }: Props) => {
  const [getSeason, { loading, data }] = useGetEpisodesForSeasonLazyQuery()
  const wrapperRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    getSeason({
      variables: { season, showId }
    })
  }, [season, showId])

  if (loading || !data) {
    const height = wrapperRef.current?.getBoundingClientRect().height || 0
    return (
      <div style={{ minHeight: `${height}px` }}>
        <LinearProgress />
      </div>
    )
  }

  return (
    <Wrapper ref={wrapperRef}>
      {data.season.map((episode, i) => {
        return (
          <AnimatedListItem index={i} key={episode.episodenumber}>
            <Episode episode={episode} theTvDbShowId={theTvDbShowId} />
          </AnimatedListItem>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
