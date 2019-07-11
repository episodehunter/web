import { GqClient } from '../../utils/gq-client'
import { Following, FollowingShow } from '../../types/following'

export async function fetchFollowing(client: GqClient): Promise<FollowingShow[]> {
  return client<{ following: Following[] }>(
    `{
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
  ).then(result => result.following.map(f => f.show))
}
