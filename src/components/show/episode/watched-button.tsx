import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Dragonstone } from '@episodehunter/types'
import { useUserLoader } from '../../../global-context'
import { melrose } from '../../../utils/colors'
import { TextButton } from '../../button'

type Props = {
  episode: Dragonstone.Episode
  watched?: Dragonstone.WatchedEpisode.WatchedEpisode
  showId: string
}

export const WatchedButton = observer(({ episode, showId, watched }: Props) => {
  const [disabled, setDisabled] = useState(false)
  const userLoader = useUserLoader()

  const guard = () => {
    if (disabled) {
      return false
    }
    setDisabled(true)
    setTimeout(setDisabled, 2000, false)
    return true
  }

  if (watched) {
    const removeCheckInEpisode = () => {
      if (!guard()) {
        return
      }
      userLoader.removeCheckInEpisode(showId, watched)
    }
    return (
      <TextButton onClick={removeCheckInEpisode}>
        Mark as unwatched{' '}
        <i className="material-icons" style={iconStyle}>
          remove_circle_outline
        </i>
      </TextButton>
    )
  } else {
    const checkInEpisode = () => {
      if (!guard()) {
        return
      }
      userLoader.checkInEpisode(showId, episode.season, episode.episode, new Date())
    }
    return (
      <TextButton onClick={checkInEpisode}>
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
