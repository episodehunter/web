import { gql } from '@episodehunter/utils'
import { GqClient } from '../../utils/gq-client'
import { FollowingShow } from '../../types/following'
import { GetFollowingShowsQuery } from '../../dragonstone'

const followingShowsQuery = gql`
  query GetFollowingShows {
    following {
      show {
        ids {
          tvdb
          id
        }
        name
        nextToWatch {
          numberOfEpisodesToWatch
        }
      }
    }
  }
`

export async function fetchFollowing(client: GqClient): Promise<FollowingShow[]> {
  const result = await client<GetFollowingShowsQuery>(followingShowsQuery)
  return result.following.map(f => f.show)
}
