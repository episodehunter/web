import { useEffect, useState } from 'react'
import { observable } from 'mobx'
import { useGqClient } from '../../global-context'
import { Show } from '../../types/show'
import { fetchShow } from './fetch-show'

export function useShow(showId: number) {
  const client = useGqClient()
  const [show, setShow] = useState<Show | null>()
  const [selectedSeason, setSelectedSeason] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!showId) {
      return
    }
    setIsLoading(true)
    fetchShow(client, showId)
      .then(show => {
        if (show) {
          if (show.nextToWatch.episode) {
            setSelectedSeason(show.nextToWatch.episode.episodenumber)
          }
          setShow(observable(show))
        }
      })
      .catch(err => {
        console.error(err)
        setHasError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [showId])

  return [show, selectedSeason, setSelectedSeason, isLoading, hasError] as const
}
