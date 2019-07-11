import { Dragonstone } from '@episodehunter/types'
import { action, runInAction } from 'mobx'
import { useCallback } from 'react'
import { useGqClient, useEmitter } from '../global-context'
import { SeasonEpisode } from '../types/episode'
import { unixtimestamp } from '../utils/date.utils'
import { GqClient } from '../utils/gq-client'
import { NextEpisodeToWatch, NextToWatchShow } from '../types/show'

interface EpisodeMutation {
  checkInEpisode(): Promise<NextEpisodeToWatch | null>
  removeCheckedInEpisode(): Promise<NextEpisodeToWatch | null>
}

export function useEpisodeMutaion(episode: SeasonEpisode): EpisodeMutation {
  const gqClient = useGqClient()
  const emitter = useEmitter()

  const checkInEpisode = useCallback(() => {
    const checkin = {
      time: unixtimestamp(),
      type: 2 // Check in
    }
    const input: Dragonstone.WatchedEpisode.WatchedEpisodeInput = {
      episodenumber: episode.episodenumber,
      showId: episode.ids.showId,
      time: checkin.time,
      type: 'checkIn' as const
    }

    runInAction(() => {
      episode.watched.push(checkin)
    })
    emitter.emit('checkin-episode-change', episode)
    return checkInEpisodeReq(gqClient, input)
      .then(nextEpisodeToWatch => {
        emitter.emit('next-episode-to-watch', nextEpisodeToWatch)
        return nextEpisodeToWatch
      })
      .catch(
        action(() => {
          episode.watched = [] // Naive solution
          emitter.emit('checkin-episode-change', episode)
          return null
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
    emitter.emit('checkin-episode-change', episode)
    return removeCheckedInEpisodeReq(gqClient, input)
      .then(nextEpisodeToWatch => {
        emitter.emit('next-episode-to-watch', nextEpisodeToWatch)
        return nextEpisodeToWatch
      })
      .catch(
        action(() => {
          episode.watched = backup
          emitter.emit('checkin-episode-change', episode)
          return null
        })
      )
  }, [episode])

  return {
    checkInEpisode,
    removeCheckedInEpisode
  }
}

const checkInEpisodeQuery = `
mutation checkInEpisode($episode: WatchedEpisodeInput!) {
  checkInEpisode(episode: $episode) {
    episode {
      ids {
        tvdb
      }
      name
      aired
      episodenumber
    }
  }
}
`
const removeCheckInEpisodeQuery = `
mutation removeCheckedInEpisode($episode: UnwatchedEpisodeInput!) {
  removeCheckedInEpisode(episode: $episode) {
    episode {
      ids {
        tvdb
      }
      name
      aired
      episodenumber
    }
  }
}
`

async function checkInEpisodeReq(
  client: GqClient,
  episode: Dragonstone.WatchedEpisode.WatchedEpisodeInput
): Promise<NextEpisodeToWatch | null> {
  return client<{ checkInEpisode: Pick<NextToWatchShow, 'episode'> }>(checkInEpisodeQuery, {
    episode
  }).then(result => result.checkInEpisode.episode)
}

async function removeCheckedInEpisodeReq(
  client: GqClient,
  episode: Dragonstone.WatchedEpisode.UnwatchedEpisodeInput
): Promise<NextEpisodeToWatch | null> {
  return client<{ removeCheckedInEpisode: Pick<NextToWatchShow, 'episode'> }>(
    removeCheckInEpisodeQuery,
    {
      episode
    }
  ).then(result => result.removeCheckedInEpisode.episode)
}
