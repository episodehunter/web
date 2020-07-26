import { ApolloCache } from '@apollo/client'
import { extractSeasonNumber, unixTimestamp } from '@episodehunter/utils'
import { RemoveCircleOutline, Tv } from '@material-ui/icons'
import produce from 'immer'
import React from 'react'
import {
  CheckInEpisodeMutation,
  GetEpisodesForSeasonDocument,
  GetEpisodesForSeasonQuery,
  GetEpisodesForSeasonQueryVariables,
  useCheckInEpisodeMutation,
  useRemoveCheckedInEpisodeMutation,
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
          type: 'checkIn',
        },
      },
    })
  }

  const onRemoveCheckIn = () => {
    removeCheckIn({
      variables: {
        episode: {
          episodenumber: episode.episodenumber,
          showId: episode.ids.showId,
        },
      },
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

// TODO: Remove this code by getting the updated episode from Dragonstone in the response
function useCheckInMutaion(episode: SeasonEpisode) {
  const [checkIn, { loading: checkInLoading }] = useCheckInEpisodeMutation({
    update(cache) {
      updateHistoryToEpisodeInCahe(cache, episode, episodeToUpdate => {
        // TODO: Get this from Dragonstone instead
        episodeToUpdate.watched.push({
          __typename: 'WatchedEpisode',
          time: unixTimestamp(),
          type: 'checkIn',
        })
      })
    },
  })
  const [removeCheckIn, { loading: removeCheckInLoading }] = useRemoveCheckedInEpisodeMutation({
    update(cache) {
      updateHistoryToEpisodeInCahe(cache, episode, episodeToUpdate => {
        episodeToUpdate.watched = []
      })
    },
  })

  const loading = checkInLoading || removeCheckInLoading
  return { checkIn, removeCheckIn, loading }
}

/**
 * Update the watch history of an episode in the local cache
 */
function updateHistoryToEpisodeInCahe(
  cache: ApolloCache<CheckInEpisodeMutation>,
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
      season: extractSeasonNumber(episode.episodenumber),
    },
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
      season: extractSeasonNumber(episode.episodenumber),
    },
  })
}
