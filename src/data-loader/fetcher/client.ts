import { GraphQLClient } from 'graphql-request'
import { dragonstoneUrl } from '../../config'

type Variables = {
  [key: string]: any
}

export const createClient = (getIdToken: () => Promise<string>) => {
  const client = new GraphQLClient(dragonstoneUrl)
  return async <T>(query: string, variables?: Variables): Promise<T> => {
    const token = await getIdToken()
    client.setHeader('authorization', `Bearer ${token}`)
    return client.request<T>(query, variables)
  }
}

export type Client = ReturnType<typeof createClient>
