import { Dragonstone } from '@episodehunter/types'
import { gql } from '@episodehunter/utils'
import Fuse from 'fuse.js'
import { request } from 'graphql-request'
import { get, set } from 'idb-keyval'
import { config } from '../config'
import { GetTitlesQuery } from '../dragonstone'

const fuseOptions: Fuse.IFuseOptions<any> = {
  keys: ['name'],
  minMatchCharLength: 2,
  threshold: 0.6,
  distance: 100,
  includeScore: true,
}

interface ReponseData {
  fetchStatus: 'loaded' | 'loading' | 'error' | 'not loaded'
  result: Dragonstone.Title[]
  error?: Error
}
const returnData = (data: ReponseData) => {
  ;(self.postMessage as any)(data)
}

const titlesQuery = gql`
  query GetTitles {
    titles {
      id
      name
      followers
      tvdbId
    }
  }
`

let fetchingFuse: Promise<Fuse<Dragonstone.Title>> | null = null

function getFuse() {
  if (fetchingFuse) {
    return fetchingFuse
  }
  returnData({
    fetchStatus: 'loading',
    result: [],
  })
  const remoteTitles = request<GetTitlesQuery>(config.dragonstoneUrl, titlesQuery)
    .then(result => result.titles)
    .then(titles => set('titles-v1', titles).then(() => titles))

  const storeTitles = get<Dragonstone.Title[]>('titles-v1')
    .catch(() => [])
    .then(result => {
      if (Array.isArray(result) && result.length > 0) {
        return result
      }
      return remoteTitles
    })

  fetchingFuse = storeTitles.then(titles => new Fuse<Dragonstone.Title>(titles as any, fuseOptions))

  Promise.all([remoteTitles, storeTitles])
    .then(([r, s]) => {
      if (r.length > s.length) {
        fetchingFuse = Promise.resolve(new Fuse<Dragonstone.Title>(r as any, fuseOptions))
      }
    })
    .catch(error => {
      console.error(error)
      returnData({
        fetchStatus: 'error',
        error,
        result: [],
      })
    })
  return fetchingFuse
}

function search(fuse: Fuse<Dragonstone.Title>, searchWord: string) {
  return fuse
    .search<Dragonstone.Title>(searchWord)
    .map(searchResult => {
      searchResult.score =
        (1 - (searchResult.score || 0)) * 10 +
        Math.min(Math.log10(searchResult.item.followers + 10), 20)
      return searchResult
    })
    .sort((a, b) => b.score! - a.score!)
    .map(a => a.item)
    .slice(0, 20)
}

let currectSearchWord = ''

self.addEventListener('message', async event => {
  const type = event.data.type
  if (type === 'search') {
    currectSearchWord = event.data.data

    const fuse = await getFuse()
    if (currectSearchWord) {
      const result = search(fuse, currectSearchWord)
      returnData({
        fetchStatus: 'loaded',
        result: result,
      })
      currectSearchWord = ''
    }
  }
})
