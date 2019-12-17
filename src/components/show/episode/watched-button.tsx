import { extractSeasonNumber, unixTimestamp } from '@episodehunter/utils'
import { RemoveCircleOutline, Tv } from '@material-ui/icons'
import { DataProxy } from 'apollo-cache'
import produce from 'immer'
import React from 'react'
import {
  CheckInEpisodeMutation,
  GetEpisodesForSeasonDocument,
  GetEpisodesForSeasonQuery,
  GetEpisodesForSeasonQueryVariables,
  GetShowDocument,
  GetShowQuery,
  GetShowQueryVariables,
  RemoveCheckedInEpisodeMutation,
  useCheckInEpisodeMutation,
  useRemoveCheckedInEpisodeMutation
} from '../../../dragonstone'
import { SeasonEpisode } from '../../../types/episode'
import { Button } from '../../atoms/button'

type Props = {
  episode: SeasonEpisode
}

export const WatchedButton = ({ episode }: Props) => {
  const { checkIn, removeCheckIn, loading } = useCheckInMutaion(episode)
  const hasHistory = episode.watched.length > 0

  const onCheckIn = () => {
    checkIn({
      variables: {
        episode: {
          episodenumber: episode.episodenumber,
          showId: episode.ids.showId,
          time: unixTimestamp(),
          type: 'checkIn'
        }
      }
    })
  }

  const onRemoveCheckIn = () => {
    removeCheckIn({
      variables: {
        episode: {
          episodenumber: episode.episodenumber,
          showId: episode.ids.showId
        }
      }
    })
  }

  if (hasHistory) {
    return (
      <Button
        size="xsmall"
        onClick={onRemoveCheckIn}
        progress={loading}
        type="tertiary"
        startIcon={<RemoveCircleOutline />}
      >
        Mark as unwatched
      </Button>
    )
  } else {
    return (
      <Button
        size="xsmall"
        onClick={onCheckIn}
        progress={loading}
        type="tertiary"
        startIcon={<Tv />}
      >
        Mark as watched
      </Button>
    )
  }
}

function useCheckInMutaion(episode: SeasonEpisode) {
  const [checkIn, { loading: checkInLoading }] = useCheckInEpisodeMutation({
    update(cache, { data }) {
      setNextEpisodeToWatchInCahe(cache, episode, 1, data && data.checkInEpisode!.episode)
      updateHistoryToEpisodeInCahe(cache, episode, episodeToUpdate => {
        // TODO: Get this from Dragonstone instead
        episodeToUpdate.watched.push({
          __typename: 'WatchedEpisode',
          time: unixTimestamp(),
          type: 'checkIn'
        })
      })
    }
  })
  const [removeCheckIn, { loading: removeCheckInLoading }] = useRemoveCheckedInEpisodeMutation({
    update(cache, { data }) {
      setNextEpisodeToWatchInCahe(cache, episode, -1, data && data.removeCheckedInEpisode!.episode)
      updateHistoryToEpisodeInCahe(cache, episode, episodeToUpdate => {
        episodeToUpdate.watched = []
      })
    }
  })

  const loading = checkInLoading || removeCheckInLoading
  return { checkIn, removeCheckIn, loading }
}

type NextEpisode =
  | NonNullable<
      | CheckInEpisodeMutation['checkInEpisode']
      | RemoveCheckedInEpisodeMutation['removeCheckedInEpisode']
    >['episode']
  | undefined

/**
 * Update the local cache with the new episode to watch
 */
function setNextEpisodeToWatchInCahe(
  cache: DataProxy,
  episode: SeasonEpisode,
  numberOfSeenEpisodes: number,
  nextEpisode?: NextEpisode
) {
  const cacheShow = cache.readQuery<GetShowQuery, GetShowQueryVariables>({
    query: GetShowDocument,
    variables: { id: episode.ids.showId }
  })
  if (!cacheShow || !nextEpisode) {
    return
  }
  cache.writeQuery({
    data: produce(cacheShow, draft => {
      draft.show!.nextToWatch.numberOfEpisodesToWatch -= numberOfSeenEpisodes
      draft.show!.nextToWatch.episode = nextEpisode
    }),
    query: GetShowDocument,
    variables: { id: episode.ids.showId }
  })
}

/**
 * Update the watch history of an episode in the local cache
 */
function updateHistoryToEpisodeInCahe(
  cache: DataProxy,
  episode: SeasonEpisode,
  updateFn: (episode: SeasonEpisode) => void
) {
  const cacheSeason = cache.readQuery<
    GetEpisodesForSeasonQuery,
    GetEpisodesForSeasonQueryVariables
  >({
    query: GetEpisodesForSeasonDocument,
    variables: {
      showId: episode.ids.showId,
      season: extractSeasonNumber(episode.episodenumber)
    }
  })
  if (!cacheSeason || !episode) {
    return
  }
  cache.writeQuery({
    data: produce(cacheSeason, draft => {
      const episodeToUpdate = draft.season.find(e => e.episodenumber === episode.episodenumber)
      if (!episodeToUpdate) {
        return
      }
      updateFn(episodeToUpdate)
    }),
    query: GetEpisodesForSeasonDocument,
    variables: {
      showId: episode.ids.showId,
      season: extractSeasonNumber(episode.episodenumber)
    }
  })
}
