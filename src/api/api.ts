import { ShowRequestType } from '../enum/request-type'
import { gqlRequest } from '../utils/http.utils'
import {
  checkInEpisode,
  followingQuery,
  followShow,
  showQuery,
  titlesQuery,
  unfollowShow,
  unwatchEpisode,
  watchedEpisodes
} from './queries'
import {
  FollowingResponse,
  ShowHistoryResponse,
  ShowResponse,
  TitlesResponse,
  WatchedEpisode
} from './responses'

export interface ApiClient {
  fetchFollowing: () => Promise<number[]>
  fetchShow: (id: number, type: ShowRequestType) => Promise<ShowResponse>
  fetchShowHistory: (showId: number) => Promise<WatchedEpisode[]>
  checkInEpisode: (
    showId: number,
    season: number,
    episode: number
  ) => Promise<WatchedEpisode>
  unwatchEpisode: (
    showId: number,
    season: number,
    episode: number
  ) => Promise<null>
  fetchTitles: () => Promise<TitlesResponse>
  followShow: (showId: number) => Promise<boolean>
  unfollowShow: (showId: number) => Promise<boolean>
}

export const createApiClient = (
  userToken: () => Promise<string>
): ApiClient => ({
  fetchFollowing: () =>
    userToken().then(token =>
      gqlRequest<FollowingResponse>(followingQuery, undefined, token).then(
        result => result.following.map(f => f.id)
      )
    ),

  fetchShowHistory: (showId: number) =>
    userToken().then(token =>
      gqlRequest<ShowHistoryResponse>(watchedEpisodes, { showId }, token).then(
        result => result.watchedEpisodes
      )
    ),

  fetchShow: (id: number, type: ShowRequestType) =>
    gqlRequest<{ show: ShowResponse; numberOfShowFollowers?: number }>(
      showQuery(type),
      { id }
    ).then(response =>
      Object.assign(response.show, {
        numberOfFollowers: response.numberOfShowFollowers
      })
    ),

  fetchTitles: () =>
    gqlRequest<{ hollowShows: TitlesResponse }>(titlesQuery).then(
      response => response.hollowShows
    ),

  checkInEpisode: (showId, season, episode) =>
    userToken().then(token => {
      const time = Math.floor(new Date().getTime() / 1000)
      return gqlRequest<{ checkInEpisode: boolean }>(
        checkInEpisode(showId, season, episode, time),
        { showId },
        token
      ).then(() => ({
        showId,
        season,
        episode,
        time,
        type: 'checkin' as 'checkin'
      }))
    }),

  unwatchEpisode: (showId, season, episode) =>
    userToken()
      .then(token => {
        return gqlRequest(
          unwatchEpisode(showId, season, episode),
          { showId },
          token
        )
      })
      .then(() => null),

  followShow: showId =>
    userToken()
      .then(token => gqlRequest(followShow(showId), undefined, token))
      .then(result => result.followShow),

  unfollowShow: showId =>
    userToken()
      .then(token => gqlRequest(unfollowShow(showId), undefined, token))
      .then(result => result.unfollowShow)
})
