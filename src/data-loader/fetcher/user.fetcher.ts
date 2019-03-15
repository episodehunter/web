import { PublicTypes } from '../public-types'
import { Client } from './client'

const createWhatToWatchQuery = (id: string) => {
  return `id${id}: whatToWatch(showId: "${id}") {
    showId,
    numberOfEpisodesToWatch
  }`
}

export const createUserFetcher = (client: Client) => ({
  async fetchFolloingList() {
    return client<{ following: PublicTypes.FollowingList }>(`{ following }`).then(
      result => result.following
    )
  },
  async fetchWhatToWatch(showIds: string[]) {
    const query = '{' + showIds.map(createWhatToWatchQuery).join('\r\n') + '}'
    const result = await client<{ [key: string]: [PublicTypes.WhatToWatch] }>(query)
    return Object.values(result).map(r => r[0])
  }
})
