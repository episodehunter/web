import { ShowRequestType } from '../enum/request-type'
import { gqlRequest } from '../utils/http.utils'
import { followingQuery, showQuery } from './queries'
import { FollowingResponse, ShowResponse } from './responses'

export const api = {
  fetchFollowing: () =>
    gqlRequest<FollowingResponse>(followingQuery).then(result =>
      result.following.map(f => f.id)
    ),
  fetchShow: (id: number, type: ShowRequestType) =>
    gqlRequest<{ show: ShowResponse }>(showQuery(type), { id }).then(
      response => response.show
    )
}
