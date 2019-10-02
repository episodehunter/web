import { gql } from '@episodehunter/utils'
import { History } from '../../types/history'
import { GqClient } from '../../utils/gq-client'
import { GetHistoryPageQuery, GetHistoryPageQueryVariables } from '../../dragonstone'

const HistoryQuery = gql`
  query getHistoryPage($page: Int!) {
    history(page: $page) {
      watchedEpisode {
        time
      }
      show {
        ids {
          tvdb
          id
        }
        name
      }
      episode {
        ids {
          tvdb
        }
        name
        episodenumber
      }
    }
  }
`

export async function fetchHistory(client: GqClient, page: number): Promise<History[]> {
  const result = await client<GetHistoryPageQuery, GetHistoryPageQueryVariables>(HistoryQuery, {
    page
  })
  return result.history
}
