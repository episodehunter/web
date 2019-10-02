import { useEffect, useState } from 'react'
import { fetchUpcoming } from './fetch-upcoming'
import { useGqClient } from '../../contexts/global-context'
import { UpcomingShow } from '../../types/upcoming'
import { now, isBeforeDaysFrom, parse } from '../../utils/date.utils'
import { isSameDay } from 'date-fns'

interface UpcomingCollection {
  justAired: UpcomingShow[]
  today: UpcomingShow[]
  weekAhead: UpcomingShow[]
  upcoming: UpcomingShow[]
  tba: UpcomingShow[]
  ended: UpcomingShow[]
}

export function useUpcoming() {
  const client = useGqClient()
  const [upcomingCollection, setUpcomingCollection] = useState<UpcomingCollection>()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchUpcoming(client)
      .then(upcoming => {
        setUpcomingCollection(calculateUpcoming(upcoming))
      })
      .catch(err => {
        console.error(err)
        setHasError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const hasUpcoming = Object.values(upcomingCollection || {}).some(u => u.length > 0)

  return [upcomingCollection, hasUpcoming, isLoading, hasError] as const
}

function calculateUpcoming(upcomingShows: UpcomingShow[], today = now()): UpcomingCollection {
  const upcoming: UpcomingCollection = {
    justAired: [],
    today: [],
    weekAhead: [],
    upcoming: [],
    tba: [],
    ended: []
  }
  const isBeforeAWeekFromNow = isBeforeDaysFrom(7, today)
  for (const show of upcomingShows) {
    const prevEpisode = show.justAirdEpisode
    const nextEpisode = show.upcomingEpisode

    if (prevEpisode) {
      upcoming.justAired.push(show)
    }

    if (show.ended) {
      upcoming.ended.push(show)
    } else if (!nextEpisode) {
      upcoming.tba.push(show)
    } else {
      if (isSameDay(today, parse(nextEpisode.aired))) {
        upcoming.today.push(show)
      } else if (isBeforeAWeekFromNow(new Date(nextEpisode.aired))) {
        upcoming.weekAhead.push(show)
      } else {
        upcoming.upcoming.push(show)
      }
    }
  }
  return upcoming
}
