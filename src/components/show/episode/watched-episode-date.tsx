import { observer } from 'mobx-react-lite'
import React from 'react'
import { WatchedEpisode } from '../../../types/episode'
import { dateReleaseFormat, format } from '../../../utils/date.utils'
import { BottomTextWrapper } from '../../episode/bottom-text-wrapper'
import { P } from '../../text'

interface Props {
  watched: WatchedEpisode[]
}

export const WatchedEpisodeDate = observer(({ watched }: Props) => {
  const latestWatched = getLatestWatchInfo(watched)
  if (!latestWatched) {
    return null
  }
  const time = new Date(latestWatched.time * 1000)
  return (
    <BottomTextWrapper>
      <P margin={0} title={`You wached this episode at ${format(time, 'Do MMM YYYY')}`}>
        <i style={textStyle} className="material-icons">
          check_circle_outline
        </i>{' '}
        {dateReleaseFormat(time)}
      </P>
    </BottomTextWrapper>
  )
})

function getLatestWatchInfo(watched: WatchedEpisode[]): WatchedEpisode | null {
  if (watched.length === 0) {
    return null
  }
  return watched.reduce((prev, curr) => {
    return prev.time > curr.time ? prev : curr
  })
}

const textStyle = {
  color: '#35e035',
  fontSize: 'inherit'
}
