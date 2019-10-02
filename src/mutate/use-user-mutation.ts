import { gql } from '@episodehunter/utils'
import { useGqClient } from '../contexts/global-context'
import { CreateUserMutation, CreateUserMutationVariables } from '../dragonstone'
import { GqClient } from '../utils/gq-client'

interface ShowMutation {
  createUser(username: string): Promise<boolean>
}

export function useUserMutaion(): ShowMutation {
  const gqClient = useGqClient()

  const createUser = (username: string) => {
    return createUserReq(gqClient, username)
  }

  return {
    createUser
  }
}

const createUserMutation = gql`
  mutation CreateUser($username: String!) {
    createUser(metadata: { username: $username })
  }
`

async function createUserReq(client: GqClient, username: string): Promise<boolean> {
  return client<CreateUserMutation, CreateUserMutationVariables>(createUserMutation, {
    username
  }).then(result => result.createUser)
}
