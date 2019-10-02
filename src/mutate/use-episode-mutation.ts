import { Dragonstone } from '@episodehunter/types'
import { unixTimestamp, gql } from '@episodehunter/utils'
import { action, runInAction } from 'mobx'
import { useCallback } from 'react'
import { useGqClient, useEmitter } from '../contexts/global-context'
import { SeasonEpisode, WatchedEpisode } from '../types/episode'
import { GqClient } from '../utils/gq-client'
import { NextEpisodeToWatch } from '../types/show'
import {
  CheckInEpisodeMutation,
  CheckInEpisodeMutationVariables,
  RemoveCheckedInEpisodeMutation,
  RemoveCheckedInEpisodeMutationVariables
} from '../dragonstone'

interface EpisodeMutation {
  checkInEpisode(): Promise<NextEpisodeToWatch | null>
  removeCheckedInEpisode(): Promise<NextEpisodeToWatch | null>
}

export function useEpisodeMutaion(episode: SeasonEpisode): EpisodeMutation {
  const gqClient = useGqClient()
  const emitter = useEmitter()

  const checkInEpisode = useCallback(() => {
    const checkin: WatchedEpisode = {
      time: unixTimestamp(),
      type: 'checkIn'
    }
    const input: Dragonstone.WatchedEpisodeInput = {
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
    const input: Dragonstone.UnwatchedEpisodeInput = {
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

const checkInEpisodeMutation = gql`
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
const removeCheckInEpisodeMutation = gql`
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
  episode: Dragonstone.WatchedEpisodeInput
): Promise<NonNullable<CheckInEpisodeMutation['checkInEpisode']>['episode'] | null> {
  const result = await client<CheckInEpisodeMutation, CheckInEpisodeMutationVariables>(
    checkInEpisodeMutation,
    {
      episode
    }
  )
  return result.checkInEpisode && result.checkInEpisode.episode
}

async function removeCheckedInEpisodeReq(
  client: GqClient,
  episode: Dragonstone.UnwatchedEpisodeInput
): Promise<
  NonNullable<RemoveCheckedInEpisodeMutation['removeCheckedInEpisode']>['episode'] | null
> {
  const result = await client<
    RemoveCheckedInEpisodeMutation,
    RemoveCheckedInEpisodeMutationVariables
  >(removeCheckInEpisodeMutation, {
    episode
  })
  return result.removeCheckedInEpisode && result.removeCheckedInEpisode.episode
}
