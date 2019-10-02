import { captureException } from '@sentry/browser'
import { observable, action } from 'mobx'
import { useEffect, useState } from 'react'
import { extractSeasonNumber } from '@episodehunter/utils'
import { useGqClient, useEmitter } from '../../contexts/global-context'
import { Show, NextEpisodeToWatch } from '../../types/show'
import { fetchShow } from './fetch-show'
import { SeasonEpisode } from '../../types/episode'

export function useShow(showId: number) {
  const client = useGqClient()
  const [show, setShow] = useState<Show | null>()
  const [selectedSeason, setSelectedSeason] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const emitter = useEmitter()

  useEffect(() => {
    if (!showId) {
      return
    }
    setIsLoading(true)
    fetchShow(client, showId)
      .then(show => {
        if (show) {
          if (show.nextToWatch.episode) {
            setSelectedSeason(extractSeasonNumber(show.nextToWatch.episode.episodenumber))
          }
          setShow(observable(show))
        }
      })
      .catch(err => {
        captureException(err)
        setHasError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [showId])

  useEffect(() => {
    const changeNumberOfEpisodesToWatch = action((episode: SeasonEpisode) => {
      if (!show) {
        return
      } else if (episode.watched.length > 0) {
        show.nextToWatch.numberOfEpisodesToWatch--
      } else {
        show.nextToWatch.numberOfEpisodesToWatch++
      }
    })
    emitter.on('checkin-episode-change', changeNumberOfEpisodesToWatch)
    return () => emitter.off('checkin-episode-change', changeNumberOfEpisodesToWatch)
  }, [show])

  useEffect(() => {
    const checkNextEpisodeToWatch = action((nextEpisode: NextEpisodeToWatch | null) => {
      if (!show) {
        return
      }
      show.nextToWatch.episode = nextEpisode
    })
    emitter.on('next-episode-to-watch', checkNextEpisodeToWatch)
    return () => emitter.off('next-episode-to-watch', checkNextEpisodeToWatch)
  }, [showId, show])

  return [show, selectedSeason, setSelectedSeason, isLoading, hasError] as const
}
