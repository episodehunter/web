import { request } from '../graphql'
import { followingQuery } from './queries'
import { FollowingResponse } from './responses'

const _request = <T>(query: string): Promise<T> =>
  request<T>(query).catch(err => {
    console.log(err)
    return Promise.reject(err)
  })

export const api = {
  user: {
    fetchFollowing: () => _request<FollowingResponse>(followingQuery)
  }
}
