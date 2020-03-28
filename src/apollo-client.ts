import ApolloClient, { InMemoryCache, defaultDataIdFromObject } from 'apollo-boost'
import { auth } from './contexts/user-context'
import { config } from './config'

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

export const client = new ApolloClient({
  cache,
  uri: config.dragonstoneUrl,
  request: async operation => {
    const token = await auth.getIdToken()
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })
  },
})
