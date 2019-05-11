import { Dragonstone } from '@episodehunter/types'
import { Client } from './client'

const createWhatToWatchQuery = (id: string) => {
  return `id${id}: whatToWatch(showId: "${id}") {
    showId,
    numberOfEpisodesToWatch
  }`
}

export const createUserFetcher = (client: Client) => ({
  async fetchFolloingList() {
    return client<{ following: readonly string[] }>(`{ following }`).then(
      result => result.following
    )
  },
  async fetchMetadata() {
    return client<{ me: Dragonstone.User }>(`{ me { apikey, username } }`).then(result => result.me)
  },
  async fetchWhatToWatch(showIds: string[]) {
    const query = '{' + showIds.map(createWhatToWatchQuery).join('\r\n') + '}'
    const result = await client<{ [key: string]: [Dragonstone.WhatToWatch] }>(query)
    return Object.values(result).map(r => r[0])
  },
  async followShow(showId: string) {
    return client<{ followShow: boolean }>(
      `mutation {
        followShow(showId: "${showId}")
      }`
    ).then(result => result.followShow)
  },
  async unfollowShow(showId: string) {
    return client<{ unfollowShow: boolean }>(
      `mutation {
        unfollowShow(showId: "${showId}")
      }`
    ).then(result => result.unfollowShow)
  }
})
