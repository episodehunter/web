export interface FollowingShowIds {
  tvdb: number
  id: number
}

export interface FollowingShow {
  ids: FollowingShowIds
  name: string
  nextToWatch: {
    numberOfEpisodesToWatch: number
  }
}

export interface Following {
  show: FollowingShow
}
