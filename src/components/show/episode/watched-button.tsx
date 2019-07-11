import { observer } from 'mobx-react-lite'
import React, { useCallback, useState, useEffect } from 'react'
import { useEpisodeMutaion } from '../../../mutate/use-episode-mutation'
import { SeasonEpisode } from '../../../types/episode'
import { melrose } from '../../../utils/colors'
import { TextButton } from '../../button'

type Props = {
  episode: SeasonEpisode
}

export const WatchedButton = observer(({ episode }: Props) => {
  const [disabled, setDisabled] = useState(false)
  const { checkInEpisode, removeCheckedInEpisode } = useEpisodeMutaion(episode)

  const checkIn = useCallback(() => {
    if (disabled) {
      return
    }
    setDisabled(true)
    checkInEpisode()
  }, [disabled])

  const removeCheckIn = useCallback(() => {
    if (disabled) {
      return
    }
    setDisabled(true)
    removeCheckedInEpisode()
  }, [disabled])

  useEffect(() => {
    if (disabled) {
      setTimeout(setDisabled, 1000, false)
    }
  }, [disabled])

  if (episode.watched.length > 0) {
    return (
      <TextButton onClick={removeCheckIn}>
        Mark as unwatched{' '}
        <i className="material-icons" style={iconStyle}>
          remove_circle_outline
        </i>
      </TextButton>
    )
  } else {
    return (
      <TextButton onClick={checkIn}>
        Mark as watched{' '}
        <i className="material-icons" style={iconStyle}>
          tv
        </i>
      </TextButton>
    )
  }
})

const iconStyle = {
  fontSize: 'inherit',
  color: melrose
}
