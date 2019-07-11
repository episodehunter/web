import { GqClient } from '../../utils/gq-client'
import { Upcoming, UpcomingShow } from '../../types/upcoming'

export async function fetchUpcoming(client: GqClient): Promise<UpcomingShow[]> {
  return client<{ following: Upcoming[] }>(
    `{
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
      }`
  ).then(result => result.following.map(s => s.show))
}
