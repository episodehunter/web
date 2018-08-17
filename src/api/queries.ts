import { ShowRequestType } from '../enum/request-type'

export const followingQuery = `{
	following {
		id
	}
}`

export const watchedEpisodes = `
  query getWatchedEpisodes($showId: Int!) {
    watchedEpisodes(showId: $showId) {
      showId,
      season,
      episode,
      time,
      type
    }
  }
`

export const checkInEpisode = (
  showId: number,
  season: number,
  episode: number,
  time: number
) => `
  mutation {
    checkInEpisode(episode: {
      showId: ${showId},
      season: ${season},
      episode: ${episode},
      time: ${time}
    })
  }
`

export const unwatchEpisode = (
  showId: number,
  season: number,
  episode: number
) => `
  mutation {
    unwatchEpisode(episode: {
      showId: ${showId},
      season: ${season},
      episode: ${episode}
    })
  }
`

export const showQuery = (() => {
  const fragmentShow = `
    id
    name
    overview
    tvdbId
    overview
    genre
    language
    network
    runtime
    ended
    imdbId
    firstAired
    airsDayOfWeek
    airsTime
  `
  const partialEpisode = `
    name
    tvdbId
    firstAired
    season
    episode
  `
  const fullEpisode = `
    ${partialEpisode}
    overview
  `
  return (type: ShowRequestType) => `
    query getShow($id: Int!) {
      show(id: $id) {
        ${fragmentShow}
        episodes {
          ${type === ShowRequestType.partial ? partialEpisode : fullEpisode}
        }
      }
      ${
        type === ShowRequestType.partial
          ? ''
          : 'numberOfShowFollowers(showId: $id)'
      }
    }
  `
})()
