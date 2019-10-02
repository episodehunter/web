import { gql } from '@episodehunter/utils'
import { UpcomingShow } from '../../types/upcoming'
import { GqClient } from '../../utils/gq-client'
import { GetFollowingQuery } from '../../dragonstone'

const followingQuery = gql`
  query getFollowing {
    following {
      show {
        ids {
          tvdb
          id
        }
        name
        ended
        upcomingEpisode {
          aired
          name
          episodenumber
        }
        justAirdEpisode {
          aired
          name
          episodenumber
        }
      }
    }
  }
`

export async function fetchUpcoming(client: GqClient): Promise<UpcomingShow[]> {
  const result = await client<GetFollowingQuery>(followingQuery)
  return result.following.map(s => s.show)
}
