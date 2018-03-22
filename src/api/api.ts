import { followingQuery, showQuery } from './queries'
import { FollowingResponse, ShowResponse } from './responses'
import { gqlRequest } from '../utils/http.utils'

export const api = {
  fetchFollowing: () => gqlRequest<FollowingResponse>(followingQuery),
  fetchShow: (id: number) =>
    gqlRequest<{ show: ShowResponse }>(showQuery, { id }).then(
      response => response.show
    )
}
