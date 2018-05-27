import { ShowRequestType } from '../enum/request-type'

export const followingQuery = `{
	following {
		id
	}
}`

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
    }
  `
})()
