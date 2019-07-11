import { History } from '../../types/history'
import { GqClient } from '../../utils/gq-client'

export async function fetchHistory(client: GqClient, page: number): Promise<History[]> {
  return client<{ history: History[] }>(
    `query getHistoryPage($page: Int!) {
      history(page: $page) {
        watchedEpisode { time }
        show { ids { tvdb id } name }
        episode { ids { tvdb } name episodenumber }
      } 
    }`,
    { page }
  ).then(result => result.history)
}
