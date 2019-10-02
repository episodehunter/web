import { gql } from '@episodehunter/utils'
import { GqClient } from '../utils/gq-client'
import { GetUserQuery } from '../dragonstone'

const metadataQuery = gql`
  query GetUser {
    me {
      username
      apikey
    }
  }
`

export function getMetadata(gqClient: GqClient): Promise<GetUserQuery['me']> {
  return gqClient<GetUserQuery>(metadataQuery).then(r => r.me)
}
