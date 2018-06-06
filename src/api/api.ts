import { ShowRequestType } from '../enum/request-type'
import { gqlRequest } from '../utils/http.utils'
import { followingQuery, showQuery } from './queries'
import { FollowingResponse, ShowResponse } from './responses'

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
    )
}
