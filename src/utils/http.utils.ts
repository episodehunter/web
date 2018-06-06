import { GraphQLClient } from 'graphql-request'
import { apiUrl } from '../config'

const createGqlClient = (token?: string) => {
  const client = new GraphQLClient(apiUrl + '/graphql')
  if (token) {
    client.setHeaders({
      Authorization: 'Bearer ' + token
    })
  }
  return client
}

export const gqlRequest = <T>(
  query: string,
  variables?: { [key: string]: any },
  token?: string
): Promise<T> => {
  return createGqlClient(token)
    .request<T>(query, variables)
    .catch(err => {
      console.log(err)
      return Promise.reject(err)
    })
}
