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

// export async function fetchNextEpisodeToWatch(
//   client: GqClient,
//   showId: number
// ): Promise<NextEpisodeToWatch | null> {
//   return client<{ show: Show | null }>(
//     `
//     query nextToWatch($showId: Int!) {
//       show(id: $showId) {
//         nextToWatch {
//           episode {
//             ids {
//               tvdb
//             }
//             name
//             episodenumber
//           }
//         }
//       }
//     }
//     `.trim(),
//     { showId }
//   ).then(result => {
//     if (!result.show) {
//       return null
//     }
//     return result.show.nextToWatch.episode
//   })
// }
