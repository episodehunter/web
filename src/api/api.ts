import { followingQuery } from './queries'
import { FollowingResponse } from './responses'
import { gqlRequest } from '../utils/http.utils'

export const api = {
  fetchFollowing: () => gqlRequest<FollowingResponse>(followingQuery)
}
