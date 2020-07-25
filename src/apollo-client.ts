import {
  ApolloClient,
  createHttpLink,
  defaultDataIdFromObject,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { config } from './config'
import { auth } from './contexts/user-context'

const cache = new InMemoryCache({
  dataIdFromObject: (object: any) => {
    switch (object.__typename) {
      case 'Show':
        return object.ids.id
      default:
        return defaultDataIdFromObject(object)
    }
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
