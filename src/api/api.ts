import { ShowRequestType } from '../enum/request-type'
import { gqlRequest } from '../utils/http.utils'
import { followingQuery, showQuery, watchedEpisodes } from './queries'
import {
  FollowingResponse,
  ShowHistoryResponse,
  ShowResponse,
  WatchedEpisode
} from './responses'

export interface ApiClient {
  fetchFollowing: () => Promise<number[]>
  fetchShow: (id: number, type: ShowRequestType) => Promise<ShowResponse>
  fetchShowHistory: (showId: number) => Promise<WatchedEpisode[]>
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
    gqlRequest<{ show: ShowResponse }>(showQuery(type), { id }).then(
      response => response.show
    )
})
