import { Show } from '../../types/show'
import { GqClient } from '../../utils/gq-client'

export async function fetchShow(client: GqClient, showId: number): Promise<Show | null> {
  return client<{ show: Show | null }>(
    `{
      show(id: ${showId}) {
        name,
        airs {
          first
          time
          day
        },
        ended,
        genre,
        ids {
          id
          tvdb
        }
        language
        network
        overview
        runtime
        numberOfAiredEpisodes
        seasons
        nextToWatch {
          numberOfEpisodesToWatch
          episode {
            ids {
              tvdb
            }
            name
            episodenumber
          }
        }
        followers
        isFollowing
      }
    }
    `
  ).then(result => result.show)
}
