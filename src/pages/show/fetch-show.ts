import { Show } from '../../types/show'
import { GqClient } from '../../utils/gq-client'
import { gql } from '@episodehunter/utils'
import { GetShowQuery, GetShowQueryVariables } from '../../dragonstone'

const ShowQuery = gql`
  query getShow($id: Int!) {
    show(id: $id) {
      name
      airs {
        first
        time
        day
      }
      ended
      genre
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
          aired
          name
          episodenumber
        }
      }
      followers
      isFollowing
    }
  }
`

export async function fetchShow(client: GqClient, showId: number): Promise<Show | null> {
  const result = await client<GetShowQuery, GetShowQueryVariables>(ShowQuery, { id: showId })
  return result.show
}
