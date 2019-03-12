import { PublicTypes } from '../public-types'
import { Client } from './client'

export const createUserFetcher = (client: Client) => ({
  async fetchFolloingList() {
    return client<{ following: PublicTypes.FollowingList }>(`following`).then(
      result => result.following
    )
  }
})
