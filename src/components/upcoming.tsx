import * as React from 'react'
import styled from 'styled-components'
import { Show } from '../store/show'
import { Poster } from './poster'
import { observer } from 'mobx-react'

type Props = {
  title: string
  shows: Show[]
}

export const UpcomingComponent = ({ title, shows }: Props) => {
  if (!shows.length) {
    return null
  }
  return (
    <UpcomingWrapper>
      <Timespan>{title}</Timespan>
      <ShowsWrapper>
        {shows!.map(show => (
          <ShowWrapper key={show.id}>
            <Poster tvdbId={show.tvdbId} />
          </ShowWrapper>
        ))}
      </ShowsWrapper>
    </UpcomingWrapper>
  )
}

export const Upcoming = observer(UpcomingComponent)

const ShowWrapper = styled.div`
  margin: 10px 20px 20px 0;
`
const ShowsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`
const UpcomingWrapper = styled.div`
  margin-bottom: 40px;
`

const Timespan = styled.h1`
  font-family: 'Lato', sans-serif;
  color: white;
  text-transform: uppercase;
  font-size: 14px;
`
