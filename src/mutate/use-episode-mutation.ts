import { Dragonstone } from '@episodehunter/types'
import { action, runInAction } from 'mobx'
import { useCallback } from 'react'
import { useGqClient } from '../global-context'
import { SeasonEpisode } from '../types/episode'
import { unixtimestamp } from '../utils/date.utils'
import { PgClient } from '../utils/gq-client'

interface EpisodeMutation {
  checkInEpisode(): Promise<boolean>
  removeCheckedInEpisode(): Promise<boolean>
}

export function useEpisodeMutaion(episode: SeasonEpisode): EpisodeMutation {
  const gqClient = useGqClient()

  const checkInEpisode = useCallback(() => {
    const checkin = {
      time: unixtimestamp(),
      type: Dragonstone.WatchedEpisode.WatchedEnum.checkIn
    }
    const input: Dragonstone.WatchedEpisode.WatchedEpisodeInput = {
      episodenumber: episode.episodenumber,
      showId: episode.ids.showId,
      time: checkin.time,
      type: checkin.type
    }

    runInAction(() => {
      episode.watched.push(checkin)
    })
    return checkinEpisodeReq(gqClient, input).catch(
      action(() => {
        episode.watched = [] // Naive solution
        return false
      })
    )
  }, [episode])

  const removeCheckedInEpisode = useCallback(() => {
    const input: Dragonstone.WatchedEpisode.UnwatchedEpisodeInput = {
      episodenumber: episode.episodenumber,
      showId: episode.ids.showId
    }

    const backup = episode.watched

    runInAction(() => {
      episode.watched = []
    })
    return removeCheckedInEpisodeReq(gqClient, input).catch(
      action(() => {
        episode.watched = backup
        return false
      })
    )
  }, [episode])

  return {
    checkInEpisode,
    removeCheckedInEpisode
  }
}

const checkInEpisodeQuery = `
mutation checkInEpisode($episode: WatchedEpisodeInput) {
  checkInEpisode(episode: $episode)
}
`
const removeCheckInEpisodeQuery = `
mutation removeCheckedInEpisode($episode: UnwatchedEpisodeInput) {
  removeCheckedInEpisode(episode: $episode)
}
`

async function checkinEpisodeReq(
  client: PgClient,
  episode: Dragonstone.WatchedEpisode.WatchedEpisodeInput
): Promise<boolean> {
  return client<{ checkInEpisode: boolean }>(checkInEpisodeQuery, episode).then(
    result => result.checkInEpisode
  )
}

async function removeCheckedInEpisodeReq(
  client: PgClient,
  episode: Dragonstone.WatchedEpisode.UnwatchedEpisodeInput
): Promise<boolean> {
  return client<{ removeCheckedInEpisode: boolean }>(removeCheckInEpisodeQuery, episode).then(
    result => result.removeCheckedInEpisode
  )
}
