import { GraphQLClient } from 'graphql-request'
import { auth, Auth } from './auth'

const gqlClient = new GraphQLClient('http://devapi.episodehunter.tv/graphql')

export const request = <T>(
  query: string,
  _auth: Auth = auth,
  _client: GraphQLClient = gqlClient
): Promise<T> => {
  const token = _auth.getToken()
  if (token) {
    _client.setHeaders({
      Authorization: 'Bearer ' + token
    })
  }
  return _client.request<T>(query)
}
