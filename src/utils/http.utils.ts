import { GraphQLClient } from 'graphql-request'
import { apiUrl } from '../config'

const gqlClient = new GraphQLClient(apiUrl + '/graphql')

export const gqlRequest = <T>(
  query: string,
  _token: string | null = localStorage.getItem('token'),
  _client: GraphQLClient = gqlClient
): Promise<T> => {
  if (_token) {
    _client.setHeaders({
      Authorization: 'Bearer ' + _token
    })
  }
  return _client.request<T>(query).catch(err => {
    console.log(err)
    return Promise.reject(err)
  })
}

export const fetchRequest = <T>(
  url: string,
  _token: string | null = localStorage.getItem('token')
): Promise<T> =>
  fetch(url, {
    headers: {
      Authorization: 'Bearer ' + _token
    }
  }).then(resp => resp.json())

export const getTokenFromHash = (hash: string) =>
  (hash.match(/#access_token=(.*?)&/) || [])[1]

export const getExpiresFromHash = (hash: string) =>
  (
    Number((hash.match(/&expires_in=(.*?)&/) || [])[1]) * 1000 +
    new Date().getTime()
  ).toString()
