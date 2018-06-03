import { ShowRequestType } from '../enum/request-type'
import { gqlRequest } from '../utils/http.utils'
import { followingQuery, showQuery, titlesQuery } from './queries'
import { FollowingResponse, ShowResponse, TitlesResponse } from './responses'

export interface UserApiClient {
  fetchFollowing: () => Promise<number[]>
}

export const createUserApiClient = (
  userToken: () => Promise<string>
): UserApiClient => ({
  fetchFollowing: () =>
    userToken().then(token =>
      gqlRequest<FollowingResponse>(followingQuery, undefined, token).then(
        result => result.following.map(f => f.id)
      )
    )
})

export const api = {
  fetchShow: (id: number, type: ShowRequestType) =>
    gqlRequest<{ show: ShowResponse }>(showQuery(type), { id }).then(
      response => response.show
    ),
  fetchTitles: () =>
    gqlRequest<{ hollowShows: TitlesResponse }>(titlesQuery).then(
      response => response.hollowShows
    )
}
