import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { config } from './config'
import { auth } from './contexts/user-context'

const cache = new InMemoryCache({
  typePolicies: {
    Show: {
      keyFields: ['ids', ['id']],
    },
    Episode: {
      keyFields: ['ids', ['tvdb']],
      fields: {
        watched: {
          merge(_existing, incoming) {
            // TODO: This will take the new array and replace the old one
            return incoming
          },
        },
      },
    },
    NextToWatch: {
      keyFields: ['showId'],
    },
    Following: {
      // TODO: Remove 'Following' type
      keyFields: ['show', ['ids', ['id']]],
    },
    Query: {
      fields: {
        following: {
          merge(_existing, incoming) {
            // TODO: This will take the new array and replace the old one
            return incoming
          },
        },
      },
    },
  },
})

const authLink = setContext(async (_, { headers }) => {
  const token = await auth.getIdToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const httpLink = createHttpLink({
  uri: config.dragonstoneUrl,
})

export const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
})
