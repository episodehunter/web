import { captureException } from '@sentry/browser'
import { GraphQLClient } from 'graphql-request'
import { dragonstoneUrl } from '../config'

type Variables = {
  [key: string]: any
}

export const createGqClient = (getIdToken: () => Promise<string>) => {
  const client = new GraphQLClient(dragonstoneUrl)
  return async <T>(query: string, variables?: Variables): Promise<T> => {
    const token = await getIdToken()
    client.setHeader('authorization', `Bearer ${token}`)
    return client.request<T>(query, variables).catch(error => {
      captureException(error)
      return Promise.reject(error)
    })
  }
}

export type PgClient = ReturnType<typeof createGqClient>
