import { useGqClient } from '../global-context'
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

async function createUserReq(client: GqClient, username: string): Promise<boolean> {
  return client<{ createUser: boolean }>(
    `mutation {
      createUser(metadata: {username: "${username}"})
    }`
  ).then(result => result.createUser)
}
