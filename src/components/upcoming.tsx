import * as React from 'react'
import styled from 'styled-components'
import { Show } from '../store/show'
import { Poster } from './poster'
import { observer } from 'mobx-react'
import { alabaster, melrose } from '../utils/colors'
import { ddmmm } from '../utils/date.utils'
import { UnstyledLink } from './unstyled-link'
import { Episode } from '../store/episode'

type Props = {
  title: string
  shows: Show[]
  previous?: boolean
}

export const UpcomingComponent = ({ title, shows, previous }: Props) => {
  if (!shows.length) {
    return null
  }
  return (
    <UpcomingWrapper>
      <Timespan>{title}</Timespan>
      <ShowsWrapper>
        {shows.map(show => (
          <ShowWrapper key={show.id} to={`/show/${show.id}`}>
            <Poster tvdbId={show.tvdbId} />
            <ShowInfoWrapper>
              <ShowName>{show.name}</ShowName>
              <EpisodeDate
                episode={previous ? show.previousEpisode : show.nextEpisode}
              />
            </ShowInfoWrapper>
          </ShowWrapper>
        ))}
      </ShowsWrapper>
    </UpcomingWrapper>
  )
}

export const Upcoming = observer(UpcomingComponent)

const EpisodeDate = ({ episode }: { episode?: Episode }) => {
  if (!episode) {
    return <EpisodeDateStyling>TBA</EpisodeDateStyling>
  } else {
    return (
      <EpisodeDateStyling>
        {ddmmm(new Date(episode.firstAired))}
      </EpisodeDateStyling>
    )
  }
}

const ShowName = styled.div`
  font-size: 12px;
`

const EpisodeDateStyling = styled.div`
  font-size: 14px;
`

const ShowInfoWrapper = styled.div`
  color: ${alabaster};
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-size: 12px;
  margin: 5px 0 10px 0;
  padding-right: 10px;
  text-align: right;
  border-right: 2px solid ${melrose};
`
const ShowWrapper = styled(UnstyledLink)`
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
